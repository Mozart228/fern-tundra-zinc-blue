export interface ContextProfile {
  id: string;
  name: string;
  text: string;
  createdAt: number;
}

export interface Prompt {
  id: string;
  name: string;
  folder: string;
  slug: string;
  text: string;
  tags: string[];
  createdAt: number;
}

export interface Folder {
  id: string;
  name: string;
  color: string;
}

export interface Settings {
  attachProfile: boolean;
  showLauncher: boolean;
}

export interface PortableData {
  version: string;
  exportedAt?: string;
  contextProfiles: ContextProfile[];
  prompts: Prompt[];
  folders: Folder[];
  settings?: Partial<Settings>;
}

export const SITES = [
  { id: "chatgpt", name: "ChatGPT", host: "chatgpt.com" },
  { id: "claude", name: "Claude", host: "claude.ai" },
  { id: "deepseek", name: "DeepSeek", host: "chat.deepseek.com" },
  { id: "qwen", name: "Qwen", host: "chat.qwen.ai" },
  { id: "gigachat", name: "GigaChat", host: "giga.chat" },
  { id: "gemini", name: "Gemini", host: "gemini.google.com" },
] as const;

export type SiteId = (typeof SITES)[number]["id"];

export const FOLDER_COLORS = ["#5b8def", "#3dbe8b", "#b08cff", "#e4a04a", "#e26d6d", "#e38bb4"];

export const defaultFolders: Folder[] = [
  { id: "folder-1", name: "Разработка", color: "#5b8def" },
  { id: "folder-2", name: "Копирайтинг", color: "#3dbe8b" },
  { id: "folder-3", name: "Аналитика", color: "#b08cff" },
  { id: "folder-4", name: "Общее", color: "#e4a04a" },
];

export const defaultProfiles: ContextProfile[] = [
  {
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
    createdAt: 1,
  },
  {
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
    createdAt: 2,
  },
];

export const defaultPrompts: Prompt[] = [
  {
    id: "prompt-1",
    name: "Рефакторинг кода",
    folder: "folder-1",
    slug: "refactor",
    text: "Проведи рефакторинг следующего кода. Улучши читаемость, производительность и следование best practices. Код:\n\n```\n{{код}}\n```\n\nУкажи, что именно изменилось и почему.",
    tags: ["код", "рефакторинг", "улучшение"],
    createdAt: 12,
  },
  {
    id: "prompt-2",
    name: "Написание unit-тестов",
    folder: "folder-1",
    slug: "tests",
    text: "Напиши unit-тесты для следующего кода, используя {{фреймворк}}. Покрой основные сценарии, edge cases и ошибки.\n\nКод:\n```\n{{код}}\n```",
    tags: ["тесты", "код", "качество"],
    createdAt: 11,
  },
  {
    id: "prompt-3",
    name: "Ревью кода",
    folder: "folder-1",
    slug: "review",
    text: "Проведи code review следующего фрагмента. Оцени:\n1. Корректность логики\n2. Потенциальные баги\n3. Безопасность\n4. Производительность\n5. Читаемость\n\nКод:\n```\n{{код}}\n```",
    tags: ["ревью", "код", "безопасность"],
    createdAt: 10,
  },
  {
    id: "prompt-4",
    name: "Создание API endpoint",
    folder: "folder-1",
    slug: "api",
    text: "Создай REST API endpoint для {{описание}}. Используй {{фреймворк}}. Включи:\n- Валидацию входных данных\n- Обработку ошибок\n- Документацию (Swagger/OpenAPI)\n- Примеры запросов и ответов",
    tags: ["api", "backend", "endpoint"],
    createdAt: 9,
  },
  {
    id: "prompt-5",
    name: "Пост-анонс",
    folder: "folder-2",
    slug: "announce",
    text: "Напиши пост-анонс для Telegram-канала о {{событие}}. Тон: {{тон}}. Целевая аудитория: {{аудитория}}. Включи CTA и хэштеги.",
    tags: ["пост", "анонс", "telegram"],
    createdAt: 8,
  },
  {
    id: "prompt-6",
    name: "Рерайт текста",
    folder: "folder-2",
    slug: "rewrite",
    text: "Перепиши следующий текст, сохранив смысл, но полностью изменив формулировки. Стиль: {{стиль}}. Аудитория: {{аудитория}}.\n\nОригинал:\n{{текст}}",
    tags: ["рерайт", "копирайтинг", "текст"],
    createdAt: 7,
  },
  {
    id: "prompt-7",
    name: "Заголовки для статьи",
    folder: "folder-2",
    slug: "headlines",
    text: 'Предложи 10 вариантов заголовков для статьи на тему "{{тема}}". Для каждого укажи тип заголовка (вопрос, список, how-to) и оцени цепляющую силу от 1 до 10.',
    tags: ["заголовки", "статья", "контент"],
    createdAt: 6,
  },
  {
    id: "prompt-8",
    name: "SWOT-анализ",
    folder: "folder-3",
    slug: "swot",
    text: "Проведи SWOT-анализ для {{объект}}. Контекст: {{контекст}}. Для каждого элемента приведи 3-5 пунктов с кратким пояснением.",
    tags: ["анализ", "стратегия", "бизнес"],
    createdAt: 5,
  },
  {
    id: "prompt-9",
    name: "Анализ конкурентов",
    folder: "folder-3",
    slug: "competitors",
    text: "Проведи анализ конкурентов для {{продукт}}. Рынок: {{рынок}}. Для каждого конкурента оцени:\n- Сильные стороны\n- Слабые стороны\n- Ценообразование\n- Уникальное предложение",
    tags: ["конкуренты", "анализ", "рынок"],
    createdAt: 4,
  },
  {
    id: "prompt-10",
    name: "Объясни простыми словами",
    folder: "folder-4",
    slug: "explain",
    text: "Объясни простыми словами, как для {{аудитория}}, что такое {{концепция}}. Используй аналогии из повседневной жизни. Максимум 200 слов.",
    tags: ["объяснение", "обучение"],
    createdAt: 3,
  },
  {
    id: "prompt-11",
    name: "Составить план",
    folder: "folder-4",
    slug: "plan",
    text: "Составь детальный план действий для {{задача}}. Дедлайн: {{дедлайн}}. Ресурсы: {{ресурсы}}. Включи:\n- Этапы с дедлайнами\n- Необходимые действия\n- Потенциальные риски\n- Критерии успеха",
    tags: ["план", "задачи"],
    createdAt: 2,
  },
  {
    id: "prompt-12",
    name: "SQL-запрос",
    folder: "folder-1",
    slug: "sql",
    text: "Напиши SQL-запрос для {{задача}}. Схема таблицы:\n```\n{{схема}}\n```\nОптимизируй для производительности. Добавь комментарии к сложным частям.",
    tags: ["sql", "база данных"],
    createdAt: 1,
  },
];

export const defaultSettings: Settings = {
  attachProfile: true,
  showLauncher: true,
};

const VAR_RE = /\{\{\s*([^{}]+?)\s*\}\}/g;

export function extractVariables(text: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const match of text.matchAll(VAR_RE)) {
    const key = match[1]?.trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(key);
  }
  return out;
}

export function substitute(text: string, values: Record<string, string>): string {
  return text.replace(VAR_RE, (_, raw: string) => {
    const key = raw.trim();
    const value = values[key];
    return value ? value : `{{${key}}}`;
  });
}

export function assemble(
  promptText: string,
  profileText: string | null,
  attach: boolean,
  values: Record<string, string>,
): string {
  const body = substitute(promptText, values);
  if (attach && profileText?.trim()) return `${profileText.trim()}\n\n${body}`;
  return body;
}

export function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function matchesQuery(prompt: Prompt, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    prompt.name.toLowerCase().includes(q) ||
    prompt.slug.toLowerCase().includes(q) ||
    prompt.text.toLowerCase().includes(q) ||
    prompt.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}

export function isPortable(value: unknown): value is PortableData {
  if (!value || typeof value !== "object") return false;
  const data = value as PortableData;
  return Array.isArray(data.prompts) && Array.isArray(data.contextProfiles) && Array.isArray(data.folders);
}
