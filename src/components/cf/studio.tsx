import { useEffect, useMemo, useRef, useState } from "react";
import { Download, Library as LibraryIcon, Lock, Send } from "lucide-react";
import { matchesQuery, SITES, type SiteId } from "@/lib/cf/model";
import { registerInsert, useStore } from "@/lib/cf/store";
import { Kbd, Mark } from "./bits";
import { Library } from "./library";
import { useInsertPrompt } from "./use-insert";

interface Note {
  id: string;
  role: "user" | "note";
  content: string;
}

export function Studio() {
  const activeSite = useStore((s) => s.activeSite);
  const setActiveSite = useStore((s) => s.setActiveSite);
  const popupOpen = useStore((s) => s.setPopupOpen);
  const libraryOpen = useStore((s) => s.libraryOpen);
  const setLibraryOpen = useStore((s) => s.setLibraryOpen);
  const setInstallOpen = useStore((s) => s.setInstallOpen);
  const isPopupOpen = useStore((s) => s.popupOpen);
  const site = SITES.find((item) => item.id === activeSite) ?? SITES[0];
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPopupOpen) return;
    const onDown = (event: MouseEvent) => {
      if (anchorRef.current?.contains(event.target as Node)) return;
      popupOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [isPopupOpen, popupOpen]);

  return (
    <div className="flex h-dvh min-h-0 flex-col bg-ink text-fg">
      <header className="relative shrink-0 border-b border-line bg-panel">
        <div className="flex min-h-12 items-center gap-2 px-2 py-1 sm:px-3">
          <Mark className="size-7 shrink-0" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight">ContextFlow</p>
            <p className="hidden truncate font-mono text-xs text-faint sm:block">{site.host}</p>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={() => setLibraryOpen(true)}
              aria-label="Библиотека"
              className="inline-flex h-11 items-center gap-1.5 rounded-xl px-2.5 text-sm text-muted hover:bg-raised hover:text-fg lg:hidden"
            >
              <LibraryIcon className="size-4" />
              <span className="hidden sm:inline">Библиотека</span>
            </button>
            <button
              type="button"
              onClick={() => setInstallOpen(true)}
              className="grid size-11 place-items-center rounded-xl text-muted hover:bg-raised hover:text-fg"
              aria-label="Скачать расширение"
            >
              <Download className="size-4" />
            </button>
            <div ref={anchorRef} className="relative">
              <button
                type="button"
                onClick={() => popupOpen(!isPopupOpen)}
                className={`grid size-11 place-items-center rounded-xl border ${isPopupOpen ? "border-amber bg-raised" : "border-line bg-ink"}`}
                aria-label="Открыть меню расширения"
                aria-expanded={isPopupOpen}
              >
                <Mark className="size-6" />
              </button>
              {isPopupOpen && <Popup />}
            </div>
          </div>
        </div>
        <div className="flex gap-1 overflow-x-auto px-2 pb-2">
          {SITES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSite(item.id)}
              className={`h-9 shrink-0 rounded-full px-3 text-sm ${
                item.id === activeSite ? "bg-ink text-fg" : "text-muted hover:bg-raised"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <ChatStage siteId={activeSite} siteName={site.name} />
        <aside className="hidden w-80 shrink-0 border-l border-line lg:flex lg:flex-col">
          <Library />
        </aside>
      </div>

      {libraryOpen && (
        <div className="fixed inset-0 z-40 bg-ink lg:hidden">
          <Library onClose={() => setLibraryOpen(false)} />
        </div>
      )}
    </div>
  );
}

function ChatStage({ siteId, siteName }: { siteId: SiteId; siteName: string }) {
  const profiles = useStore((s) => s.contextProfiles);
  const activeProfileId = useStore((s) => s.activeProfileId);
  const settings = useStore((s) => s.settings);
  const setLibraryOpen = useStore((s) => s.setLibraryOpen);
  const setPopupOpen = useStore((s) => s.setPopupOpen);
  const editing = useStore((s) => s.editing);
  const variablesFor = useStore((s) => s.variablesFor);
  const installOpen = useStore((s) => s.installOpen);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [threads, setThreads] = useState<Record<string, Note[]>>({});
  const [palette, setPalette] = useState(false);
  const boxRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const profile = profiles.find((item) => item.id === activeProfileId);
  const draft = drafts[siteId] ?? "";
  const messages = threads[siteId] ?? [];

  useEffect(() => {
    return registerInsert((text) => {
      setDrafts((current) => ({ ...current, [useStore.getState().activeSite]: text }));
      setLibraryOpen(false);
      setPopupOpen(false);
      setPalette(false);
      requestAnimationFrame(() => boxRef.current?.focus());
    });
  }, [setLibraryOpen, setPopupOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (editing || variablesFor || installOpen) return;
      if (event.altKey && !event.shiftKey && !event.metaKey && !event.ctrlKey && event.key.toLowerCase() === "p") {
        event.preventDefault();
        setPalette(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editing, variablesFor, installOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length, siteId]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const note: Note = {
      id: `${Date.now()}`,
      role: "user",
      content: text,
    };
    const aside: Note = {
      id: `${Date.now()}-n`,
      role: "note",
      content: `В настоящем окне ${siteName} этот текст ушёл бы модели. ContextFlow только собирает промпт.`,
    };
    setThreads((current) => ({ ...current, [siteId]: [...(current[siteId] ?? []), note, aside] }));
    setDrafts((current) => ({ ...current, [siteId]: "" }));
  };

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-ink">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <Lock className="size-3.5 text-faint" />
        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold">{siteName}</h1>
          <p className="truncate text-xs text-muted">
            {profile && settings.attachProfile ? `Контекст: ${profile.name}` : "Без контекста"}
          </p>
        </div>
      </div>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
        <div className="rounded-2xl border border-line bg-raised px-4 py-3 text-sm text-pretty text-muted">
          Расширение уже на этой странице. Нажмите <Kbd>/</Kbd> в поле или <Kbd>Alt+P</Kbd>, выберите промпт — профиль
          подклеится сам. Иконка справа вверху открывает быстрый список.
        </div>
        {messages.map((message) =>
          message.role === "user" ? (
            <div key={message.id} className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-md bg-amber px-4 py-3 text-sm whitespace-pre-wrap text-amber-ink">
                {message.content}
              </p>
            </div>
          ) : (
            <p key={message.id} className="text-center text-xs text-pretty text-faint">
              {message.content}
            </p>
          ),
        )}
        <div ref={endRef} />
      </div>
      <div className="relative border-t border-line px-3 py-3 sm:px-4">
        {palette && <Palette onClose={() => setPalette(false)} />}
        <div className="flex items-end gap-2">
          <button
            type="button"
            onClick={() => setPalette(true)}
            className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber font-mono text-lg font-semibold text-amber-ink"
            aria-label="Открыть палитру промптов"
          >
            /
          </button>
          <textarea
            ref={boxRef}
            value={draft}
            rows={2}
            placeholder={`Сообщение для ${siteName}. / — промпты`}
            onChange={(event) => setDrafts((current) => ({ ...current, [siteId]: event.target.value }))}
            onKeyDown={(event) => {
              if (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey) {
                const pos = event.currentTarget.selectionStart ?? 0;
                if (event.currentTarget.value.slice(0, pos).trim() === "") {
                  event.preventDefault();
                  setPalette(true);
                }
              }
              if (event.key === "Enter" && !event.shiftKey && !palette) {
                event.preventDefault();
                send();
              }
            }}
            className="max-h-40 min-h-11 flex-1 resize-none rounded-xl border border-line bg-panel px-3 py-2.5 text-sm outline-none placeholder:text-faint focus:border-amber"
          />
          <button
            type="button"
            onClick={send}
            disabled={!draft.trim()}
            className="grid size-11 shrink-0 place-items-center rounded-xl bg-fg text-ink disabled:opacity-40"
            aria-label="Отправить"
          >
            <Send className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Palette({ onClose }: { onClose: () => void }) {
  const prompts = useStore((s) => s.prompts);
  const folders = useStore((s) => s.folders);
  const insertPrompt = useInsertPrompt();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const filtered = useMemo(() => prompts.filter((prompt) => matchesQuery(prompt, query)), [prompts, query]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    setIndex(0);
  }, [query]);

  return (
    <div className="cf-rise absolute right-3 bottom-full left-3 z-30 mb-2 overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl sm:right-4 sm:left-4">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="font-mono text-amber">/</span>
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setIndex((value) => Math.min(value + 1, Math.max(filtered.length - 1, 0)));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setIndex((value) => Math.max(value - 1, 0));
            } else if (event.key === "Enter") {
              event.preventDefault();
              const prompt = filtered[index];
              if (prompt) insertPrompt(prompt);
            } else if (event.key === "Escape") {
              event.preventDefault();
              onClose();
            }
          }}
          placeholder="Найти промпт"
          className="h-9 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-faint"
        />
        <button type="button" onClick={onClose} className="text-xs text-faint">
          Esc
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {filtered.length === 0 && <p className="px-4 py-6 text-center text-sm text-muted">Нет такого промпта</p>}
        {filtered.map((prompt, itemIndex) => {
          const folder = folders.find((item) => item.id === prompt.folder);
          return (
            <button
              key={prompt.id}
              type="button"
              onMouseEnter={() => setIndex(itemIndex)}
              onClick={() => insertPrompt(prompt)}
              className={`flex w-full items-start gap-3 px-4 py-2.5 text-left ${itemIndex === index ? "bg-raised" : ""}`}
            >
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{prompt.name}</span>
                <span className="block truncate text-xs text-faint">{prompt.text}</span>
              </span>
              {folder && (
                <span className="shrink-0 text-xs" style={{ color: folder.color }}>
                  {folder.name}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Popup() {
  const prompts = useStore((s) => s.prompts);
  const folders = useStore((s) => s.folders);
  const profiles = useStore((s) => s.contextProfiles);
  const activeProfileId = useStore((s) => s.activeProfileId);
  const setActiveProfile = useStore((s) => s.setActiveProfile);
  const setPopupOpen = useStore((s) => s.setPopupOpen);
  const setLibraryOpen = useStore((s) => s.setLibraryOpen);
  const insertPrompt = useInsertPrompt();
  const [query, setQuery] = useState("");
  const filtered = prompts.filter((prompt) => matchesQuery(prompt, query)).slice(0, 8);
  const profile = profiles.find((item) => item.id === activeProfileId);

  return (
    <div className="cf-rise absolute top-full right-2 z-40 mt-1 flex max-h-[70dvh] w-[min(100vw-1rem,20rem)] flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl">
      <div className="border-b border-line px-3 py-3">
        <p className="text-xs text-amber">Быстрая вставка</p>
        <p className="text-sm text-muted">{profile ? profile.name : "Без контекста"}</p>
        <select
          value={activeProfileId ?? ""}
          onChange={(event) => setActiveProfile(event.target.value || null)}
          className="mt-2 h-10 w-full rounded-xl border border-line bg-ink px-2 text-sm outline-none"
        >
          <option value="">Без контекста</option>
          {profiles.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Поиск"
          className="mt-2 h-10 w-full rounded-xl border border-line bg-ink px-3 text-sm outline-none placeholder:text-faint"
        />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {filtered.map((prompt) => {
          const folder = folders.find((item) => item.id === prompt.folder);
          return (
            <button
              key={prompt.id}
              type="button"
              onClick={() => insertPrompt(prompt)}
              className="block w-full border-b border-line px-3 py-2.5 text-left hover:bg-raised"
            >
              <span className="block text-sm">{prompt.name}</span>
              <span className="block truncate text-xs text-faint">{folder ? folder.name : "Без папки"}</span>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => {
          setPopupOpen(false);
          setLibraryOpen(true);
        }}
        className="h-11 border-t border-line text-sm text-amber lg:hidden"
      >
        Открыть библиотеку
      </button>
      <button
        type="button"
        onClick={() => setPopupOpen(false)}
        className="hidden h-11 border-t border-line text-sm text-muted lg:block"
      >
        Библиотека открыта справа
      </button>
    </div>
  );
}
