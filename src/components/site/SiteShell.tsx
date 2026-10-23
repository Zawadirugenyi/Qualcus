import type { ReactNode } from 'react'
import type { Lang } from '@/lib/ui'
import Header from './Header'
import Footer from './Footer'
import WhatsAppBot from './WhatsAppBot'
import SiteScripts from './SiteScripts'

export default function SiteShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <>
      <Header lang={lang} />
      <main>{children}</main>
      <Footer lang={lang} />
      <WhatsAppBot lang={lang} />
      <SiteScripts />
    </>
  )
}
