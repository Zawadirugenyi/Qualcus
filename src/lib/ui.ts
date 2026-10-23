export const languages = {
  fr: "Français",
  en: "English",
} as const;

export type Lang = keyof typeof languages;

export const ui = {
  fr: {
    meta: {
      home: {
        title: "Qualcus — Logiciels, IoT & Sécurité au Congo | Entreprise technologique",
        desc: "Qualcus conçoit des logiciels sur mesure, des objets connectés (IoT) et installe des systèmes de sécurité au Congo. Devis gratuit, garantie 12 mois, support local.",
      },
    },
    nav: {
      home: "Accueil",
      services: "Services",
      projects: "Réalisations",
      technologies: "Technologies",
      about: "À propos",
      faq: "FAQ",
      contact: "Contact",
    },
    cta: {
      quote: "Obtenir un devis gratuit",
      quoteShort: "Devis gratuit",
      discuss: "Discuter de mon projet →",
      seeProjects: "Voir nos réalisations",
      ourTech: "Nos technologies",
      start: "Démarrer mon projet",
      describe: "Décrire mon besoin",
      send: "Envoyer la demande",
      sending: "Envoi en cours...",
      subscribe: "S'abonner",
    },
    footer: {
      tagline: "Logiciels, IoT et sécurité — la technologie au service de votre activité au Congo.",
      servicesTitle: "Services",
      companyTitle: "Entreprise",
      contactTitle: "Contact",
      newsletterTitle: "Restez informé",
      newsletterText: "Nouvelles solutions, conseils tech et offres — un e-mail par mois, sans spam.",
      newsletterOk: "✓ Merci ! Vous êtes inscrit(e) — à bientôt.",
      newsletterErr: "Inscription impossible. Réessayez plus tard.",
      rights: "Qualcus. Tous droits réservés.",
      made: "Conçu & développé au Congo 🇨🇩",
    },
    bot: {
      name: "Qualcus Bot",
      status: "En ligne — réponse immédiate",
      today: "Aujourd'hui",
      placeholder: "Écrivez un message...",
      hello:
        "Bonjour 👋 Bienvenue chez <strong>Qualcus</strong> !\nJe suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
      continue: "Continuer sur WhatsApp",
      menu: {
        services: "🛠️ Nos services",
        quote: "💰 Demander un devis",
        contact: "🕒 Horaires & contact",
        agent: "👤 Parler à un conseiller",
      },
      answers: {
        services:
          "Nous couvrons 3 domaines :\n\n1️⃣ Logiciels sur mesure (sites, apps, gestion)\n2️⃣ Objets connectés IoT (domotique, capteurs)\n3️⃣ Sécurité (caméras, alarmes, portes digitales)\n\n+ Listes de présence digitales et portes digitales.\n\nLaquelle vous intéresse ?",
        quote:
          "Super ! Le devis est gratuit et sans engagement. 👍\n\nPour vous préparer, dites-moi :\n• Le service souhaité\n• Votre ville\n• Une idée de budget (optionnel)\n\nOu continuez directement sur WhatsApp pour un échange rapide.",
        contact:
          "🕒 Horaires : Lundi – Samedi, 8h – 18h\n📞 Tél / WhatsApp :\n• +243 81 170 8999\n• +254 746 616 124\n✉️ E-mail : contact@qualcus.com\n📍 Congo — Kinshasa · Bunia · Goma\n\nRéponse sous 24 h garantie !",
        agent:
          "Aucun souci, un conseiller Qualcus va vous répondre personnellement sur WhatsApp. 👇\nCliquez sur « Continuer sur WhatsApp » ci-dessous.",
        fallback:
          "Merci pour votre message ! 😊\nPour une réponse précise, un conseiller Qualcus prendra le relais sur WhatsApp. Vous pouvez aussi choisir une option ci-dessous.",
      },
    },
  },
  en: {
    meta: {
      home: {
        title: "Qualcus — Software, IoT & Security in the Congo | Tech company",
        desc: "Qualcus designs custom software, connected devices (IoT) and installs security systems in the Congo. Free quote, 12-month warranty, local support.",
      },
    },
    nav: {
      home: "Home",
      services: "Services",
      projects: "Projects",
      technologies: "Technologies",
      about: "About",
      faq: "FAQ",
      contact: "Contact",
    },
    cta: {
      quote: "Get a free quote",
      quoteShort: "Free quote",
      discuss: "Discuss my project →",
      seeProjects: "See our projects",
      ourTech: "Our technologies",
      start: "Start my project",
      describe: "Describe my need",
      send: "Send request",
      sending: "Sending...",
      subscribe: "Subscribe",
    },
    footer: {
      tagline: "Software, IoT and security — technology at the service of your business in the Congo.",
      servicesTitle: "Services",
      companyTitle: "Company",
      contactTitle: "Contact",
      newsletterTitle: "Stay informed",
      newsletterText: "New solutions, tech tips and offers — one email per month, no spam.",
      newsletterOk: "✓ Thank you! You are subscribed — see you soon.",
      newsletterErr: "Subscription failed. Please try again later.",
      rights: "Qualcus. All rights reserved.",
      made: "Designed & built in the Congo 🇨🇩",
    },
    bot: {
      name: "Qualcus Bot",
      status: "Online — replies instantly",
      today: "Today",
      placeholder: "Type a message...",
      hello:
        "Hello 👋 Welcome to <strong>Qualcus</strong>!\nI'm your virtual assistant. How can I help you today?",
      continue: "Continue on WhatsApp",
      menu: {
        services: "🛠️ Our services",
        quote: "💰 Get a quote",
        contact: "🕒 Hours & contact",
        agent: "👤 Talk to an agent",
      },
      answers: {
        services:
          "We cover 3 areas:\n\n1️⃣ Custom software (websites, apps, management)\n2️⃣ IoT connected devices (home automation, sensors)\n3️⃣ Security (cameras, alarms, digital doors)\n\n+ Digital attendance lists and digital doors.\n\nWhich one interests you?",
        quote:
          "Great! The quote is free and no-obligation. 👍\n\nTo prepare it, tell me:\n• The service you need\n• Your city\n• A budget idea (optional)\n\nOr continue directly on WhatsApp for a quick chat.",
        contact:
          "🕒 Hours: Monday – Saturday, 8am – 6pm\n📞 Phone / WhatsApp:\n• +243 81 170 8999\n• +254 746 616 124\n✉️ E-mail: contact@qualcus.com\n📍 Congo — Kinshasa · Bunia · Goma\n\nReply within 24 h guaranteed!",
        agent:
          "No problem, a Qualcus agent will answer you personally on WhatsApp. 👇\nClick \"Continue on WhatsApp\" below.",
        fallback:
          "Thanks for your message! 😊\nFor a precise answer, a Qualcus agent will take over on WhatsApp. You can also pick an option below.",
      },
    },
  },
} as const;
