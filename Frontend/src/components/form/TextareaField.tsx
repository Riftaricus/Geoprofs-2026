import { FieldShell } from "./FieldShell";
import { controlClasses } from "./controlClasses";

type TextareaFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
};

export function TextareaField({
  id,
  label,
  value,
  onChange,
  maxLength,
  placeholder,
  hint,
  error,
  disabled,
}: TextareaFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      hint={`${hint ? `${hint} · ` : ""}${value.length} / ${maxLength} tekens`}
      error={error}
    >
      <textarea
        id={id}
        value={value}
        rows={4}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error ? `${id}-error` : `${id}-hint`
        }
        onChange={(event) => onChange(event.target.value)}
        className={`${controlClasses(Boolean(error))} resize-y py-3`}
      />
    </FieldShell>
  );
}
