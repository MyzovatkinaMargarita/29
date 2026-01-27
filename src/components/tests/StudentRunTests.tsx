import React, { useState, useEffect, useMemo } from 'react';

type AnswerValue = string | string[] | null;
type AnswerState = { type: "single" | "multiple" | "text"; value: AnswerValue; };
type AnswersMap = Record<number, AnswerState>;

interface Question { id: number; type: "single" | "multiple" | "text"; }

interface Props {
  testId: number;
  questions: Question[];
}

const StudentRunTests: React.FC<Props> = ({ testId, questions }) => {
  const [answers, setAnswers] = useState<AnswersMap>({});
  const durationSec = 0;

  useEffect(() => {
    if (questions.length === 0) return;
    setAnswers((prev) => {
      if (Object.keys(prev).length > 0) return prev;
      const initial: AnswersMap = {};
      for (const q of questions) {
        initial[q.id] = { type: q.type, value: q.type === "multiple" ? [] : null };
      }
      return initial;
    });
  }, [questions]);

  const answeredCount = useMemo(() => {
    return Object.values(answers).filter((a) => {
      if (a.type === "single") return a.value !== null;
      if (a.type === "multiple") return Array.isArray(a.value) && a.value.length > 0;
      if (a.type === "text") return typeof a.value === "string" && a.value.trim() !== "";
      return false;
    }).length;
  }, [answers]);

  const totalCount = questions.length;
  const allAnswered = totalCount > 0 && answeredCount === totalCount;

  if (questions.length === 0) return null;

  function handleAnswerChange(questionId: number, value: string | string[]) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { ...prev[questionId], value },
    }));
  }

  function handleSubmit() {
    const payload = {
      testId,
      answers,
      timeSpent: durationSec,
    };
    console.log("=== SUBMIT ===");
    console.log("payload:", payload);
    console.log("answered:", answeredCount, "/", totalCount);
    console.log("allAnswered:", allAnswered);
  }

  return (
    <div>
      <p>{answeredCount} / {totalCount}</p>
      <button onClick={handleSubmit}>Отправить</button>
    </div>
  );
};

export default StudentRunTests;
