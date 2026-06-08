import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Meetings: CollectionConfig = {
  slug: 'meetings',
  admin: {
    useAsTitle: 'title',
    description: 'Зустрічі таунхолів',
    defaultColumns: ['title', 'theme', 'location', 'date', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Назва зустрічі',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      unique: true,
    },
    {
      name: 'theme',
      type: 'relationship',
      relationTo: 'themes',
      label: 'Тема',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      label: 'Локація',
    },
    {
      name: 'date',
      type: 'date',
      label: 'Дата зустрічі',
      admin: {
        date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' },
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Обкладинка',
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Короткий опис',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Зміст статті',
      editor: lexicalEditor(),
    },
    {
      name: 'conclusions',
      type: 'richText',
      label: 'Висновки та рекомендації',
      editor: lexicalEditor(),
    },
    {
      name: 'audioUrl',
      type: 'text',
      label: 'Посилання на аудіо',
    },
    {
      name: 'pdfUrl',
      type: 'text',
      label: 'Посилання на PDF (стенограма)',
    },
    {
      name: 'participants',
      type: 'number',
      label: 'Кількість учасників',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Теги',
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Тег',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'Статус',
      defaultValue: 'published',
      options: [
        { label: 'Опубліковано', value: 'published' },
        { label: 'Чернетка', value: 'draft' },
      ],
    },
  ],
}
