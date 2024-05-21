import { IColumns } from "../../store/settings";

export interface IEditQuestionarieProps {
  questionarie: ISettingsQuestionarie;
  value: string;
  isFetching: boolean;
  onChange: (val: string) => void;
  onEditName: (id: number) => void;
  onDelete: (id: number) => void;
  onCreateQuestion: (questionarieId: number, quesiton: string, fieldToUpdate: string) => void
  onEditQuestion: (questionarieId: number, quesitonId: number, text: string, fieldToUpdate: string) => void
  onDeleteQuestion: (quesitonId: number) => void
  onCreateAnswer: (id: number, words: string, value: string) => void
  onEditAnswer: (questionId: number, answerId: number, answerWords: string, valueToSet: string) => void
  onDeleteAnswer: (answerId: number) => void
}

export interface IEditQuestionProps {
  questionText: string
  field: string
  isFetching: boolean
  onEditQuestion: (text: string, fieldToUpdate: string) => void
  onDeleteQuestion: () => void
}

export interface IAddQuestionProps {
  isFetching: boolean
  onAdd: (question: string, fieldToUpdate: string) => void
}

export interface IAddAnswerProps {
  isFetching: boolean
  onAdd: (words: string, valueToSet: string) => void
  selectedQuestionId: number
  questions: ISettingsQuestion[]
}

export interface IEditAnswerProps {
  onEditAnswer: (answerId: number, answerWords: string, valueToSet: string) => void
  onDeleteAnswer: (answerId: number) => void
  answer: ISettingsQuestionarieAnswer
  isFetching: boolean
  fieldToUpdate: string | null
}

export interface ISettingsQuestionarie {
  id: number;
  name: string;
  questions: ISettingsQuestion[];
}

export interface ISettingsQuestion {
  id: number;
  query: string;
  field_to_update: string
  answers_options: ISettingsQuestionarieAnswer[]
  //we don't use query_pos and query_wording
  query_pos: number;
  query_wording: string;
}


export interface ISettingsQuestionarieAnswer {
    id: number
    value_to_set: string | null
    answer_words: string
}


export interface IEditFieldComponentProps {
  column: IColumns
}