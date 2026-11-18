import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Studio } from "@/components/cf/studio";
import { InstallDialog, ProfileDialog, PromptDialog, Toast, VariablesDialog } from "@/components/cf/dialogs";
import { useStore } from "@/lib/cf/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const editing = useStore((s) => s.editing);
  useEffect(() => {
    void useStore.persist.rehydrate();
  }, []);

  return (
    <main className="h-dvh overflow-hidden">
      <Studio />
      {editing?.kind === "prompt" ? <PromptDialog key={editing.id ?? "new-prompt"} /> : null}
      {editing?.kind === "profile" ? <ProfileDialog key={editing.id ?? "new-profile"} /> : null}
      <VariablesDialog />
      <InstallDialog />
      <Toast />
    </main>
  );
}
