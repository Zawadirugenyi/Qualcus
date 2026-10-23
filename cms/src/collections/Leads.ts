import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: {
    singular: 'Demande',
    plural: 'Demandes',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'source', 'service', 'status', 'createdAt'],
    group: 'Demandes',
    description: 'Messages reçus via le formulaire de contact et inscriptions à la newsletter.',
  },
  access: {
    // Anyone can submit a lead from the public website.
    create: () => true,
    // Only logged-in admins can read, edit or delete leads.
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'email',
      label: 'E-mail',
      type: 'email',
      required: true,
      index: true,
    },
    {
      name: 'name',
      label: 'Nom',
      type: 'text',
    },
    {
      name: 'phone',
      label: 'Téléphone',
      type: 'text',
    },
    {
      name: 'service',
      label: 'Service demandé',
      type: 'text',
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
    },
    {
      name: 'source',
      label: 'Origine',
      type: 'select',
      required: true,
      defaultValue: 'contact',
      options: [
        { label: 'Formulaire de contact', value: 'contact' },
        { label: 'Newsletter', value: 'newsletter' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'locale',
      label: 'Langue',
      type: 'select',
      defaultValue: 'fr',
      options: [
        { label: 'Français', value: 'fr' },
        { label: 'English', value: 'en' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      label: 'Statut',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'Nouveau', value: 'new' },
        { label: 'Traité', value: 'done' },
        { label: 'Archivé', value: 'archived' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      // Honeypot: real visitors never fill this. Bots usually do.
      name: 'botField',
      label: 'Ne pas remplir',
      type: 'text',
      admin: { hidden: true },
      validate: (value: unknown) =>
        typeof value === 'string' && value.trim() !== '' ? 'Spam détecté.' : true,
    },
  ],
  timestamps: true,
}
