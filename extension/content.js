(() => {
  if (globalThis.__cfBooted || typeof CF === "undefined") return;
  globalThis.__cfBooted = true;

  const host = document.createElement("div");
  host.id = "contextflow-host";
  const shadow = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = `
    :host { all: initial; }
    * { box-sizing: border-box; }
    .ui { font-family: "Segoe UI", system-ui, sans-serif; color: #ebe7df; font-size: 14px; line-height: 1.45; }
    button, input, textarea { font: inherit; color: inherit; }
    .back { position: fixed; inset: 0; pointer-events: auto; background: transparent; }
    .back.dim { background: rgba(14,17,22,.72); }
    .launch {
      position: fixed; left: 16px; bottom: 16px; pointer-events: auto;
      width: 44px; height: 44px; border: 0; border-radius: 12px;
      background: #e4a04a; color: #1a1206; font-weight: 700; font-size: 22px; cursor: pointer;
      box-shadow: 0 8px 24px rgba(0,0,0,.28);
    }
    .panel {
      position: fixed; pointer-events: auto; z-index: 2;
      width: min(420px, calc(100vw - 24px));
      max-height: min(360px, 60vh);
      display: flex; flex-direction: column;
      background: #161b22; border: 1px solid #2c3544; border-radius: 16px;
      box-shadow: 0 16px 48px rgba(0,0,0,.4); overflow: hidden;
    }
    .search { display: flex; gap: 8px; align-items: center; padding: 8px 12px; border-bottom: 1px solid #2c3544; }
    .search input { flex: 1; background: transparent; border: 0; outline: none; min-width: 0; }
    .search span { color: #e4a04a; font-family: ui-monospace, monospace; }
    .list { overflow: auto; }
    .row { display: block; width: 100%; text-align: left; background: transparent; border: 0; border-bottom: 1px solid #2c3544; padding: 10px 12px; cursor: pointer; }
    .row.on, .row:hover { background: #1e2530; }
    .name { display: block; font-weight: 600; }
    .hint { display: block; color: #8d95a8; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .empty { padding: 20px; text-align: center; color: #8d95a8; }
    .modal {
      position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%);
      width: min(480px, calc(100vw - 24px)); max-height: min(80vh, 640px);
      pointer-events: auto; z-index: 3; overflow: auto;
      background: #161b22; border: 1px solid #2c3544; border-radius: 16px; padding: 16px;
      box-shadow: 0 16px 48px rgba(0,0,0,.45);
    }
    .modal h2 { margin: 0 0 8px; font-size: 16px; }
    .modal p { margin: 0 0 12px; color: #8d95a8; font-size: 13px; }
    label { display: block; margin-bottom: 10px; color: #8d95a8; font-size: 13px; }
    input, textarea {
      width: 100%; margin-top: 4px; background: #0e1116; border: 1px solid #2c3544; border-radius: 10px;
      padding: 8px 10px; outline: none;
    }
    textarea { min-height: 72px; resize: vertical; }
    pre { white-space: pre-wrap; background: #0e1116; border: 1px solid #2c3544; border-radius: 10px; padding: 10px; max-height: 140px; overflow: auto; font-size: 12px; }
    .actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px; }
    .ghost, .go { height: 40px; border-radius: 10px; padding: 0 14px; cursor: pointer; }
    .ghost { background: transparent; border: 0; color: #8d95a8; }
    .go { background: #e4a04a; color: #1a1206; border: 0; font-weight: 700; }
  `;
  const root = document.createElement("div");
  root.className = "ui";
  shadow.append(style, root);
  document.documentElement.appendChild(host);

  const back = el("div", "back");
  const palette = el("div", "panel");
  const modal = el("div", "modal");
  const launch = el("button", "launch");
  launch.type = "button";
  launch.textContent = "/";
  launch.title = "ContextFlow — промпты";
  back.hidden = true;
  palette.hidden = true;
  modal.hidden = true;
  root.append(back, palette, modal, launch);

  let state = CF.freshState();
  let anchor = null;
  let values = {};
  let pending = null;
  let index = 0;

  const searchRow = el("div", "search");
  const slash = el("span");
  slash.textContent = "/";
  const search = document.createElement("input");
  search.placeholder = "Найти промпт";
  searchRow.append(slash, search);
  const list = el("div", "list");
  palette.append(searchRow, list);

  function el(tag, className) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  }

  function isComposer(node) {
    if (!(node instanceof Element)) return false;
    if (node.closest && host.contains(node)) return false;
    const tag = node.tagName;
    if (tag === "TEXTAREA") return true;
    if (tag === "INPUT" && /^(text|search|)$/.test(node.type || "text")) return true;
    if (node.getAttribute("contenteditable") === "true") return true;
    return node.getAttribute("role") === "textbox";
  }

  function fromEvent(event) {
    const path = event.composedPath ? event.composedPath() : [];
    if (path.includes(host)) return null;
    for (const node of path) {
      if (isComposer(node)) return node;
    }
    return null;
  }

  function visible(node) {
    const rect = node.getBoundingClientRect();
    return rect.width > 40 && rect.height > 16;
  }

  function findComposer() {
    const active = document.activeElement;
    if (isComposer(active) && visible(active)) return active;
    const selectors = [
      "#prompt-textarea",
      "textarea",
      "div.ProseMirror[contenteditable='true']",
      "[contenteditable='true'][role='textbox']",
      "div[contenteditable='true']",
    ];
    for (const selector of selectors) {
      const found = [...document.querySelectorAll(selector)].filter((node) => isComposer(node) && visible(node));
      if (found.length) return found[found.length - 1];
    }
    return null;
  }

  function insertText(target, text) {
    if (!target) return false;
    target.focus();
    const tag = target.tagName;
    if (tag === "TEXTAREA" || tag === "INPUT") {
      const proto = tag === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      const desc = Object.getOwnPropertyDescriptor(proto, "value");
      const start = target.selectionStart ?? target.value.length;
      const end = target.selectionEnd ?? start;
      const next = target.value.slice(0, start) + text + target.value.slice(end);
      if (desc?.set) desc.set.call(target, next);
      else target.value = next;
      target.dispatchEvent(new Event("input", { bubbles: true }));
      const pos = start + text.length;
      try { target.setSelectionRange(pos, pos); } catch { /* input types vary */ }
      return true;
    }
    const sel = window.getSelection();
    if (sel && !target.contains(sel.anchorNode)) {
      const range = document.createRange();
      range.selectNodeContents(target);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    const ok = document.execCommand("insertText", false, text);
    if (!ok) {
      target.textContent = `${target.textContent || ""}${text}`;
      target.dispatchEvent(new InputEvent("input", { bubbles: true, data: text, inputType: "insertText" }));
    }
    return true;
  }

  function placePalette() {
    const rect = anchor?.getBoundingClientRect?.();
    const width = Math.min(420, window.innerWidth - 24);
    palette.style.width = `${width}px`;
    if (!rect || rect.width < 2) {
      palette.style.left = "12px";
      palette.style.bottom = "72px";
      return;
    }
    const left = Math.max(12, Math.min(rect.left, window.innerWidth - width - 12));
    palette.style.left = `${left}px`;
    palette.style.bottom = `${Math.max(12, window.innerHeight - rect.top + 8)}px`;
  }

  function filtered() {
    const q = search.value.trim().toLowerCase();
    return state.prompts.filter((prompt) => {
      if (!q) return true;
      return (
        prompt.name.toLowerCase().includes(q) ||
        (prompt.slug || "").toLowerCase().includes(q) ||
        prompt.text.toLowerCase().includes(q) ||
        (prompt.tags || []).some((tag) => String(tag).toLowerCase().includes(q))
      );
    });
  }

  function renderPalette() {
    list.textContent = "";
    const items = filtered();
    if (!items.length) {
      const empty = el("div", "empty");
      empty.textContent = "Нет такого промпта";
      list.append(empty);
      return;
    }
    if (index >= items.length) index = 0;
    items.forEach((prompt, itemIndex) => {
      const row = el("button", itemIndex === index ? "row on" : "row");
      row.type = "button";
      const name = el("span", "name");
      name.textContent = prompt.slug ? `${prompt.name}  /${prompt.slug}` : prompt.name;
      const hint = el("span", "hint");
      hint.textContent = prompt.text.replace(/\s+/g, " ");
      row.append(name, hint);
      row.addEventListener("click", () => choose(prompt));
      list.append(row);
    });
  }

  function openPalette(node) {
    anchor = node || findComposer();
    search.value = "";
    index = 0;
    palette.hidden = false;
    modal.hidden = true;
    back.hidden = false;
    back.classList.remove("dim");
    placePalette();
    renderPalette();
    search.focus();
  }

  function closeAll() {
    palette.hidden = true;
    modal.hidden = true;
    back.hidden = true;
    pending = null;
    values = {};
  }

  function built(prompt, map) {
    const profile = state.settings?.attachProfile ? CF.activeProfile(state) : null;
    return CF.assemble(prompt.text, profile?.text || null, !!state.settings?.attachProfile, map);
  }

  function choose(prompt) {
    const vars = CF.extractVariables(prompt.text);
    if (!vars.length) {
      insertText(anchor || findComposer(), built(prompt, {}));
      closeAll();
      return;
    }
    pending = prompt;
    values = {};
    palette.hidden = true;
    openVars(vars);
  }

  function openVars(vars) {
    modal.textContent = "";
    modal.hidden = false;
    back.hidden = false;
    back.classList.add("dim");
    const title = document.createElement("h2");
    title.textContent = pending.name;
    const note = document.createElement("p");
    note.textContent = "Пустые переменные останутся в тексте.";
    modal.append(title, note);
    vars.forEach((name, itemIndex) => {
      const label = document.createElement("label");
      label.textContent = name;
      const field = name === "код" || name === "текст" || name === "схема" ? document.createElement("textarea") : document.createElement("input");
      if (itemIndex === 0) field.autofocus = true;
      field.addEventListener("input", () => {
        values[name] = field.value;
        preview.textContent = built(pending, values);
      });
      label.append(field);
      modal.append(label);
    });
    const preview = document.createElement("pre");
    preview.textContent = built(pending, values);
    const actions = el("div", "actions");
    const cancel = el("button", "ghost");
    cancel.type = "button";
    cancel.textContent = "Отмена";
    cancel.addEventListener("click", closeAll);
    const go = el("button", "go");
    go.type = "button";
    go.textContent = "Вставить";
    go.addEventListener("click", () => {
      insertText(anchor || findComposer(), built(pending, values));
      closeAll();
    });
    actions.append(cancel, go);
    modal.append(preview, actions);
    const first = modal.querySelector("input, textarea");
    first?.focus();
  }

  search.addEventListener("input", () => {
    index = 0;
    renderPalette();
  });
  search.addEventListener("keydown", (event) => {
    const items = filtered();
    if (event.key === "ArrowDown") {
      event.preventDefault();
      index = Math.min(index + 1, Math.max(items.length - 1, 0));
      renderPalette();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      index = Math.max(index - 1, 0);
      renderPalette();
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (items[index]) choose(items[index]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeAll();
    }
  });

  back.addEventListener("click", closeAll);
  launch.addEventListener("click", () => {
    if (!palette.hidden || !modal.hidden) closeAll();
    else openPalette(findComposer());
  });

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.altKey && !event.shiftKey && !event.metaKey && !event.ctrlKey && event.key.toLowerCase() === "p") {
        event.preventDefault();
        event.stopPropagation();
        openPalette(fromEvent(event) || findComposer());
        return;
      }
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey || !palette.hidden) return;
      const node = fromEvent(event);
      if (!node) return;
      let before = "";
      if (node.tagName === "TEXTAREA" || node.tagName === "INPUT") {
        before = node.value.slice(0, node.selectionStart ?? 0);
      } else {
        before = node.textContent || "";
      }
      if (before.trim() !== "") return;
      event.preventDefault();
      event.stopPropagation();
      openPalette(node);
    },
    true,
  );

  window.addEventListener("resize", () => {
    if (!palette.hidden) placePalette();
  });

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (!message || !message.type) return;
    if (message.type === "CF_OPEN_PALETTE") {
      openPalette(findComposer());
      sendResponse({ ok: true });
      return;
    }
    if (message.type === "CF_INSERT") {
      const node = anchor || findComposer();
      const ok = insertText(node, message.text || "");
      sendResponse({ ok });
    }
  });

  function applyState(next) {
    state = next || CF.freshState();
    launch.hidden = state.settings?.showLauncher === false;
    if (!palette.hidden) renderPalette();
  }

  CF.load().then(applyState);
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes[CF.KEY]) applyState(changes[CF.KEY].newValue);
  });
})();
