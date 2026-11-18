import { useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { assemble, extractVariables } from "@/lib/cf/model";
import { requestInsert, useStore } from "@/lib/cf/store";

function Shell({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/75 p-3 sm:items-center"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="cf-rise max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-panel shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-pretty text-muted">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-11 shrink-0 place-items-center rounded-xl text-muted hover:bg-raised hover:text-fg"
            aria-label="Закрыть"
          >
            <X className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

const fieldClass =
  "w-full rounded-xl border border-line bg-ink px-3 py-2.5 text-sm outline-none placeholder:text-faint focus:border-amber";

export function PromptDialog() {
  const editing = useStore((s) => s.editing);
  const prompts = useStore((s) => s.prompts);
  const folders = useStore((s) => s.folders);
  const closeEditor = useStore((s) => s.closeEditor);
  const savePrompt = useStore((s) => s.savePrompt);
  const showToast = useStore((s) => s.showToast);
  const existing = prompts.find((prompt) => prompt.id === editing?.id);
  const [name, setName] = useState(existing?.name ?? "");
  const [folder, setFolder] = useState(existing?.folder ?? "");
  const [slug, setSlug] = useState(existing?.slug ?? "");
  const [text, setText] = useState(existing?.text ?? "");
  const [tags, setTags] = useState(existing?.tags.join(", ") ?? "");

  if (editing?.kind !== "prompt") return null;

  const save = () => {
    if (!name.trim() || !text.trim()) return;
    savePrompt({
      name: name.trim(),
      folder,
      slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
      text: text.trim(),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
    showToast("Промпт сохранён");
  };

  return (
    <Shell
      title={existing ? "Редактировать промпт" : "Новый промпт"}
      subtitle="Переменные в двойных скобках, например {{код}}, спросят значение перед вставкой."
      onClose={closeEditor}
    >
      <div className="space-y-3 px-4 py-4">
        <label className="block text-sm text-muted">
          Название
          <input value={name} onChange={(event) => setName(event.target.value)} className={`${fieldClass} mt-1`} />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm text-muted">
            Папка
            <select value={folder} onChange={(event) => setFolder(event.target.value)} className={`${fieldClass} mt-1`}>
              <option value="">Без папки</option>
              {folders.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm text-muted">
            Слаг
            <input
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              placeholder="refactor"
              className={`${fieldClass} mt-1 font-mono`}
            />
          </label>
        </div>
        <label className="block text-sm text-muted">
          Текст
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={7}
            className={`${fieldClass} mt-1 resize-y font-mono leading-relaxed`}
          />
        </label>
        <label className="block text-sm text-muted">
          Теги через запятую
          <input value={tags} onChange={(event) => setTags(event.target.value)} className={`${fieldClass} mt-1`} />
        </label>
      </div>
      <div className="flex justify-end gap-2 border-t border-line px-4 py-3">
        <button type="button" onClick={closeEditor} className="h-11 rounded-xl px-4 text-sm text-muted">
          Отмена
        </button>
        <button
          type="button"
          onClick={save}
          disabled={!name.trim() || !text.trim()}
          className="h-11 rounded-xl bg-amber px-4 text-sm font-semibold text-amber-ink disabled:opacity-40"
        >
          Сохранить
        </button>
      </div>
    </Shell>
  );
}

export function ProfileDialog() {
  const editing = useStore((s) => s.editing);
  const profiles = useStore((s) => s.contextProfiles);
  const closeEditor = useStore((s) => s.closeEditor);
  const saveProfile = useStore((s) => s.saveProfile);
  const showToast = useStore((s) => s.showToast);
  const existing = profiles.find((profile) => profile.id === editing?.id);
  const [name, setName] = useState(existing?.name ?? "");
  const [text, setText] = useState(existing?.text ?? "");

  if (editing?.kind !== "profile") return null;

  return (
    <Shell
      title={existing ? "Редактировать профиль" : "Новый профиль"}
      subtitle="Системная инструкция. Подклеивается перед промптом, если галочка включена."
      onClose={closeEditor}
    >
      <div className="space-y-3 px-4 py-4">
        <label className="block text-sm text-muted">
          Название
          <input value={name} onChange={(event) => setName(event.target.value)} className={`${fieldClass} mt-1`} />
        </label>
        <label className="block text-sm text-muted">
          Инструкция
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={10}
            className={`${fieldClass} mt-1 resize-y leading-relaxed`}
          />
        </label>
      </div>
      <div className="flex justify-end gap-2 border-t border-line px-4 py-3">
        <button type="button" onClick={closeEditor} className="h-11 rounded-xl px-4 text-sm text-muted">
          Отмена
        </button>
        <button
          type="button"
          disabled={!name.trim() || !text.trim()}
          onClick={() => {
            saveProfile({ name: name.trim(), text: text.trim() });
            showToast("Профиль сохранён");
          }}
          className="h-11 rounded-xl bg-amber px-4 text-sm font-semibold text-amber-ink disabled:opacity-40"
        >
          Сохранить
        </button>
      </div>
    </Shell>
  );
}

export function VariablesDialog() {
  const variablesFor = useStore((s) => s.variablesFor);
  const prompts = useStore((s) => s.prompts);
  const profiles = useStore((s) => s.contextProfiles);
  const activeProfileId = useStore((s) => s.activeProfileId);
  const settings = useStore((s) => s.settings);
  const values = useStore((s) => s.variableValues);
  const setVariableValue = useStore((s) => s.setVariableValue);
  const closeVariables = useStore((s) => s.closeVariables);
  const showToast = useStore((s) => s.showToast);
  const prompt = prompts.find((item) => item.id === variablesFor);

  if (!prompt) return null;
  const variables = extractVariables(prompt.text);
  const profile = profiles.find((item) => item.id === activeProfileId);
  const preview = assemble(prompt.text, profile?.text ?? null, settings.attachProfile, values);
  const long = new Set(["код", "текст", "схема", "описание"]);

  const commit = (copy: boolean) => {
    if (copy) {
      void navigator.clipboard.writeText(preview);
      showToast("Скопировано");
      closeVariables();
      return;
    }
    const inserted = requestInsert(preview);
    closeVariables();
    if (!inserted) {
      void navigator.clipboard.writeText(preview);
      showToast("Скопировано — поле чата не найдено");
      return;
    }
    showToast("Промпт вставлен в поле");
  };

  return (
    <Shell title={prompt.name} subtitle="Заполните переменные. Пустые останутся в тексте как есть." onClose={closeVariables}>
      <div className="space-y-3 px-4 py-4">
        {variables.map((name, index) => (
          <label key={name} className="block text-sm text-muted">
            {name}
            {long.has(name) ? (
              <textarea
                value={values[name] ?? ""}
                autoFocus={index === 0}
                onChange={(event) => setVariableValue(name, event.target.value)}
                rows={4}
                className={`${fieldClass} mt-1 resize-y font-mono`}
              />
            ) : (
              <input
                value={values[name] ?? ""}
                autoFocus={index === 0}
                onChange={(event) => setVariableValue(name, event.target.value)}
                className={`${fieldClass} mt-1`}
              />
            )}
          </label>
        ))}
        <div>
          <p className="mb-1 text-xs text-muted">Как уйдёт в чат</p>
          <pre className="max-h-40 overflow-auto rounded-xl border border-line bg-ink p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap text-fg">
            {preview}
          </pre>
        </div>
      </div>
      <div className="flex justify-end gap-2 border-t border-line px-4 py-3">
        <button type="button" onClick={() => commit(true)} className="h-11 rounded-xl px-4 text-sm text-muted">
          Копировать
        </button>
        <button
          type="button"
          onClick={() => commit(false)}
          className="h-11 rounded-xl bg-amber px-4 text-sm font-semibold text-amber-ink"
        >
          Вставить в чат
        </button>
      </div>
    </Shell>
  );
}

export function InstallDialog() {
  const open = useStore((s) => s.installOpen);
  const setInstallOpen = useStore((s) => s.setInstallOpen);
  if (!open) return null;
  return (
    <Shell
      title="Установить расширение"
      subtitle="Chrome, Edge, Brave и Яндекс Браузер. Firefox не поддерживается."
      onClose={() => setInstallOpen(false)}
    >
      <ol className="list-decimal space-y-2 px-8 py-4 text-sm text-pretty text-fg marker:text-amber">
        <li>Скачайте архив и распакуйте его в постоянную папку.</li>
        <li>
          Откройте <span className="font-mono text-amber">chrome://extensions</span>
        </li>
        <li>Включите «Режим разработчика».</li>
        <li>Нажмите «Загрузить распакованное» и выберите распакованную папку.</li>
        <li>Закрепите ContextFlow. На сайте чата нажмите / или Alt+P.</li>
      </ol>
      <p className="px-4 pb-2 text-sm text-pretty text-muted">
        Пока архив не установлен, это окно уже ведёт себя как расширение: библиотека справа, слэш в поле ввода.
        Работает на ChatGPT, Claude, DeepSeek, Qwen, GigaChat, Gemini, а также Perplexity, Grok, Copilot и Mistral.
      </p>
      <div className="px-4 py-3">
        <a
          href="/downloads/contextflow.zip"
          download
          className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-amber text-sm font-semibold text-amber-ink"
        >
          Скачать ContextFlow
        </a>
      </div>
    </Shell>
  );
}

export function Toast() {
  const toast = useStore((s) => s.toast);
  if (!toast) return null;
  return (
    <div className="cf-rise pointer-events-none fixed top-3 left-1/2 z-50 -translate-x-1/2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink">
      {toast}
    </div>
  );
}
