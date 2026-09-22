import { useMemo, useState } from "react";

type IconProps = { name: string; className?: string };

function Icon({ name, className = "h-5 w-5" }: IconProps) {
  const paths: Record<string, React.ReactNode> = {
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    playlist: <><path d="M4 6h11M4 12h11M4 18h7M18 14v7M15 18h6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    play: <><path d="m8 5 11 7-11 7V5Z" /></>,
    chevron: <><path d="m9 18 6-6-6-6" /></>,
    close: <><path d="M18 6 6 18M6 6l12 12" /></>,
    upload: <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 15v5h16v-5" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" /></>,
    moon: <><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" /></>,
  };
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const videos = [
  { id: 1, title: "Город, который звучит иначе ночью", channel: "urban frame", views: "1,2 млн", ago: "2 дня назад", time: "12:48", image: "https://images.unsplash.com/photo-1720941001345-577257b0da4a?auto=format&fit=crop&w=900&q=85", avatar: "UF", color: "var(--accent)", category: "Путешествия" },
  { id: 2, title: "Почему современная архитектура успокаивает", channel: "FORMA", views: "846 тыс.", ago: "5 дней назад", time: "08:21", image: "https://images.unsplash.com/photo-1710429159749-3048549a22ab?auto=format&fit=crop&w=900&q=85", avatar: "F", color: "#A79BFA", category: "Дизайн" },
  { id: 3, title: "24 часа у воды: без связи и спешки", channel: "slow days", views: "234 тыс.", ago: "вчера", time: "18:03", image: "https://images.unsplash.com/photo-1672306482463-89443bfc7072?auto=format&fit=crop&w=900&q=85", avatar: "SD", color: "#7DD3FC", category: "Путешествия" },
  { id: 4, title: "Пространство будущего уже построено", channel: "Контур", views: "98 тыс.", ago: "6 часов назад", time: "06:42", image: "https://images.unsplash.com/photo-1651217098850-e023570d6ddf?auto=format&fit=crop&w=900&q=85", avatar: "К", color: "#FDBA74", category: "Дизайн" },
  { id: 5, title: "За кулисами самого громкого стадиона", channel: "Больше звука", views: "560 тыс.", ago: "4 дня назад", time: "22:10", image: "https://images.unsplash.com/photo-1662582161597-b22865a8be2f?auto=format&fit=crop&w=900&q=85", avatar: "БЗ", color: "#F9A8D4", category: "Музыка" },
  { id: 6, title: "Как снимать кино на обычную камеру", channel: "Честный кадр", views: "73 тыс.", ago: "3 дня назад", time: "14:37", image: "https://images.unsplash.com/photo-1634135129536-c112013230ff?auto=format&fit=crop&w=900&q=85", avatar: "ЧК", color: "var(--accent)", category: "Обучение" },
  { id: 7, title: "Город над водой: инженерное чудо", channel: "Это работает", views: "311 тыс.", ago: "неделю назад", time: "10:05", image: "https://images.unsplash.com/photo-1598783887308-ea1c7c4e8360?auto=format&fit=crop&w=900&q=85", avatar: "ЭР", color: "#A79BFA", category: "Технологии" },
  { id: 8, title: "Дом на краю гор: история проекта", channel: "FORMA", views: "129 тыс.", ago: "8 дней назад", time: "09:56", image: "https://images.unsplash.com/photo-1694099051742-e2b6b606dac0?auto=format&fit=crop&w=900&q=85", avatar: "F", color: "#7DD3FC", category: "Дизайн" },
];

const nav = [
  ["home", "Главная"],
  ["compass", "В тренде"],
  ["users", "Подписки"],
  ["playlist", "Плейлисты"],
  ["clock", "История"],
];

export default function App() {
  const [active, setActive] = useState("Главная");
  const [category, setCategory] = useState("Все");
  const [query, setQuery] = useState("");
  const [mobileMenu, setMobileMenu] = useState(() => window.innerWidth >= 768);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const filtered = useMemo(() => videos.filter((video) =>
    (category === "Все" || video.category === category) &&
    (video.title.toLowerCase().includes(query.toLowerCase()) || video.channel.toLowerCase().includes(query.toLowerCase()))
  ), [category, query]);

  function flash(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2400);
  }

  return (
    <div className={`theme-shell theme-${theme} min-h-screen bg-[var(--bg)] text-[var(--text)]`}>
      <header className="fixed inset-x-0 top-0 z-40 h-[72px] border-b border-[var(--border)] bg-[var(--header)] px-4 backdrop-blur-md md:px-6">
        <div className="mx-auto flex h-full max-w-[1600px] items-center gap-4">
          <button onClick={() => setMobileMenu(!mobileMenu)} className="icon-button" aria-label={mobileMenu ? "Скрыть меню" : "Открыть меню"}><Icon name="menu" /></button>
          <a href="#" className="flex shrink-0 items-center gap-2.5" onClick={() => setActive("Главная")}>
            <span className="grid h-9 w-9 place-items-center rounded-[11px] bg-[var(--accent)] text-[var(--accent-ink)]"><Icon name="play" className="h-4 w-4 fill-current" /></span>
            <span className="text-xl font-extrabold tracking-[-0.04em]">pulse</span>
          </a>

          <div className="mx-auto hidden w-full max-w-[620px] md:block">
            <label className="flex h-11 items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 transition focus-within:border-[var(--accent)] focus-within:ring-4 focus-within:ring-[var(--accent-soft)]">
              <Icon name="search" className="h-[18px] w-[18px] text-[var(--muted)]" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--subtle)]" placeholder="Видео, авторы и темы" />
            </label>
          </div>

          <button onClick={() => setUploadOpen(true)} className="ml-auto flex h-10 items-center gap-2 rounded-full bg-[var(--accent)] px-4 text-sm font-bold text-[var(--accent-ink)] transition hover:bg-[var(--accent-hover)] md:ml-0">
            <Icon name="plus" className="h-4 w-4" /><span className="hidden sm:inline">Загрузить</span>
          </button>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="flex h-10 items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1 text-[var(--muted)] transition hover:text-[var(--text)]"
            aria-label={theme === "light" ? "Включить тёмную тему" : "Включить светлую тему"}
            title={theme === "light" ? "Тёмная тема" : "Светлая тема"}
          >
            <span className={`grid h-8 w-8 place-items-center rounded-full transition ${theme === "light" ? "bg-[var(--accent)] text-[var(--accent-ink)]" : ""}`}><Icon name="sun" className="h-4 w-4" /></span>
            <span className={`grid h-8 w-8 place-items-center rounded-full transition ${theme === "dark" ? "bg-[var(--accent)] text-[var(--accent-ink)]" : ""}`}><Icon name="moon" className="h-4 w-4" /></span>
          </button>
          <button className="icon-button hidden sm:grid" aria-label="Уведомления" onClick={() => flash("Новых уведомлений нет")}><Icon name="bell" /></button>
          <button className="hidden h-10 w-10 shrink-0 place-items-center rounded-full bg-[#A79BFA] text-sm font-extrabold text-[#17132F] sm:grid" aria-label="Профиль">А</button>
        </div>
      </header>

      <aside className={`fixed bottom-0 left-0 top-[72px] z-30 w-[232px] border-r border-[var(--border)] bg-[var(--bg)] p-4 transition-transform duration-200 ${mobileMenu ? "translate-x-0" : "-translate-x-full"}`}>
        <nav className="space-y-1">
          {nav.map(([icon, label]) => (
            <button key={label} onClick={() => { setActive(label); if (window.innerWidth < 768) setMobileMenu(false); if (label !== "Главная") flash(`Раздел «${label}» открыт в демо-режиме`); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${active === label ? "bg-[var(--accent)] text-[var(--accent-ink)]" : "text-[var(--muted)] hover:bg-[var(--soft)] hover:text-[var(--text)]"}`}>
              <Icon name={icon} className="h-[19px] w-[19px]" />{label}
            </button>
          ))}
        </nav>
        <div className="my-5 h-px bg-[var(--border)]" />
        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--subtle)]">Ваши подписки</p>
        {[
          ["FR", "frame room", "#FDBA74"],
          ["D", "design mate", "#7DD3FC"],
          ["M", "motion lab", "#F9A8D4"],
        ].map(([letters, title, color]) => <button key={title} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--soft)] hover:text-[var(--text)]"><span style={{ background: color }} className="grid h-7 w-7 place-items-center rounded-full text-[10px] font-extrabold text-[#10201A]">{letters}</span>{title}</button>)}
        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-bold">Pulse для авторов</p>
          <p className="mt-1 text-[11px] leading-4 text-[var(--muted)]">Публикуйте истории, которые хочется досмотреть.</p>
          <button onClick={() => setUploadOpen(true)} className="mt-3 text-xs font-bold text-[var(--accent)]">Начать сейчас →</button>
        </div>
      </aside>

      <main className={`pt-[72px] transition-[padding] duration-200 ${mobileMenu ? "md:pl-[232px]" : "md:pl-0"}`}>
        <div className="mx-auto max-w-[1600px] px-4 pb-14 pt-6 md:px-8 lg:px-10">
          <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {["Все", "Дизайн", "Технологии", "Путешествия", "Музыка", "Обучение"].map((item) => <button key={item} onClick={() => setCategory(item)} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${category === item ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]" : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)]"}`}>{item}</button>)}
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-lg font-extrabold tracking-tight">{query ? "Результаты поиска" : "Рекомендуем вам"}</h1>
            <span className="text-xs text-[var(--subtle)]">{filtered.length} видео</span>
          </div>
          {filtered.length ? (
            <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filtered.map((video) => (
                <article key={video.id} className="group cursor-pointer" onClick={() => flash(`Открываем «${video.title}»`)}>
                  <div className="relative aspect-video overflow-hidden rounded-2xl bg-[var(--surface-2)]">
                    <img src={video.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" />
                    <span className="absolute bottom-2.5 right-2.5 rounded-md bg-[#080C17]/90 px-1.5 py-1 text-[10px] font-bold">{video.time}</span>
                    <span className="absolute inset-0 grid place-items-center bg-[#07100C]/0 opacity-0 transition group-hover:bg-[#07100C]/25 group-hover:opacity-100"><span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)]"><Icon name="play" className="h-4 w-4 fill-current" /></span></span>
                  </div>
                  <div className="mt-3.5 flex gap-3">
                    <span style={{ background: video.color }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[10px] font-black text-[#10201A]">{video.avatar}</span>
                    <div className="min-w-0">
                      <h3 className="line-clamp-2 text-sm font-bold leading-5 text-[var(--text)]">{video.title}</h3>
                      <p className="mt-1.5 text-xs text-[var(--muted)]">{video.channel}</p>
                      <p className="mt-0.5 text-[11px] text-[var(--subtle)]">{video.views} просмотров · {video.ago}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : <div className="grid min-h-52 place-items-center rounded-2xl border border-dashed border-[var(--border)] text-center"><div><p className="font-bold">Ничего не найдено</p><p className="mt-1 text-sm text-[var(--muted)]">Попробуйте изменить запрос или категорию</p></div></div>}
        </div>
      </main>

      {uploadOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-[#060912]/80 p-4 backdrop-blur-sm" onMouseDown={() => setUploadOpen(false)}>
        <div className="w-full max-w-lg rounded-[24px] border border-[var(--border)] bg-[var(--surface-2)] p-6 shadow-2xl sm:p-8" onMouseDown={(e) => e.stopPropagation()}>
          <div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[.15em] text-[var(--accent)]">Новая публикация</p><h2 className="mt-2 text-2xl font-extrabold">Загрузить видео</h2></div><button onClick={() => setUploadOpen(false)} className="icon-button"><Icon name="close" /></button></div>
          <button onClick={() => flash("Выбор файла работает в режиме макета")} className="mt-7 grid w-full place-items-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-deep)] px-6 py-12 text-center transition hover:border-[var(--accent)]">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)]"><Icon name="upload" /></span>
            <span className="mt-4 text-sm font-bold">Перетащите видео сюда</span>
            <span className="mt-1 text-xs text-[var(--muted)]">MP4, MOV, WebM или MKV · до 4 ГБ</span>
          </button>
          <div className="mt-5 flex justify-end gap-3"><button onClick={() => setUploadOpen(false)} className="rounded-full px-5 py-2.5 text-sm font-bold text-[var(--muted)] hover:text-[var(--text)]">Отмена</button><button onClick={() => flash("Сначала выберите видео")} className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-[var(--accent-ink)]">Выбрать файл</button></div>
        </div>
      </div>}

      {notice && <div className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-[var(--border)] bg-[var(--text)] px-5 py-3 text-sm font-semibold text-[var(--accent-ink)] shadow-2xl">{notice}</div>}
    </div>
  );
}
