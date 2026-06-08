export function SiteHeader() {
  return (
    <header style={{ background: '#fff', borderBottom: '1px solid #d4d4d4' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 48px', gap: 32 }}>
        <a href="https://journlab.online" style={{ display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none', flexShrink: 0 }}>
          <img
            src="https://static.wixstatic.com/media/ee3954_c02470860c564ae080dbb1923b68f8ab~mv2.png/v1/fill/w_100,h_100,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/color_transparent_edited.png"
            alt="ЛЖСІ логотип"
            width={72} height={72}
            style={{ objectFit: 'contain', flexShrink: 0 }}
          />
          <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 11, fontWeight: 700, lineHeight: 1.4, letterSpacing: '0.04em', textTransform: 'uppercase' as const, color: '#151414' }}>
            Лабораторія<br />журналістики<br />суспільного<br />інтересу
          </div>
        </a>

        <nav>
          <ul style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0 }}>
            {[
              { href: 'https://journlab.online/projects', label: 'Проєкти' },
              { href: '/townhalls', label: 'Таунхоли', active: true },
              { href: 'https://journlab.online/news', label: 'Новини' },
              { href: 'https://journlab.online/team', label: 'Команда' },
              { href: 'https://journlab.online/publications', label: 'Публікації' },
              { href: 'https://journlab.online/research', label: 'Дослідження' },
            ].map(({ href, label, active }) => (
              <li key={href}>
                <a href={href} style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 15, textDecoration: 'none', color: active ? '#8B82FF' : '#151414' }}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button style={{ fontFamily: 'Arial', fontSize: 14, padding: '5px 12px', border: '1px solid #d4d4d4', background: 'none', cursor: 'pointer', color: '#151414', display: 'flex', alignItems: 'center', gap: 4 }}>
          UK <span style={{ fontSize: 10 }}>▾</span>
        </button>
      </div>

      {/* Sub-bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 48px', borderTop: '1px solid #d4d4d4' }}>
        <a href="https://journlab.online/donations" style={{ fontFamily: 'Arial', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, padding: '7px 18px', border: '1.5px solid #151414', borderRadius: 24, textDecoration: 'none', color: '#151414', whiteSpace: 'nowrap' as const }}>
          Підтримати ЛЖСІ
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <a href="https://pijl.substack.com/subscribe" style={{ fontFamily: 'Arial', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, padding: '7px 18px', border: '1.5px solid #151414', borderRadius: 24, textDecoration: 'none', color: '#151414', whiteSpace: 'nowrap' as const }}>
            Підписатись на розсилку
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {[
              { href: 'https://www.instagram.com/pijl_ukraine', src: 'https://static.wixstatic.com/media/11062b_ca1d837ce7194421b781ee7384061a8e~mv2.png/v1/fill/w_22,h_22,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_ca1d837ce7194421b781ee7384061a8e~mv2.png', alt: 'Instagram' },
              { href: 'https://www.facebook.com/pijl.ukraine', src: 'https://static.wixstatic.com/media/0fdef751204647a3bbd7eaa2827ed4f9.png/v1/fill/w_22,h_22,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0fdef751204647a3bbd7eaa2827ed4f9.png', alt: 'Facebook' },
              { href: 'https://twitter.com/pijl_ukraine', src: 'https://static.wixstatic.com/media/c7d035ba85f6486680c2facedecdcf4d.png/v1/fill/w_22,h_22,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c7d035ba85f6486680c2facedecdcf4d.png', alt: 'Twitter' },
              { href: 'https://www.youtube.com/@pijl_ukraine', src: 'https://static.wixstatic.com/media/78aa2057f0cb42fbbaffcbc36280a64a.png/v1/fill/w_22,h_22,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/78aa2057f0cb42fbbaffcbc36280a64a.png', alt: 'YouTube' },
              { href: 'https://soundcloud.com/pijl', src: 'https://static.wixstatic.com/media/11062b_1f48824ff0894b909957bcb8c7e663e8~mv2.png/v1/fill/w_22,h_22,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_1f48824ff0894b909957bcb8c7e663e8~mv2.png', alt: 'SoundCloud' },
            ].map(({ href, src, alt }) => (
              <a key={href} href={href} title={alt} style={{ opacity: 0.75, display: 'flex' }}>
                <img src={src} alt={alt} width={22} height={22} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
