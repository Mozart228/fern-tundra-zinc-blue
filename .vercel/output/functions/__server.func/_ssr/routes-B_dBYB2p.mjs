import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Trash2, c as Plus, d as Library, f as FolderPlus, l as Pencil, n as X, o as Send, p as Download, r as Upload, s as Search, t as Zap, u as Lock } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B_dBYB2p.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SITES = [
	{
		id: "chatgpt",
		name: "ChatGPT",
		host: "chatgpt.com"
	},
	{
		id: "claude",
		name: "Claude",
		host: "claude.ai"
	},
	{
		id: "deepseek",
		name: "DeepSeek",
		host: "chat.deepseek.com"
	},
	{
		id: "qwen",
		name: "Qwen",
		host: "chat.qwen.ai"
	},
	{
		id: "gigachat",
		name: "GigaChat",
		host: "giga.chat"
	},
	{
		id: "gemini",
		name: "Gemini",
		host: "gemini.google.com"
	}
];
var FOLDER_COLORS = [
	"#5b8def",
	"#3dbe8b",
	"#b08cff",
	"#e4a04a",
	"#e26d6d",
	"#e38bb4"
];
var defaultFolders = [
	{
		id: "folder-1",
		name: "Разработка",
		color: "#5b8def"
	},
	{
		id: "folder-2",
		name: "Копирайтинг",
		color: "#3dbe8b"
	},
	{
		id: "folder-3",
		name: "Аналитика",
		color: "#b08cff"
	},
	{
		id: "folder-4",
		name: "Общее",
		color: "#e4a04a"
	}
];
var defaultProfiles = [{
	id: "profile-1",
	name: "Python-бэкенд",
	text: `Ты — senior Python-разработчик с 10+ годами опыта. Твой стек: Python 3.12, FastAPI, SQLAlchemy, PostgreSQL, Redis, Docker.

Правила:
- Пиши код в соответствии с PEP 8
- Используй type hints везде
- Предпочитай async/await
- Давай краткие пояснения к коду
- Предлагай тесты для критичных функций
- Отвечай на русском языке`,
	createdAt: 1
}, {
	id: "profile-2",
	name: "Посты для Telegram",
	text: `Ты — опытный SMM-специалист и копирайтер, пишущий для Telegram-каналов.

Правила:
- Пиши живым, разговорным языком
- Используй эмодзи умеренно (2-4 на пост)
- Структурируй текст: заголовок → тело → CTA
- Длина поста: 200-500 символов
- Избегай канцеляризмов и штампов
- Добавляй хэштеги в конце (3-5 штук)
- Тон: дружелюбный, экспертный`,
	createdAt: 2
}];
var defaultPrompts = [
	{
		id: "prompt-1",
		name: "Рефакторинг кода",
		folder: "folder-1",
		slug: "refactor",
		text: "Проведи рефакторинг следующего кода. Улучши читаемость, производительность и следование best practices. Код:\n\n```\n{{код}}\n```\n\nУкажи, что именно изменилось и почему.",
		tags: [
			"код",
			"рефакторинг",
			"улучшение"
		],
		createdAt: 12
	},
	{
		id: "prompt-2",
		name: "Написание unit-тестов",
		folder: "folder-1",
		slug: "tests",
		text: "Напиши unit-тесты для следующего кода, используя {{фреймворк}}. Покрой основные сценарии, edge cases и ошибки.\n\nКод:\n```\n{{код}}\n```",
		tags: [
			"тесты",
			"код",
			"качество"
		],
		createdAt: 11
	},
	{
		id: "prompt-3",
		name: "Ревью кода",
		folder: "folder-1",
		slug: "review",
		text: "Проведи code review следующего фрагмента. Оцени:\n1. Корректность логики\n2. Потенциальные баги\n3. Безопасность\n4. Производительность\n5. Читаемость\n\nКод:\n```\n{{код}}\n```",
		tags: [
			"ревью",
			"код",
			"безопасность"
		],
		createdAt: 10
	},
	{
		id: "prompt-4",
		name: "Создание API endpoint",
		folder: "folder-1",
		slug: "api",
		text: "Создай REST API endpoint для {{описание}}. Используй {{фреймворк}}. Включи:\n- Валидацию входных данных\n- Обработку ошибок\n- Документацию (Swagger/OpenAPI)\n- Примеры запросов и ответов",
		tags: [
			"api",
			"backend",
			"endpoint"
		],
		createdAt: 9
	},
	{
		id: "prompt-5",
		name: "Пост-анонс",
		folder: "folder-2",
		slug: "announce",
		text: "Напиши пост-анонс для Telegram-канала о {{событие}}. Тон: {{тон}}. Целевая аудитория: {{аудитория}}. Включи CTA и хэштеги.",
		tags: [
			"пост",
			"анонс",
			"telegram"
		],
		createdAt: 8
	},
	{
		id: "prompt-6",
		name: "Рерайт текста",
		folder: "folder-2",
		slug: "rewrite",
		text: "Перепиши следующий текст, сохранив смысл, но полностью изменив формулировки. Стиль: {{стиль}}. Аудитория: {{аудитория}}.\n\nОригинал:\n{{текст}}",
		tags: [
			"рерайт",
			"копирайтинг",
			"текст"
		],
		createdAt: 7
	},
	{
		id: "prompt-7",
		name: "Заголовки для статьи",
		folder: "folder-2",
		slug: "headlines",
		text: "Предложи 10 вариантов заголовков для статьи на тему \"{{тема}}\". Для каждого укажи тип заголовка (вопрос, список, how-to) и оцени цепляющую силу от 1 до 10.",
		tags: [
			"заголовки",
			"статья",
			"контент"
		],
		createdAt: 6
	},
	{
		id: "prompt-8",
		name: "SWOT-анализ",
		folder: "folder-3",
		slug: "swot",
		text: "Проведи SWOT-анализ для {{объект}}. Контекст: {{контекст}}. Для каждого элемента приведи 3-5 пунктов с кратким пояснением.",
		tags: [
			"анализ",
			"стратегия",
			"бизнес"
		],
		createdAt: 5
	},
	{
		id: "prompt-9",
		name: "Анализ конкурентов",
		folder: "folder-3",
		slug: "competitors",
		text: "Проведи анализ конкурентов для {{продукт}}. Рынок: {{рынок}}. Для каждого конкурента оцени:\n- Сильные стороны\n- Слабые стороны\n- Ценообразование\n- Уникальное предложение",
		tags: [
			"конкуренты",
			"анализ",
			"рынок"
		],
		createdAt: 4
	},
	{
		id: "prompt-10",
		name: "Объясни простыми словами",
		folder: "folder-4",
		slug: "explain",
		text: "Объясни простыми словами, как для {{аудитория}}, что такое {{концепция}}. Используй аналогии из повседневной жизни. Максимум 200 слов.",
		tags: ["объяснение", "обучение"],
		createdAt: 3
	},
	{
		id: "prompt-11",
		name: "Составить план",
		folder: "folder-4",
		slug: "plan",
		text: "Составь детальный план действий для {{задача}}. Дедлайн: {{дедлайн}}. Ресурсы: {{ресурсы}}. Включи:\n- Этапы с дедлайнами\n- Необходимые действия\n- Потенциальные риски\n- Критерии успеха",
		tags: ["план", "задачи"],
		createdAt: 2
	},
	{
		id: "prompt-12",
		name: "SQL-запрос",
		folder: "folder-1",
		slug: "sql",
		text: "Напиши SQL-запрос для {{задача}}. Схема таблицы:\n```\n{{схема}}\n```\nОптимизируй для производительности. Добавь комментарии к сложным частям.",
		tags: ["sql", "база данных"],
		createdAt: 1
	}
];
var defaultSettings = {
	attachProfile: true,
	showLauncher: true
};
var VAR_RE = /\{\{\s*([^{}]+?)\s*\}\}/g;
function extractVariables(text) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const match of text.matchAll(VAR_RE)) {
		const key = match[1]?.trim();
		if (!key || seen.has(key)) continue;
		seen.add(key);
		out.push(key);
	}
	return out;
}
function substitute(text, values) {
	return text.replace(VAR_RE, (_, raw) => {
		const key = raw.trim();
		const value = values[key];
		return value ? value : `{{${key}}}`;
	});
}
function assemble(promptText, profileText, attach, values) {
	const body = substitute(promptText, values);
	if (attach && profileText?.trim()) return `${profileText.trim()}\n\n${body}`;
	return body;
}
function uid(prefix) {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
function matchesQuery(prompt, query) {
	const q = query.trim().toLowerCase();
	if (!q) return true;
	return prompt.name.toLowerCase().includes(q) || prompt.slug.toLowerCase().includes(q) || prompt.text.toLowerCase().includes(q) || prompt.tags.some((tag) => tag.toLowerCase().includes(q));
}
function isPortable(value) {
	if (!value || typeof value !== "object") return false;
	const data = value;
	return Array.isArray(data.prompts) && Array.isArray(data.contextProfiles) && Array.isArray(data.folders);
}
var toastTimer = null;
var useStore = create()(persist((set, get) => ({
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
	setSetting: (key, value) => set((state) => ({ settings: {
		...state.settings,
		[key]: value
	} })),
	openPromptEditor: (id) => set({ editing: {
		kind: "prompt",
		id: id ?? null
	} }),
	openProfileEditor: (id) => set({
		editing: {
			kind: "profile",
			id: id ?? null
		},
		tab: "profiles"
	}),
	closeEditor: () => set({ editing: null }),
	savePrompt: (data) => {
		const editing = get().editing;
		if (editing?.kind === "prompt" && editing.id) {
			set((state) => ({
				prompts: state.prompts.map((prompt) => prompt.id === editing.id ? {
					...prompt,
					...data
				} : prompt),
				editing: null
			}));
			return;
		}
		set((state) => ({
			prompts: [{
				...data,
				id: uid("prompt"),
				createdAt: Date.now()
			}, ...state.prompts],
			editing: null,
			tab: "prompts"
		}));
	},
	saveProfile: (data) => {
		const editing = get().editing;
		if (editing?.kind === "profile" && editing.id) {
			set((state) => ({
				contextProfiles: state.contextProfiles.map((profile) => profile.id === editing.id ? {
					...profile,
					...data
				} : profile),
				editing: null
			}));
			return;
		}
		const id = uid("profile");
		set((state) => ({
			contextProfiles: [{
				...data,
				id,
				createdAt: Date.now()
			}, ...state.contextProfiles],
			activeProfileId: id,
			editing: null,
			tab: "profiles"
		}));
	},
	deletePrompt: (id) => set((state) => ({
		prompts: state.prompts.filter((prompt) => prompt.id !== id),
		variablesFor: state.variablesFor === id ? null : state.variablesFor
	})),
	deleteProfile: (id) => set((state) => ({
		contextProfiles: state.contextProfiles.filter((profile) => profile.id !== id),
		activeProfileId: state.activeProfileId === id ? null : state.activeProfileId
	})),
	addFolder: (name) => {
		const trimmed = name.trim();
		if (!trimmed) return;
		set((state) => ({ folders: [...state.folders, {
			id: uid("folder"),
			name: trimmed,
			color: FOLDER_COLORS[state.folders.length % FOLDER_COLORS.length] ?? "#e4a04a"
		}] }));
	},
	deleteFolder: (id) => set((state) => ({
		folders: state.folders.filter((folder) => folder.id !== id),
		prompts: state.prompts.map((prompt) => prompt.folder === id ? {
			...prompt,
			folder: ""
		} : prompt),
		activeFolderId: state.activeFolderId === id ? null : state.activeFolderId
	})),
	openVariables: (id) => set({
		variablesFor: id,
		variableValues: {},
		popupOpen: false
	}),
	setVariableValue: (key, value) => set((state) => ({ variableValues: {
		...state.variableValues,
		[key]: value
	} })),
	closeVariables: () => set({
		variablesFor: null,
		variableValues: {}
	}),
	exportData: () => {
		const state = get();
		const data = {
			version: "1.0",
			exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
			contextProfiles: state.contextProfiles,
			prompts: state.prompts,
			folders: state.folders,
			settings: state.settings
		};
		return JSON.stringify(data, null, 2);
	},
	importData: (json) => {
		try {
			const parsed = JSON.parse(json);
			if (!isPortable(parsed)) return false;
			set((state) => ({
				prompts: parsed.prompts,
				contextProfiles: parsed.contextProfiles,
				folders: parsed.folders,
				settings: {
					...state.settings,
					...parsed.settings
				},
				activeProfileId: parsed.contextProfiles[0]?.id ?? null,
				activeFolderId: null
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
	}
}), {
	name: "contextflow-storage",
	skipHydration: true,
	partialize: (state) => ({
		contextProfiles: state.contextProfiles,
		activeProfileId: state.activeProfileId,
		prompts: state.prompts,
		folders: state.folders,
		settings: state.settings
	}),
	merge: (persisted, current) => {
		const saved = persisted ?? {};
		return {
			...current,
			...saved,
			settings: {
				...current.settings,
				...saved.settings
			}
		};
	}
}));
var insertFn = null;
function registerInsert(fn) {
	insertFn = fn;
	return () => {
		if (insertFn === fn) insertFn = null;
	};
}
function requestInsert(text) {
	insertFn?.(text);
	return insertFn !== null;
}
function Mark({ className = "size-5" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "32",
			height: "32",
			rx: "7",
			className: "fill-ink"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M21.2 5.6 10.8 26.4",
			className: "stroke-amber",
			strokeWidth: "5",
			strokeLinecap: "round",
			fill: "none"
		})]
	});
}
function Kbd({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
		className: "rounded-md border border-line bg-raised px-1.5 py-0.5 font-mono text-xs text-muted",
		children
	});
}
function useInsertPrompt() {
	const openVariables = useStore((s) => s.openVariables);
	const showToast = useStore((s) => s.showToast);
	const setPopupOpen = useStore((s) => s.setPopupOpen);
	return (prompt) => {
		setPopupOpen(false);
		if (extractVariables(prompt.text).length > 0) {
			openVariables(prompt.id);
			return;
		}
		const state = useStore.getState();
		const profile = state.contextProfiles.find((item) => item.id === state.activeProfileId);
		const text = assemble(prompt.text, profile?.text ?? null, state.settings.attachProfile, {});
		if (!requestInsert(text)) {
			navigator.clipboard.writeText(text);
			showToast("Промпт скопирован");
			return;
		}
		showToast("Промпт вставлен в поле");
	};
}
function Library$1({ onClose }) {
	const { contextProfiles, activeProfileId, prompts, folders, searchQuery, activeFolderId, tab, settings, setActiveProfile, setSearchQuery, setActiveFolder, setTab, setSetting, openPromptEditor, openProfileEditor, deletePrompt, deleteProfile, addFolder, deleteFolder, exportData, importData, showToast } = useStore();
	const insertPrompt = useInsertPrompt();
	const fileRef = (0, import_react.useRef)(null);
	const [folderDraft, setFolderDraft] = (0, import_react.useState)("");
	const [addingFolder, setAddingFolder] = (0, import_react.useState)(false);
	const [importOpen, setImportOpen] = (0, import_react.useState)(false);
	const [importText, setImportText] = (0, import_react.useState)("");
	const visible = prompts.filter((prompt) => matchesQuery(prompt, searchQuery) && (!activeFolderId || prompt.folder === activeFolderId));
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
	const onFile = async (file) => {
		if (!file) return;
		const ok = importData(await file.text());
		showToast(ok ? "Библиотека загружена" : "Файл не похож на бэкап ContextFlow");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col bg-panel text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-2 border-b border-line px-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-wide text-amber uppercase",
						children: "Боковая панель"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: "Библиотека"
					})]
				}), onClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "grid size-11 place-items-center rounded-xl text-muted hover:bg-raised hover:text-fg",
					"aria-label": "Закрыть библиотеку",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 border-b border-line px-3 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs text-muted",
						htmlFor: onClose ? "profile-mobile" : "profile-desk",
						children: "Контекст-профиль"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: onClose ? "profile-mobile" : "profile-desk",
							value: activeProfileId ?? "",
							onChange: (event) => setActiveProfile(event.target.value || null),
							className: "h-11 min-w-0 flex-1 rounded-xl border border-line bg-ink px-3 text-sm outline-none focus:border-amber",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Без контекста"
							}), contextProfiles.map((profile) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: profile.id,
								children: profile.name
							}, profile.id))]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !activeProfile,
							onClick: () => activeProfile && openProfileEditor(activeProfile.id),
							className: "grid size-11 place-items-center rounded-xl border border-line bg-raised text-muted hover:text-fg disabled:opacity-40",
							"aria-label": "Изменить профиль",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: settings.attachProfile,
							onChange: (event) => setSetting("attachProfile", event.target.checked),
							className: "size-4 accent-amber"
						}), "Подклеивать профиль к промпту"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex border-b border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab("prompts"),
					className: `h-11 flex-1 text-sm font-medium ${tab === "prompts" ? "border-b-2 border-amber text-fg" : "text-muted"}`,
					children: "Промпты"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab("profiles"),
					className: `h-11 flex-1 text-sm font-medium ${tab === "profiles" ? "border-b-2 border-amber text-fg" : "text-muted"}`,
					children: "Профили"
				})]
			}),
			tab === "prompts" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 px-3 pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-faint" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: searchQuery,
						onChange: (event) => setSearchQuery(event.target.value),
						placeholder: "Имя, слаг или тег",
						className: "h-11 w-full rounded-xl border border-line bg-ink pr-3 pl-9 text-sm outline-none placeholder:text-faint focus:border-amber"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1.5 overflow-x-auto pb-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setActiveFolder(null),
							className: `h-8 shrink-0 rounded-full px-3 text-xs ${!activeFolderId ? "bg-amber text-amber-ink" : "bg-raised text-muted"}`,
							children: "Все"
						}),
						folders.map((folder) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setActiveFolder(folder.id),
								className: `h-8 rounded-full px-3 text-xs ${activeFolderId === folder.id ? "text-amber-ink" : "bg-raised text-muted"}`,
								style: activeFolderId === folder.id ? { background: folder.color } : void 0,
								children: folder.name
							})
						}, folder.id)),
						addingFolder ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
							className: "flex shrink-0 gap-1",
							onSubmit: (event) => {
								event.preventDefault();
								addFolder(folderDraft);
								setFolderDraft("");
								setAddingFolder(false);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: folderDraft,
								onChange: (event) => setFolderDraft(event.target.value),
								placeholder: "Папка",
								autoFocus: true,
								className: "h-8 w-24 rounded-full border border-line bg-ink px-3 text-xs outline-none"
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setAddingFolder(true),
							className: "grid size-8 shrink-0 place-items-center rounded-full bg-raised text-muted",
							"aria-label": "Новая папка",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPlus, { className: "size-3.5" })
						}),
						activeFolderId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => deleteFolder(activeFolderId),
							className: "h-8 shrink-0 rounded-full px-3 text-xs text-danger",
							children: "Удалить папку"
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-2",
				children: [visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-1 py-8 text-center text-sm text-pretty text-muted",
					children: "Ничего не нашлось. Смените папку или запрос."
				}), visible.map((prompt) => {
					const folder = folders.find((item) => item.id === prompt.folder);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl border border-line bg-ink p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-medium",
									children: prompt.name
								}), prompt.slug && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-xs text-faint",
									children: ["/", prompt.slug]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-2 text-xs text-pretty text-muted",
								children: prompt.text
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap items-center gap-1.5",
								children: [folder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs",
									style: { color: folder.color },
									children: folder.name
								}), prompt.tags.slice(0, 3).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-raised px-2 py-0.5 text-xs text-faint",
									children: tag
								}, tag))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => insertPrompt(prompt),
										className: "inline-flex h-9 flex-1 items-center justify-center gap-1 rounded-lg bg-amber text-sm font-semibold text-amber-ink",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5" }), "Вставить"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => openPromptEditor(prompt.id),
										className: "grid size-9 place-items-center rounded-lg border border-line text-muted hover:text-fg",
										"aria-label": `Изменить ${prompt.name}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											deletePrompt(prompt.id);
											showToast("Промпт удалён");
										},
										className: "grid size-9 place-items-center rounded-lg border border-line text-muted hover:text-danger",
										"aria-label": `Удалить ${prompt.name}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
									})
								]
							})
						]
					}, prompt.id);
				})]
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-3",
				children: [contextProfiles.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-8 text-center text-sm text-muted",
					children: "Профилей пока нет."
				}), contextProfiles.map((profile) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-line bg-ink p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-medium",
								children: profile.name
							}), profile.id === activeProfileId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-mint",
								children: "активен"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-3 text-xs text-pretty text-muted",
							children: profile.text
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setActiveProfile(profile.id),
									className: "h-9 flex-1 rounded-lg border border-line text-sm text-fg hover:border-amber",
									children: "Сделать активным"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => openProfileEditor(profile.id),
									className: "grid size-9 place-items-center rounded-lg border border-line text-muted",
									"aria-label": `Изменить ${profile.name}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										deleteProfile(profile.id);
										showToast("Профиль удалён");
									},
									className: "grid size-9 place-items-center rounded-lg border border-line text-muted hover:text-danger",
									"aria-label": `Удалить ${profile.name}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
								})
							]
						})
					]
				}, profile.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "space-y-2 border-t border-line p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => tab === "prompts" ? openPromptEditor() : openProfileEditor(),
						className: "inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-amber text-sm font-semibold text-amber-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), tab === "prompts" ? "Новый промпт" : "Новый профиль"]
					}),
					importOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: importText,
						onChange: (event) => setImportText(event.target.value),
						placeholder: "Вставьте JSON бэкапа",
						className: "h-24 w-full resize-none rounded-xl border border-line bg-ink p-3 font-mono text-xs outline-none focus:border-amber"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: download,
							className: "inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-line text-xs text-muted hover:text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "Экспорт"]
						}), importOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								const ok = importData(importText);
								showToast(ok ? "Библиотека загружена" : "Неверный JSON");
								if (ok) {
									setImportText("");
									setImportOpen(false);
								}
							},
							className: "inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-line text-xs text-fg",
							children: "Загрузить JSON"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => fileRef.current?.click(),
							className: "inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-line text-xs text-muted hover:text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" }), "Импорт"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setImportOpen((open) => !open),
						className: "w-full text-center text-xs text-faint hover:text-muted",
						children: importOpen ? "Закрыть вставку JSON" : "Или вставить JSON вручную"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "application/json,.json",
						className: "hidden",
						onChange: (event) => {
							onFile(event.target.files?.[0]);
							event.target.value = "";
						}
					})
				]
			})
		]
	});
}
function Studio() {
	const activeSite = useStore((s) => s.activeSite);
	const setActiveSite = useStore((s) => s.setActiveSite);
	const popupOpen = useStore((s) => s.setPopupOpen);
	const libraryOpen = useStore((s) => s.libraryOpen);
	const setLibraryOpen = useStore((s) => s.setLibraryOpen);
	const setInstallOpen = useStore((s) => s.setInstallOpen);
	const isPopupOpen = useStore((s) => s.popupOpen);
	const site = SITES.find((item) => item.id === activeSite) ?? SITES[0];
	const anchorRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!isPopupOpen) return;
		const onDown = (event) => {
			if (anchorRef.current?.contains(event.target)) return;
			popupOpen(false);
		};
		window.addEventListener("mousedown", onDown);
		return () => window.removeEventListener("mousedown", onDown);
	}, [isPopupOpen, popupOpen]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh min-h-0 flex-col bg-ink text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative shrink-0 border-b border-line bg-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-12 items-center gap-2 px-2 py-1 sm:px-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-7 shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-semibold leading-tight",
								children: "ContextFlow"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hidden truncate font-mono text-xs text-faint sm:block",
								children: site.host
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setLibraryOpen(true),
									"aria-label": "Библиотека",
									className: "inline-flex h-11 items-center gap-1.5 rounded-xl px-2.5 text-sm text-muted hover:bg-raised hover:text-fg lg:hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Library, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: "Библиотека"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setInstallOpen(true),
									className: "grid size-11 place-items-center rounded-xl text-muted hover:bg-raised hover:text-fg",
									"aria-label": "Скачать расширение",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									ref: anchorRef,
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => popupOpen(!isPopupOpen),
										className: `grid size-11 place-items-center rounded-xl border ${isPopupOpen ? "border-amber bg-raised" : "border-line bg-ink"}`,
										"aria-label": "Открыть меню расширения",
										"aria-expanded": isPopupOpen,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-6" })
									}), isPopupOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popup, {})]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1 overflow-x-auto px-2 pb-2",
					children: SITES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setActiveSite(item.id),
						className: `h-9 shrink-0 rounded-full px-3 text-sm ${item.id === activeSite ? "bg-ink text-fg" : "text-muted hover:bg-raised"}`,
						children: item.name
					}, item.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatStage, {
					siteId: activeSite,
					siteName: site.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "hidden w-80 shrink-0 border-l border-line lg:flex lg:flex-col",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Library$1, {})
				})]
			}),
			libraryOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-40 bg-ink lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Library$1, { onClose: () => setLibraryOpen(false) })
			})
		]
	});
}
function ChatStage({ siteId, siteName }) {
	const profiles = useStore((s) => s.contextProfiles);
	const activeProfileId = useStore((s) => s.activeProfileId);
	const settings = useStore((s) => s.settings);
	const setLibraryOpen = useStore((s) => s.setLibraryOpen);
	const setPopupOpen = useStore((s) => s.setPopupOpen);
	const editing = useStore((s) => s.editing);
	const variablesFor = useStore((s) => s.variablesFor);
	const installOpen = useStore((s) => s.installOpen);
	const [drafts, setDrafts] = (0, import_react.useState)({});
	const [threads, setThreads] = (0, import_react.useState)({});
	const [palette, setPalette] = (0, import_react.useState)(false);
	const boxRef = (0, import_react.useRef)(null);
	const endRef = (0, import_react.useRef)(null);
	const profile = profiles.find((item) => item.id === activeProfileId);
	const draft = drafts[siteId] ?? "";
	const messages = threads[siteId] ?? [];
	(0, import_react.useEffect)(() => {
		return registerInsert((text) => {
			setDrafts((current) => ({
				...current,
				[useStore.getState().activeSite]: text
			}));
			setLibraryOpen(false);
			setPopupOpen(false);
			setPalette(false);
			requestAnimationFrame(() => boxRef.current?.focus());
		});
	}, [setLibraryOpen, setPopupOpen]);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (editing || variablesFor || installOpen) return;
			if (event.altKey && !event.shiftKey && !event.metaKey && !event.ctrlKey && event.key.toLowerCase() === "p") {
				event.preventDefault();
				setPalette(true);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		editing,
		variablesFor,
		installOpen
	]);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ block: "end" });
	}, [messages.length, siteId]);
	const send = () => {
		const text = draft.trim();
		if (!text) return;
		const note = {
			id: `${Date.now()}`,
			role: "user",
			content: text
		};
		const aside = {
			id: `${Date.now()}-n`,
			role: "note",
			content: `В настоящем окне ${siteName} этот текст ушёл бы модели. ContextFlow только собирает промпт.`
		};
		setThreads((current) => ({
			...current,
			[siteId]: [
				...current[siteId] ?? [],
				note,
				aside
			]
		}));
		setDrafts((current) => ({
			...current,
			[siteId]: ""
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex min-w-0 flex-1 flex-col bg-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 border-b border-line px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5 text-faint" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "truncate text-sm font-semibold",
						children: siteName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-xs text-muted",
						children: profile && settings.attachProfile ? `Контекст: ${profile.name}` : "Без контекста"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-line bg-raised px-4 py-3 text-sm text-pretty text-muted",
						children: [
							"Расширение уже на этой странице. Нажмите ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kbd, { children: "/" }),
							" в поле или ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kbd, { children: "Alt+P" }),
							", выберите промпт — профиль подклеится сам. Иконка справа вверху открывает быстрый список."
						]
					}),
					messages.map((message) => message.role === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-[85%] rounded-2xl rounded-br-md bg-amber px-4 py-3 text-sm whitespace-pre-wrap text-amber-ink",
							children: message.content
						})
					}, message.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs text-pretty text-faint",
						children: message.content
					}, message.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative border-t border-line px-3 py-3 sm:px-4",
				children: [palette && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { onClose: () => setPalette(false) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setPalette(true),
							className: "grid size-11 shrink-0 place-items-center rounded-xl bg-amber font-mono text-lg font-semibold text-amber-ink",
							"aria-label": "Открыть палитру промптов",
							children: "/"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							ref: boxRef,
							value: draft,
							rows: 2,
							placeholder: `Сообщение для ${siteName}. / — промпты`,
							onChange: (event) => setDrafts((current) => ({
								...current,
								[siteId]: event.target.value
							})),
							onKeyDown: (event) => {
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
							},
							className: "max-h-40 min-h-11 flex-1 resize-none rounded-xl border border-line bg-panel px-3 py-2.5 text-sm outline-none placeholder:text-faint focus:border-amber"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: send,
							disabled: !draft.trim(),
							className: "grid size-11 shrink-0 place-items-center rounded-xl bg-fg text-ink disabled:opacity-40",
							"aria-label": "Отправить",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
						})
					]
				})]
			})
		]
	});
}
function Palette({ onClose }) {
	const prompts = useStore((s) => s.prompts);
	const folders = useStore((s) => s.folders);
	const insertPrompt = useInsertPrompt();
	const [query, setQuery] = (0, import_react.useState)("");
	const [index, setIndex] = (0, import_react.useState)(0);
	const inputRef = (0, import_react.useRef)(null);
	const filtered = (0, import_react.useMemo)(() => prompts.filter((prompt) => matchesQuery(prompt, query)), [prompts, query]);
	(0, import_react.useEffect)(() => {
		inputRef.current?.focus();
	}, []);
	(0, import_react.useEffect)(() => {
		setIndex(0);
	}, [query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "cf-rise absolute right-3 bottom-full left-3 z-30 mb-2 overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl sm:right-4 sm:left-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 border-b border-line px-3 py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-amber",
					children: "/"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: inputRef,
					value: query,
					onChange: (event) => setQuery(event.target.value),
					onKeyDown: (event) => {
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
					},
					placeholder: "Найти промпт",
					className: "h-9 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-faint"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "text-xs text-faint",
					children: "Esc"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-64 overflow-y-auto",
			children: [filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 py-6 text-center text-sm text-muted",
				children: "Нет такого промпта"
			}), filtered.map((prompt, itemIndex) => {
				const folder = folders.find((item) => item.id === prompt.folder);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onMouseEnter: () => setIndex(itemIndex),
					onClick: () => insertPrompt(prompt),
					className: `flex w-full items-start gap-3 px-4 py-2.5 text-left ${itemIndex === index ? "bg-raised" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium",
							children: prompt.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-xs text-faint",
							children: prompt.text
						})]
					}), folder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-xs",
						style: { color: folder.color },
						children: folder.name
					})]
				}, prompt.id);
			})]
		})]
	});
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
	const [query, setQuery] = (0, import_react.useState)("");
	const filtered = prompts.filter((prompt) => matchesQuery(prompt, query)).slice(0, 8);
	const profile = profiles.find((item) => item.id === activeProfileId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "cf-rise absolute top-full right-2 z-40 mt-1 flex max-h-[70dvh] w-[min(100vw-1rem,20rem)] flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-line px-3 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-amber",
						children: "Быстрая вставка"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: profile ? profile.name : "Без контекста"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: activeProfileId ?? "",
						onChange: (event) => setActiveProfile(event.target.value || null),
						className: "mt-2 h-10 w-full rounded-xl border border-line bg-ink px-2 text-sm outline-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Без контекста"
						}), profiles.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item.id,
							children: item.name
						}, item.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Поиск",
						className: "mt-2 h-10 w-full rounded-xl border border-line bg-ink px-3 text-sm outline-none placeholder:text-faint"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto",
				children: filtered.map((prompt) => {
					const folder = folders.find((item) => item.id === prompt.folder);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => insertPrompt(prompt),
						className: "block w-full border-b border-line px-3 py-2.5 text-left hover:bg-raised",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm",
							children: prompt.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-xs text-faint",
							children: folder ? folder.name : "Без папки"
						})]
					}, prompt.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					setPopupOpen(false);
					setLibraryOpen(true);
				},
				className: "h-11 border-t border-line text-sm text-amber lg:hidden",
				children: "Открыть библиотеку"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setPopupOpen(false),
				className: "hidden h-11 border-t border-line text-sm text-muted lg:block",
				children: "Библиотека открыта справа"
			})
		]
	});
}
function Shell({ title, subtitle, onClose, children }) {
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-ink/75 p-3 sm:items-center",
		onMouseDown: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": title,
			className: "cf-rise max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-panel shadow-2xl",
			onMouseDown: (event) => event.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3 border-b border-line px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: title
				}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-pretty text-muted",
					children: subtitle
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "grid size-11 shrink-0 place-items-center rounded-xl text-muted hover:bg-raised hover:text-fg",
					"aria-label": "Закрыть",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}), children]
		})
	});
}
var fieldClass = "w-full rounded-xl border border-line bg-ink px-3 py-2.5 text-sm outline-none placeholder:text-faint focus:border-amber";
function PromptDialog() {
	const editing = useStore((s) => s.editing);
	const prompts = useStore((s) => s.prompts);
	const folders = useStore((s) => s.folders);
	const closeEditor = useStore((s) => s.closeEditor);
	const savePrompt = useStore((s) => s.savePrompt);
	const showToast = useStore((s) => s.showToast);
	const existing = prompts.find((prompt) => prompt.id === editing?.id);
	const [name, setName] = (0, import_react.useState)(existing?.name ?? "");
	const [folder, setFolder] = (0, import_react.useState)(existing?.folder ?? "");
	const [slug, setSlug] = (0, import_react.useState)(existing?.slug ?? "");
	const [text, setText] = (0, import_react.useState)(existing?.text ?? "");
	const [tags, setTags] = (0, import_react.useState)(existing?.tags.join(", ") ?? "");
	if (editing?.kind !== "prompt") return null;
	const save = () => {
		if (!name.trim() || !text.trim()) return;
		savePrompt({
			name: name.trim(),
			folder,
			slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
			text: text.trim(),
			tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean)
		});
		showToast("Промпт сохранён");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: existing ? "Редактировать промпт" : "Новый промпт",
		subtitle: "Переменные в двойных скобках, например {{код}}, спросят значение перед вставкой.",
		onClose: closeEditor,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm text-muted",
					children: ["Название", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						onChange: (event) => setName(event.target.value),
						className: `${fieldClass} mt-1`
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm text-muted",
						children: ["Папка", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: folder,
							onChange: (event) => setFolder(event.target.value),
							className: `${fieldClass} mt-1`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Без папки"
							}), folders.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.name
							}, item.id))]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm text-muted",
						children: ["Слаг", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: slug,
							onChange: (event) => setSlug(event.target.value),
							placeholder: "refactor",
							className: `${fieldClass} mt-1 font-mono`
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm text-muted",
					children: ["Текст", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: text,
						onChange: (event) => setText(event.target.value),
						rows: 7,
						className: `${fieldClass} mt-1 resize-y font-mono leading-relaxed`
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm text-muted",
					children: ["Теги через запятую", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: tags,
						onChange: (event) => setTags(event.target.value),
						className: `${fieldClass} mt-1`
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-end gap-2 border-t border-line px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: closeEditor,
				className: "h-11 rounded-xl px-4 text-sm text-muted",
				children: "Отмена"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: save,
				disabled: !name.trim() || !text.trim(),
				className: "h-11 rounded-xl bg-amber px-4 text-sm font-semibold text-amber-ink disabled:opacity-40",
				children: "Сохранить"
			})]
		})]
	});
}
function ProfileDialog() {
	const editing = useStore((s) => s.editing);
	const profiles = useStore((s) => s.contextProfiles);
	const closeEditor = useStore((s) => s.closeEditor);
	const saveProfile = useStore((s) => s.saveProfile);
	const showToast = useStore((s) => s.showToast);
	const existing = profiles.find((profile) => profile.id === editing?.id);
	const [name, setName] = (0, import_react.useState)(existing?.name ?? "");
	const [text, setText] = (0, import_react.useState)(existing?.text ?? "");
	if (editing?.kind !== "profile") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: existing ? "Редактировать профиль" : "Новый профиль",
		subtitle: "Системная инструкция. Подклеивается перед промптом, если галочка включена.",
		onClose: closeEditor,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 px-4 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm text-muted",
				children: ["Название", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: name,
					onChange: (event) => setName(event.target.value),
					className: `${fieldClass} mt-1`
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm text-muted",
				children: ["Инструкция", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: text,
					onChange: (event) => setText(event.target.value),
					rows: 10,
					className: `${fieldClass} mt-1 resize-y leading-relaxed`
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-end gap-2 border-t border-line px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: closeEditor,
				className: "h-11 rounded-xl px-4 text-sm text-muted",
				children: "Отмена"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: !name.trim() || !text.trim(),
				onClick: () => {
					saveProfile({
						name: name.trim(),
						text: text.trim()
					});
					showToast("Профиль сохранён");
				},
				className: "h-11 rounded-xl bg-amber px-4 text-sm font-semibold text-amber-ink disabled:opacity-40",
				children: "Сохранить"
			})]
		})]
	});
}
function VariablesDialog() {
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
	const long = /* @__PURE__ */ new Set([
		"код",
		"текст",
		"схема",
		"описание"
	]);
	const commit = (copy) => {
		if (copy) {
			navigator.clipboard.writeText(preview);
			showToast("Скопировано");
			closeVariables();
			return;
		}
		const inserted = requestInsert(preview);
		closeVariables();
		if (!inserted) {
			navigator.clipboard.writeText(preview);
			showToast("Скопировано — поле чата не найдено");
			return;
		}
		showToast("Промпт вставлен в поле");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: prompt.name,
		subtitle: "Заполните переменные. Пустые останутся в тексте как есть.",
		onClose: closeVariables,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 px-4 py-4",
			children: [variables.map((name, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm text-muted",
				children: [name, long.has(name) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: values[name] ?? "",
					autoFocus: index === 0,
					onChange: (event) => setVariableValue(name, event.target.value),
					rows: 4,
					className: `${fieldClass} mt-1 resize-y font-mono`
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: values[name] ?? "",
					autoFocus: index === 0,
					onChange: (event) => setVariableValue(name, event.target.value),
					className: `${fieldClass} mt-1`
				})]
			}, name)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-1 text-xs text-muted",
				children: "Как уйдёт в чат"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "max-h-40 overflow-auto rounded-xl border border-line bg-ink p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap text-fg",
				children: preview
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-end gap-2 border-t border-line px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => commit(true),
				className: "h-11 rounded-xl px-4 text-sm text-muted",
				children: "Копировать"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => commit(false),
				className: "h-11 rounded-xl bg-amber px-4 text-sm font-semibold text-amber-ink",
				children: "Вставить в чат"
			})]
		})]
	});
}
function InstallDialog() {
	const open = useStore((s) => s.installOpen);
	const setInstallOpen = useStore((s) => s.setInstallOpen);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: "Установить расширение",
		subtitle: "Chrome, Edge, Brave и Яндекс Браузер. Firefox не поддерживается.",
		onClose: () => setInstallOpen(false),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "list-decimal space-y-2 px-8 py-4 text-sm text-pretty text-fg marker:text-amber",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Скачайте архив и распакуйте его в постоянную папку." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Откройте ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-amber",
						children: "chrome://extensions"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Включите «Режим разработчика»." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Нажмите «Загрузить распакованное» и выберите распакованную папку." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Закрепите ContextFlow. На сайте чата нажмите / или Alt+P." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 pb-2 text-sm text-pretty text-muted",
				children: "Пока архив не установлен, это окно уже ведёт себя как расширение: библиотека справа, слэш в поле ввода. Работает на ChatGPT, Claude, DeepSeek, Qwen, GigaChat, Gemini, а также Perplexity, Grok, Copilot и Mistral."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/downloads/contextflow.zip",
					download: true,
					className: "inline-flex h-11 w-full items-center justify-center rounded-xl bg-amber text-sm font-semibold text-amber-ink",
					children: "Скачать ContextFlow"
				})
			})
		]
	});
}
function Toast() {
	const toast = useStore((s) => s.toast);
	if (!toast) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "cf-rise pointer-events-none fixed top-3 left-1/2 z-50 -translate-x-1/2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink",
		children: toast
	});
}
function Home() {
	const editing = useStore((s) => s.editing);
	(0, import_react.useEffect)(() => {
		useStore.persist.rehydrate();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "h-dvh overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Studio, {}),
			editing?.kind === "prompt" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptDialog, {}, editing.id ?? "new-prompt") : null,
			editing?.kind === "profile" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileDialog, {}, editing.id ?? "new-profile") : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VariablesDialog, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallDialog, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, {})
		]
	});
}
//#endregion
export { Home as component };
