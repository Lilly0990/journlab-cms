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
})
