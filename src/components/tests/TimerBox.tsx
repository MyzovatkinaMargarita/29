/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";


/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";


const Box = styled.aside<{ danger: boolean }>`
  height: 120px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: #fff;

  border: 2px solid ${p => (p.danger ? "#ffb3b3" : "#cfe0ff")};
  color: ${p => (p.danger ? "#e00000" : "#1b5de0")};

  .label {
    font-size: 14px;
    font-weight: 500;
    opacity: 0.85;
  }

  .time {
    font-size: 42px;
    font-weight: 800;
    line-height: 1;
  }
`;

export default function TimerBox({ durationSec, onFinish }: TimerBoxProps) {
  const [timeLeft, setTimeLeft] = useState(durationSec);
  const [finished, setFinished] = useState(false);


useEffect(() => {
    if (finished) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [finished]);


useEffect(() => {
    if (!finished) return;
    onFinish?.();
  }, [finished, onFinish]);


 const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [timeLeft]);


const danger = timeLeft <= durationSec / 4;



return (
    <Box danger={danger}>
      <div className="label">Осталось времени:</div>
      <div className="time">{formattedTime}</div>
    </Box>
  );
}

