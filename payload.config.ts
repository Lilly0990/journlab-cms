import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { fileURLToPath } from 'url'
import path from 'path'
import sharp from 'sharp'

import { Meetings } from './src/collections/Meetings'
import { Themes } from './src/collections/Themes'
import { Media } from './src/collections/Media'
import { Users } from './src/collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const THEMES_DATA = [
  { title: 'Меморіалізація', slug: 'mem', color: 'white', order: 1, subtitle: 'Пам\'ять, увічнення, визнання' },
  { title: 'Потерпілі та правоохоронці', slug: 'vic', color: 'purple', order: 2, subtitle: 'Жертви, свідки, слідство' },
  { title: 'Децентралізація', slug: 'dec', color: 'cyan', order: 3, subtitle: 'Місцеве самоврядування' },
  { title: 'Колаборанти', slug: 'col', color: 'red', order: 4, subtitle: 'Відповідальність і покарання' },
  { title: 'Ліміти мирної угоди', slug: 'lim', color: 'lime', order: 5, subtitle: 'Деокуповані громади' },
]

const MEETINGS_DATA = [
  { title: 'Ягідне', slug: 'yahidne', themeSlug: 'mem', location: 'Чернігівська обл.', date: '2024-04-08T00:00:00.000Z', participants: 85, summary: 'Перша зустріч у форматі таунхолу з мешканцями Ягідного — села, де понад 300 людей утримувалися в підвалі школи. Обговорювали шляхи меморіалізації та ролі прокуратури.' },
  { title: 'Авдіївка', slug: 'avdiivka', themeSlug: 'mem', location: 'Донецька обл.', date: '2024-09-12T00:00:00.000Z', participants: 62, summary: 'Таунхол з мешканцями Авдіївки та учасниками Донбаського медіафоруму. Обговорювали документування руйнувань та перспективи правосуддя.' },
  { title: 'Херсон і Миколаїв', slug: 'kherson-mykolaiv', themeSlug: 'vic', location: 'Південь України', date: '2024-06-20T00:00:00.000Z', participants: 110, summary: 'Зустріч з потерпілими з Херсонської та Миколаївської областей. Досвід взаємодії з прокуратурою та доступ до правосуддя.' },
  { title: 'Харківщина', slug: 'kharkiv', themeSlug: 'vic', location: 'Балаклія, Ізюм, Гроза', date: '2025-02-14T00:00:00.000Z', participants: 94, summary: 'Таунхол у деокупованих громадах Харківщини. Мешканці розповіли про злочини окупантів і очікування від судових процесів.' },
  { title: 'Деокуповані громади півдня', slug: 'deoccupied-south', themeSlug: 'lim', location: 'Південь України', date: '2026-07-01T00:00:00.000Z', participants: 78, summary: 'Представники деокупованих громад та міжнародні спостерігачі обговорювали принципи справедливого миру.' },
]

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— JournalLab',
      title: 'JournalLab CMS',
    },
  },
  collections: [Meetings, Themes, Media, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'journlab-secret-dev',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./journlab.db',
    },
  }),
  sharp,
  plugins: [],
  async onInit(payload) {
    // In production (Vercel), pushDevSchema is skipped by connect.js.
    // We force-push the schema here to ensure tables exist on every cold start.
    if (process.env.NODE_ENV === 'production') {
      const db = payload.db as any
      const { pushSchema } = db.requireDrizzleKit()
      const { apply, warnings } = await pushSchema(db.schema, db.drizzle)
      await apply()
      payload.logger.info(`✅ Schema pushed (warnings: ${warnings.length})`)
    }

    const themesCount = await payload.find({ collection: 'themes', limit: 1 })
    if (themesCount.totalDocs > 0) return

    payload.logger.info('Seeding initial data...')
    const themeIds: Record<string, string> = {}

    for (const t of THEMES_DATA) {
      const created = await payload.create({ collection: 'themes', data: t })
      themeIds[t.slug] = created.id as string
    }

    for (const m of MEETINGS_DATA) {
      await payload.create({
        collection: 'meetings',
        data: {
          title: m.title, slug: m.slug, theme: themeIds[m.themeSlug],
          location: m.location, date: m.date, participants: m.participants,
          summary: m.summary, status: 'published',
        },
      })
    }

    payload.logger.info('✅ Seed complete: 5 themes, 5 meetings')
  },
})
