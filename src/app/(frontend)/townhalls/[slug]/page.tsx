import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { MeetingDetail } from '@/components/MeetingDetail'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

const MEETINGS = [
  {
    id: '1', title: 'Ягідне', slug: 'yahidne', theme: { id: '1', title: 'Меморіалізація', slug: 'mem', color: 'white' },
    location: 'Чернігівська обл.', date: '2024-04-08T00:00:00.000Z', participants: 85,
    summary: 'Перша зустріч у форматі таунхолу з мешканцями Ягідного — села, де понад 300 людей утримувалися в підвалі школи. Обговорювали шляхи меморіалізації та ролі прокуратури.',
    status: 'published',
  },
  {
    id: '2', title: 'Авдіївка', slug: 'avdiivka', theme: { id: '1', title: 'Меморіалізація', slug: 'mem', color: 'white' },
    location: 'Донецька обл.', date: '2024-09-12T00:00:00.000Z', participants: 62,
    summary: 'Таунхол з мешканцями Авдіївки та учасниками Донбаського медіафоруму. Обговорювали документування руйнувань та перспективи правосуддя.',
    status: 'published',
  },
  {
    id: '3', title: 'Херсон і Миколаїв', slug: 'kherson-mykolaiv', theme: { id: '2', title: 'Потерпілі та правоохоронці', slug: 'vic', color: 'purple' },
    location: 'Південь України', date: '2024-06-20T00:00:00.000Z', participants: 110,
    summary: 'Зустріч з потерпілими з Херсонської та Миколаївської областей. Досвід взаємодії з прокуратурою та доступ до правосуддя.',
    status: 'published',
  },
  {
    id: '4', title: 'Харківщина', slug: 'kharkiv', theme: { id: '2', title: 'Потерпілі та правоохоронці', slug: 'vic', color: 'purple' },
    location: 'Балаклія, Ізюм, Гроза', date: '2025-02-14T00:00:00.000Z', participants: 94,
    summary: 'Таунхол у деокупованих громадах Харківщини. Мешканці розповіли про злочини окупантів і очікування від судових процесів.',
    status: 'published',
  },
  {
    id: '5', title: 'Деокуповані громади півдня', slug: 'deoccupied-south', theme: { id: '5', title: 'Ліміти мирної угоди', slug: 'lim', color: 'lime' },
    location: 'Південь України', date: '2026-07-01T00:00:00.000Z', participants: 78,
    summary: 'Представники деокупованих громад та міжнародні спостерігачі обговорювали принципи справедливого миру.',
    status: 'published',
  },
]

export async function generateStaticParams() {
  return MEETINGS.map(m => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const meeting = MEETINGS.find(m => m.slug === slug)
  if (!meeting) return { title: 'Не знайдено' }
  return {
    title: `${meeting.title} | Таунхоли PIJL`,
    description: meeting.summary,
  }
}

export default async function MeetingPage({ params }: Props) {
  const { slug } = await params
  const meeting = MEETINGS.find(m => m.slug === slug)
  if (!meeting) notFound()

  return (
    <>
      <SiteHeader />
      <MeetingDetail meeting={meeting as any} />
      <SiteFooter />
    </>
  )
}
