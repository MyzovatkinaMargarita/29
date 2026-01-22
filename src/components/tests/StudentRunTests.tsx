type AnswerValue = string | string[] | null;
type AnswerState = {
  type: "single" | "multiple" | "text";
  value: AnswerValue;
};
type AnswersMap = Record<number, AnswerState>;
