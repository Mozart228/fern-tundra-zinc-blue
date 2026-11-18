const profileEl = document.getElementById("profile");
const searchEl = document.getElementById("search");
const listEl = document.getElementById("list");
const varsEl = document.getElementById("vars");
const fieldsEl = document.getElementById("var-fields");
const statusEl = document.getElementById("status");

let state = CF.freshState();
let pending = null;

function setStatus(text) {
  statusEl.textContent = text;
}

function render() {
  const current = profileEl.value;
  profileEl.textContent = "";
  const empty = document.createElement("option");
  empty.value = "";
  empty.textContent = "Без контекста";
  profileEl.append(empty);
  for (const profile of state.contextProfiles) {
    const option = document.createElement("option");
    option.value = profile.id;
    option.textContent = profile.name;
    profileEl.append(option);
  }
  profileEl.value = state.contextProfiles.some((item) => item.id === (current || state.activeProfileId))
    ? current || state.activeProfileId
    : "";

  const q = searchEl.value.trim().toLowerCase();
  listEl.textContent = "";
  const items = state.prompts
    .filter((prompt) => {
      if (!q) return true;
      return (
        prompt.name.toLowerCase().includes(q) ||
        (prompt.slug || "").toLowerCase().includes(q) ||
        (prompt.tags || []).some((tag) => String(tag).toLowerCase().includes(q))
      );
    })
    .slice(0, 12);

  if (!items.length) {
    const note = document.createElement("p");
    note.className = "empty";
    note.textContent = "Ничего не нашлось";
    listEl.append(note);
    return;
  }

  for (const prompt of items) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "hit";
    const title = document.createElement("b");
    title.textContent = prompt.name;
    const sub = document.createElement("small");
    const folder = state.folders.find((item) => item.id === prompt.folder);
    sub.textContent = folder ? folder.name : "Без папки";
    button.append(title, sub);
    button.addEventListener("click", () => begin(prompt));
    listEl.append(button);
  }
}

function textFor(prompt, values) {
  const profile = state.settings?.attachProfile ? CF.activeProfile(state) : null;
  return CF.assemble(prompt.text, profile?.text || null, !!state.settings?.attachProfile, values);
}

async function deliver(text) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    await navigator.clipboard.writeText(text);
    setStatus("Скопировано");
    return;
  }
  chrome.tabs.sendMessage(tab.id, { type: "CF_INSERT", text }, async (response) => {
    if (chrome.runtime.lastError || !response?.ok) {
      try {
        await navigator.clipboard.writeText(text);
        setStatus("На этой вкладке нет поля — промпт скопирован");
      } catch {
        setStatus("Откройте чат нейросети");
      }
      return;
    }
    setStatus("Вставлено в поле чата");
    window.setTimeout(() => window.close(), 400);
  });
}

function begin(prompt) {
  const names = CF.extractVariables(prompt.text);
  if (!names.length) {
    void deliver(textFor(prompt, {}));
    return;
  }
  pending = prompt;
  fieldsEl.textContent = "";
  varsEl.hidden = false;
  listEl.hidden = true;
  names.forEach((name, index) => {
    const label = document.createElement("label");
    label.className = "lbl";
    label.textContent = name;
    const input = document.createElement("input");
    input.type = "text";
    if (index === 0) input.autofocus = true;
    label.append(input);
    fieldsEl.append(label);
  });
  fieldsEl.querySelector("input")?.focus();
}

profileEl.addEventListener("change", async () => {
  state = { ...state, activeProfileId: profileEl.value || null };
  await CF.save(state);
});

searchEl.addEventListener("input", render);

document.getElementById("vars-cancel").addEventListener("click", () => {
  pending = null;
  varsEl.hidden = true;
  listEl.hidden = false;
});

document.getElementById("vars-go").addEventListener("click", () => {
  if (!pending) return;
  const values = {};
  for (const label of fieldsEl.querySelectorAll("label")) {
    const key = label.childNodes[0]?.textContent || "";
    values[key.trim()] = label.querySelector("input")?.value || "";
  }
  void deliver(textFor(pending, values));
});

document.getElementById("open-panel").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const open = tab?.id
      ? chrome.sidePanel.open({ tabId: tab.id })
      : chrome.sidePanel.open({ windowId: tab?.windowId });
    Promise.resolve(open)
      .then(() => window.close())
      .catch(() => setStatus("Откройте панель через меню иконки"));
  });
});

CF.load().then((next) => {
  state = next;
  render();
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes[CF.KEY]?.newValue) {
    state = changes[CF.KEY].newValue;
    render();
  }
});
