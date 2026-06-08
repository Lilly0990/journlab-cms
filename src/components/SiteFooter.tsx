export function SiteFooter() {
  return (
    <footer style={{ background: '#151414', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 48px', marginTop: 48 }}>
      <div style={{ fontSize: 14 }}>PIJL · Лабораторія журналістики суспільного інтересу</div>
      <div style={{ display: 'flex', gap: 24 }}>
        {[
          { href: 'https://journlab.online/news', label: 'Новини' },
          { href: 'https://journlab.online/publications', label: 'Публікації' },
          { href: 'https://journlab.online/team', label: 'Команда' },
          { href: 'https://journlab.online/donations', label: 'Підтримати' },
        ].map(({ href, label }) => (
          <a key={href} href={href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>{label}</a>
        ))}
      </div>
    </footer>
  )
}
