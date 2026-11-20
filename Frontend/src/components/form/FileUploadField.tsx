import { useState, type ChangeEvent } from "react";
import { Upload, X } from "lucide-react";

type FileUploadFieldProps = {
  id: string;
  label: string;
  files: File[];
  onChange: (files: File[]) => void;
  //toegestane extensies, bijv. [".pdf", ".jpg", ".png"]
  extensions: string[];
  maxFiles: number;
  maxSizeMb: number;
  hint?: string;
  error?: string;
  disabled?: boolean;
};

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

//bestanden kiezen met controle op type, grootte en aantal.
//De backend controleert dezelfde regels nog een keer.
export function FileUploadField({
  id,
  label,
  files,
  onChange,
  extensions,
  maxFiles,
  maxSizeMb,
  hint,
  error,
  disabled,
}: FileUploadFieldProps) {
  //fout over bestanden die zojuist zijn afgewezen
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);

    //leeg de input, anders kun je hetzelfde bestand niet opnieuw kiezen
    event.target.value = "";

    const accepted: File[] = [];
    const rejected: string[] = [];

    for (const file of selected) {
      const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

      if (!extensions.includes(extension)) {
        rejected.push(`'${file.name}' is geen PDF, JPG of PNG.`);
      } else if (file.size > maxSizeMb * 1024 * 1024) {
        rejected.push(`'${file.name}' is groter dan ${maxSizeMb} MB.`);
      } else if (files.length + accepted.length >= maxFiles) {
        rejected.push(`Je kunt maximaal ${maxFiles} bestanden toevoegen.`);
      } else {
        accepted.push(file);
      }
    }

    setLocalError(rejected[0] ?? null);

    if (accepted.length > 0) {
      onChange([...files, ...accepted]);
    }
  };

  const handleRemove = (index: number) => {
    setLocalError(null);
    onChange(files.filter((_, fileIndex) => fileIndex != index));
  };

  const shownError = error ?? localError;
  const canAdd = files.length < maxFiles;

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-sm font-semibold text-ink">{label}</p>

      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between gap-3 rounded-lg border border-line bg-white px-3 py-2"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{file.name}</p>

                <p className="text-xs text-ink-muted">{formatSize(file.size)}</p>
              </div>

              <button
                type="button"
                onClick={() => handleRemove(index)}
                disabled={disabled}
                aria-label={`Verwijder ${file.name}`}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-ink-muted hover:bg-surface-subtle focus-visible:outline-3 focus-visible:outline-focus disabled:cursor-not-allowed"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {canAdd && (
        <>
          {/* de echte input is onzichtbaar maar bereikbaar met het toetsenbord */}
          <input
            id={id}
            type="file"
            multiple
            accept={extensions.join(",")}
            disabled={disabled}
            onChange={handleSelect}
            aria-describedby={shownError ? `${id}-error` : `${id}-hint`}
            className="peer sr-only"
          />

          <label
            htmlFor={id}
            className={`flex min-h-16 cursor-pointer items-center gap-3 rounded-lg border border-dashed bg-white px-4 py-3 transition-colors hover:bg-surface-subtle peer-focus-visible:outline-3 peer-focus-visible:outline-focus peer-disabled:cursor-not-allowed peer-disabled:bg-disabled ${shownError ? "border-danger" : "border-control"}`}
          >
            <Upload size={20} aria-hidden="true" className="shrink-0 text-geo-800" />

            <span>
              <span className="block text-sm font-semibold text-ink">
                Bestand toevoegen
              </span>

              <span className="block text-xs text-ink-muted">
                PDF, JPG of PNG · maximaal {maxSizeMb} MB · max. {maxFiles} bestanden
              </span>
            </span>
          </label>
        </>
      )}

      {shownError ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-danger">
          {shownError}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="text-xs text-ink-muted">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
