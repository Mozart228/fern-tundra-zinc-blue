const $ = (id) => document.getElementById(id);

let state = CF.freshState();
let tab = "prompts";
let folderId = "";
let editing = null;
let pending = null;
let writing = false;

function status(text) {
  $("status").textContent = text;
}

async function commit(next) {
  writing = true;
  state = next;
  await CF.save(state);
  writing = false;
  paint();
}

function paintProfile() {
  const select = $("profile");
  const keep = state.activeProfileId || "";
  select.textContent = "";
  const none = document.createElement("option");
  none.value = "";
  none.textContent = "Без контекста";
  select.append(none);
  for (const profile of state.contextProfiles) {
    const option = document.createElement("option");
    option.value = profile.id;
    option.textContent = profile.name;
    select.append(option);
  }
  select.value = state.contextProfiles.some((item) => item.id === keep) ? keep : "";
  $("attach").checked = !!state.settings?.attachProfile;
  $("launcher").checked = state.settings?.showLauncher !== false;
}

function paintFolders() {
  const box = $("folders");
  box.textContent = "";
  const all = document.createElement("button");
  all.type = "button";
  all.className = folderId ? "chip" : "chip on";
  all.textContent = "Все";
  all.addEventListener("click", () => {
    folderId = "";
    paint();
  });
  box.append(all);
  for (const folder of state.folders) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = folder.id === folderId ? "chip on" : "chip";
    chip.textContent = folder.name;
    if (folder.id === folderId && /^#[0-9a-fA-F]{6}$/.test(folder.color)) chip.style.background = folder.color;
    chip.addEventListener("click", () => {
      folderId = folder.id;
      paint();
    });
    box.append(chip);
  }
  const add = document.createElement("button");
  add.type = "button";
  add.className = "mini";
  add.textContent = "+";
  add.title = "Новая папка";
  add.addEventListener("click", async () => {
    const name = window.prompt("Название папки");
    if (!name?.trim()) return;
    const next = {
      ...state,
      folders: [...state.folders, { id: CF.uid("folder"), name: name.trim(), color: CF.COLORS[state.folders.length % CF.COLORS.length] }],
    };
    await commit(next);
  });
  box.append(add);
  if (folderId) {
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "mini";
    remove.textContent = "Удалить папку";
    remove.addEventListener("click", () => {
      commit({
        ...state,
        folders: state.folders.filter((folder) => folder.id !== folderId),
        prompts: state.prompts.map((prompt) => (prompt.folder === folderId ? { ...prompt, folder: "" } : prompt)),
      });
      folderId = "";
    });
    box.append(remove);
  }
}

function cardActions(prompt) {
  const actions = document.createElement("div");
  actions.className = "actions";
  const use = document.createElement("button");
  use.type = "button";
  use.className = "use";
  use.textContent = "Вставить";
  use.addEventListener("click", () => startInsert(prompt));
  const edit = document.createElement("button");
  edit.type = "button";
  edit.className = "icon";
  edit.textContent = "Изм.";
  edit.addEventListener("click", () => openEditor("prompt", prompt));
  const del = document.createElement("button");
  del.type = "button";
  del.className = "icon";
  del.textContent = "×";
  del.addEventListener("click", () => {
    commit({ ...state, prompts: state.prompts.filter((item) => item.id !== prompt.id) });
    status("Промпт удалён");
  });
  actions.append(use, edit, del);
  return actions;
}

function paintPrompts() {
  const q = $("search").value.trim().toLowerCase();
  const list = $("list");
  list.textContent = "";
  const items = state.prompts.filter((prompt) => {
    const folderOk = !folderId || prompt.folder === folderId;
    if (!folderOk) return false;
    if (!q) return true;
    return (
      prompt.name.toLowerCase().includes(q) ||
      (prompt.slug || "").toLowerCase().includes(q) ||
      prompt.text.toLowerCase().includes(q) ||
      (prompt.tags || []).some((tag) => String(tag).toLowerCase().includes(q))
    );
  });
  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Ничего не нашлось";
    list.append(empty);
    return;
  }
  for (const prompt of items) {
    const card = document.createElement("article");
    card.className = "card";
    const title = document.createElement("b");
    title.textContent = prompt.slug ? `${prompt.name} /${prompt.slug}` : prompt.name;
    const body = document.createElement("p");
    body.textContent = prompt.text;
    const meta = document.createElement("div");
    meta.className = "meta";
    const folder = state.folders.find((item) => item.id === prompt.folder);
    meta.textContent = folder ? folder.name : "Без папки";
    card.append(title, body, meta, cardActions(prompt));
    list.append(card);
  }
}

function paintProfiles() {
  const list = $("plist");
  list.textContent = "";
  if (!state.contextProfiles.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Профилей пока нет";
    list.append(empty);
    return;
  }
  for (const profile of state.contextProfiles) {
    const card = document.createElement("article");
    card.className = "card";
    const title = document.createElement("b");
    title.textContent = profile.name;
    const body = document.createElement("p");
    body.textContent = profile.text;
    const actions = document.createElement("div");
    actions.className = "actions";
    const use = document.createElement("button");
    use.type = "button";
    use.className = "use";
    use.textContent = profile.id === state.activeProfileId ? "Активен" : "Сделать активным";
    use.addEventListener("click", () => commit({ ...state, activeProfileId: profile.id }));
    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "icon";
    edit.textContent = "Изм.";
    edit.addEventListener("click", () => openEditor("profile", profile));
    const del = document.createElement("button");
    del.type = "button";
    del.className = "icon";
    del.textContent = "×";
    del.addEventListener("click", () => {
      commit({
        ...state,
        contextProfiles: state.contextProfiles.filter((item) => item.id !== profile.id),
        activeProfileId: state.activeProfileId === profile.id ? null : state.activeProfileId,
      });
      status("Профиль удалён");
    });
    actions.append(use, edit, del);
    card.append(title, body, actions);
    list.append(card);
  }
}

function paint() {
  paintProfile();
  $("tab-prompts").classList.toggle("on", tab === "prompts");
  $("tab-profiles").classList.toggle("on", tab === "profiles");
  $("prompts-view").hidden = tab !== "prompts";
  $("profiles-view").hidden = tab !== "profiles";
  $("create").textContent = tab === "prompts" ? "Новый промпт" : "Новый профиль";
  if (tab === "prompts") {
    paintFolders();
    paintPrompts();
  } else paintProfiles();
}

function fillFolders(selected) {
  const select = $("f-folder");
  select.textContent = "";
  const none = document.createElement("option");
  none.value = "";
  none.textContent = "Без папки";
  select.append(none);
  for (const folder of state.folders) {
    const option = document.createElement("option");
    option.value = folder.id;
    option.textContent = folder.name;
    select.append(option);
  }
  select.value = selected || "";
}

function openEditor(kind, entity) {
  editing = { kind, id: entity?.id || null };
  $("editor-title").textContent = kind === "prompt" ? (entity ? "Редактировать промпт" : "Новый промпт") : entity ? "Редактировать профиль" : "Новый профиль";
  $("prompt-only").hidden = kind !== "prompt";
  $("f-name").value = entity?.name || "";
  $("f-text").value = entity?.text || "";
  $("f-slug").value = entity?.slug || "";
  $("f-tags").value = (entity?.tags || []).join(", ");
  fillFolders(entity?.folder || "");
  $("editor").showModal();
  $("f-name").focus();
}

function assembled(prompt, values) {
  const profile = state.settings?.attachProfile ? CF.activeProfile(state) : null;
  return CF.assemble(prompt.text, profile?.text || null, !!state.settings?.attachProfile, values);
}

function readVarValues() {
  const values = {};
  for (const label of $("var-fields").querySelectorAll("label")) {
    const key = label.dataset.key || "";
    values[key] = label.querySelector("input, textarea")?.value || "";
  }
  return values;
}

function startInsert(prompt) {
  const names = CF.extractVariables(prompt.text);
  if (!names.length) {
    void deliver(assembled(prompt, {}));
    return;
  }
  pending = prompt;
  const box = $("var-fields");
  box.textContent = "";
  for (const name of names) {
    const label = document.createElement("label");
    label.className = "lbl";
    label.dataset.key = name;
    label.append(document.createTextNode(name));
    const field = name === "код" || name === "текст" || name === "схема" ? document.createElement("textarea") : document.createElement("input");
    field.addEventListener("input", () => {
      $("var-preview").textContent = assembled(prompt, readVarValues());
    });
    label.append(field);
    box.append(label);
  }
  $("vars-title").textContent = prompt.name;
  $("var-preview").textContent = assembled(prompt, {});
  $("vars").showModal();
}

async function deliver(text) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    await navigator.clipboard.writeText(text);
    status("Скопировано");
    return;
  }
  chrome.tabs.sendMessage(tab.id, { type: "CF_INSERT", text }, async (response) => {
    if (chrome.runtime.lastError || !response?.ok) {
      try {
        await navigator.clipboard.writeText(text);
        status("Поле чата не найдено — промпт скопирован");
      } catch {
        status("Откройте вкладку с чатом");
      }
      return;
    }
    status("Вставлено в поле чата");
  });
}

$("tab-prompts").addEventListener("click", () => {
  tab = "prompts";
  paint();
});
$("tab-profiles").addEventListener("click", () => {
  tab = "profiles";
  paint();
});
$("search").addEventListener("input", paintPrompts);
$("profile").addEventListener("change", () => {
  commit({ ...state, activeProfileId: $("profile").value || null });
});
$("attach").addEventListener("change", () => {
  commit({ ...state, settings: { ...state.settings, attachProfile: $("attach").checked } });
});
$("launcher").addEventListener("change", () => {
  commit({ ...state, settings: { ...state.settings, showLauncher: $("launcher").checked } });
});
$("edit-profile").addEventListener("click", () => {
  const profile = CF.activeProfile(state);
  if (profile) openEditor("profile", profile);
});
$("create").addEventListener("click", () => openEditor(tab === "prompts" ? "prompt" : "profile", null));
$("editor-cancel").addEventListener("click", () => $("editor").close());
$("editor-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = $("f-name").value.trim();
  const text = $("f-text").value.trim();
  if (!name || !text) return;
  if (editing?.kind === "profile") {
    const profiles = editing.id
      ? state.contextProfiles.map((item) => (item.id === editing.id ? { ...item, name, text } : item))
      : [{ id: CF.uid("profile"), name, text, createdAt: Date.now() }, ...state.contextProfiles];
    const activeProfileId = editing.id ? state.activeProfileId : profiles[0].id;
    commit({ ...state, contextProfiles: profiles, activeProfileId });
  } else {
    const data = {
      name,
      text,
      folder: $("f-folder").value,
      slug: $("f-slug").value.trim().toLowerCase().replace(/\s+/g, "-"),
      tags: $("f-tags").value.split(",").map((tag) => tag.trim()).filter(Boolean),
    };
    const prompts = editing?.id
      ? state.prompts.map((item) => (item.id === editing.id ? { ...item, ...data } : item))
      : [{ ...data, id: CF.uid("prompt"), createdAt: Date.now() }, ...state.prompts];
    commit({ ...state, prompts });
  }
  $("editor").close();
  status("Сохранено");
});

$("vars-cancel").addEventListener("click", () => $("vars").close());
$("vars-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!pending) return;
  void deliver(assembled(pending, readVarValues()));
  $("vars").close();
  pending = null;
});

$("export").addEventListener("click", () => {
  const payload = {
    version: "1.0",
    exportedAt: new Date().toISOString(),
    contextProfiles: state.contextProfiles,
    prompts: state.prompts,
    folders: state.folders,
    settings: state.settings,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "contextflow-backup.json";
  link.click();
  URL.revokeObjectURL(link.href);
  status("Экспорт готов");
});

async function takeImport(json) {
  try {
    const data = CF.parseImport(json);
    if (!data) {
      status("Неверный файл");
      return;
    }
    await commit({
      ...state,
      prompts: data.prompts,
      contextProfiles: data.contextProfiles,
      folders: data.folders,
      settings: { ...state.settings, ...(data.settings || {}) },
      activeProfileId: data.contextProfiles[0]?.id || null,
    });
    status("Библиотека загружена");
  } catch {
    status("Не удалось прочитать JSON");
  }
}

$("import").addEventListener("click", () => $("file").click());
$("file").addEventListener("change", async () => {
  const file = $("file").files?.[0];
  $("file").value = "";
  if (!file) return;
  await takeImport(await file.text());
});
$("paste").addEventListener("click", () => {
  $("json-text").value = "";
  $("json").showModal();
});
$("json-cancel").addEventListener("click", () => $("json").close());
$("json-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  await takeImport($("json-text").value);
  $("json").close();
});

CF.load().then((next) => {
  state = next;
  paint();
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (writing || area !== "local" || !changes[CF.KEY]?.newValue) return;
  state = changes[CF.KEY].newValue;
  paint();
});
