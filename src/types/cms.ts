export type Theme = {
  id: string
  title: string
  slug: string
  subtitle?: string
  color?: string
  order?: number
}

export type Meeting = {
  id: string
  title: string
  slug: string
  summary?: string
  location?: string
  date?: string
  participants?: number
  audioUrl?: string
  pdfUrl?: string
  coverImage?: { url?: string; alt?: string } | null
  content?: unknown
  conclusions?: unknown
  theme?: Theme | string | null
  status?: string
}
