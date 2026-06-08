'use client'

import { useState } from 'react'
import Link from 'next/link'

const THEME_STYLES: Record<string, { bg: string; border: string; imgUrl: string }> = {
  mem: {
    bg: '#1C2B35', border: '#75EDFF',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Secretary_Blinken_Participates_in_a_Donbas_Conflict_Memorial_Flower_Laying_With_Ukrainian_Foreign_Minister_Dmytro_Kuleba_and_Metropolitan_Epiphaniy_%2851170704501%29.jpg',
  },
  vic: {
    bg: '#1E2A4A', border: '#8B82FF',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Destroyed_residential_buildings_in_Mykolaiv.jpg',
  },
  dec: {
    bg: '#1A2E24', border: '#C9FF8F',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Yahidne_IMG_6671_%2853023251893%29.jpg',
  },
  col: {
    bg: '#2A1C1A', border: '#ED4A35',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Kharkiv_downtown_street_destroyed_by_Russian_bombardment.jpg',
  },
  lim: {
    bg: '#1E1E2E', border: '#8B82FF',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Volodymyr_Zelenskyy_took_part_in_the_raising_of_the_flag_of_Ukraine_at_the_Memorial_to_the_Defenders_of_the_Bucha_Community_and_presented_awards._%2853727245777%29.jpg',
  },
}

type Theme = { id: string; title: string; slug: string; subtitle?: string; color?: string; order?: number }
type Meeting = {
  id: string; title: string; slug: string; summary?: string
  location?: string; date?: string; participants?: number
  coverImage?: { url?: string } | null
  theme?: { slug: string } | string | null
  img?: string
}

export function TownhallsClient({ themes, meetings }: { themes: Theme[]; meetings: Meeting[] }) {
  const [activeTheme, setActiveTheme] = useState<string | null>(themes[0]?.slug ?? null)
  const [carIdx, setCarIdx] = useState(0)

  const CARD_STEP = 300
  const VISIBLE = 4

  const filteredMeetings = meetings.filter(m => {
    const slug = typeof m.theme === 'object' && m.theme ? (m.theme as Theme).slug : m.theme
    return slug === activeTheme
  })

  function selectTheme(slug: string) {
    if (activeTheme === slug) { setActiveTheme(null); return }
    setActiveTheme(slug)
    setCarIdx(0)
  }

  const maxIdx = Math.max(0, filteredMeetings.length - VISIBLE)
  const activeMeta = themes.find(t => t.slug === activeTheme)

  return (
    <>
      {/* HERO — cyan */}
      <section style={{ background: '#75EDFF', padding: '56px 80px 64px' }}>
        <h1 style={{ fontFamily: "'Source Sans 3', Arial, sans-serif", fontSize: 72, fontWeight: 900, lineHeight: 1, letterSpacing: '-1px', color: '#000', marginBottom: 16 }}>
          Таунхоли
        </h1>
        <p style={{ fontSize: 18, maxWidth: 560, lineHeight: 1.6, color: '#000' }}>
          Відкриті зустрічі громад з органами, що розслідують воєнні злочини. Документуємо обговорення, зберігаємо результати.
        </p>
      </section>

      {/* PODCAST BAR — lime */}
      <div style={{ background: '#C9FF8F', padding: '16px 80px', display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, whiteSpace: 'nowrap' as const, color: '#151414', border: '1.5px solid #151414', borderRadius: 20, padding: '4px 12px' }}>
          Подкаст
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Source Sans 3', Arial", fontSize: 16, fontWeight: 700, color: '#000' }}>
            Таунхоли: що ми дізналися за два роки зустрічей
          </div>
          <div style={{ fontSize: 13, color: '#525150', marginTop: 2 }}>
            Спеціальний випуск «Коли все має значення» · ~30 хв
          </div>
        </div>
        <a href="#" style={{ fontFamily: 'Arial', fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' as const, padding: '8px 20px', background: '#151414', color: '#fff', textDecoration: 'none', whiteSpace: 'nowrap' as const }}>
          Слухайте →
        </a>
      </div>

      {/* THEME CARDS */}
      <section style={{ padding: '56px 80px' }}>
        <p style={{ fontFamily: 'Arial', fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: '#525150', marginBottom: 24 }}>
          Теми зустрічей
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {themes.map(theme => {
            const ts = THEME_STYLES[theme.slug] ?? THEME_STYLES.mem
            const isActive = activeTheme === theme.slug
            const count = meetings.filter(m => {
              const s = typeof m.theme === 'object' && m.theme ? (m.theme as Theme).slug : m.theme
              return s === theme.slug
            }).length
            return (
              <button
                key={theme.id}
                onClick={() => selectTheme(theme.slug)}
                style={{
                  background: ts.bg,
                  borderTop: `4px solid ${ts.border}`,
                  border: `none`,
                  borderTopColor: ts.border,
                  borderTopWidth: 4,
                  borderTopStyle: 'solid' as const,
                  borderLeft: 'none', borderRight: 'none', borderBottom: 'none',
                  cursor: 'pointer', textAlign: 'left' as const,
                  padding: '32px 24px 24px',
                  minHeight: 200,
                  position: 'relative' as const,
                  overflow: 'hidden' as const,
                  outline: isActive ? '2px solid #000' : '2px solid transparent',
                  outlineOffset: 3,
                  transition: 'transform .18s, box-shadow .18s',
                }}
              >
                {/* BG image overlay */}
                <div style={{
                  position: 'absolute' as const, inset: 0,
                  backgroundImage: `url('${ts.imgUrl}')`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  opacity: isActive ? 0.28 : 0.18,
                  transition: 'opacity .3s',
                  zIndex: 0,
                }} />
                <div style={{ position: 'relative' as const, zIndex: 1 }}>
                  <div style={{ fontFamily: "'Source Sans 3', Arial", fontSize: 56, fontWeight: 900, lineHeight: 1, marginBottom: 12, color: 'rgba(255,255,255,.12)' }}>
                    {count}
                  </div>
                  <div style={{ fontFamily: "'Source Sans 3', Arial", fontSize: 17, fontWeight: 700, lineHeight: 1.3, flex: 1, color: 'rgba(255,255,255,.92)' }}>
                    {theme.title}
                  </div>
                  <div style={{ fontSize: 12, marginTop: 8, color: 'rgba(255,255,255,.45)' }}>
                    {count} {count === 1 ? 'зустріч' : count < 5 ? 'зустрічі' : 'зустрічей'}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: isActive ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.35)', marginTop: 16 }}>
                    ↕ Переглянути зустрічі
                  </div>
                </div>
                <span style={{ position: 'absolute' as const, bottom: 16, right: 18, fontSize: 16, color: isActive ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.3)', transform: isActive ? 'rotate(180deg)' : 'none', transition: 'color .15s, transform .2s' }}>
                  ↓
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* MEETINGS ACCORDION */}
      <div style={{ overflow: 'hidden', maxHeight: activeTheme && filteredMeetings.length > 0 ? 600 : 0, transition: 'max-height .5s cubic-bezier(.4,0,.2,1)' }}>
        <div style={{ padding: '0 80px 56px', borderTop: '3px solid #000' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '28px 0 24px' }}>
            <h2 style={{ fontFamily: "'Source Sans 3', Arial", fontSize: 24, fontWeight: 900 }}>
              {activeMeta?.title}
            </h2>
            <div style={{ display: 'flex', gap: 8 }}>
              {[{ dir: -1, label: '←', disabled: carIdx === 0 }, { dir: 1, label: '→', disabled: carIdx >= maxIdx }].map(({ dir, label, disabled }) => (
                <button
                  key={label}
                  onClick={() => setCarIdx(prev => Math.max(0, Math.min(prev + dir, maxIdx)))}
                  disabled={disabled}
                  style={{ width: 36, height: 36, border: '1.5px solid #151414', background: 'none', cursor: disabled ? 'default' : 'pointer', fontSize: 16, fontWeight: 700, opacity: disabled ? 0.3 : 1 }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: 20, transform: `translateX(-${carIdx * CARD_STEP}px)`, transition: 'transform .4s cubic-bezier(.4,0,.2,1)' }}>
              {filteredMeetings.map(meeting => {
                const themeSlug = typeof meeting.theme === 'object' && meeting.theme ? (meeting.theme as Theme).slug : (meeting.theme ?? 'mem')
                const placeholderColors: Record<string, string> = { mem: '#1a1a1a', vic: '#1d2d50', dec: '#0d4f3d', col: '#6b1a1a', lim: '#2d2d4f' }
                const placeholderBg = placeholderColors[themeSlug] ?? '#1a1a1a'
                const imgSrc = meeting.img ?? meeting.coverImage?.url
                const year = meeting.date ? new Date(meeting.date).getFullYear() : ''
                return (
                  <Link
                    key={meeting.id}
                    href={`/townhalls/${meeting.slug}`}
                    style={{ textDecoration: 'none', color: '#151414', flexShrink: 0, width: 280, border: '1px solid #d4d4d4', display: 'flex', flexDirection: 'column' as const }}
                  >
                    <div style={{ position: 'relative' as const, aspectRatio: '16/9', overflow: 'hidden', background: placeholderBg }}>
                      {imgSrc
                        ? <img src={imgSrc} alt={meeting.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        : null
                      }
                      <div style={{ position: 'absolute' as const, inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.6) 0%, transparent 55%)' }} />
                      {meeting.location && (
                        <span style={{ position: 'absolute' as const, bottom: 10, left: 12, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.8)', letterSpacing: '.06em', textTransform: 'uppercase' as const }}>
                          {meeting.location}
                        </span>
                      )}
                    </div>
                    <div style={{ padding: '16px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column' as const }}>
                      {year && <div style={{ fontSize: 12, color: '#525150', marginBottom: 4 }}>{year}</div>}
                      <div style={{ fontFamily: "'Source Sans 3', Arial", fontSize: 18, fontWeight: 700, lineHeight: 1.25, marginBottom: 6 }}>{meeting.title}</div>
                      {meeting.summary && (
                        <div style={{ fontSize: 12, color: '#525150', lineHeight: 1.5, flex: 1, marginBottom: 16 }}>
                          {meeting.participants ? `${meeting.participants} учасників` : meeting.summary.substring(0, 60) + '…'}
                        </div>
                      )}
                      <span style={{ fontFamily: 'Arial', fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' as const, padding: '8px 16px', background: '#C9FF8F', border: '1.5px solid #151414', color: '#151414', alignSelf: 'flex-start' as const }}>
                        Дізнатися →
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
