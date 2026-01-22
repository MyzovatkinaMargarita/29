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

      {type === "multiple" && (
  <Options>
    {visibleOptions.map((opt) => {
      // 1) гарантируем массив (value может быть null/string)
      const arr = Array.isArray(value) ? value : [];

      // 2) проверяем, выбран ли этот вариант
      const checked = arr.includes(opt);

      return (
        <li key={opt}>
          <OptionLabel>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => {
                // 3) собираем новый массив значений
                const next = checked
                  ? arr.filter((v) => v !== opt) // убрать вариант
                  : [...arr, opt];               // добавить вариант

                // 4) отправляем наверх
                onChange(id, next);
              }}
            />
            <span>{opt}</span>
          </OptionLabel>
        </li>
      );
    })}
  </Options>
)}

      )}
    </div>
  );
}
