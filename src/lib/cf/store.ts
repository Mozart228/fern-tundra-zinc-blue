import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  FOLDER_COLORS,
  type ContextProfile,
  type Folder,
  type PortableData,
  type Prompt,
  type Settings,
  type SiteId,
  defaultFolders,
  defaultProfiles,
  defaultPrompts,
  defaultSettings,
  isPortable,
  uid,
} from "./model";

export interface EditorTarget {
  kind: "prompt" | "profile";
  id: string | null;
}

interface CfState {
  contextProfiles: ContextProfile[];
  activeProfileId: string | null;
  prompts: Prompt[];
  folders: Folder[];
  settings: Settings;
  searchQuery: string;
  activeFolderId: string | null;
  tab: "prompts" | "profiles";
  activeSite: SiteId;
  popupOpen: boolean;
  libraryOpen: boolean;
  installOpen: boolean;
  editing: EditorTarget | null;
  variablesFor: string | null;
  variableValues: Record<string, string>;
  toast: string | null;
  setActiveProfile: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setActiveFolder: (id: string | null) => void;
  setTab: (tab: "prompts" | "profiles") => void;
  setActiveSite: (id: SiteId) => void;
  setPopupOpen: (open: boolean) => void;
  setLibraryOpen: (open: boolean) => void;
  setInstallOpen: (open: boolean) => void;
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  openPromptEditor: (id?: string) => void;
  openProfileEditor: (id?: string) => void;
  closeEditor: () => void;
  savePrompt: (data: Omit<Prompt, "id" | "createdAt">) => void;
  saveProfile: (data: Omit<ContextProfile, "id" | "createdAt">) => void;
  deletePrompt: (id: string) => void;
  deleteProfile: (id: string) => void;
  addFolder: (name: string) => void;
  deleteFolder: (id: string) => void;
  openVariables: (id: string) => void;
  setVariableValue: (key: string, value: string) => void;
  closeVariables: () => void;
  exportData: () => string;
  importData: (json: string) => boolean;
  showToast: (message: string) => void;
}

type Persisted = Pick<
  CfState,
  "contextProfiles" | "activeProfileId" | "prompts" | "folders" | "settings"
>;

let toastTimer: ReturnType<typeof setTimeout> | null = null;

export const useStore = create<CfState>()(
  persist(
    (set, get) => ({
      contextProfiles: defaultProfiles,
      activeProfileId: "profile-1",
      prompts: defaultPrompts,
      folders: defaultFolders,
      settings: defaultSettings,
      searchQuery: "",
      activeFolderId: null,
      tab: "prompts",
      activeSite: "chatgpt",
      popupOpen: false,
      libraryOpen: false,
      installOpen: false,
      editing: null,
      variablesFor: null,
      variableValues: {},
      toast: null,

      setActiveProfile: (id) => set({ activeProfileId: id }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setActiveFolder: (activeFolderId) => set({ activeFolderId }),
      setTab: (tab) => set({ tab }),
      setActiveSite: (activeSite) => set({ activeSite }),
      setPopupOpen: (popupOpen) => set({ popupOpen }),
      setLibraryOpen: (libraryOpen) => set({ libraryOpen }),
      setInstallOpen: (installOpen) => set({ installOpen }),
      setSetting: (key, value) =>
        set((state) => ({ settings: { ...state.settings, [key]: value } })),

      openPromptEditor: (id) => set({ editing: { kind: "prompt", id: id ?? null } }),
      openProfileEditor: (id) => set({ editing: { kind: "profile", id: id ?? null }, tab: "profiles" }),
      closeEditor: () => set({ editing: null }),

      savePrompt: (data) => {
        const editing = get().editing;
        if (editing?.kind === "prompt" && editing.id) {
          set((state) => ({
            prompts: state.prompts.map((prompt) =>
              prompt.id === editing.id ? { ...prompt, ...data } : prompt,
            ),
            editing: null,
          }));
          return;
        }
        set((state) => ({
          prompts: [{ ...data, id: uid("prompt"), createdAt: Date.now() }, ...state.prompts],
          editing: null,
          tab: "prompts",
        }));
      },

      saveProfile: (data) => {
        const editing = get().editing;
        if (editing?.kind === "profile" && editing.id) {
          set((state) => ({
            contextProfiles: state.contextProfiles.map((profile) =>
              profile.id === editing.id ? { ...profile, ...data } : profile,
            ),
            editing: null,
          }));
          return;
        }
        const id = uid("profile");
        set((state) => ({
          contextProfiles: [{ ...data, id, createdAt: Date.now() }, ...state.contextProfiles],
          activeProfileId: id,
          editing: null,
          tab: "profiles",
        }));
      },

      deletePrompt: (id) =>
        set((state) => ({
          prompts: state.prompts.filter((prompt) => prompt.id !== id),
          variablesFor: state.variablesFor === id ? null : state.variablesFor,
        })),

      deleteProfile: (id) =>
        set((state) => ({
          contextProfiles: state.contextProfiles.filter((profile) => profile.id !== id),
          activeProfileId: state.activeProfileId === id ? null : state.activeProfileId,
        })),

      addFolder: (name) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        set((state) => ({
          folders: [
            ...state.folders,
            {
              id: uid("folder"),
              name: trimmed,
              color: FOLDER_COLORS[state.folders.length % FOLDER_COLORS.length] ?? "#e4a04a",
            },
          ],
        }));
      },

      deleteFolder: (id) =>
        set((state) => ({
          folders: state.folders.filter((folder) => folder.id !== id),
          prompts: state.prompts.map((prompt) =>
            prompt.folder === id ? { ...prompt, folder: "" } : prompt,
          ),
          activeFolderId: state.activeFolderId === id ? null : state.activeFolderId,
        })),

      openVariables: (id) => set({ variablesFor: id, variableValues: {}, popupOpen: false }),
      setVariableValue: (key, value) =>
        set((state) => ({ variableValues: { ...state.variableValues, [key]: value } })),
      closeVariables: () => set({ variablesFor: null, variableValues: {} }),

      exportData: () => {
        const state = get();
        const data: PortableData = {
          version: "1.0",
          exportedAt: new Date().toISOString(),
          contextProfiles: state.contextProfiles,
          prompts: state.prompts,
          folders: state.folders,
          settings: state.settings,
        };
        return JSON.stringify(data, null, 2);
      },

      importData: (json) => {
        try {
          const parsed: unknown = JSON.parse(json);
          if (!isPortable(parsed)) return false;
          set((state) => ({
            prompts: parsed.prompts,
            contextProfiles: parsed.contextProfiles,
            folders: parsed.folders,
            settings: { ...state.settings, ...parsed.settings },
            activeProfileId: parsed.contextProfiles[0]?.id ?? null,
            activeFolderId: null,
          }));
          return true;
        } catch {
          return false;
        }
      },

      showToast: (message) => {
        if (toastTimer) clearTimeout(toastTimer);
        set({ toast: message });
        toastTimer = setTimeout(() => set({ toast: null }), 2200);
      },
    }),
    {
      name: "contextflow-storage",
      skipHydration: true,
      partialize: (state): Persisted => ({
        contextProfiles: state.contextProfiles,
        activeProfileId: state.activeProfileId,
        prompts: state.prompts,
        folders: state.folders,
        settings: state.settings,
      }),
      merge: (persisted, current) => {
        const saved = (persisted ?? {}) as Partial<Persisted>;
        return {
          ...current,
          ...saved,
          settings: { ...current.settings, ...saved.settings },
        };
      },
    },
  ),
);

type InsertFn = (text: string) => void;
let insertFn: InsertFn | null = null;

export function registerInsert(fn: InsertFn) {
  insertFn = fn;
  return () => {
    if (insertFn === fn) insertFn = null;
  };
}

export function requestInsert(text: string) {
  insertFn?.(text);
  return insertFn !== null;
}

