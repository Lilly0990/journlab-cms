import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { MeetingDetail } from '@/components/MeetingDetail'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

const MEETINGS = [
  {
    id: '1', title: 'Ягідне', slug: 'yahidne',
    theme: { id: '1', title: 'Меморіалізація', slug: 'mem', color: 'white' },
    location: 'Чернігівська обл.', date: '2024-04-08T00:00:00.000Z', participants: 85,
    summary: 'Перша зустріч у форматі таунхолу з мешканцями Ягідного — села, де понад 300 людей утримувалися в підвалі школи. Обговорювали шляхи меморіалізації та ролі прокуратури.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Yahidne_IMG_6671_%2853023251893%29.jpg',
    status: 'published',
  },
  {
    id: '2', title: 'Авдіївка', slug: 'avdiivka',
    theme: { id: '1', title: 'Меморіалізація', slug: 'mem', color: 'white' },
    location: 'Донецька обл.', date: '2024-09-12T00:00:00.000Z', participants: 62,
    summary: 'Таунхол з мешканцями Авдіївки та учасниками Донбаського медіафоруму. Обговорювали документування руйнувань та перспективи правосуддя.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/A_destroyed_school_building_in_Irpin_after_the_invasion_of_Russian_troops_p1.jpg',
    status: 'published',
  },
  {
    id: '3', title: 'Укрзалізниця', slug: 'ukrzaliznytsia',
    theme: { id: '1', title: 'Меморіалізація', slug: 'mem', color: 'white' },
    location: 'Краматорськ', date: '2026-01-01T00:00:00.000Z', participants: 55,
    summary: 'Зустріч з представниками громади, залізничниками та слідчими у річницю ракетного удару по Краматорському вокзалу.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/First_anniversary_of_Kramatorsk_railway_station_attack_%2803%29.jpg',
    status: 'published',
  },
  {
    id: '4', title: 'Херсон і Миколаїв', slug: 'kherson-mykolaiv',
    theme: { id: '2', title: 'Потерпілі та правоохоронці', slug: 'vic', color: 'purple' },
    location: 'Південь України', date: '2024-06-20T00:00:00.000Z', participants: 110,
    summary: 'Зустріч з потерпілими з Херсонської та Миколаївської областей. Досвід взаємодії з прокуратурою та доступ до правосуддя.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Destroyed_residential_buildings_in_Mykolaiv.jpg',
    status: 'published',
  },
  {
    id: '5', title: 'Харківщина', slug: 'kharkiv',
    theme: { id: '2', title: 'Потерпілі та правоохоронці', slug: 'vic', color: 'purple' },
    location: 'Балаклія, Ізюм, Гроза', date: '2025-02-14T00:00:00.000Z', participants: 94,
    summary: 'Таунхол у деокупованих громадах Харківщини. Мешканці розповіли про злочини окупантів і очікування від судових процесів.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Kharkiv_downtown_street_destroyed_by_Russian_bombardment.jpg',
    status: 'published',
  },
  {
    id: '6', title: 'Запорізька область', slug: 'zaporizhzhia',
    theme: { id: '2', title: 'Потерпілі та правоохоронці', slug: 'vic', color: 'purple' },
    location: 'Запорізька обл.', date: '2025-05-10T00:00:00.000Z', participants: 72,
    summary: 'Потерпілі та прокурори обговорили процес збирання доказів та забезпечення правосуддя на тимчасово окупованих територіях.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Destructions_in_Zaporizhzhia_after_Russian_attack%2C_2023-12-29_%2815%29.jpg',
    status: 'published',
  },
  {
    id: '7', title: 'Донецька, Луганська, Дніпро', slug: 'donbas',
    theme: { id: '2', title: 'Потерпілі та правоохоронці', slug: 'vic', color: 'purple' },
    location: 'Схід України', date: '2025-08-20T00:00:00.000Z', participants: 88,
    summary: 'Представники громад сходу та слідчі обговорили механізми документування злочинів і доступу до міжнародного правосуддя.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Zaporizhzhia_after_Russian_shelling%2C_2023-03-31_%2802%29.jpg',
    status: 'published',
  },
  {
    id: '8', title: 'Сумська область', slug: 'sumy',
    theme: { id: '2', title: 'Потерпілі та правоохоронці', slug: 'vic', color: 'purple' },
    location: 'Сумщина', date: '2025-10-05T00:00:00.000Z', participants: 63,
    summary: 'Родини полонених та правозахисники обговорили механізми звільнення та захисту прав у зоні збройного конфлікту.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Church_of_the_Nativity_of_the_Theotokos_in_Seredyna-Buda_after_Russian_shelling%2C_2023-09-01.jpg',
    status: 'published',
  },
  {
    id: '9', title: 'Київщина', slug: 'kyiv-region',
    theme: { id: '2', title: 'Потерпілі та правоохоронці', slug: 'vic', color: 'purple' },
    location: 'Мотижин, Буча', date: '2026-02-15T00:00:00.000Z', participants: 98,
    summary: 'Мешканці деокупованих громад Київщини обговорили досвід взаємодії зі слідчими та участі у судових провадженнях.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Bucha._Faces_of_War._-_Ukraine_War_Photo_Exhibition_2023_%2852703075678%29.jpg',
    status: 'published',
  },
  {
    id: '10', title: 'Нovovоронцовка', slug: 'novovorontsovka',
    theme: { id: '3', title: 'Децентралізація', slug: 'dec', color: 'cyan' },
    location: 'Херсонська обл.', date: '2024-11-18T00:00:00.000Z', participants: 45,
    summary: 'Місцева влада та мешканці обговорили відновлення інституцій місцевого самоврядування після деокупації.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Destroyed_residential_buildings_in_Mykolaiv.jpg',
    status: 'published',
  },
  {
    id: '11', title: 'Колаборанти', slug: 'collaborators',
    theme: { id: '4', title: 'Колаборанти', slug: 'col', color: 'red' },
    location: 'Україна', date: '2024-10-22T00:00:00.000Z', participants: 60,
    summary: 'Правознавці, слідчі та представники громад обговорили підходи до відповідальності за колабораційну діяльність.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Kharkiv_downtown_street_destroyed_by_Russian_bombardment.jpg',
    status: 'published',
  },
  {
    id: '12', title: 'Деокуповані громади півдня', slug: 'deoccupied-south',
    theme: { id: '5', title: 'Ліміти мирної угоди', slug: 'lim', color: 'lime' },
    location: 'Південь України', date: '2026-07-01T00:00:00.000Z', participants: 78,
    summary: 'Представники деокупованих громад та міжнародні спостерігачі обговорювали принципи справедливого миру та гарантії безпеки.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Today_is_a_historic_day%2C_we_are_regaining_Kherson_-_address_by_the_President_of_Ukraine._%2852493216834%29.jpg',
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
