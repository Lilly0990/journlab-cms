import Link from 'next/link'

type MeetingData = {
  id: string
  title: string
  slug: string
  summary?: string
  location?: string
  date?: string
  participants?: number
  img?: string
  theme?: { id?: string; title?: string; slug?: string; color?: string } | string | null
  coverImage?: { url?: string } | null
  audioUrl?: string
  pdfUrl?: string
  status?: string
}

const THEME_MAP: Record<string, string> = {
  mem: 'Меморіалізація',
  vic: 'Потерпілі та правоохоронці',
  dec: 'Децентралізація',
  col: 'Колаборанти',
  lim: 'Ліміти мирної угоди',
}

export function MeetingDetail({ meeting }: { meeting: MeetingData }) {
  const theme = typeof meeting.theme === 'object' && meeting.theme ? meeting.theme : null
  const themeSlug = theme?.slug ?? ''
  const themeTitle = theme?.title ?? THEME_MAP[themeSlug] ?? ''
  const year = meeting.date ? new Date(meeting.date).getFullYear() : ''
  const imgSrc = meeting.img ?? meeting.coverImage?.url ?? ''

  return (
    <>
      {/* BREADCRUMB */}
      <div style={{ fontSize: 13, color: '#525150', display: 'flex', alignItems: 'center', gap: 6, padding: '12px 80px', borderBottom: '1px solid #d4d4d4', background: '#fff' }}>
        <a href="https://journlab.online" style={{ color: '#525150', textDecoration: 'none' }}>journlab.online</a>
        <span>›</span>
        <Link href="/townhalls" style={{ color: '#525150', textDecoration: 'none' }}>Таунхоли</Link>
        <span>›</span>
        {themeTitle && (
          <>
            <span>{themeTitle}</span>
            <span>›</span>
          </>
        )}
        <span style={{ color: '#151414', fontWeight: 600 }}>{meeting.title}</span>
      </div>

      {/* HERO */}
      <section style={{ background: '#75EDFF', padding: '56px 80px', position: 'relative', overflow: 'hidden', paddingBottom: 80 }}>
        {imgSrc && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <img src={imgSrc} alt={meeting.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.2 }} />
          </div>
        )}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            {themeTitle && (
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' as const, border: '1.5px solid #000', padding: '4px 14px', borderRadius: 20, background: 'transparent', color: '#000' }}>
                {themeTitle}
              </span>
            )}
            {year && <span style={{ fontSize: 13, color: 'rgba(0,0,0,.55)' }}>{year}</span>}
          </div>
          <h1 style={{ fontFamily: "'Source Sans 3', Arial, sans-serif", fontSize: 72, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.01em', color: '#000', marginBottom: 12 }}>
            {meeting.title}
          </h1>
          {meeting.summary && (
            <p style={{ fontSize: 18, maxWidth: 540, lineHeight: 1.6, marginTop: 12, color: 'rgba(0,0,0,.75)' }}>
              {meeting.summary}
            </p>
          )}
        </div>
      </section>

      {/* CONTENT */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 80px 80px' }}>
        <Link href="/townhalls" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 700, textDecoration: 'none', color: '#151414', marginBottom: 40, transition: 'color .15s' }}>
          ← Назад до таунхолів
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 64 }}>

          {/* MAIN COLUMN */}
          <main>

            {/* Про зустріч */}
            <div style={{ marginBottom: 52 }}>
              <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#525150', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                Про зустріч
                <span style={{ flex: 1, height: 1, background: '#d4d4d4' }} />
              </div>
              <div style={{ background: '#f2f2f2', padding: '28px 32px', marginBottom: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  {[
                    { label: 'Локація', value: meeting.location ?? '—' },
                    { label: 'Рік', value: String(year || '—') },
                    { label: 'Тема', value: themeTitle || '—' },
                    { label: 'Організатор', value: 'PIJL' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: '#525150', marginBottom: 4 }}>{label}</div>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
              {meeting.participants && (
                <div style={{ fontSize: 15, lineHeight: 1.8, color: '#333' }}>
                  У таунхолі взяли участь <strong>{meeting.participants}</strong> учасників.
                </div>
              )}
            </div>

            {/* Висновки */}
            <div style={{ marginBottom: 52 }}>
              <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#525150', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                Висновки та рекомендації
                <span style={{ flex: 1, height: 1, background: '#d4d4d4' }} />
              </div>
              <div style={{ background: '#f2f2f2', padding: '24px 28px', marginBottom: 20 }}>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: '#333' }}>
                  Матеріали таунхолу готуються до публікації. Публічні висновки та рекомендації будуть доступні після завершення редакційного процесу.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
                <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Arial, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' as const, padding: '8px 18px', background: '#C9FF8F', border: '1.5px solid #151414', color: '#151414', textDecoration: 'none' }}>
                  ↓ Публічні висновки (PDF)
                </a>
                <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Arial, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' as const, padding: '8px 18px', background: 'transparent', border: '1.5px solid #d4d4d4', color: '#151414', textDecoration: 'none' }}>
                  ↓ Стенограма зустрічі (PDF)
                </a>
              </div>
            </div>

            {/* Аудіо */}
            <div style={{ marginBottom: 52 }}>
              <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#525150', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                Аудіофрагмент зустрічі
                <span style={{ flex: 1, height: 1, background: '#d4d4d4' }} />
              </div>
              <div style={{ background: '#f2f2f2', padding: '24px' }}>
                <h4 style={{ fontFamily: "'Source Sans 3', Arial, sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
                  «Ми хочемо, щоб світ знав, що тут відбулось»
                </h4>
                <div style={{ fontSize: 13, color: '#525150', marginBottom: 16 }}>Ключовий фрагмент розмови з учасниками · 4:30</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button style={{ width: 40, height: 40, borderRadius: '50%', background: '#151414', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="white"><path d="M1 1l10 6-10 6V1z" /></svg>
                  </button>
                  <div style={{ flex: 1 }}>
                    <div style={{ width: '100%', height: 4, background: '#d4d4d4', borderRadius: 2 }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#525150', marginTop: 5 }}>
                      <span>0:00</span><span>4:30</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Фото */}
            <div style={{ marginBottom: 52 }}>
              <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#525150', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                Фотографії
                <span style={{ flex: 1, height: 1, background: '#d4d4d4' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {imgSrc ? (
                  <>
                    <img src={imgSrc} alt={meeting.title} style={{ gridColumn: 'span 2', aspectRatio: '16/7', objectFit: 'cover', width: '100%', display: 'block' }} />
                    <div style={{ aspectRatio: '4/3', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#525150', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '.07em' }}>Фото PIJL</div>
                    <div style={{ aspectRatio: '4/3', background: '#d4d4d4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#525150', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '.07em' }}>Фото PIJL</div>
                  </>
                ) : (
                  <>
                    <div style={{ gridColumn: 'span 2', aspectRatio: '16/7', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#525150', fontWeight: 600, textTransform: 'uppercase' as const }}>Фото PIJL</div>
                    <div style={{ aspectRatio: '4/3', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#525150', fontWeight: 600, textTransform: 'uppercase' as const }}>Фото PIJL</div>
                    <div style={{ aspectRatio: '4/3', background: '#d4d4d4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#525150', fontWeight: 600, textTransform: 'uppercase' as const }}>Фото PIJL</div>
                  </>
                )}
              </div>
            </div>

            {/* Відео */}
            <div style={{ marginBottom: 52 }}>
              <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#525150', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                Відео з таунхолу
                <span style={{ flex: 1, height: 1, background: '#d4d4d4' }} />
              </div>
              <div style={{ width: '100%', aspectRatio: '16/9', background: '#111', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: 12, position: 'relative' as const }}>
                {imgSrc && <img src={imgSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, opacity: 0.3 }} />}
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', border: '2px solid rgba(255,255,255,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="18" viewBox="0 0 16 18" fill="white"><path d="M1 1l14 8-14 8V1z" /></svg>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,.45)', fontSize: 13 }}>Змонтований ролик PIJL · YouTube</p>
                </div>
              </div>
            </div>

          </main>

          {/* SIDEBAR */}
          <aside>

            {/* Ключові висновки */}
            <div style={{ border: '1px solid #d4d4d4', padding: 24, marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: '#525150', marginBottom: 16 }}>Ключові висновки</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                {['Учасники визначили ключові прогалини у взаємодії між постраждалими та слідчими',
                  'Необхідно створити єдину точку доступу до інформації про провадження',
                  'Рекомендовано залучення міжнародних спостерігачів до моніторингу справ',
                  'Потреба у психологічній підтримці для учасників судових процесів'].map((text, i) => (
                  <li key={i} style={{ fontSize: 14, lineHeight: 1.6, paddingLeft: 18, position: 'relative', color: '#333' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#2E7D32', fontWeight: 700 }}>→</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Медіа */}
            <div style={{ border: '1px solid #d4d4d4', padding: 24, marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: '#525150', marginBottom: 16 }}>Матеріали в медіа</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
                {[
                  { type: 'Стаття', title: 'Публікація за результатами зустрічі', src: 'PIJL · 2024' },
                  { type: 'Фільм', title: 'Документальний ролик PIJL', src: 'YouTube · PIJL · 2024' },
                  { type: 'Стаття', title: 'Коментар учасника зустрічі', src: 'Медіа · 2024' },
                ].map(({ type, title, src }, i) => (
                  <li key={i} style={{ paddingBottom: 14, borderBottom: i < 2 ? '1px solid #d4d4d4' : 'none' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: '#525150', marginBottom: 3 }}>{type}</div>
                    <a href="#" style={{ fontSize: 14, fontWeight: 600, color: '#151414', textDecoration: 'none', lineHeight: 1.4, display: 'block' }}>{title}</a>
                    <div style={{ fontSize: 12, color: '#525150', marginTop: 2 }}>{src}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ще в цій темі */}
            <div style={{ border: '1px solid #d4d4d4', padding: 24 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: '#525150', marginBottom: 16 }}>Ще в цій темі</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
                {[
                  { type: themeTitle, title: 'Авдіївка', href: '/townhalls/avdiivka', src: '2024 · Донецька обл.' },
                  { type: themeTitle, title: 'Укрзалізниця', href: '/townhalls/ukrzaliznytsia', src: '2026 · Краматорськ' },
                ].map(({ type, title, href, src }, i) => (
                  <li key={i} style={{ paddingBottom: 14, borderBottom: i < 1 ? '1px solid #d4d4d4' : 'none' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: '#525150', marginBottom: 3 }}>{type}</div>
                    <Link href={href} style={{ fontSize: 14, fontWeight: 600, color: '#151414', textDecoration: 'none', lineHeight: 1.4, display: 'block' }}>{title}</Link>
                    <div style={{ fontSize: 12, color: '#525150', marginTop: 2 }}>{src}</div>
                  </li>
                ))}
              </ul>
            </div>

          </aside>
        </div>
      </div>
    </>
  )
}
