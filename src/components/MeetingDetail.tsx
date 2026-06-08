import Link from 'next/link'
import type { Meeting } from '@/types/cms'

export function MeetingDetail({ meeting }: { meeting: Meeting }) {
  const theme = typeof meeting.theme === 'object' && meeting.theme ? meeting.theme : null
  const themeSlug = theme?.slug ?? ''
  const themeTitle = theme?.title ?? ''

  return (
    <article style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Breadcrumbs */}
      <nav style={{ fontSize: 13, color: '#525150', marginBottom: 24, display: 'flex', gap: 8, alignItems: 'center' }}>
        <Link href="/townhalls" style={{ color: '#8B82FF', textDecoration: 'none' }}>Таунхоли</Link>
        <span>›</span>
        {themeTitle && (
          <>
            <Link href={`/townhalls?theme=${themeSlug}`} style={{ color: '#8B82FF', textDecoration: 'none' }}>{themeTitle}</Link>
            <span>›</span>
          </>
        )}
        <span>{meeting.title}</span>
      </nav>

      {/* Cover */}
      {meeting.coverImage?.url && (
        <div style={{ borderRadius: 8, overflow: 'hidden', marginBottom: 32, aspectRatio: '16/6', position: 'relative' }}>
          <img src={meeting.coverImage.url} alt={meeting.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {meeting.location && (
            <span style={{ position: 'absolute', bottom: 16, left: 20, fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(0,0,0,0.5)', padding: '4px 10px', borderRadius: 4 }}>
              {meeting.location}
            </span>
          )}
        </div>
      )}

      {/* Meta */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 24, fontSize: 13, color: '#525150' }}>
        {meeting.date && <span>📅 {new Date(meeting.date).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
        {meeting.location && <span>📍 {meeting.location}</span>}
        {meeting.participants && <span>👥 {meeting.participants} учасників</span>}
      </div>

      {/* Title */}
      <h1 style={{ fontFamily: "'Source Sans 3', Arial, sans-serif", fontSize: 48, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 20 }}>
        {meeting.title}
      </h1>

      {meeting.summary && (
        <p style={{ fontSize: 18, color: '#525150', lineHeight: 1.7, marginBottom: 32, borderLeft: '3px solid #C9FF8F', paddingLeft: 20 }}>
          {meeting.summary}
        </p>
      )}

      {/* Audio */}
      {meeting.audioUrl && (
        <div style={{ background: '#151414', borderRadius: 8, padding: '16px 20px', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ background: '#75EDFF', color: '#000', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>▶</span>
          <div>
            <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>Аудіозапис зустрічі</div>
            <a href={meeting.audioUrl} style={{ color: '#75EDFF', fontSize: 12 }} target="_blank" rel="noopener noreferrer">Слухати →</a>
          </div>
        </div>
      )}

      {/* PDF */}
      {meeting.pdfUrl && (
        <div style={{ marginBottom: 32 }}>
          <a
            href={meeting.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f5f5f5', border: '1px solid #d4d4d4', borderRadius: 6, padding: '10px 18px', textDecoration: 'none', color: '#151414', fontSize: 14 }}
          >
            📄 Завантажити стенограму (PDF)
          </a>
        </div>
      )}

      {/* Conclusions */}
      {meeting.conclusions != null && (
        <div style={{ background: '#f9f9f9', borderRadius: 8, padding: '24px 28px', marginTop: 40 }}>
          <h2 style={{ fontFamily: "'Source Sans 3', Arial", fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
            Висновки та рекомендації
          </h2>
          <p style={{ color: '#525150', fontSize: 16 }}>[Висновки завантажуються з CMS]</p>
        </div>
      )}

      {/* Back */}
      <div style={{ marginTop: 48 }}>
        <Link href="/townhalls" style={{ color: '#8B82FF', textDecoration: 'none', fontSize: 15, fontWeight: 600 }}>
          ← Повернутись до всіх таунхолів
        </Link>
      </div>
    </article>
  )
}
