import TimerBox from "../../components/tests/TimerBox";

<TimerBox
  durationSec={durationSec}
  onFinish={() => {
    console.log("Тест автоматически отправлен");
    alert("Время вышло. Тест отправлен.");
  }}
/>

