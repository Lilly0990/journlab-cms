export function SiteFooter() {
  return (
    <footer style={{ background: '#C9FF8F', padding: '40px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 80 }}>
      <div style={{ fontFamily: "'Source Sans 3', Arial, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>
        PIJL · Лабораторія журналістики суспільного інтересу
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        {[
          { href: 'https://journlab.online/news', label: 'Новини' },
          { href: 'https://journlab.online/publications', label: 'Публікації' },
          { href: 'https://journlab.online/team', label: 'Команда' },
          { href: 'https://journlab.online/donations', label: 'Підтримати' },
        ].map(({ href, label }) => (
          <a key={href} href={href} style={{ fontSize: 13, color: '#151414', textDecoration: 'none', opacity: 0.7 }}>{label}</a>
        ))}
      </div>
    </footer>
  )
}
