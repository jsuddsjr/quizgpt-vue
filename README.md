# TypeScript and Vue 3

Here's one more project where I try to learn as much as I can in two weeks about something new. This time, I'm brushing up on my TypeScript skills in the context of Vue 3.

## TypeScript

This "language, type checker, and transpiler rolled into one" adjunct to JavaScript has been around for 11 years, but this year (2023) it overtook Java in the ranking of [Top 10 Programming Languages on GitHub](https://github.blog/2023-11-08-the-state-of-open-source-and-ai/). That's a 37% increase in its user base since last year, in no small part to being adopted as the language of choice by three of the top Web frameworks: [React](https://react.dev/learn/typescript), [Angular](https://angular.io/guide/typescript-configuration), and [Vue](https://vuejs.org/guide/typescript/overview.html).

## Vue 3

In case you hadn't heard, we are ringing out support for Vue 2 along with the rest of 2023. The next version of Vue adds new features like Suspense (fallback templates for asynchronous loading), Teleport (ability to display parts of a component anywhere on the screen), improved performance, life cycle hooks, and more.

> HERE'S THE KEY: Vue 3 introduces the **Composition API**. _Learn to recognize it._ There's a lot of old sample code out there, but you want the new stuff.

I recently began working with a legacy app written for Vue 2, so I wanted to see how a similar app might be designed using the newer Composition API. Also, I decide to reuse [a REST API I had written with Django](https://github.com/jsuddsjr/quizgpt) as my backend service.

As always, here's a video link for a quick demo.

[Software Demo Video](http://youtube.link.goes.here)

# Development Environment

My development environment is VS Code with:

- [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) &ndash; The official VS Code extension for Vue 3.
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) &ndash; An optimized TypeScript language service for Volar that recognizes types in \*.vue files.

> Don't forget to enable [Volar Takeover Mode](https://vuejs.org/guide/typescript/overview.html#volar-takeover-mode) in VS Code to get the best transpilation performance.

Honestly, that's everything you need. Most notably, you _DO NOT_ need to install the old Vue CLI. In fact, you should uninstall it if you've used it before. That's not how to bootstrap Vue projects in 2024.

## Bootstrapping a Vue project

The node package manager (NPM) is all you need to get started. The `npm create` command (a synonym for `npm init`) will install any missing packages before it builds from the template.

Here are few ways to start a new Vue project.

- `npm create vue`

  This is the official Vue project scaffolding tool. You can optionally install support for TypeScript, JSX, Vue Router, Pinia (state management), Vitest (unit testing), Cypress/Nightwatch/Playwright (E2E testing), ESLint, and/or Prettier.

- `npm create vite`

  Vite is lightweight bundler replacement for Webpack that is optimized for speed. It provides a very basic Vue template for TypeScript that includes Vitest for unit testing.

  > I started this project with Vite, but I would definitely use Nuxt next time.

- `npm create vuetify`

  Vuetify is beautifully designed, component-rich framework based on Vue. This could be a great place to start building your website, if you're willing to shell out a few bucks for the starter template. (Additional themes are available for $50 on up.)

- `npm create nuxt-app <app-name>`

  Nuxt calls itself "the Intuitive Vue Framework" and it provides file-based routing, code splitting, server-side rendering, auto-imports, data fetching, zero-config TypeScript, and build tools. During scaffolding, you can select from 15 different UI frameworks, including Vuetify, Bootstrap Vue, Tailwind CSS, and others. (Sure, you can add these packages later, but it's nice to have them configured for you.)

- `npx nuxi init <app-name>`

  Finally, this is Nuxt at its most basic. You only select your preferred package manager during scaffolding. Everything else you can install through the Nuxt Developer tools, which are incredible by the way.

## Talking to Django

My goal for this project was to update the UI of a Django project that I built a few weeks ago. However, most of the API required me to be logged in with my Django user account, which meant I needed to send my credentials to Django so it could send back a Session ID.

I first tried creating an open API endpoint to accept my credentials; however, I soon ran into trouble using those credentials to create a token and session that could be used in subsequent requests. So, I decided to use the standard endpoint to POST my login request, just as if I had entered my credentials into the default login form myself. Additionally, I needed to know if the login was accepted, so I redirect the request after login to an API endpoint that would return details for the current user.

```
http://localhost:3000/accounts/login/?next=/api/me
```

Here's how I made it work. 👇

### Cross-Origin Resource Sharing (CORS)

If you don't already know about CORS, I would suggest you [learn about it here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). The most important thing about CORS is that an application hosted in one domain cannot simply start talking to an API hosted in another domain without some configuration.

The server needs to know that it can safely share information with the client, so I needed to add the following HTTP headers to each response, otherwise the browser would block my requests.

```
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin:      http://localhost:5173
```

I did this by installing the `django-cors-headers` package, adding `corsheaders` to my INSTALLED_APPS, `corsheaders.middleware.CorsMiddleware` to MIDDLEWARE, and then a list of CORS_ALLOWED_ORIGINS to my `settings.py` file. You can read [more details here](https://pypi.org/project/django-cors-headers/).

### Cross-site Request Forgery (CSRF)

In addition to the CORS setting, I also needed to enable CSRF across domains. Django has a strong CSRF policy by default, and I wanted to work within that framework rather than disable CSRF entirely. After some digging, I discovered an easy solution. I just needed to configure CSRF_TRUSTED_ORIGINS in `settings.py`.

```
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:4173",
]
```

> These ports are used by the Dev server and Preview server of Vite, respectively. I configured both so
> I could test the application in either mode.

_Actually, I lied._ This was only the FIRST part of the solution. For each request, I needed to send back TWO CSRF tokens, one in the Headers and one in the Body of the request.

### Cookies and Axios

So, you might be surprised to discover that Axios will gladly return Cookies in a request, if you know which setting to use. Unfortunately, I didn't find that setting until **AFTER** I had tried several different ways to copy Cookies myself. Naturally, Axios refused to accept these 'dangerous' headers.

I'll save you the frustration.

```typescript
import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

export default apiClient;
```

This is how I configured Axios defaults for talking with Django. The `withCredentials: true` setting will instruct Axios to returns all the cookies with each request.

<small>So simple when you know the secret. Sigh...</small>

### Extracting form values

The final piece of information I needed is embedded in the login form provided by Django. Remember, I decided to post my request directly to the same endpoint used by the login form. So, before I could POST credentials, I first had to retrieve a new CSRF token.

```typescript
import { ref } from "vue";
import axiosClient from "../plugins/axiosClient";

const csrfmiddlewaretoken = ref("");

const LOGIN_URL = "/accounts/login/?next=/api/me";
const LOGOUT_URL = "/accounts/logout/?next=/api/me";

const refreshToken = async () => {
  const res = await axiosClient.get<string>(LOGIN_URL);
  const doc = new DOMParser().parseFromString(res.data, "text/html");
  const input = doc.querySelector(
    "input[name=csrfmiddlewaretoken]"
  ) as HTMLInputElement;
  csrfmiddlewaretoken.value = input.value;
};
```

> Ugh. I feel a little dirty.

Here's how it works.

1. I use my pre-configured axiosClient to make a request. Since the `baseUrl` is already set as default, I just specify the relative URL to the endpoint.
2. I use the `axiosClient.get<string>` helper method so I don't need to pass an unwieldy configuration object. Note that I'm passing the expected type of the response (`string`) so TypeScript will know how to treat the return data.
3. Rather than use some fancy regular expression to extract the token from the string, I decide to parse the string into Document Object Model and use an attribute selector to find the element. I also cast it as `HTMLInputElement` to make TypeScript happy.
4. Finally, I store the value to be passed back with my request.

And with these adjustments, I could authenticate with the API from a completely new portal.

🥳🥳🥳

# Useful Websites

Here are some websites that I found helpful in this project.

- [Introduction | Vue.js](https://vuejs.org/guide/introduction.html)
- [Getting Started | Vite](https://vitejs.dev/guide/)
- [Options API vs. Composition API](https://medium.com/codex/options-api-vs-composition-api-4a745fb8610)
- [Getting Started | Vue Router](https://router.vuejs.org/guide/)
- [Getting Started | Guide | Vitest](https://vitest.dev/guide/)
- [Cross Site Request Forgery protection | Django](https://docs.djangoproject.com/en/4.2/ref/csrf/)
- [Vue 3 CRUD example with Axios](https://www.bezkoder.com/vue-3-crud/)

# Future Work

As with my other two-week attempts, there is much that I was not able to implement.

- **Add TypeScript interfaces for data models.** Since I'm not talking directly to the database, and ORM (Object-Relational Mapper) might not work here. I would probably have to build these by hand.
- **Build wrapper function for API calls.** A tool to read the Open API document and generate wrappers would make this a lot easier, I just don't know what it is yet. I expect the API to change over time, so I would love to find an automatic process that could quickly detect mismatches.
- **Save application state.** Each new edit in the "inner dev loop" causes the Vue app to restart, forcing me to log in again. The Vue app should have a longer memory than that.
- **Generate new components and page layouts** I built a few components as I was learning, but nothing yet resembling a true QuizGPT UI. However, I do have a working router to switch between "pages" in my SPA (Single Page App).
