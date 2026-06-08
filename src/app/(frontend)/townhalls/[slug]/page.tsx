export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { MeetingDetail } from '@/components/MeetingDetail'
import type { Meeting } from '@/types/cms'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({ collection: 'meetings', where: { slug: { equals: slug } }, limit: 1 })
  const meeting = res.docs[0] as unknown as Meeting | undefined
  if (!meeting) return { title: 'Не знайдено' }
  return {
    title: `${meeting.title} | Таунхоли PIJL`,
    description: meeting.summary ?? '',
  }
}

export default async function MeetingPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({ collection: 'meetings', where: { slug: { equals: slug } }, limit: 1, depth: 2 })
  const meeting = res.docs[0] as unknown as Meeting | undefined
  if (!meeting) notFound()

  return (
    <>
      <SiteHeader />
      <MeetingDetail meeting={meeting} />
      <SiteFooter />
    </>
  )
}
