importScripts("shared.js");

chrome.storage.local.get(CF.KEY, (res) => {
  if (!res[CF.KEY]) chrome.storage.local.set({ [CF.KEY]: CF.freshState() });
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false }).catch(() => {});
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "cf-insert-profile",
      title: "Вставить контекст-профиль ContextFlow",
      contexts: ["editable"],
    });
  });
});

chrome.commands.onCommand.addListener((command) => {
  if (command !== "open-palette") return;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab?.id) return;
    chrome.tabs.sendMessage(tab.id, { type: "CF_OPEN_PALETTE" }, () => void chrome.runtime.lastError);
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "cf-insert-profile" || !tab?.id) return;
  CF.load().then((state) => {
    const profile = CF.activeProfile(state);
    if (!profile) return;
    chrome.tabs.sendMessage(tab.id, { type: "CF_INSERT", text: profile.text }, () => void chrome.runtime.lastError);
  });
});
