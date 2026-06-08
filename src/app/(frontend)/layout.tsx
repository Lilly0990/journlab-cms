import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Таунхоли | PIJL',
  description: 'Відкриті зустрічі громад з органами, що розслідують воєнні злочини. Лабораторія журналістики суспільного інтересу.',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
