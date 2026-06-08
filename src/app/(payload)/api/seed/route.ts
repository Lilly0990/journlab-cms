import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

const THEMES = [
  { title: 'Меморіалізація', slug: 'mem', color: 'white', order: 1, subtitle: 'Пам\'ять, увічнення, визнання' },
  { title: 'Потерпілі та правоохоронці', slug: 'vic', color: 'purple', order: 2, subtitle: 'Жертви, свідки, слідство' },
  { title: 'Децентралізація', slug: 'dec', color: 'cyan', order: 3, subtitle: 'Місцеве самоврядування' },
  { title: 'Колаборанти', slug: 'col', color: 'red', order: 4, subtitle: 'Відповідальність і покарання' },
  { title: 'Ліміти мирної угоди', slug: 'lim', color: 'lime', order: 5, subtitle: 'Деокуповані громади' },
]

const MEETINGS = [
  {
    title: 'Ягідне',
    slug: 'yahidne',
    themeSlug: 'mem',
    location: 'Чернігівська обл.',
    date: '2024-04-08T00:00:00.000Z',
    participants: 85,
    summary: 'Перша зустріч у форматі таунхолу з мешканцями Ягідного — села, де понад 300 людей утримувалися в підвалі школи. Обговорювали шляхи меморіалізації та ролі прокуратури.',
  },
  {
    title: 'Авдіївка',
    slug: 'avdiivka',
    themeSlug: 'mem',
    location: 'Донецька обл.',
    date: '2024-09-12T00:00:00.000Z',
    participants: 62,
    summary: 'Таунхол з мешканцями Авдіївки та учасниками Донбаського медіафоруму. Обговорювали документування руйнувань та перспективи правосуддя.',
  },
  {
    title: 'Херсон і Миколаїв',
    slug: 'kherson-mykolaiv',
    themeSlug: 'vic',
    location: 'Південь України',
    date: '2024-06-20T00:00:00.000Z',
    participants: 110,
    summary: 'Зустріч з потерпілими з Херсонської та Миколаївської областей. Досвід взаємодії з прокуратурою та доступ до правосуддя.',
  },
  {
    title: 'Харківщина',
    slug: 'kharkiv',
    themeSlug: 'vic',
    location: 'Балаклія, Ізюм, Гроза',
    date: '2025-02-14T00:00:00.000Z',
    participants: 94,
    summary: 'Таунхол у деокупованих громадах Харківщини. Мешканці розповіли про злочини окупантів і очікування від судових процесів.',
  },
  {
    title: 'Деокуповані громади півдня',
    slug: 'deoccupied-south',
    themeSlug: 'lim',
    location: 'Південь України',
    date: '2026-07-01T00:00:00.000Z',
    participants: 78,
    summary: 'Представники деокупованих громад та міжнародні спостерігачі обговорювали принципи справедливого миру.',
  },
]

export async function GET(req: Request) {
  const secret = new URL(req.url).searchParams.get('secret')
  if (secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config: configPromise })
  const results: string[] = []

  // Seed themes
  const themeIds: Record<string, string> = {}
  for (const t of THEMES) {
    const existing = await payload.find({ collection: 'themes', where: { slug: { equals: t.slug } } })
    if (existing.docs.length > 0) {
      themeIds[t.slug] = existing.docs[0].id as string
      results.push(`✓ Theme "${t.title}" exists`)
    } else {
      const created = await payload.create({ collection: 'themes', data: t })
      themeIds[t.slug] = created.id as string
      results.push(`✅ Created theme "${t.title}"`)
    }
  }

  // Seed meetings
  for (const m of MEETINGS) {
    const existing = await payload.find({ collection: 'meetings', where: { slug: { equals: m.slug } } })
    if (existing.docs.length > 0) {
      results.push(`✓ Meeting "${m.title}" exists`)
    } else {
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
      results.push(`✅ Created meeting "${m.title}"`)
    }
  }

  return NextResponse.json({ ok: true, results })
}
