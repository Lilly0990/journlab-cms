import type { CollectionConfig } from 'payload'

export const Themes: CollectionConfig = {
  slug: 'themes',
  admin: {
    useAsTitle: 'title',
    description: 'Теми таунхолів (5 категорій)',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Назва теми',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      unique: true,
      admin: {
        description: 'Латинськими літерами, без пробілів: mem, vic, dec, col, lim',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Підзаголовок',
    },
    {
      name: 'color',
      type: 'select',
      label: 'Колір',
      options: [
        { label: 'Cyan', value: 'cyan' },
        { label: 'Lime', value: 'lime' },
        { label: 'Purple', value: 'purple' },
        { label: 'Red', value: 'red' },
        { label: 'White', value: 'white' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок відображення',
    },
  ],
}
