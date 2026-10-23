import type { Lang } from "./ui";

/* ----------------------------- HOME ----------------------------- */
export const home = {
  fr: {
    hero: {
      badge: "Kinshasa · Bunia · Goma · Congo",
      title:
        "Logiciel, <span class='text-grad'>capteurs</span> et <span class='text-grad'>sécurité</span>.",
      sub: "Une seule équipe, <span class='text-grad'>chez vous</span>.",
      lead: "Des solutions sur mesure, conçues, installées et maintenues par nos propres techniciens — partout au Congo.",
    },
    guarantees: [
      { icon: "shield", title: "Garantie 12 mois", text: "sur toutes nos installations" },
      { icon: "chat", title: "Consultation gratuite", text: "et devis sans engagement" },
      { icon: "flag", title: "Assistance locale", text: "notre équipe se déplace" },
      { icon: "bolt", title: "Conçu pour le Congo", text: "résiste aux coupures & réseaux" },
    ],
    stats: [
      { value: 120, suffix: "+", label: "Projets livrés" },
      { value: 80, suffix: "+", label: "Clients satisfaits" },
      { value: 5, suffix: " ans", label: "D'expérience" },
      { value: 24, suffix: "/7", label: "Assistance & supervision" },
    ],
    sectors: {
      eyebrow: "Secteurs que nous servons",
      label: "La confiance d'entreprises, d'écoles et d'institutions à travers le Congo",
      items: [
        { icon: "bank", title: "Banques & finance", text: "Systèmes sécurisés & contrôle d'accès" },
        { icon: "school", title: "Écoles & universités", text: "Présence digitale & gestion" },
        { icon: "hotel", title: "Hôtels & hôtellerie", text: "Chambres connectées & surveillance" },
        { icon: "factory", title: "Industrie & énergie", text: "Supervision IoT & automatisation" },
        { icon: "cart", title: "Commerce & distribution", text: "Stock, caisse & ventes en ligne" },
        { icon: "health", title: "Cliniques & santé", text: "Dossiers patients & sécurité" },
        { icon: "users", title: "ONG & institutions", text: "Plateformes & réseaux sécurisés" },
      ],
    },
    services: {
      eyebrow: "Nos services",
      title: "Trois expertises, <span class='text-grad'>une seule équipe</span>",
      lead: "Du logiciel au matériel, nous couvrons toute la chaîne technologique de votre projet.",
    },
    solutions: {
      eyebrow: "Solutions phares",
      title: "Des outils digitaux qui <span class='text-grad'>remplacent le papier</span>",
      lead: "Des produits clés en main, adaptés aux entreprises, écoles et institutions du Congo.",
      note: "Vous ne voyez pas votre besoin ? Chaque projet est sur mesure — <strong>dites-nous votre problème, nous construirons la solution.</strong>",
    },
    projects: {
      eyebrow: "Nos réalisations",
      title: "Des projets qui <span class='text-grad'>apportent des résultats concrets</span>",
      lead: "Une sélection de solutions que nous avons conçues pour des entreprises et des foyers au Congo.",
    },
    tech: {
      eyebrow: "Notre pile technologique",
      title: "Des technologies modernes <span class='text-grad'>et éprouvées</span>",
      lead: "Nous choisissons des outils fiables et bien documentés pour que votre produit reste rapide, sécurisé et maintenable durant des années.",
    },
    testimonials: {
      eyebrow: "Témoignages",
      title: "Ce que disent <span class='text-grad'>nos clients</span>",
      lead: "La confiance de nos clients est notre meilleure référence.",
      items: [
        {
          stars: 5,
          text: "« Qualcus a réalisé notre logiciel de gestion de stock. Les erreurs d'inventaire ont fortement diminué et l'équipe nous a bien formés. Des professionnels. »",
          initials: "JN",
          name: "Jean N.",
          role: "Directeur, société de distribution, Kinshasa",
          color: "av-1",
        },
        {
          stars: 5,
          text: "« 24 caméras installées en deux jours, câblage soigné, et je surveille tout depuis mon téléphone. Le service après-vente est réactif. »",
          initials: "PM",
          name: "Patrick M.",
          role: "Entrepreneur, Lubumbashi",
          color: "av-2",
        },
        {
          stars: 5,
          text: "« La jauge de cuve connectée nous a sauvés pendant la saison sèche. Simple, robuste, et le prix était clair dès le départ. »",
          initials: "SK",
          name: "Sarah K.",
          role: "Gérante d'hôtel, Goma",
          color: "av-3",
        },
      ],
    },
    process: {
      eyebrow: "Notre méthode",
      title: "Un projet, <span class='text-grad'>4 étapes claires</span>",
      lead: "Pas de mauvaise surprise : vous savez toujours où en est votre projet et ce qui vient ensuite.",
    },
    ctaBanner: {
      title: "Prêt à faire passer votre activité <span class='text-grad'>au niveau supérieur</span> ?",
      text: "Parlez-nous de votre projet aujourd'hui et recevez un devis gratuit et sans engagement sous 24 heures.",
    },
  },
  en: {
    hero: {
      badge: "Kinshasa · Bunia · Goma · Congo",
      title:
        "<span class='text-grad'>Software</span>, <span class='text-grad'>sensors</span> and <span class='text-grad'>security</span>.",
      sub: "One team, <span class='text-grad'>on site</span>.",
      lead: "Custom solutions, designed, installed and maintained by our own technicians — anywhere in the Congo.",
    },
    guarantees: [
      { icon: "shield", title: "12-month warranty", text: "on all our installations" },
      { icon: "chat", title: "Free consultation", text: "and no-obligation quote" },
      { icon: "flag", title: "Local support", text: "our team comes to you" },
      { icon: "bolt", title: "Built for Congo", text: "resists power cuts & networks" },
    ],
    stats: [
      { value: 120, suffix: "+", label: "Projects delivered" },
      { value: 80, suffix: "+", label: "Satisfied clients" },
      { value: 5, suffix: " yrs", label: "Of experience" },
      { value: 24, suffix: "/7", label: "Support & monitoring" },
    ],
    sectors: {
      eyebrow: "Sectors we serve",
      label: "Trusted by companies, schools and institutions across the Congo",
      items: [
        { icon: "bank", title: "Banking & finance", text: "Secure systems & access control" },
        { icon: "school", title: "Schools & universities", text: "Digital attendance & management" },
        { icon: "hotel", title: "Hotels & hospitality", text: "Smart rooms & surveillance" },
        { icon: "factory", title: "Industry & energy", text: "IoT monitoring & automation" },
        { icon: "cart", title: "Retail & commerce", text: "Stock, cash & online sales" },
        { icon: "health", title: "Health clinics", text: "Patient records & security" },
        { icon: "users", title: "NGOs & institutions", text: "Platforms & secure networks" },
      ],
    },
    services: {
      eyebrow: "Our services",
      title: "Three areas of expertise, <span class='text-grad'>one single team</span>",
      lead: "From software to hardware, we cover the entire technology chain of your project.",
    },
    solutions: {
      eyebrow: "Flagship solutions",
      title: "Digital tools that <span class='text-grad'>replace paper</span>",
      lead: "Ready-to-use products, adapted to companies, schools and institutions of the Congo.",
      note: "Don't see what you need? Every project is custom — <strong>tell us your problem and we will build the solution.</strong>",
    },
    projects: {
      eyebrow: "Our projects",
      title: "Projects that <span class='text-grad'>deliver real results</span>",
      lead: "A selection of solutions we have designed for businesses and homes in the Congo.",
    },
    tech: {
      eyebrow: "Our technology stack",
      title: "Modern, proven <span class='text-grad'>technologies</span>",
      lead: "We choose reliable, well-supported tools so your product stays fast, secure and maintainable for years.",
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "What our <span class='text-grad'>clients say</span>",
      lead: "The trust of our clients is our best reference.",
      items: [
        {
          stars: 5,
          text: "&ldquo;Qualcus built our stock management software. Inventory errors dropped dramatically and the team trained us well. Real professionals.&rdquo;",
          initials: "JN",
          name: "Jean N.",
          role: "Director, distribution company, Kinshasa",
          color: "av-1",
        },
        {
          stars: 5,
          text: "&ldquo;24 cameras installed in two days, clean cabling, and I watch everything from my phone. The after-sales service is responsive.&rdquo;",
          initials: "PM",
          name: "Patrick M.",
          role: "Business owner, Lubumbashi",
          color: "av-2",
        },
        {
          stars: 5,
          text: "&ldquo;The connected tank sensor saved us during the dry season. Simple, robust, and the price was clear from the start.&rdquo;",
          initials: "SK",
          name: "Sarah K.",
          role: "Hotel manager, Goma",
          color: "av-3",
        },
      ],
    },
    process: {
      eyebrow: "Our method",
      title: "A project, <span class='text-grad'>4 clear steps</span>",
      lead: "No surprises: you always know where your project stands and what comes next.",
    },
    ctaBanner: {
      title: "Ready to move your business <span class='text-grad'>to the next level</span>?",
      text: "Tell us about your project today and get a free, no-obligation quote within 24 hours.",
    },
  },
} as const;

/* --------------------------- SHARED LISTS --------------------------- */
export type ServiceCard = {
  icon: string;
  color: string;
  title: string;
  text: string;
  list: readonly string[];
  featured?: boolean;
  badge?: string;
};

export type SolutionCard = {
  icon: string;
  color: string;
  title: string;
  text: string;
  list: readonly string[];
  badge?: string;
};

export const serviceCards: Record<Lang, readonly ServiceCard[]> = {
  fr: [
    {
      icon: "code",
      color: "i-code",
      title: "Conception & développement de logiciels",
      text: "Applications web et mobiles, logiciels de gestion, plateformes e-commerce et systèmes d'information adaptés à votre activité.",
      list: [
        "Sites web & portails",
        "Applications mobiles (Android / iOS)",
        "Logiciels de gestion (ERP, stock, RH)",
        "API & intégrations",
      ],
    },
    {
      icon: "cpu",
      color: "i-iot",
      featured: true,
      badge: "Croissance rapide",
      title: "Objets connectés (IoT)",
      text: "Domotique, capteurs intelligents, suivi à distance et automatisation pour l'habitat, l'industrie et l'agriculture.",
      list: [
        "Smart home & domotique",
        "Capteurs température / niveau d'eau",
        "Géolocalisation de flotte",
        "Tableaux de bord temps réel",
      ],
    },
    {
      icon: "shield",
      color: "i-sec",
      title: "Dispositifs de sécurité",
      text: "Installation et maintenance de systèmes de surveillance et de protection pour vos sites, bureaux et habitations.",
      list: [
        "Caméras de surveillance IP",
        "Alarmes anti-intrusion",
        "Contrôle d'accès & interphonie",
        "Cybersécurité & audits",
      ],
    },
  ],
  en: [
    {
      icon: "code",
      color: "i-code",
      title: "Software design & development",
      text: "Web and mobile apps, business management software, e-commerce platforms and information systems tailored to your activity.",
      list: [
        "Websites & portals",
        "Mobile apps (Android / iOS)",
        "Management software (ERP, stock, HR)",
        "APIs & integrations",
      ],
    },
    {
      icon: "cpu",
      color: "i-iot",
      featured: true,
      badge: "Fast growing",
      title: "Connected devices (IoT)",
      text: "Home automation, smart sensors, remote monitoring and automation for homes, industry and agriculture.",
      list: [
        "Smart home & home automation",
        "Temperature / water-level sensors",
        "Fleet tracking",
        "Real-time dashboards",
      ],
    },
    {
      icon: "shield",
      color: "i-sec",
      title: "Security devices",
      text: "Installation and maintenance of surveillance and protection systems for your sites, offices and homes.",
      list: [
        "IP surveillance cameras",
        "Intrusion alarms",
        "Access control & intercom",
        "Cybersecurity & audits",
      ],
    },
  ],
} as const;

export const solutionCards: Record<Lang, readonly SolutionCard[]> = {
  fr: [
    {
      icon: "clipboard",
      color: "i-iot",
      badge: "Très demandé",
      title: "Listes de présence digitales",
      text: "Remplacez les registres papier : employés et élèves pointent par badge ou QR code. Tableau de bord en temps réel, rapports automatiques et export Excel/PDF.",
      list: [
        "Pointage par badge, QR code ou code PIN",
        "Tableau de bord temps réel (web & mobile)",
        "Alertes automatiques retard / absence",
        "Rapports mensuels prêts pour la paie",
      ],
    },
    {
      icon: "door",
      color: "i-sec",
      badge: "Nouveau",
      title: "Portes digitales & accès intelligent",
      text: "Sécurisez vos portes par badge, code, empreinte ou smartphone. Chaque entrée et sortie est enregistrée. Fonctionne même en coupure grâce à la batterie de secours.",
      list: [
        "Badge / code / empreinte / téléphone",
        "Journal complet des entrées & sorties",
        "Contrôle anti-contournement & plages horaires",
        "Batterie de secours en cas de coupure",
      ],
    },
    {
      icon: "globe",
      color: "i-code",
      title: "Sites web & boutiques en ligne",
      text: "Un site professionnel qui charge vite même sur connexion faible, avec paiement mobile-money (M-Pesa, Orange Money, Airtel Money) intégré.",
      list: [
        "Paiement mobile-money intégré",
        "Fonctionne sur réseaux lents",
        "Référencement Google & fiche Maps",
        "Contenu modifiable par vous",
      ],
    },
  ],
  en: [
    {
      icon: "clipboard",
      color: "i-iot",
      badge: "Very popular",
      title: "Digital attendance lists",
      text: "Replace paper registers: employees and students check in with a badge or QR code. Real-time dashboard, automatic reports, and Excel/PDF export.",
      list: [
        "Badge, QR code or PIN check-in",
        "Real-time dashboard (web & mobile)",
        "Automatic late / absence alerts",
        "Monthly payroll-ready reports",
      ],
    },
    {
      icon: "door",
      color: "i-sec",
      badge: "New",
      title: "Digital doors & smart access",
      text: "Secure doors with badge, code, fingerprint or smartphone. Every entry and exit is logged. Works even during power cuts thanks to battery backup.",
      list: [
        "Badge / code / fingerprint / phone",
        "Complete entry & exit log",
        "Anti-passback & time schedules",
        "Battery backup for power cuts",
      ],
    },
    {
      icon: "globe",
      color: "i-code",
      title: "Websites & online stores",
      text: "A professional website that loads fast even on weak connections, with mobile-money payment (M-Pesa, Orange Money, Airtel Money) built in.",
      list: [
        "Mobile-money payment integrated",
        "Works on slow networks",
        "SEO & Google Maps listing",
        "Content updated by you",
      ],
    },
  ],
};

export const processSteps = {
  fr: [
    { n: 1, title: "Écoute & analyse", text: "Nous étudions vos besoins, votre budget et votre environnement technique. Gratuit et sans engagement." },
    { n: 2, title: "Conception & devis", text: "Maquettes, architecture et un devis détaillé que vous validez avant tout début de travaux." },
    { n: 3, title: "Développement & installation", text: "Nous construisons, testons et installons sur site, avec des points réguliers à chaque étape." },
    { n: 4, title: "Suivi & maintenance", text: "Formation, garantie 12 mois, mises à jour et assistance technique continue." },
  ],
  en: [
    { n: 1, title: "Listening & analysis", text: "We study your needs, your budget and your technical environment. Free, with no obligation." },
    { n: 2, title: "Design & quote", text: "Mockups, architecture and a detailed quote that you validate before anything starts." },
    { n: 3, title: "Development & installation", text: "We build, test and install on site, with regular updates at every milestone." },
    { n: 4, title: "Support & maintenance", text: "Training, 12-month warranty, updates and continuous technical support." },
  ],
} as const;

/* --------------------------- PROJECTS --------------------------- */
export type Project = {
  cat: "software" | "iot" | "security";
  tag: string;
  visual: string;
  title: string;
  text: string;
  result: string;
  resultText: string;
};

export const projects = {
  fr: [
    { cat: "software", tag: "Logiciel", visual: "pv-dashboard", title: "Gestion de stock & ventes", text: "Plateforme de gestion complète pour un distributeur à Kinshasa : stock, factures, alertes et tableau de bord quotidien.", result: "-70%", resultText: "de temps passé sur les inventaires manuels" },
    { cat: "security", tag: "Sécurité", visual: "pv-cctv", title: "Système de surveillance 24 caméras", text: "Installation complète de caméras IP avec vision nocturne et accès à distance depuis le smartphone pour un campus d'entreprise.", result: "24/7", resultText: "surveillance à distance depuis n'importe quel téléphone" },
    { cat: "iot", tag: "IoT", visual: "pv-tank", title: "Jauge de cuve d'eau connectée", text: "Un capteur qui envoie le niveau d'eau par SMS et application — plus jamais à sec.", result: "100%", resultText: "de tranquillité, alertes en temps réel" },
    { cat: "iot", tag: "IoT", visual: "pv-home", title: "Maison intelligente pour une villa privée", text: "Éclairage, portail, climatisation et alarmes pilotés depuis une seule application, avec solution de secours locale en cas de coupure.", result: "1 app", resultText: "pour piloter toute la maison" },
    { cat: "software", tag: "Logiciel", visual: "pv-app", title: "Plateforme de gestion scolaire", text: "Inscriptions, notes, présences et communication avec les parents sur une seule plateforme web et mobile.", result: "3x", resultText: "plus rapide en administration scolaire" },
    { cat: "security", tag: "Sécurité", visual: "pv-access", title: "Contrôle d'accès de bureaux", text: "Système de portes par badge et code avec journal complet des entrées et sorties pour les bureaux d'une entreprise.", result: "0", resultText: "entrée non autorisée depuis l'installation" },
  ],
  en: [
    { cat: "software", tag: "Software", visual: "pv-dashboard", title: "Inventory & sales management", text: "A complete management platform for a Kinshasa distributor: stock, invoices, alerts and daily dashboard.", result: "-70%", resultText: "time spent on manual stock counts" },
    { cat: "security", tag: "Security", visual: "pv-cctv", title: "24-camera surveillance system", text: "Full installation of IP cameras with night vision and remote smartphone access for a company campus.", result: "24/7", resultText: "remote monitoring from any phone" },
    { cat: "iot", tag: "IoT", visual: "pv-tank", title: "Connected water tank monitoring", text: "A sensor that sends the water level to your phone by SMS and app — never run dry again.", result: "100%", resultText: "peace of mind, real-time alerts" },
    { cat: "iot", tag: "IoT", visual: "pv-home", title: "Smart home for a private villa", text: "Lighting, gate, AC and alarms controlled from one phone app, with local backup during power cuts.", result: "1 app", resultText: "to control the entire house" },
    { cat: "software", tag: "Software", visual: "pv-app", title: "School management platform", text: "Enrolment, grades, attendance and parent communication in one web and mobile platform.", result: "3x", resultText: "faster school administration" },
    { cat: "security", tag: "Security", visual: "pv-access", title: "Office access control", text: "Badge and code door system with a complete log of entries and exits for a company offices.", result: "0", resultText: "unauthorized entries since installation" },
  ],
} as const;

export const projectFilters = {
  fr: [
    { key: "all", label: "Tous" },
    { key: "software", label: "Logiciel" },
    { key: "iot", label: "IoT" },
    { key: "security", label: "Sécurité" },
  ],
  en: [
    { key: "all", label: "All" },
    { key: "software", label: "Software" },
    { key: "iot", label: "IoT" },
    { key: "security", label: "Security" },
  ],
} as const;

/* --------------------------- TECH STACK --------------------------- */
export const techCards = {
  fr: [
    { icon: "code", color: "i-code", title: "Web & Frontend", text: "Des interfaces rapides, responsives et modernes qui fonctionnent parfaitement sur mobile.", chips: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "HTML5 / CSS3"] },
    { icon: "database", color: "i-sec", title: "Backend & Bases de données", text: "Des API solides et des bases de données qui gèrent les données de vos utilisateurs en toute sécurité.", chips: ["Node.js", "Python", "PHP / Laravel", "PostgreSQL", "MySQL", "REST / GraphQL"] },
    { icon: "phone", color: "i-iot", title: "Applications mobiles", text: "Un seul code, deux plateformes : votre application sur Android et iOS.", chips: ["Flutter", "React Native", "Android natif", "Swift / iOS", "PWA"] },
    { icon: "cpu", color: "i-iot", title: "IoT & Électronique", text: "Du matériel connecté qui supporte les coupures d'électricité et les conditions difficiles.", chips: ["ESP32", "Arduino", "Raspberry Pi", "MQTT", "LoRa", "GSM / 4G"] },
    { icon: "shield", color: "i-sec", title: "Sécurité & Réseau", text: "Surveillance, contrôle d'accès et protection du réseau, sur site comme dans le cloud.", chips: ["Caméras IP / NVR", "ONVIF", "Firewall", "VPN", "Chiffrement TLS", "Audit de sécurité"] },
    { icon: "cloud", color: "i-code", title: "Cloud & DevOps", text: "Des déploiements automatisés, de la supervision et des sauvegardes pour un service sans interruption.", chips: ["Linux", "Docker", "Nginx", "CI/CD", "AWS", "Supervision 24/7"] },
  ],
  en: [
    { icon: "code", color: "i-code", title: "Web & Frontend", text: "Fast, responsive and modern interfaces that work perfectly on mobile.", chips: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "HTML5 / CSS3"] },
    { icon: "database", color: "i-sec", title: "Backend & Databases", text: "Robust APIs and databases that handle your users' data safely.", chips: ["Node.js", "Python", "PHP / Laravel", "PostgreSQL", "MySQL", "REST / GraphQL"] },
    { icon: "phone", color: "i-iot", title: "Mobile applications", text: "One codebase, two platforms: your app on Android and iOS.", chips: ["Flutter", "React Native", "Native Android", "Swift / iOS", "PWA"] },
    { icon: "cpu", color: "i-iot", title: "IoT & Electronics", text: "Connected hardware that tolerates power cuts and harsh conditions.", chips: ["ESP32", "Arduino", "Raspberry Pi", "MQTT", "LoRa", "GSM / 4G"] },
    { icon: "shield", color: "i-sec", title: "Security & Networking", text: "Surveillance, access control and network protection, on site and in the cloud.", chips: ["IP cameras / NVR", "ONVIF", "Firewall", "VPN", "TLS encryption", "Security audit"] },
    { icon: "cloud", color: "i-code", title: "Cloud & DevOps", text: "Automated deployments, monitoring and backups so your service never sleeps.", chips: ["Linux", "Docker", "Nginx", "CI/CD", "AWS", "24/7 monitoring"] },
  ],
} as const;

export const techNote = {
  fr: "<strong>Notre règle :</strong> nous choisissons l'outil adapté à votre budget et à votre connectivité — jamais simplement le plus tendance.",
  en: "<strong>Our rule:</strong> we pick the right tool for your budget and your connectivity — never the trendiest one.",
} as const;

/* --------------------------- ABOUT / TEAM --------------------------- */
export const aboutContent = {
  fr: {
    eyebrow: "À propos de Qualcus",
    title: "La technologie de proximité, <span class='text-grad'>maîtrisée de bout en bout</span>",
    p1: "Qualcus est une entreprise technologique basée au Congo. Nous réunissons développeurs, ingénieurs IoT et spécialistes en sécurité pour accompagner nos clients de l'idée à la mise en production.",
    p2: "Notre promesse : des solutions fiables, adaptées à nos réalités (connectivité, énergie, budget) et un accompagnement local, réactif et humain.",
    values: [
      { title: "Sur mesure", text: "Aucune solution générique imposée." },
      { title: "Local", text: "Équipe basée ici, disponible sur site." },
      { title: "Durable", text: "Matériel robuste & code maintenable." },
    ],
    stack: [
      "Node.js · Python · PHP",
      "React · Flutter · Laravel",
      "ESP32 · Arduino · Raspberry Pi",
      "MQTT · LoRa · 4G / GSM",
      "ONVIF · NVR · WebSocket",
      "AWS · Cloud self-hosted",
    ],
    teamEyebrow: "L'équipe",
    teamTitle: "Des spécialistes que vous pouvez <span class='text-grad'>vraiment joindre</span>",
    teamLead: "Une équipe soudée, basée ici, qui connaît le terrain et qui répond quand vous appelez.",
    team: [
      { color: "ta-1", icon: "code", title: "Développeurs logiciels", role: "Web · Mobile · Applications de gestion", text: "Ils transforment vos besoins en applications rapides, propres et fiables, puis restent disponibles après la livraison." },
      { color: "ta-2", icon: "cpu", title: "Ingénieurs IoT", role: "Capteurs · Automatisation · Électronique", text: "Ils conçoivent des dispositifs connectés pensés pour notre réalité : coupures, réseaux faibles et conditions difficiles." },
      { color: "ta-3", icon: "shield", title: "Experts en sécurité", role: "Caméras · Accès · Réseaux", text: "Ils installent, configurent et supervisent vos systèmes, et forment votre personnel à les utiliser en confiance." },
    ],
  },
  en: {
    eyebrow: "About Qualcus",
    title: "Local technology, <span class='text-grad'>mastered end to end</span>",
    p1: "Qualcus is a technology company based in the Congo. We bring together software developers, IoT engineers and security specialists to support our clients from idea to production.",
    p2: "Our promise: reliable solutions adapted to our realities (connectivity, power, budget) and a local, responsive, human support.",
    values: [
      { title: "Custom-built", text: "No off-the-shelf solution imposed." },
      { title: "Local", text: "Team based here, available on site." },
      { title: "Durable", text: "Robust hardware & maintainable code." },
    ],
    stack: [
      "Node.js · Python · PHP",
      "React · Flutter · Laravel",
      "ESP32 · Arduino · Raspberry Pi",
      "MQTT · LoRa · 4G / GSM",
      "ONVIF · NVR · WebSocket",
      "AWS · Cloud self-hosted",
    ],
    teamEyebrow: "The team",
    teamTitle: "Specialists you can <span class='text-grad'>actually reach</span>",
    teamLead: "A close-knit team, based here, who know the terrain and answer when you call.",
    team: [
      { color: "ta-1", icon: "code", title: "Software developers", role: "Web · Mobile · Business apps", text: "They turn your needs into fast, clean and reliable applications, then stay available after delivery." },
      { color: "ta-2", icon: "cpu", title: "IoT engineers", role: "Sensors · Automation · Electronics", text: "They design connected devices built for our reality: power cuts, weak networks and rough conditions." },
      { color: "ta-3", icon: "shield", title: "Security experts", role: "Cameras · Access · Networks", text: "They install, configure and monitor your systems, and train your staff to use them with confidence." },
    ],
  },
} as const;

/* --------------------------- FAQ --------------------------- */
export const faqItems = {
  fr: [
    { q: "Combien coûte un site web ou un logiciel ?", a: "Cela dépend des fonctionnalités, mais nous donnons toujours un devis détaillé avant de commencer, et le paiement peut se faire échelonné. La première consultation est gratuite." },
    { q: "Travaillez-vous en dehors de Kinshasa ?", a: "Oui. Nous sommes présents à Kinshasa, Bunia et Goma, et nous intervenons partout au Congo ainsi qu'à distance, grâce à nos outils de supervision." },
    { q: "Que se passe-t-il si mon système tombe en panne ?", a: "Toutes nos installations bénéficient d'une garantie de 12 mois, et nous proposons des contrats de maintenance avec des délais d'intervention garantis." },
    { q: "Vais-je pouvoir utiliser le système moi-même ?", a: "Absolument. Chaque projet se termine par une formation et une documentation utilisateur claire, rédigée dans un langage simple." },
    { q: "Vos systèmes fonctionnent-ils pendant les coupures ?", a: "Oui. Nos dispositifs IoT intègrent une batterie et une sauvegarde GSM, et nous dimensionnons chaque installation pour être autonome." },
    { q: "À qui appartient le code et les données ?", a: "À vous. Nous livrons le code source et la documentation complète pour chaque projet sur mesure, pour que vous ne soyez jamais dépendant de nous." },
  ],
  en: [
    { q: "How much does a website or software cost?", a: "It depends on the features, but we always give a detailed quote before starting, and payment can be made in stages. The first consultation is free." },
    { q: "Do you work outside Kinshasa?", a: "Yes. We are based in Kinshasa, Bunia and Goma, and we work across the entire Congo as well as remotely, thanks to our monitoring tools." },
    { q: "What happens if my system breaks down?", a: "All our installations carry a 12-month warranty, and we offer maintenance contracts with guaranteed response times." },
    { q: "Will I be able to use the system myself?", a: "Absolutely. Every project ends with training and clear user documentation, written in simple language." },
    { q: "Do your systems work during power cuts?", a: "Yes. Our IoT devices include battery and GSM backup, and we size every installation to be autonomous." },
    { q: "Who owns the code and the data?", a: "To you. We deliver the source code and full documentation with every custom project, so you are never locked in." },
  ],
} as const;

/* --------------------------- CONTACT --------------------------- */
export const contactInfo = {
  fr: {
    eyebrow: "Contact",
    title: "Parlons de votre <span class='text-grad'>projet</span>",
    lead: "Décrivez votre besoin : nous vous répondons sous 24 h avec une première estimation.",
    locationLabel: "Localisation",
    location: "Congo — Kinshasa · Bunia · Goma",
    phoneLabel: "Téléphone / WhatsApp",
    hoursLabel: "Horaires",
    hours: "Lundi – Samedi : 8h – 18h",
    form: {
      name: "Nom complet",
      namePh: "Votre nom",
      email: "E-mail",
      emailPh: "vous@exemple.com",
      phone: "Téléphone",
      phonePh: "+243 ...",
      service: "Service recherché",
      services: ["Développement logiciel", "Objets connectés (IoT)", "Dispositifs de sécurité", "Plusieurs services", "Autre"],
      message: "Votre message",
      messagePh: "Décrivez votre besoin...",
      note: "Vos informations restent confidentielles.",
      sent: "Merci ! Votre demande a bien été envoyée. Nous vous répondons sous 24 h.",
      error: "L'envoi a échoué. Réessayez ou écrivez-nous sur WhatsApp.",
    },
    whatsapp: "Discutez avec nous sur WhatsApp",
    mapTitle: "Nous trouver",
    mapText: "Kinshasa · Bunia · Goma, République Démocratique du Congo",
    mapBtn: "Ouvrir dans Google Maps",
  },
  en: {
    eyebrow: "Contact",
    title: "Let's talk about your <span class='text-grad'>project</span>",
    lead: "Describe your need: we reply within 24 h with a first estimate.",
    locationLabel: "Location",
    location: "Congo — Kinshasa · Bunia · Goma",
    phoneLabel: "Phone / WhatsApp",
    hoursLabel: "Opening hours",
    hours: "Monday – Saturday: 8am – 6pm",
    form: {
      name: "Full name",
      namePh: "Your name",
      email: "E-mail",
      emailPh: "you@example.com",
      phone: "Phone",
      phonePh: "+243 ...",
      service: "Service needed",
      services: ["Software development", "Connected devices (IoT)", "Security devices", "Multiple services", "Other"],
      message: "Your message",
      messagePh: "Describe your need...",
      note: "Your information stays confidential.",
      sent: "Thank you! Your request has been sent. We will reply within 24 h.",
      error: "Sending failed. Please try again or message us on WhatsApp.",
    },
    whatsapp: "Chat with us on WhatsApp",
    mapTitle: "Find us",
    mapText: "Kinshasa · Bunia · Goma, Democratic Republic of the Congo",
    mapBtn: "Open in Google Maps",
  },
} as const;

export type PageContent = typeof home;
