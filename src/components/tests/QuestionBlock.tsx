type Props = {
  index: number;
  question: Question;
  value: string | string[] | null;
  onChange: (questionId: number, value: string | string[]) => void;
};

export default function QuestionBlock({ index, question, value, onChange }: Props) {
  const { id, type, options } = question;
  const visibleOptions = options || [];

  return (
    <div>
      {type === "text" && (
        <TextAnswer
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder="Ответ"
          aria-label={`Ответ на вопрос №${index + 1}`}
        />
      )}

      {type === "single" && (
        <Options>
          {visibleOptions.map((opt, i) => (
            <li key={i}>
              <OptionLabel>
                <input
                  type="radio"
                  name={`q-${id}`}
                  checked={value === opt}
                  onChange={() => onChange(id, opt)}
                />
                <span>{opt}</span>
              </OptionLabel>
            </li>
          ))}
        </Options>
      )}
    </div>
  );
}
