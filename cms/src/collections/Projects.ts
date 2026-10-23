import type { CollectionConfig } from 'payload'

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Réalisation',
    plural: 'Réalisations',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'order'],
    group: 'Contenu',
    description: 'Ajoutez ici les projets affichés sur la page Réalisations.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Titre du projet',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Généré automatiquement depuis le titre.',
      },
    },
    {
      name: 'category',
      label: 'Catégorie',
      type: 'select',
      required: true,
      options: [
        { label: 'Logiciel', value: 'software' },
        { label: 'IoT', value: 'iot' },
        { label: 'Sécurité', value: 'security' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'tag',
      label: 'Étiquette',
      type: 'text',
      localized: true,
      admin: {
        position: 'sidebar',
        description: 'Petit libellé affiché sur la carte (ex. « Très demandé »).',
      },
    },
    {
      name: 'excerpt',
      label: 'Description courte',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'result',
      label: 'Résultat (chiffre)',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Ex. : -70%, 24/7, 3x',
      },
    },
    {
      name: 'resultText',
      label: 'Légende du résultat',
      type: 'text',
      localized: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'image',
      label: 'Image du projet',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'featured',
      label: 'Mettre en avant',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      label: "Ordre d'affichage",
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Plus le nombre est petit, plus le projet apparaît en haut.',
      },
    },
    {
      name: 'content',
      label: 'Description détaillée',
      type: 'richText',
      localized: true,
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && typeof data.title === 'string') {
          data.slug = slugify(data.title)
        }
        return data
      },
    ],
  },
}
