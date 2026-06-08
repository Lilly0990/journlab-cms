import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { TownhallsClient } from '@/components/TownhallsClient'

export const metadata = {
  title: 'Таунхоли | PIJL',
  description: 'Відкриті зустрічі громад з органами, що розслідують воєнні злочини.',
}

const THEMES = [
  { id: '1', title: 'Меморіалізація',              slug: 'mem', color: 'white',  order: 1 },
  { id: '2', title: 'Потерпілі та правоохоронці',  slug: 'vic', color: 'purple', order: 2 },
  { id: '3', title: 'Децентралізація',              slug: 'dec', color: 'cyan',   order: 3 },
  { id: '4', title: 'Колаборанти',                  slug: 'col', color: 'red',    order: 4 },
  { id: '5', title: 'Ліміти мирної угоди',          slug: 'lim', color: 'lime',   order: 5 },
]

const MEETINGS = [
  {
    id: '1', title: 'Ягідне', slug: 'yahidne', theme: { slug: 'mem' },
    location: 'Чернігівська обл.', date: '2024-04-08', participants: 85,
    summary: 'Мешканці, слідчі прокуратури, правозахисники',
    img: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Yahidne_IMG_6671_%2853023251893%29.jpg',
  },
  {
    id: '2', title: 'Авдіївка', slug: 'avdiivka', theme: { slug: 'mem' },
    location: 'Донецька обл.', date: '2024-09-12', participants: 62,
    summary: 'Учасники Донбаського медіафоруму, представники громади',
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/A_destroyed_school_building_in_Irpin_after_the_invasion_of_Russian_troops_p1.jpg',
  },
  {
    id: '3', title: 'Укрзалізниця', slug: 'ukrzaliznytsia', theme: { slug: 'mem' },
    location: 'Краматорськ', date: '2026-01-01', participants: 55,
    summary: 'Представники громади, залізничники, слідчі',
    img: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/First_anniversary_of_Kramatorsk_railway_station_attack_%2803%29.jpg',
  },
  {
    id: '4', title: 'Херсон і Миколаїв', slug: 'kherson-mykolaiv', theme: { slug: 'vic' },
    location: 'Південь України', date: '2024-06-20', participants: 110,
    summary: 'Потерпілі, прокурори, правозахисники',
    img: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Destroyed_residential_buildings_in_Mykolaiv.jpg',
  },
  {
    id: '5', title: 'Харківщина', slug: 'kharkiv', theme: { slug: 'vic' },
    location: 'Балаклія, Ізюм, Гроза', date: '2025-02-14', participants: 94,
    summary: 'Мешканці деокупованих сіл, слідчі',
    img: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Kharkiv_downtown_street_destroyed_by_Russian_bombardment.jpg',
  },
  {
    id: '6', title: 'Запорізька область', slug: 'zaporizhzhia', theme: { slug: 'vic' },
    location: 'Запорізька обл.', date: '2025-05-10', participants: 72,
    summary: 'Потерпілі, прокурори',
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Destructions_in_Zaporizhzhia_after_Russian_attack%2C_2023-12-29_%2815%29.jpg',
  },
  {
    id: '7', title: 'Донецька, Луганська, Дніпро', slug: 'donbas', theme: { slug: 'vic' },
    location: 'Схід України', date: '2025-08-20', participants: 88,
    summary: 'Представники громад сходу, слідчі',
    img: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Zaporizhzhia_after_Russian_shelling%2C_2023-03-31_%2802%29.jpg',
  },
  {
    id: '8', title: 'Сумська область', slug: 'sumy', theme: { slug: 'vic' },
    location: 'Сумщина', date: '2025-10-05', participants: 63,
    summary: 'Родини полонених, правозахисники',
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Church_of_the_Nativity_of_the_Theotokos_in_Seredyna-Buda_after_Russian_shelling%2C_2023-09-01.jpg',
  },
  {
    id: '9', title: 'Київщина', slug: 'kyiv-region', theme: { slug: 'vic' },
    location: 'Мотижин, Буча', date: '2026-02-15', participants: 98,
    summary: 'Мешканці деокупованих громад',
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Bucha._Faces_of_War._-_Ukraine_War_Photo_Exhibition_2023_%2852703075678%29.jpg',
  },
  {
    id: '10', title: 'Нововоронцовка', slug: 'novovorontsovka', theme: { slug: 'dec' },
    location: 'Херсонська обл.', date: '2024-11-18', participants: 45,
    summary: 'Місцева влада, мешканці, держструктури',
    img: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Destroyed_residential_buildings_in_Mykolaiv.jpg',
  },
  {
    id: '11', title: 'Колаборанти', slug: 'collaborators', theme: { slug: 'col' },
    location: 'Україна', date: '2024-10-22', participants: 60,
    summary: 'Правознавці, слідчі, представники громад',
    img: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Kharkiv_downtown_street_destroyed_by_Russian_bombardment.jpg',
  },
  {
    id: '12', title: 'Деокуповані громади півдня', slug: 'deoccupied-south', theme: { slug: 'lim' },
    location: 'Південь України', date: '2026-07-01', participants: 78,
    summary: 'Представники деокупованих громад, міжнародні спостерігачі',
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Today_is_a_historic_day%2C_we_are_regaining_Kherson_-_address_by_the_President_of_Ukraine._%2852493216834%29.jpg',
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
