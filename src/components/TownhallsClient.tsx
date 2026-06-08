'use client'

import { useState } from 'react'
import Link from 'next/link'

const COLOR_MAP: Record<string, { bg: string; text: string; dot: string }> = {
  cyan:   { bg: '#75EDFF', text: '#000', dot: '#000' },
  lime:   { bg: '#C9FF8F', text: '#000', dot: '#000' },
  purple: { bg: '#8B82FF', text: '#fff', dot: '#fff' },
  red:    { bg: '#ED4A35', text: '#fff', dot: '#fff' },
  white:  { bg: '#000000', text: '#C9FF8F', dot: '#C9FF8F' },
}

type Theme = { id: string; title: string; slug: string; subtitle?: string; color?: string; order?: number }
type Meeting = {
  id: string; title: string; slug: string; summary?: string
  location?: string; date?: string; participants?: number
  coverImage?: { url?: string } | null
  theme?: { slug: string } | string | null
}

export function TownhallsClient({ themes, meetings }: { themes: Theme[]; meetings: Meeting[] }) {
  const [activeTheme, setActiveTheme] = useState<string | null>(themes[0]?.slug ?? null)
  const [carIdx, setCarIdx] = useState(0)

  const CARD_STEP = 300
  const VISIBLE = 4

  const filteredMeetings = meetings.filter(m => {
    const themeSlug = typeof m.theme === 'object' && m.theme ? (m.theme as Theme).slug : m.theme
    return themeSlug === activeTheme
  })

  function selectTheme(slug: string) {
    if (activeTheme === slug) { setActiveTheme(null); return }
    setActiveTheme(slug)
    setCarIdx(0)
  }

  const maxIdx = Math.max(0, filteredMeetings.length - VISIBLE)

  return (
    <>
      {/* Hero */}
      <section style={{ padding: '48px 48px 32px', background: '#fff' }}>
        <h1 style={{ fontFamily: "'Source Sans 3', Arial, sans-serif", fontSize: 72, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 16 }}>
          Таунхоли
        </h1>
        <p style={{ fontSize: 18, color: '#525150', maxWidth: 620, lineHeight: 1.6 }}>
          Відкриті зустрічі громад з органами, що розслідують воєнні злочини. Документуємо обговорення, зберігаємо результати.
        </p>
      </section>

      {/* Podcast bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '16px 48px', background: '#151414', color: '#fff' }}>
        <span style={{ background: '#C9FF8F', color: '#000', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 4 }}>
          Подкаст
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Source Sans 3', Arial", fontWeight: 700, fontSize: 15 }}>
            Таунхоли: що ми дізналися за два роки зустрічей
          </div>
          <div style={{ fontSize: 13, opacity: 0.6 }}>Спеціальний випуск «Коли все має значення» · ~30 хв</div>
        </div>
        <a href="#" style={{ fontSize: 14, color: '#75EDFF', textDecoration: 'none', fontWeight: 600 }}>Слухайте →</a>
      </div>

      {/* Theme cards */}
      <section style={{ padding: '40px 48px 0' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#525150', marginBottom: 16 }}>
          Теми зустрічей
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
          {themes.map(theme => {
            const c = COLOR_MAP[theme.color ?? 'white'] ?? COLOR_MAP.white
            const isActive = activeTheme === theme.slug
            const count = meetings.filter(m => {
              const ts = typeof m.theme === 'object' && m.theme ? (m.theme as Theme).slug : m.theme
              return ts === theme.slug
            }).length
            return (
              <button
                key={theme.id}
                onClick={() => selectTheme(theme.slug)}
                style={{
                  background: isActive ? c.bg : '#151414',
                  color: isActive ? c.text : 'rgba(255,255,255,0.7)',
                  border: 'none', cursor: 'pointer', textAlign: 'left',
                  padding: '20px 20px 16px', borderRadius: 6, transition: 'all .2s',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                <div style={{ fontSize: 32, fontWeight: 900, fontFamily: "'Source Sans 3', Arial", lineHeight: 1 }}>{count}</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginTop: 8, lineHeight: 1.3 }}>{theme.title}</div>
                <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>{count} {count === 1 ? 'зустріч' : count < 5 ? 'зустрічі' : 'зустрічей'}</div>
                <div style={{ fontSize: 11, marginTop: 12, opacity: 0.5 }}>↕ Переглянути</div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Meetings carousel */}
      {activeTheme && filteredMeetings.length > 0 && (
        <div style={{ padding: '32px 48px 48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ fontFamily: "'Source Sans 3', Arial", fontSize: 24, fontWeight: 700 }}>
              {themes.find(t => t.slug === activeTheme)?.title}
            </h2>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setCarIdx(Math.max(0, carIdx - 1))}
                disabled={carIdx === 0}
                style={{ width: 36, height: 36, border: '1px solid #d4d4d4', background: carIdx === 0 ? '#f5f5f5' : '#fff', cursor: carIdx === 0 ? 'not-allowed' : 'pointer', borderRadius: 4, fontSize: 16 }}
              >←</button>
              <button
                onClick={() => setCarIdx(Math.min(maxIdx, carIdx + 1))}
                disabled={carIdx >= maxIdx}
                style={{ width: 36, height: 36, border: '1px solid #d4d4d4', background: carIdx >= maxIdx ? '#f5f5f5' : '#fff', cursor: carIdx >= maxIdx ? 'not-allowed' : 'pointer', borderRadius: 4, fontSize: 16 }}
              >→</button>
            </div>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: 20, transform: `translateX(-${carIdx * CARD_STEP}px)`, transition: 'transform .3s ease' }}>
              {filteredMeetings.map(meeting => (
                <Link
                  key={meeting.id}
                  href={`/townhalls/${meeting.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit', flexShrink: 0, width: 280, border: '1px solid #e8e6e6', borderRadius: 8, overflow: 'hidden', background: '#fff', display: 'block' }}
                >
                  <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#e8e6e6' }}>
                    {meeting.coverImage?.url ? (
                      <img src={meeting.coverImage.url} alt={meeting.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#151414' }} />
                    )}
                    {meeting.location && (
                      <span style={{ position: 'absolute', bottom: 10, left: 12, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        {meeting.location}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '12px 14px 16px' }}>
                    {meeting.date && <div style={{ fontSize: 12, color: '#525150', marginBottom: 6 }}>{new Date(meeting.date).getFullYear()}</div>}
                    <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Source Sans 3', Arial", lineHeight: 1.3, marginBottom: 8 }}>{meeting.title}</div>
                    {meeting.summary && <div style={{ fontSize: 13, color: '#525150', lineHeight: 1.5, marginBottom: 12 }}>{meeting.summary}</div>}
                    <span style={{ fontSize: 13, color: '#8B82FF', fontWeight: 600 }}>Дізнатися →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTheme && filteredMeetings.length === 0 && (
        <div style={{ padding: '32px 48px', color: '#525150', fontStyle: 'italic' }}>
          Зустрічей по цій темі ще немає. Додайте через адмінку.
        </div>
      )}
    </>
  )
}
