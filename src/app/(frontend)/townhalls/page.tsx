import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { TownhallsClient } from '@/components/TownhallsClient'

export const metadata = {
  title: 'Таунхоли | PIJL',
  description: 'Відкриті зустрічі громад з органами, що розслідують воєнні злочини.',
}

const THEMES = [
  { id: '1', title: 'Меморіалізація', slug: 'mem', subtitle: 'Пам\'ять, увічнення, визнання', color: 'white', order: 1 },
  { id: '2', title: 'Потерпілі та правоохоронці', slug: 'vic', subtitle: 'Жертви, свідки, слідство', color: 'purple', order: 2 },
  { id: '3', title: 'Децентралізація', slug: 'dec', subtitle: 'Місцеве самоврядування', color: 'cyan', order: 3 },
  { id: '4', title: 'Колаборанти', slug: 'col', subtitle: 'Відповідальність і покарання', color: 'red', order: 4 },
  { id: '5', title: 'Ліміти мирної угоди', slug: 'lim', subtitle: 'Деокуповані громади', color: 'lime', order: 5 },
]

const MEETINGS = [
  {
    id: '1', title: 'Ягідне', slug: 'yahidne', theme: { slug: 'mem' },
    location: 'Чернігівська обл.', date: '2024-04-08T00:00:00.000Z', participants: 85,
    summary: 'Перша зустріч у форматі таунхолу з мешканцями Ягідного — села, де понад 300 людей утримувалися в підвалі школи. Обговорювали шляхи меморіалізації та ролі прокуратури.',
  },
  {
    id: '2', title: 'Авдіївка', slug: 'avdiivka', theme: { slug: 'mem' },
    location: 'Донецька обл.', date: '2024-09-12T00:00:00.000Z', participants: 62,
    summary: 'Таунхол з мешканцями Авдіївки та учасниками Донбаського медіафоруму. Обговорювали документування руйнувань та перспективи правосуддя.',
  },
  {
    id: '3', title: 'Херсон і Миколаїв', slug: 'kherson-mykolaiv', theme: { slug: 'vic' },
    location: 'Південь України', date: '2024-06-20T00:00:00.000Z', participants: 110,
    summary: 'Зустріч з потерпілими з Херсонської та Миколаївської областей. Досвід взаємодії з прокуратурою та доступ до правосуддя.',
  },
  {
    id: '4', title: 'Харківщина', slug: 'kharkiv', theme: { slug: 'vic' },
    location: 'Балаклія, Ізюм, Гроза', date: '2025-02-14T00:00:00.000Z', participants: 94,
    summary: 'Таунхол у деокупованих громадах Харківщини. Мешканці розповіли про злочини окупантів і очікування від судових процесів.',
  },
  {
    id: '5', title: 'Деокуповані громади півдня', slug: 'deoccupied-south', theme: { slug: 'lim' },
    location: 'Південь України', date: '2026-07-01T00:00:00.000Z', participants: 78,
    summary: 'Представники деокупованих громад та міжнародні спостерігачі обговорювали принципи справедливого миру.',
  },
]

export default function TownhallsPage() {
  return (
    <>
      <SiteHeader />
      <TownhallsClient themes={THEMES} meetings={MEETINGS} />
      <SiteFooter />
    </>
  )
}
