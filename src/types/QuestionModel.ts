import { ChoiceModel } from "./ChoiceModel";

export interface QuestionModel {
  id: number;
  topic: number;
  question_type: string;
  question_text: string;
  is_suppressed: boolean;
  modified: string;
  created: string;
  choices: Array<ChoiceModel>;
}

/*

{
  "choices": [
    {
      "id": 0,
      "question": 0,
      "choice_text": "string",
      "order": 0,
      "is_correct": false,
      "modified": "2023-12-12T09:02:31.460Z",
      "created": "2023-12-12T09:02:31.460Z"
    }
  ],
  "id": 0,
  "topic": 0,
  "question_type": "M",
  "question_text": "string",
  "is_suppressed": true,
  "modified": "2023-12-12T09:02:31.460Z",
  "created": "2023-12-12T09:02:31.460Z"
}

*/
