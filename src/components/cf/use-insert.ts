import { assemble, extractVariables, type Prompt } from "@/lib/cf/model";
import { requestInsert, useStore } from "@/lib/cf/store";

export function useInsertPrompt() {
  const openVariables = useStore((s) => s.openVariables);
  const showToast = useStore((s) => s.showToast);
  const setPopupOpen = useStore((s) => s.setPopupOpen);

  return (prompt: Prompt) => {
    setPopupOpen(false);
    if (extractVariables(prompt.text).length > 0) {
      openVariables(prompt.id);
      return;
    }
    const state = useStore.getState();
    const profile = state.contextProfiles.find((item) => item.id === state.activeProfileId);
    const text = assemble(prompt.text, profile?.text ?? null, state.settings.attachProfile, {});
    const inserted = requestInsert(text);
    if (!inserted) {
      void navigator.clipboard.writeText(text);
      showToast("Промпт скопирован");
      return;
    }
    showToast("Промпт вставлен в поле");
  };
}
