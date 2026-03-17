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
        llm: 'LLM Processor Step',
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
        llm: 'LLM Processor Stap',
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
        llm: 'LLM-Prozessor-Schritt',
        context: 'Kontextabruf',
        logic: 'Automatisierungslogik',
        response: 'Antwortausgabe',
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
      workflowLogs: {
        chatbot: [
          "Eingehende Nachricht über Webhook",
          "Sende Prompt an LLM",
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
    }
  }
};
