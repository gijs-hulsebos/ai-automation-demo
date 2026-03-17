export const DICTIONARY = {
  EN: {
    hero: {
      title: 'AI Automation & Integration Engineer',
      subtitle: 'I design and build AI automation systems that connect LLMs, APIs and workflow engines to automate real business operations.',
      demo: 'Interactive AI Automation Demo',
      demoDesc: 'Explore how an AI request moves through a real automation workflow including LLM processing, API integrations and system execution.',
      video: 'Video Walkthrough',
      videoDesc: 'See how these automation pipelines are designed, deployed and monitored in production.',
      cta: 'Watch Demo',
      chat: 'Try AI Assistant'
    },
    demo: {
      userRequest: 'User Request',
      systemResponse: 'System Response',
      sidebar: {
        workflows: 'Active Workflows',
        integrations: 'Integrations',
        logs: 'Logs',
        status: 'System Status'
      },
      metrics: {
        model: 'Model',
        engine: 'Engine',
        latency: 'API Latency',
        successRate: 'Success Rate',
        cpuUsage: 'CPU Usage',
        online: 'System Online',
        processing: 'Processing Request',
        idle: 'Idle'
      },
      logs: {
        title: 'System Activity Log',
        fullLogs: 'Full System Logs',
        completed: 'Process completed successfully'
      },
      integrations: {
        title: 'Active Integrations',
        status: 'Connected & Active'
      },
      nodes: {
        webhook: 'Webhook Step',
        llm: 'LLM Processor',
        context: 'Context Retrieval',
        logic: 'Automation Logic',
        response: 'Response Output',
        intent: 'Intent Detection',
        calendar: 'Calendar API',
        event: 'Create Event',
        mail: 'Send Confirmation',
        rss: 'RSS Feed',
        summarization: 'LLM Summarization',
        content: 'Content Generator',
        formatter: 'Email Formatter',
        dispatch: 'Newsletter Dispatch'
      },
      workflows: {
        chatbot: {
          name: 'AI Chatbot Automation',
          user: "What's the status of my order #12345?",
          system: "Your order #12345 is currently out for delivery and will arrive by 5 PM today."
        },
        calendar: {
          name: 'Calendar Booking Automation',
          user: "Plan a call on Wednesday at 09:00.",
          system: "Your call has been scheduled for Wednesday at 09:00."
        },
        newsletter: {
          name: 'AI Newsletter Generator',
          user: "Generate and send the weekly AI news summary.",
          system: "Newsletter generated with 5 articles and dispatched to 1,200 subscribers."
        }
      },
      workflowLogs: {
        chatbot: [
          "Incoming message via webhook",
          "Sending prompt to LLM",
          "Retrieving context from database",
          "Generating response",
          "Reply delivered to user"
        ],
        calendar: [
          "Incoming meeting request",
          "AI detecting scheduling intent",
          "Checking Google Calendar availability",
          "Creating event",
          "Sending confirmation email"
        ],
        newsletter: [
          "Fetching news sources",
          "Summarizing articles with LLM",
          "Generating newsletter content",
          "Formatting email template",
          "Sending newsletter"
        ]
      }
    },
    nav: {
      overview: 'Overview',
      walkthrough: 'Walkthrough',
      integrations: 'Integrations',
      consultancy: 'Consultancy',
      contact: 'Contact'
    },
    integrations: {
      title: 'Active Integrations',
      status: 'Connected & Active'
    },
    integrationsSection: {
      title: 'Integrations & Stack',
      subtitle: 'Built with modern, scalable technologies to ensure high performance and maintainability.',
      items: [
        { name: 'Next.js', desc: 'React framework for production-grade web applications.' },
        { name: 'n8n', desc: 'Fair-code workflow automation tool for complex logic.' },
        { name: 'Supabase', desc: 'Open source Firebase alternative for Postgres database.' },
        { name: 'OpenAI / Gemini', desc: 'Large language models for reasoning and text generation.' },
        { name: 'Webhooks / APIs', desc: 'Custom integrations with any third-party REST or GraphQL API.' },
        { name: 'Vercel', desc: 'Edge network for fast, reliable global deployments.' }
      ]
    },
    logs: {
      title: 'System Activity Log',
      fullLogs: 'Full System Logs',
      completed: 'Process completed successfully'
    },
    status: {
      title: 'System Status',
      latency: 'API Latency',
      successRate: 'Success Rate',
      cpuUsage: 'CPU Usage'
    },
    engineering: {
      tag: 'Built for real automation workloads',
      cards: [
        { title: 'AI Model Orchestration', desc: 'Connect LLMs with APIs and automation engines.' },
        { title: 'Workflow Automation', desc: 'Design complex event-driven workflows using n8n.' },
        { title: 'System Integrations', desc: 'Integrate messaging platforms, databases and business tools.' }
      ]
    },
    footer: {
      builtWith: 'Built with:'
    },
    chat: {
      title: 'AI Automation Assistant',
      online: 'Online',
      placeholder: 'Ask me anything...',
      suggested: [
        "How does the automation workflow work?",
        "What integrations are used?",
        "Explain the architecture."
      ],
      initial: "Hi! I'm Gijs' AI Assistant. How can I help you today?",
      simulatedResponse: "Thanks for your message! This is a simulated response for the portfolio demo. In a real implementation, this would connect to an AI model via API."
    },
    architecture: {
      title: 'How the System Works',
      subtitle: 'A robust, event-driven architecture designed to process complex natural language requests and execute deterministic workflows.',
      steps: [
        { title: 'User Request', desc: 'Input via chat, email, or form' },
        { title: 'AI Processing', desc: 'Intent recognition & extraction (OpenAI/Gemini)' },
        { title: 'Automation Workflow', desc: 'Logic routing & execution (n8n)' },
        { title: 'API Integrations', desc: 'Third-party service actions' },
        { title: 'Database', desc: 'State & record management (Supabase)' },
        { title: 'Response', desc: 'Formatted output back to user' }
      ]
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Interested in AI automation, integrations or consulting? Feel free to reach out.',
      detailsTitle: 'Contact Details',
      email: 'Email',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      openTo: 'I’m currently open to AI automation, integration and consulting opportunities.',
      formTitle: 'Send a Message',
      nameLabel: 'Name',
      emailLabel: 'Email',
      messageLabel: 'Message',
      sendButton: 'Send Message'
    },
    consultancy: {
      title: 'AI Automation & AI Systems Engineering',
      subtitle: 'I design and build production AI systems that connect language models, APIs and automation engines and modern AI tools to automate real business workflows.',
      description: 'From AI assistants and automation pipelines to AI avatars, content generation systems and workflow orchestration.',
      systemsTitle: 'AI Systems I Build',
      systems: [
        { title: 'AI Workflow Automation', desc: 'Design automation pipelines using LLMs, APIs and workflow engines such as n8n, Zapier or custom integrations.' },
        { title: 'AI Chatbots & AI Assistants', desc: 'Build AI assistants that automate support, research, scheduling and internal workflows.' },
        { title: 'AI Voice & Text-to-Speech Systems', desc: 'Integrate modern voice models and text-to-speech systems to create voice agents, voice assistants and automated communication tools.' },
        { title: 'AI Avatars & Video Generation', desc: 'Integrate AI avatar systems and video generation tools to build automated video content pipelines and interactive digital agents.' },
        { title: 'AI Content Generation Pipelines', desc: 'Automate content generation using modern AI models for text, images and video (including tools like Nano Banana, Veo or similar systems).' },
        { title: 'AI API Integrations', desc: 'Connect AI models with real software systems such as CRMs, databases, messaging platforms, internal tools and business APIs.' }
      ],
      toolsTitle: 'AI Models & Tools I Work With',
      tools: [
        { category: 'Language Models', items: ['OpenAI', 'Gemini', 'OpenRouter'] },
        { category: 'Voice & Speech', items: ['ElevenLabs', 'Deepgram'] },
        { category: 'Video / Avatars', items: ['HeyGen', 'Synthesia'] },
        { category: 'Automation', items: ['n8n', 'Zapier', 'Supabase', 'Vercel'] }
      ],
      processTitle: 'How I Build AI Systems',
      process: [
        { title: 'Analyze the workflow', desc: 'Identify repetitive processes, integration points and automation opportunities.' },
        { title: 'Design the AI architecture', desc: 'Design the system architecture connecting LLMs, APIs, databases and automation workflows.' },
        { title: 'Implement and deploy', desc: 'Build and deploy the AI system so it runs reliably inside real production environments.' }
      ],
      ctaTitle: 'Interested in building AI automation systems?',
      ctaDesc: 'Let’s discuss how AI integrations and automation pipelines can improve your workflows.',
      ctaButton: 'Contact Me'
    }
  },
  NL: {
    hero: {
      title: 'AI Automatisering & Integratie Engineer',
      subtitle: 'Ik ontwerp en bouw AI-automatiseringssystemen die LLM\'s, API\'s en workflow-engines verbinden om echte bedrijfsprocessen te automatisieren.',
      demo: 'Interactieve AI Automatisering Demo',
      demoDesc: 'Ontdek hoe een AI-verzoek door een echte automatiseringsworkflow beweegt, inclusief LLM-verwerking, API-integraties en systeemuitvoering.',
      video: 'Video-Demonstratie',
      videoDesc: 'Zie hoe deze automatiseringspijplijnen worden ontworpen, ingezet en gemonitord in productie.',
      cta: 'Bekijk Demo',
      chat: 'Probeer AI Assistent'
    },
    demo: {
      userRequest: 'Gebruikersverzoek',
      systemResponse: 'Systeemrespons',
      sidebar: {
        workflows: 'Actieve Workflows',
        integrations: 'Integraties',
        logs: 'Logs',
        status: 'Systeemstatus'
      },
      metrics: {
        model: 'Model',
        engine: 'Engine',
        latency: 'API-latentie',
        successRate: 'Succespercentage',
        cpuUsage: 'CPU-gebruik',
        online: 'Systeem Online',
        processing: 'Verzoek verwerken',
        idle: 'Inactief'
      },
      logs: {
        title: 'Systeemactiviteitenlog',
        fullLogs: 'Volledige Systeemlogs',
        completed: 'Proces succesvol voltooid'
      },
      integrations: {
        title: 'Actieve Integraties',
        status: 'Verbonden & Actief'
      },
      nodes: {
        webhook: 'Webhook Stap',
        llm: 'LLM Processor',
        context: 'Context Ophalen',
        logic: 'Automatiseringslogica',
        response: 'Respons Output',
        intent: 'Intentieherkenning',
        calendar: 'Agenda API',
        event: 'Gebeurtenis Maken',
        mail: 'Bevestiging Verzenden',
        rss: 'RSS Feed',
        summarization: 'LLM Samenvatting',
        content: 'Content Generator',
        formatter: 'E-mail Formatter',
        dispatch: 'Nieuwsbrief Verzenden'
      },
      workflows: {
        chatbot: {
          name: 'AI Chatbot Automatisering',
          user: "Wat is de status van mijn bestelling #12345?",
          system: "Uw bestelling #12345 is momenteel onderweg en wordt vandaag voor 17:00 uur bezorgd."
        },
        calendar: {
          name: 'Agenda Boekingsautomatisering',
          user: "Plan een gesprek in op woensdag om 09:00.",
          system: "Uw gesprek is ingepland voor woensdag om 09:00."
        },
        newsletter: {
          name: 'AI Nieuwsbrief Generator',
          user: "Genereer en verzend de wekelijkse AI-nieuwssamenvatting.",
          system: "Nieuwsbrief gegenereerd met 5 artikelen en verzonden naar 1.200 abonnees."
        }
      },
      workflowLogs: {
        chatbot: [
          "Inkomend bericht via webhook",
          "Prompt naar LLM verzenden",
          "Context ophalen uit database",
          "Respons genereren",
          "Antwoord verzonden naar gebruiker"
        ],
        calendar: [
          "Inkomend vergaderverzoek",
          "AI detecteert planningsintentie",
          "Beschikbaarheid Google Agenda controleren",
          "Gebeurtenis maken",
          "Bevestigingsmail verzenden"
        ],
        newsletter: [
          "Nieuwsbronnen ophalen",
          "Artikelen samenvatten met LLM",
          "Nieuwsbriefinhoud genereren",
          "E-mailtemplate formatteren",
          "Nieuwsbrief verzenden"
        ]
      }
    },
    nav: {
      overview: 'Overzicht',
      walkthrough: 'Walkthrough',
      integrations: 'Integraties',
      consultancy: 'Consultancy',
      contact: 'Contact'
    },
    integrations: {
      title: 'Actieve Integraties',
      status: 'Verbonden & Actief'
    },
    integrationsSection: {
      title: 'Integraties & Stack',
      subtitle: 'Gebouwd met moderne, schaalbare technologieën voor hoge prestaties en onderhoudbaarheid.',
      items: [
        { name: 'Next.js', desc: 'React framework voor productie-waardige webapplicaties.' },
        { name: 'n8n', desc: 'Fair-code workflow automatiseringstool voor complexe logica.' },
        { name: 'Supabase', desc: 'Open source Firebase alternatief voor Postgres database.' },
        { name: 'OpenAI / Gemini', desc: 'Grote taalmodellen voor redeneren en tekstgeneratie.' },
        { name: 'Webhooks / APIs', desc: 'Aangepaste integraties met elke REST of GraphQL API van derden.' },
        { name: 'Vercel', desc: 'Edge netwerk voor snelle, betrouwbare wereldwijde implementaties.' }
      ]
    },
    logs: {
      title: 'Systeemactiviteitenlog',
      fullLogs: 'Volledige Systeemlogs',
      completed: 'Proces succesvol voltooid'
    },
    status: {
      title: 'Systeemstatus',
      latency: 'API-latentie',
      successRate: 'Succespercentage',
      cpuUsage: 'CPU-gebruik'
    },
    engineering: {
      tag: 'Gebouwd voor echte automatiseringswerkbelastingen',
      cards: [
        { title: 'AI Model Orchestratie', desc: 'Verbind LLM\'s met API\'s en automatiseringsengines.' },
        { title: 'Workflow Automatisering', desc: 'Ontwerp complexe event-driven workflows met n8n.' },
        { title: 'Systeemintegraties', desc: 'Integreer berichtenplatforms, databases en zakelijke tools.' }
      ]
    },
    footer: {
      builtWith: 'Gebouwd met:'
    },
    chat: {
      title: 'AI Automatisering Assistent',
      online: 'Online',
      placeholder: 'Stel me een vraag...',
      suggested: [
        "Hoe werkt de automatiseringsworkflow?",
        "Welke integraties worden gebruikt?",
        "Leg de architectuur uit."
      ],
      initial: "Hallo! Ik ben Gijs' AI-assistent. Hoe kan ik je vandaag helpen?",
      simulatedResponse: "Bedankt voor je bericht! Dit is een gesimuleerd antwoord voor de portfolio-demo. In een echte implementatie zou dit via een API verbinding maken met een AI-model."
    },
    architecture: {
      title: 'Hoe het Systeem Werkt',
      subtitle: 'Een robuuste, event-driven architectuur ontworpen om complexe verzoeken in natuurlijke taal te verwerken en deterministische workflows uit te voeren.',
      steps: [
        { title: 'Gebruikersverzoek', desc: 'Input via chat, e-mail of formulier' },
        { title: 'AI-verwerking', desc: 'Intentieherkenning & extractie (OpenAI/Gemini)' },
        { title: 'Automatiseringsworkflow', desc: 'Logica routing & uitvoering (n8n)' },
        { title: 'API-integraties', desc: 'Acties van derden' },
        { title: 'Database', desc: 'State & recordbeheer (Supabase)' },
        { title: 'Respons', desc: 'Geformatteerde output terug naar gebruiker' }
      ]
    },
    contact: {
      title: 'Neem Contact Op',
      subtitle: 'Geïnteresseerd in AI-automatisering, integraties of consultancy? Neem gerust contact op.',
      detailsTitle: 'Contactgegevens',
      email: 'E-mail',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      openTo: 'Ik sta momenteel open voor mogelijkheden op het gebied van AI-automatisering, integratie en consultancy.',
      formTitle: 'Stuur een Bericht',
      nameLabel: 'Naam',
      emailLabel: 'E-mail',
      messageLabel: 'Bericht',
      sendButton: 'Bericht Verzenden'
    },
    consultancy: {
      title: 'AI Automatisering & AI Systems Engineering',
      subtitle: 'Ik ontwerp en bouw enterprise-grade AI-systemen die taalmodellen, API\'s, automatiseringsengines en moderne AI-tools verbinden om bedrijfsprocessen te stroomlijnen.',
      description: 'Van AI-assistenten en automatiseringspipelines tot AI-avatars, contentgeneratiesystemen en workflow-orkestratie.',
      systemsTitle: 'AI-systemen die ik ontwikkel',
      systems: [
        { title: 'AI Workflow Automatisering', desc: 'Ontwerp en implementeer geavanceerde automatiseringspipelines met behulp van LLM\'s, API\'s en workflow-engines zoals n8n, Zapier of maatwerk integraties.' },
        { title: 'AI Chatbots & AI Assistenten', desc: 'Ontwikkel intelligente AI-assistenten die klantenservice, onderzoek, planning en interne workflows automatiseren.' },
        { title: 'AI Voice & Text-to-Speech Systemen', desc: 'Integreer moderne spraakmodellen en text-to-speech systemen voor de creatie van voice agents, spraakassistenten en geautomatiseerde communicatietools.' },
        { title: 'AI Avatars & Videogeneratie', desc: 'Implementeer AI-avatarsystemen en videogeneratietools om geautomatiseerde videocontentpipelines en interactieve digitale agenten te bouwen.' },
        { title: 'AI Contentgeneratie Pipelines', desc: 'Automatiseer contentcreatie met behulp van state-of-the-art AI-modellen voor tekst, afbeeldingen en video (inclusief tools zoals Nano Banana, Veo of vergelijkbare systemen).' },
        { title: 'AI API Integraties', desc: 'Koppel AI-modellen naadloos aan bestaande softwaresystemen zoals CRM\'s, databases, communicatieplatforms, interne tools en zakelijke API\'s.' }
      ],
      toolsTitle: 'AI-modellen & Tools waarmee ik werk',
      tools: [
        { category: 'Taalmodellen', items: ['OpenAI', 'Gemini', 'OpenRouter'] },
        { category: 'Spraak & Stem', items: ['ElevenLabs', 'Deepgram'] },
        { category: 'Video / Avatars', items: ['HeyGen', 'Synthesia'] },
        { category: 'Automatisering', items: ['n8n', 'Zapier', 'Supabase', 'Vercel'] }
      ],
      processTitle: 'Mijn aanpak voor AI-systemen',
      process: [
        { title: 'Workflow Analyse', desc: 'Identificeer repetitieve processen, integratiepunten en strategische automatiseringsmogelijkheden.' },
        { title: 'AI-architectuur Ontwerp', desc: 'Ontwerp een robuuste systeemarchitectuur die LLM\'s, API\'s, databases en automatiseringsworkflows efficiënt verbindt.' },
        { title: 'Implementatie & Deployment', desc: 'Bouw en implementeer het AI-systeem zodat het betrouwbaar en schaalbaar draait in productieomgevingen.' }
      ],
      ctaTitle: 'Geïnteresseerd in het bouwen van AI-automatiseringssystemen?',
      ctaDesc: 'Laten we bespreken hoe AI-integraties en automatiseringspipelines uw bedrijfsprocessen kunnen optimaliseren.',
      ctaButton: 'Neem Contact Op'
    }
  },
  DE: {
    hero: {
      title: 'KI-Automatisierungs- & Integrationsingenieur',
      subtitle: 'Ich entwerfe und baue KI-Automatisierungssysteme, die LLMs, APIs und Workflow-Engines verbinden, um echte Geschäftsprozesse zu automatisieren.',
      demo: 'Interaktive KI-Automatisierungs-Demo',
      demoDesc: 'Erkunden Sie, wie sich eine KI-Anfrage durch einen echten Automatisierungsworkflow bewegt, einschließlich LLM-Verarbeitung, API-Integrationen und Systemausführung.',
      video: 'Video-Demonstration',
      videoDesc: 'Sehen Sie, wie diese Automatisierungspipelines entworfen, bereitgestellt und in der Produktion überwacht werden.',
      cta: 'Demo ansehen',
      chat: 'KI-Assistent ausprobieren'
    },
    demo: {
      userRequest: 'Benutzeranfrage',
      systemResponse: 'Systemantwort',
      sidebar: {
        workflows: 'Aktive Arbeitsabläufe',
        integrations: 'Integrationen',
        logs: 'Protokolle',
        status: 'Systemstatus'
      },
      metrics: {
        model: 'Modell',
        engine: 'Engine',
        latency: 'API-Latenz',
        successRate: 'Erfolgsquote',
        cpuUsage: 'CPU-Auslastung',
        online: 'System Online',
        processing: 'Anfrage verarbeiten',
        idle: 'Leerlauf'
      },
      logs: {
        title: 'Systemaktivitätsprotokoll',
        fullLogs: 'Vollständige Systemprotokolle',
        completed: 'Prozess erfolgreich abgeschlossen'
      },
      integrations: {
        title: 'Aktive Integrationen',
        status: 'Verbunden & Aktiv'
      },
      nodes: {
        webhook: 'Webhook-Schritt',
        llm: 'LLM-Prozessor',
        context: 'Kontext abrufen',
        logic: 'Automatisierungslogik',
        response: 'Antwort-Ausgabe',
        intent: 'Absichtserkennung',
        calendar: 'Kalender-API',
        event: 'Ereignis erstellen',
        mail: 'Bestätigung senden',
        rss: 'RSS-Feed',
        summarization: 'LLM-Zusammenfassung',
        content: 'Inhaltsgenerator',
        formatter: 'E-Mail-Formatierer',
        dispatch: 'Newsletter-Versand'
      },
      workflows: {
        chatbot: {
          name: 'KI-Chatbot-Automatisierung',
          user: "Wie ist der Status meiner Bestellung #12345?",
          system: "Ihre Bestellung #12345 ist derzeit in Zustellung und wird heute bis 17:00 Uhr eintreffen."
        },
        calendar: {
          name: 'Kalender-Buchungsautomatisierung',
          user: "Planen Sie einen Anruf am Mittwoch um 09:00 Uhr.",
          system: "Ihr Anruf wurde für Mittwoch um 09:00 Uhr geplant."
        },
        newsletter: {
          name: 'KI-Newsletter-Generator',
          user: "Generieren und versenden Sie die wöchentliche KI-News-Zusammenfassung.",
          system: "Newsletter mit 5 Artikeln generiert und an 1.200 Abonnenten versendet."
        }
      },
      workflowLogs: {
        chatbot: [
          "Eingehende Nachricht über Webhook",
          "Prompt an LLM senden",
          "Kontext aus Datenbank abrufen",
          "Antwort generieren",
          "Antwort an Benutzer gesendet"
        ],
        calendar: [
          "Eingehende Terminanfrage",
          "KI erkennt Planungsabsicht",
          "Google Kalender-Verfügbarkeit prüfen",
          "Ereignis erstellen",
          "Bestätigungs-E-Mail senden"
        ],
        newsletter: [
          "Nachrichtenquellen abrufen",
          "Artikel mit LLM zusammenfassen",
          "Newsletter-Inhalt generieren",
          "E-Mail-Vorlage formatieren",
          "Newsletter senden"
        ]
      }
    },
    nav: {
      overview: 'Übersicht',
      walkthrough: 'Walkthrough',
      integrations: 'Integrationen',
      consultancy: 'Beratung',
      contact: 'Kontakt'
    },
    integrations: {
      title: 'Aktive Integrationen',
      status: 'Verbunden & Aktiv'
    },
    integrationsSection: {
      title: 'Integrationen & Stack',
      subtitle: 'Entwickelt mit modernen, skalierbaren Technologien für hohe Leistung und Wartbarkeit.',
      items: [
        { name: 'Next.js', desc: 'React-Framework für produktionsreife Webanwendungen.' },
        { name: 'n8n', desc: 'Fair-Code-Workflow-Automatisierungstool für komplexe Logik.' },
        { name: 'Supabase', desc: 'Open-Source-Firebase-Alternative für Postgres-Datenbanken.' },
        { name: 'OpenAI / Gemini', desc: 'Große Sprachmodelle für Schlussfolgerungen und Textgenerierung.' },
        { name: 'Webhooks / APIs', desc: 'Benutzerdefinierte Integrationen mit jeder REST- oder GraphQL-API von Drittanbietern.' },
        { name: 'Vercel', desc: 'Edge-Netzwerk für schnelle, zuverlässige globale Bereitstellungen.' }
      ]
    },
    logs: {
      title: 'Systemaktivitätsprotokoll',
      fullLogs: 'Vollständige Systemprotokolle',
      completed: 'Prozess erfolgreich abgeschlossen'
    },
    status: {
      title: 'Systemstatus',
      latency: 'API-Latenz',
      successRate: 'Erfolgsquote',
      cpuUsage: 'CPU-Auslastung'
    },
    engineering: {
      tag: 'Gebaut für echte Automatisierungs-Workloads',
      cards: [
        { title: 'KI-Modell-Orchestrierung', desc: 'Verbinden Sie LLMs mit APIs und Automatisierungs-Engines.' },
        { title: 'Workflow-Automatisierung', desc: 'Entwerfen Sie komplexe ereignisgesteuerte Workflows mit n8n.' },
        { title: 'Systemintegrationen', desc: 'Integrieren Sie Messaging-Plattformen, Datenbanken und Business-Tools.' }
      ]
    },
    footer: {
      builtWith: 'Gebaut mit:'
    },
    chat: {
      title: 'KI-Automatisierungs-Assistent',
      online: 'Online',
      placeholder: 'Fragen Sie mich alles...',
      suggested: [
        "Wie funktioniert der Automatisierungsworkflow?",
        "Welche Integrationen werden verwendet?",
        "Erklären Sie die Architektur."
      ],
      initial: "Hallo! Ich bin Gijs' KI-Assistent. Wie kann ich Ihnen heute helfen?",
      simulatedResponse: "Danke für Ihre Nachricht! Dies ist eine simulierte Antwort für die Portfolio-Demo. In einer echten Implementierung würde dies über eine API eine Verbindung zu einem KI-Modell herstellen."
    },
    architecture: {
      title: 'Wie das System funktioniert',
      subtitle: 'Eine robuste, ereignisgesteuerte Architektur, die darauf ausgelegt ist, komplexe Anfragen in natürlicher Sprache zu verarbeiten und deterministische Workflows auszuführen.',
      steps: [
        { title: 'Benutzeranfrage', desc: 'Eingabe per Chat, E-Mail oder Formular' },
        { title: 'KI-Verarbeitung', desc: 'Absichtserkennung & Extraktion (OpenAI/Gemini)' },
        { title: 'Automatisierungsworkflow', desc: 'Logik-Routing & Ausführung (n8n)' },
        { title: 'API-Integrationen', desc: 'Aktionen von Drittanbietern' },
        { title: 'Datenbank', desc: 'Zustands- & Datensatzverwaltung (Supabase)' },
        { title: 'Antwort', desc: 'Formatierte Ausgabe zurück an den Benutzer' }
      ]
    },
    contact: {
      title: 'Kontakt aufnehmen',
      subtitle: 'Interessiert an KI-Automatisierung, Integrationen oder Beratung? Melden Sie sich gerne.',
      detailsTitle: 'Kontaktdaten',
      email: 'E-Mail',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      openTo: 'Ich bin derzeit offen für Möglichkeiten in den Bereichen KI-Automatisierung, Integration und Beratung.',
      formTitle: 'Eine Nachricht senden',
      nameLabel: 'Name',
      emailLabel: 'E-Mail',
      messageLabel: 'Nachricht',
      sendButton: 'Nachricht Senden'
    },
    consultancy: {
      title: 'KI-Automatisierung & KI-Systemtechnik',
      subtitle: 'Ich entwerfe und entwickle Enterprise-KI-Systeme, die Sprachmodelle, APIs, Automatisierungs-Engines und moderne KI-Tools verbinden, um Geschäftsprozesse zu optimieren.',
      description: 'Von KI-Assistenten und Automatisierungs-Pipelines bis hin zu KI-Avataren, Content-Generierungssystemen und Workflow-Orchestrierung.',
      systemsTitle: 'KI-Systeme, die ich entwickle',
      systems: [
        { title: 'KI-Workflow-Automatisierung', desc: 'Entwerfen und implementieren Sie fortschrittliche Automatisierungs-Pipelines mithilfe von LLMs, APIs und Workflow-Engines wie n8n, Zapier oder maßgeschneiderten Integrationen.' },
        { title: 'KI-Chatbots & KI-Assistenten', desc: 'Entwickeln Sie intelligente KI-Assistenten, die Kundenservice, Recherche, Terminplanung und interne Workflows automatisieren.' },
        { title: 'KI-Voice & Text-to-Speech-Systeme', desc: 'Integrieren Sie moderne Sprachmodelle und Text-to-Speech-Systeme zur Erstellung von Voice Agents, Sprachassistenten und automatisierten Kommunikationstools.' },
        { title: 'KI-Avatare & Videogenerierung', desc: 'Implementieren Sie KI-Avatar-Systeme und Videogenerierungstools, um automatisierte Video-Content-Pipelines und interaktive digitale Agenten aufzubauen.' },
        { title: 'KI-Content-Generierungs-Pipelines', desc: 'Automatisieren Sie die Content-Erstellung mithilfe modernster KI-Modelle für Text, Bilder und Videos (einschließlich Tools wie Nano Banana, Veo oder ähnlicher Systeme).' },
        { title: 'KI-API-Integrationen', desc: 'Verbinden Sie KI-Modelle nahtlos mit bestehenden Softwaresystemen wie CRMs, Datenbanken, Kommunikationsplattformen, internen Tools und Geschäfts-APIs.' }
      ],
      toolsTitle: 'KI-Modelle & Tools, mit denen ich arbeite',
      tools: [
        { category: 'Sprachmodelle', items: ['OpenAI', 'Gemini', 'OpenRouter'] },
        { category: 'Sprache & Stimme', items: ['ElevenLabs', 'Deepgram'] },
        { category: 'Video / Avatare', items: ['HeyGen', 'Synthesia'] },
        { category: 'Automatisierung', items: ['n8n', 'Zapier', 'Supabase', 'Vercel'] }
      ],
      processTitle: 'Mein Ansatz für KI-Systeme',
      process: [
        { title: 'Workflow-Analyse', desc: 'Identifizieren Sie repetitive Prozesse, Integrationspunkte und strategische Automatisierungsmöglichkeiten.' },
        { title: 'KI-Architekturdesign', desc: 'Entwerfen Sie eine robuste Systemarchitektur, die LLMs, APIs, Datenbanken und Automatisierungs-Workflows effizient verbindet.' },
        { title: 'Implementierung & Deployment', desc: 'Entwickeln und implementieren Sie das KI-System so, dass es zuverlässig und skalierbar in Produktionsumgebungen läuft.' }
      ],
      ctaTitle: 'Interessiert an der Entwicklung von KI-Automatisierungssystemen?',
      ctaDesc: 'Lassen Sie uns besprechen, wie KI-Integrationen und Automatisierungs-Pipelines Ihre Geschäftsprozesse optimieren können.',
      ctaButton: 'Kontaktieren Sie mich'
    }
  }
};
