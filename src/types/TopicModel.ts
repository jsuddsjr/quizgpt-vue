import { QuestionModel } from "./QuestionModel";

export interface TopicModel {
  id: number;
  slug: string;
  subtopic_of: number;
  topic_text: string;
  description: string;
  topic_level: number;
  is_hidden: boolean;
  user: number;
  modified: string;
  created: string;
  questions: Array<QuestionModel>;
}

/*
{
    "questions": [
      {
        "id": 0,
        "question": 0,
        "choice_text": "string",
        "order": 0,
        "is_correct": false,
        "modified": "2023-12-12T09:05:59.636Z",
        "created": "2023-12-12T09:05:59.636Z"
      }
    ],
    "id": 0,
    "slug": "string",
    "subtopic_of": 0,
    "topic_text": "string",
    "description": "string",
    "topic_level": 1,
    "is_hidden": false,
    "user": 0,
    "modified": "2023-12-12T09:05:59.636Z",
    "created": "2023-12-12T09:05:59.636Z"
  }

  */
