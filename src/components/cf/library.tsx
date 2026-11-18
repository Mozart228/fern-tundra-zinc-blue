import { useRef, useState } from "react";
import { Download, FolderPlus, Pencil, Plus, Search, Trash2, Upload, X, Zap } from "lucide-react";
import { matchesQuery } from "@/lib/cf/model";
import { useStore } from "@/lib/cf/store";
import { useInsertPrompt } from "./use-insert";

export function Library({ onClose }: { onClose?: () => void }) {
  const {
    contextProfiles,
    activeProfileId,
    prompts,
    folders,
    searchQuery,
    activeFolderId,
    tab,
    settings,
    setActiveProfile,
    setSearchQuery,
    setActiveFolder,
    setTab,
    setSetting,
    openPromptEditor,
    openProfileEditor,
    deletePrompt,
    deleteProfile,
    addFolder,
    deleteFolder,
    exportData,
    importData,
    showToast,
  } = useStore();
  const insertPrompt = useInsertPrompt();
  const fileRef = useRef<HTMLInputElement>(null);
  const [folderDraft, setFolderDraft] = useState("");
  const [addingFolder, setAddingFolder] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState("");

  const visible = prompts.filter(
    (prompt) => matchesQuery(prompt, searchQuery) && (!activeFolderId || prompt.folder === activeFolderId),
  );
  const activeProfile = contextProfiles.find((profile) => profile.id === activeProfileId);

  const download = () => {
    const blob = new Blob([exportData()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "contextflow-backup.json";
    link.click();
    URL.revokeObjectURL(url);
    showToast("Библиотека экспортирована");
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    const ok = importData(await file.text());
    showToast(ok ? "Библиотека загружена" : "Файл не похож на бэкап ContextFlow");
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-panel text-fg">
      <header className="flex items-center gap-2 border-b border-line px-3 py-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs tracking-wide text-amber uppercase">Боковая панель</p>
          <h2 className="text-base font-semibold">Библиотека</h2>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="grid size-11 place-items-center rounded-xl text-muted hover:bg-raised hover:text-fg"
            aria-label="Закрыть библиотеку"
          >
            <X className="size-5" />
          </button>
        )}
      </header>

      <div className="space-y-2 border-b border-line px-3 py-3">
        <label className="block text-xs text-muted" htmlFor={onClose ? "profile-mobile" : "profile-desk"}>
          Контекст-профиль
        </label>
        <div className="flex gap-2">
          <select
            id={onClose ? "profile-mobile" : "profile-desk"}
            value={activeProfileId ?? ""}
            onChange={(event) => setActiveProfile(event.target.value || null)}
            className="h-11 min-w-0 flex-1 rounded-xl border border-line bg-ink px-3 text-sm outline-none focus:border-amber"
          >
            <option value="">Без контекста</option>
            {contextProfiles.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            disabled={!activeProfile}
            onClick={() => activeProfile && openProfileEditor(activeProfile.id)}
            className="grid size-11 place-items-center rounded-xl border border-line bg-raised text-muted hover:text-fg disabled:opacity-40"
            aria-label="Изменить профиль"
          >
            <Pencil className="size-4" />
          </button>
        </div>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={settings.attachProfile}
            onChange={(event) => setSetting("attachProfile", event.target.checked)}
            className="size-4 accent-amber"
          />
          Подклеивать профиль к промпту
        </label>
      </div>

      <div className="flex border-b border-line">
        <button
          type="button"
          onClick={() => setTab("prompts")}
          className={`h-11 flex-1 text-sm font-medium ${tab === "prompts" ? "border-b-2 border-amber text-fg" : "text-muted"}`}
        >
          Промпты
        </button>
        <button
          type="button"
          onClick={() => setTab("profiles")}
          className={`h-11 flex-1 text-sm font-medium ${tab === "profiles" ? "border-b-2 border-amber text-fg" : "text-muted"}`}
        >
          Профили
        </button>
      </div>

      {tab === "prompts" ? (
        <>
          <div className="space-y-2 px-3 pt-3">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-faint" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Имя, слаг или тег"
                className="h-11 w-full rounded-xl border border-line bg-ink pr-3 pl-9 text-sm outline-none placeholder:text-faint focus:border-amber"
              />
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setActiveFolder(null)}
                className={`h-8 shrink-0 rounded-full px-3 text-xs ${!activeFolderId ? "bg-amber text-amber-ink" : "bg-raised text-muted"}`}
              >
                Все
              </button>
              {folders.map((folder) => (
                <span key={folder.id} className="flex shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveFolder(folder.id)}
                    className={`h-8 rounded-full px-3 text-xs ${activeFolderId === folder.id ? "text-amber-ink" : "bg-raised text-muted"}`}
                    style={activeFolderId === folder.id ? { background: folder.color } : undefined}
                  >
                    {folder.name}
                  </button>
                </span>
              ))}
              {addingFolder ? (
                <form
                  className="flex shrink-0 gap-1"
                  onSubmit={(event) => {
                    event.preventDefault();
                    addFolder(folderDraft);
                    setFolderDraft("");
                    setAddingFolder(false);
                  }}
                >
                  <input
                    value={folderDraft}
                    onChange={(event) => setFolderDraft(event.target.value)}
                    placeholder="Папка"
                    autoFocus
                    className="h-8 w-24 rounded-full border border-line bg-ink px-3 text-xs outline-none"
                  />
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setAddingFolder(true)}
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-raised text-muted"
                  aria-label="Новая папка"
                >
                  <FolderPlus className="size-3.5" />
                </button>
              )}
              {activeFolderId && (
                <button
                  type="button"
                  onClick={() => deleteFolder(activeFolderId)}
                  className="h-8 shrink-0 rounded-full px-3 text-xs text-danger"
                >
                  Удалить папку
                </button>
              )}
            </div>
          </div>
          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-2">
            {visible.length === 0 && (
              <p className="px-1 py-8 text-center text-sm text-pretty text-muted">Ничего не нашлось. Смените папку или запрос.</p>
            )}
            {visible.map((prompt) => {
              const folder = folders.find((item) => item.id === prompt.folder);
              return (
                <article key={prompt.id} className="rounded-xl border border-line bg-ink p-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-medium">{prompt.name}</h3>
                    {prompt.slug && <span className="font-mono text-xs text-faint">/{prompt.slug}</span>}
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-pretty text-muted">{prompt.text}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {folder && (
                      <span className="text-xs" style={{ color: folder.color }}>
                        {folder.name}
                      </span>
                    )}
                    {prompt.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full bg-raised px-2 py-0.5 text-xs text-faint">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => insertPrompt(prompt)}
                      className="inline-flex h-9 flex-1 items-center justify-center gap-1 rounded-lg bg-amber text-sm font-semibold text-amber-ink"
                    >
                      <Zap className="size-3.5" />
                      Вставить
                    </button>
                    <button
                      type="button"
                      onClick={() => openPromptEditor(prompt.id)}
                      className="grid size-9 place-items-center rounded-lg border border-line text-muted hover:text-fg"
                      aria-label={`Изменить ${prompt.name}`}
                    >
                      <Pencil className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deletePrompt(prompt.id);
                        showToast("Промпт удалён");
                      }}
                      className="grid size-9 place-items-center rounded-lg border border-line text-muted hover:text-danger"
                      aria-label={`Удалить ${prompt.name}`}
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      ) : (
        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-3">
          {contextProfiles.length === 0 && (
            <p className="py-8 text-center text-sm text-muted">Профилей пока нет.</p>
          )}
          {contextProfiles.map((profile) => (
            <article key={profile.id} className="rounded-xl border border-line bg-ink p-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-medium">{profile.name}</h3>
                {profile.id === activeProfileId && (
                  <span className="text-xs text-mint">активен</span>
                )}
              </div>
              <p className="mt-1 line-clamp-3 text-xs text-pretty text-muted">{profile.text}</p>
              <div className="mt-2 flex gap-1">
                <button
                  type="button"
                  onClick={() => setActiveProfile(profile.id)}
                  className="h-9 flex-1 rounded-lg border border-line text-sm text-fg hover:border-amber"
                >
                  Сделать активным
                </button>
                <button
                  type="button"
                  onClick={() => openProfileEditor(profile.id)}
                  className="grid size-9 place-items-center rounded-lg border border-line text-muted"
                  aria-label={`Изменить ${profile.name}`}
                >
                  <Pencil className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteProfile(profile.id);
                    showToast("Профиль удалён");
                  }}
                  className="grid size-9 place-items-center rounded-lg border border-line text-muted hover:text-danger"
                  aria-label={`Удалить ${profile.name}`}
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <footer className="space-y-2 border-t border-line p-3">
        <button
          type="button"
          onClick={() => (tab === "prompts" ? openPromptEditor() : openProfileEditor())}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-amber text-sm font-semibold text-amber-ink"
        >
          <Plus className="size-4" />
          {tab === "prompts" ? "Новый промпт" : "Новый профиль"}
        </button>
        {importOpen && (
          <textarea
            value={importText}
            onChange={(event) => setImportText(event.target.value)}
            placeholder="Вставьте JSON бэкапа"
            className="h-24 w-full resize-none rounded-xl border border-line bg-ink p-3 font-mono text-xs outline-none focus:border-amber"
          />
        )}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={download}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-line text-xs text-muted hover:text-fg"
          >
            <Download className="size-3.5" />
            Экспорт
          </button>
          {importOpen ? (
            <button
              type="button"
              onClick={() => {
                const ok = importData(importText);
                showToast(ok ? "Библиотека загружена" : "Неверный JSON");
                if (ok) {
                  setImportText("");
                  setImportOpen(false);
                }
              }}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-line text-xs text-fg"
            >
              Загрузить JSON
            </button>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-line text-xs text-muted hover:text-fg"
            >
              <Upload className="size-3.5" />
              Импорт
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => setImportOpen((open) => !open)}
          className="w-full text-center text-xs text-faint hover:text-muted"
        >
          {importOpen ? "Закрыть вставку JSON" : "Или вставить JSON вручную"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(event) => {
            void onFile(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      </footer>
    </div>
  );
}
