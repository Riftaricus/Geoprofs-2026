//gedeelde stijl voor invoervelden uit het design system:
//controlrand, focusring van 3px en een rode rand bij een fout
const base =
  "min-h-12 w-full rounded-lg border bg-white px-3 text-sm text-ink placeholder:text-ink-muted focus:outline-3 focus:outline-focus/40 focus:border-focus disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled-ink";

export function controlClasses(hasError: boolean): string {
  return `${base} ${hasError ? "border-danger" : "border-control"}`;
}
