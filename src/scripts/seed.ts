import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../../payload.config'

const THEMES = [
  { title: 'Меморіалізація', slug: 'mem', color: 'white', order: 1, subtitle: 'Пам\'ять, увічнення, визнання' },
  { title: 'Потерпілі та правоохоронці', slug: 'vic', color: 'purple', order: 2, subtitle: 'Жертви, свідки, слідство' },
  { title: 'Децентралізація', slug: 'dec', color: 'cyan', order: 3, subtitle: 'Місцеве самоврядування' },
  { title: 'Колаборанти', slug: 'col', color: 'red', order: 4, subtitle: 'Відповідальність і покарання' },
  { title: 'Ліміти мирної угоди', slug: 'lim', color: 'lime', order: 5, subtitle: 'Деокуповані громади' },
]

const MEETINGS_SEED = [
  {
    title: 'Ягідне',
    slug: 'yahidne',
    themeSlug: 'mem',
    location: 'Чернігівська обл.',
    date: '2024-04-08',
    participants: 85,
    summary: 'Перша зустріч у форматі таунхолу з мешканцями Ягідного — села, де понад 300 людей утримувалися в підвалі школи. Обговорювали шляхи меморіалізації та ролі прокуратури.',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Yahidne_IMG_6671_%2853023251893%29.jpg',
  },
  {
    title: 'Авдіївка',
    slug: 'avdiivka',
    themeSlug: 'mem',
    location: 'Донецька обл.',
    date: '2024-09-12',
    participants: 62,
    summary: 'Таунхол з мешканцями Авдіївки та учасниками Донбаського медіафоруму. Обговорювали документування руйнувань та перспективи правосуддя за знищення міської інфраструктури.',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/A_destroyed_school_building_in_Irpin_after_the_invasion_of_Russian_troops_p1.jpg',
  },
  {
    title: 'Херсон і Миколаїв',
    slug: 'kherson-mykolaiv',
    themeSlug: 'vic',
    location: 'Південь України',
    date: '2024-06-20',
    participants: 110,
    summary: 'Зустріч з потерпілими з Херсонської та Миколаївської областей. Обговорювали досвід взаємодії з прокуратурою, виклики збору доказів та доступ до правосуддя.',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Destroyed_residential_buildings_in_Mykolaiv.jpg',
  },
  {
    title: 'Харківщина',
    slug: 'kharkiv',
    themeSlug: 'vic',
    location: 'Балаклія, Ізюм, Гроза',
    date: '2025-02-14',
    participants: 94,
    summary: 'Таунхол у деокупованих громадах Харківщини. Мешканці Балаклії, Ізюму та Грози розповіли про злочини окупантів, документування та очікування від судових процесів.',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Kharkiv_downtown_street_destroyed_by_Russian_bombardment.jpg',
  },
  {
    title: 'Деокуповані громади півдня',
    slug: 'deoccupied-south',
    themeSlug: 'lim',
    location: 'Південь України',
    date: '2026-07-01',
    participants: 78,
    summary: 'Перша зустріч у форматі таунхолу присвячена питанням мирних переговорів та їх меж. Представники деокупованих громад та міжнародні спостерігачі обговорювали принципи справедливого миру.',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Today_is_a_historic_day%2C_we_are_regaining_Kherson_-_address_by_the_President_of_Ukraine._%2852493216834%29.jpg',
  },
]

async function seed() {
  const payload = await getPayload({ config: configPromise })

  console.log('🌱 Seeding themes...')
  const themeIds: Record<string, string> = {}

  for (const t of THEMES) {
    const existing = await payload.find({ collection: 'themes', where: { slug: { equals: t.slug } } })
    if (existing.docs.length > 0) {
      themeIds[t.slug] = existing.docs[0].id as string
      console.log(`  ✓ Theme "${t.title}" already exists`)
      continue
    }
    const created = await payload.create({ collection: 'themes', data: t })
    themeIds[t.slug] = created.id as string
    console.log(`  ✅ Created theme "${t.title}"`)
  }

  console.log('\n🌱 Seeding meetings...')
  for (const m of MEETINGS_SEED) {
    const existing = await payload.find({ collection: 'meetings', where: { slug: { equals: m.slug } } })
    if (existing.docs.length > 0) {
      console.log(`  ✓ Meeting "${m.title}" already exists`)
      continue
    }
    await payload.create({
      collection: 'meetings',
      data: {
        title: m.title,
        slug: m.slug,
        theme: themeIds[m.themeSlug],
        location: m.location,
        date: m.date,
        participants: m.participants,
        summary: m.summary,
        status: 'published',
      },
    })
    console.log(`  ✅ Created meeting "${m.title}"`)
  }

  console.log('\n🎉 Seed complete! Open http://localhost:3000/admin to see the data.')
  process.exit(0)
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
