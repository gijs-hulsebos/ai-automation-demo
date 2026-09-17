export const toolLogos: Record<string, string> = {
  pr: '/projects/tools/PR-extractor.png',
  audio: '/projects/tools/Audio-Extractor.png',
  crawlclaw: '/projects/tools/CrawlClaw.png',
  metaclean: '/projects/tools/MetaClean.png',
  repo: '/projects/tools/Repo-Explorer.png',
  security: '/projects/tools/Security-Audit-Checker.png',
  yamlgen: '/projects/tools/YAMLGen.png',
};

export const toolDescriptions: Record<string, Record<string, string>> = {
 NL: { pr:'Pull requests exporteren als JSON', audio:'Audio uit video halen', repo:'GitHub-repositories verkennen', security:'Webapps controleren op kwetsbaarheden', metaclean:'Verborgen metadata verwijderen', yamlgen:'In ontwikkeling', crawlclaw:'In ontwikkeling' },
 EN: { pr:'Export pull requests as JSON', audio:'Extract audio from video', repo:'Explore GitHub repositories', security:'Check web apps for vulnerabilities', metaclean:'Remove hidden metadata', yamlgen:'In development', crawlclaw:'In development' },
 DE: { pr:'Pull Requests als JSON exportieren', audio:'Audio aus Videos extrahieren', repo:'GitHub-Repositories erkunden', security:'Webapps auf Schwachstellen prüfen', metaclean:'Versteckte Metadaten entfernen', yamlgen:'In Entwicklung', crawlclaw:'In Entwicklung' },
};
