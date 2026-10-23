import { Route, Routes } from 'react-router-dom'
import RootLayout from '@/components/layout/RootLayout'
import HomeBody from '@/components/pages/HomeBody'
import ServicesBody from '@/components/pages/ServicesBody'
import ProjectsBody from '@/components/pages/ProjectsBody'
import ProjectDetailBody from '@/components/pages/ProjectDetailBody'
import TechBody from '@/components/pages/TechBody'
import AboutBody from '@/components/pages/AboutBody'
import FaqBody from '@/components/pages/FaqBody'
import ContactBody from '@/components/pages/ContactBody'
import NotFoundBody from '@/components/pages/NotFoundBody'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout lang="fr" />}>
        <Route index element={<HomeBody lang="fr" />} />
        <Route path="services" element={<ServicesBody lang="fr" />} />
        <Route path="realisations" element={<ProjectsBody lang="fr" />} />
        <Route path="realisations/:slug" element={<ProjectDetailBody lang="fr" />} />
        <Route path="technologies" element={<TechBody lang="fr" />} />
        <Route path="a-propos" element={<AboutBody lang="fr" />} />
        <Route path="faq" element={<FaqBody lang="fr" />} />
        <Route path="contact" element={<ContactBody lang="fr" />} />
        <Route path="*" element={<NotFoundBody lang="fr" />} />
      </Route>

      <Route path="/en" element={<RootLayout lang="en" />}>
        <Route index element={<HomeBody lang="en" />} />
        <Route path="services" element={<ServicesBody lang="en" />} />
        <Route path="projects" element={<ProjectsBody lang="en" />} />
        <Route path="projects/:slug" element={<ProjectDetailBody lang="en" />} />
        <Route path="technologies" element={<TechBody lang="en" />} />
        <Route path="about" element={<AboutBody lang="en" />} />
        <Route path="faq" element={<FaqBody lang="en" />} />
        <Route path="contact" element={<ContactBody lang="en" />} />
        <Route path="*" element={<NotFoundBody lang="en" />} />
      </Route>
    </Routes>
  )
}
