# TypeScript and Vue 3

Here's one more project where I try to learn as much as I can in two weeks about something new. This time, I'm brushing up on my TypeScript skills in the context of Vue 3.

## TypeScript

This "language, type checker, and transpiler rolled into one" adjunct to JavaScript has been around for 11 years, but this year (2023) it overtook Java in the ranking of [Top 10 Programming Languages on GitHub](https://github.blog/2023-11-08-the-state-of-open-source-and-ai/). That's a 37% increase in its user base since last year, in no small part to being adopted as the language of choice by three of the top Web frameworks: [React](https://react.dev/learn/typescript), [Angular](https://angular.io/guide/typescript-configuration), and [Vue](https://vuejs.org/guide/typescript/overview.html).

## Vue 3

In case you hadn't heard, we are ringing out support for Vue 2 along with the rest of 2023. The next version of Vue adds new features like Suspense (fallback templates for asynchronous loading), Teleport (ability to display parts of a component anywhere on the screen), improved performance, life cycle hooks, and more.

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

- `npm create vuetify`

  Vuetify is beautifully designed, component-rich framework based on Vue. This could be a great place to start building your website, if you're willing to shell out a few bucks for the starter template. (Additional themes are available for $50 on up.)

- `npm create nuxt-app <app-name>`

  Nuxt calls itself "the Intuitive Vue Framework" and it provides file-based routing, code splitting, server-side rendering, auto-imports, data fetching, zero-config TypeScript, and build tools. During scaffolding, you can select from 15 different UI frameworks, including Vuetify, Bootstrap Vue, Tailwind CSS, and others. (Sure, you can add these packages later, but it's nice to have them configured for you.)

- `npx nuxi init <app-name>`

  Finally, this is Nuxt at its most basic. You only select your preferred package manager during scaffolding. Everything else you can install through the Nuxt Developer tools, which are incredible by the way.

## Talking to Django

As part of this project, I wanted to use Django as my

# Useful Websites

{Make a list of websites that you found helpful in this project}

- [Web Site Name](http://url.link.goes.here)
- [Web Site Name](http://url.link.goes.here)

# Future Work

{Make a list of things that you need to fix, improve, and add in the future.}

- Item 1
- Item 2
- Item 3
