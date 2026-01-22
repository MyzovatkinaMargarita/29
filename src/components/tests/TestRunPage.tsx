import TimerBox from "../../components/tests/TimerBox";

<TimerBox
  durationSec={durationSec}
  onFinish={() => {
    console.log("Тест автоматически отправлен");
    alert("Время вышло. Тест отправлен.");
  }}
/>

{questions.map((q, i) => (
  <QuestionBlock
    key={q.id}
    index={i}
    question={q}
    value={answers[q.id]?.value ?? null}
    onChange={handleAnswerChange}
  />
))}


