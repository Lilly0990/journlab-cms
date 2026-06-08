export function SiteHeader() {
  return (
    <header style={{ background: '#fff', borderBottom: '1px solid #d4d4d4' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 48px', gap: 32 }}>
        <a href="https://journlab.online" style={{ display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none' }}>
          <img
            src="https://static.wixstatic.com/media/ee3954_c02470860c564ae080dbb1923b68f8ab~mv2.png/v1/fill/w_100,h_100,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/color_transparent_edited.png"
            alt="ЛЖСІ"
            width={72} height={72}
            style={{ objectFit: 'contain' }}
          />
          <div style={{ fontFamily: 'Arial', fontSize: 11, fontWeight: 700, lineHeight: 1.4, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#151414' }}>
            Лабораторія<br />журналістики<br />суспільного<br />інтересу
          </div>
        </a>

        <nav>
          <ul style={{ display: 'flex', gap: 32, listStyle: 'none' }}>
            {[
              { href: 'https://journlab.online/projects', label: 'Проєкти' },
              { href: '/townhalls', label: 'Таунхоли', active: true },
              { href: 'https://journlab.online/news', label: 'Новини' },
              { href: 'https://journlab.online/team', label: 'Команда' },
              { href: 'https://journlab.online/publications', label: 'Публікації' },
              { href: 'https://journlab.online/research', label: 'Дослідження' },
            ].map(({ href, label, active }) => (
              <li key={href}>
                <a href={href} style={{ fontFamily: 'Arial', fontSize: 15, textDecoration: 'none', color: active ? '#8B82FF' : '#151414' }}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button style={{ fontFamily: 'Arial', fontSize: 14, background: 'none', border: '1px solid #d4d4d4', borderRadius: 4, padding: '6px 12px', cursor: 'pointer' }}>
          UK ▾
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 48px', background: '#f5f5f5', borderTop: '1px solid #d4d4d4' }}>
        <a href="https://journlab.online/donations" style={{ fontSize: 13, color: '#151414', textDecoration: 'none', background: '#fff', border: '1px solid #d4d4d4', borderRadius: 20, padding: '4px 14px' }}>
          Підтримати ЛЖСІ
        </a>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href="https://pijl.substack.com/subscribe" style={{ fontSize: 13, color: '#151414', textDecoration: 'none', background: '#fff', border: '1px solid #d4d4d4', borderRadius: 20, padding: '4px 14px' }}>
            Підписатись на розсилку
          </a>
        </div>
      </div>
    </header>
  )
}
