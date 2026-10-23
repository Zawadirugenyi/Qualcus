import Image from 'next/image'

const siteURL = process.env.NEXT_PUBLIC_SITE_URL || '/'

export default function NavBrand() {
  return (
    <div className="qualcus-nav-brand">
      <span className="qualcus-nav-brand__mark">
        <Image src="/QUALCUS.png" alt="" width={26} height={35} unoptimized priority />
      </span>
      <span className="qualcus-nav-brand__text">
        <span className="qualcus-nav-brand__name">Qualcus</span>
        <span className="qualcus-nav-brand__tag">Espace d&apos;administration</span>
      </span>
      <a
        className="qualcus-nav-brand__site"
        href={siteURL}
        target="_blank"
        rel="noreferrer"
        aria-label="Voir le site"
        title="Voir le site"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M14 4h6v6M20 4l-8.5 8.5M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  )
}
