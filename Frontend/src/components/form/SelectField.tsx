import { ChevronDown } from "lucide-react";

import { FieldShell } from "./FieldShell";
import { controlClasses } from "./controlClasses";

type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  disabled?: boolean;
};

export function SelectField({
  id,
  label,
  value,
  options,
  onChange,
  placeholder,
  required,
  hint,
  error,
  disabled,
}: SelectFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      hint={hint}
      error={error}
    >
      <div className="relative">
        <select
          id={id}
          value={value}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          onChange={(event) => onChange(event.target.value)}
          className={`${controlClasses(Boolean(error))} appearance-none pr-10`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted"
        />
      </div>
    </FieldShell>
  );
}
