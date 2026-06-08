export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { TownhallsClient } from '@/components/TownhallsClient'
import type { Theme, Meeting } from '@/types/cms'

export const metadata = {
  title: 'Таунхоли | PIJL',
  description: 'Відкриті зустрічі громад з органами, що розслідують воєнні злочини.',
}

export default async function TownhallsPage() {
  const payload = await getPayload({ config: configPromise })

  const [themesRes, meetingsRes] = await Promise.all([
    payload.find({ collection: 'themes', sort: 'order', limit: 10 }),
    payload.find({ collection: 'meetings', where: { status: { equals: 'published' } }, limit: 100, depth: 1 }),
  ])

  return (
    <>
      <SiteHeader />
      <TownhallsClient
        themes={themesRes.docs as unknown as Theme[]}
        meetings={meetingsRes.docs as unknown as Meeting[]}
      />
      <SiteFooter />
    </>
  )
}
