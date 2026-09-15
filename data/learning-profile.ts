// Reviewed public portfolio evidence, 2026-09-15. This is a documentation date,
// not a claim that each project was built or completed on that date.
export const profileReviewedOn='2026-09-15';
export const profileDomains=['cloud','automation','ai','integration','software','data','security'] as const;
export type ProfileDomain=typeof profileDomains[number];
export const projectProfile:Record<string,{domains:ProfileDomain[];detail:string}>={
  skillmax:{domains:['cloud','automation','integration','software','data','security'],detail:'Cloud Run, Firestore, geplande GitHub/Vercel-sync, REST API en gescheiden publieke/privé toegang.'},
  events:{domains:['cloud','integration','software','data','security'],detail:'Cloud Run en Firestore, eventfilters, Calendar-koppeling en afgeschermde eigenaarselecties.'},
  insurance:{domains:['automation','ai','integration','data','security'],detail:'n8n-webhooks, model-fallback, gescheiden persoonsgegevens, JSON-triage en menselijke review.'},
  calendar:{domains:['automation','ai','integration','data'],detail:'Agentworkflow met Calendar-tools, gespreksgeheugen, Sheets en Gmail.'},
  newsletter:{domains:['automation','ai','integration','data'],detail:'Geplande RSS-inname, deduplicatie, AI-synthese en document- en e-maildistributie.'},
  mediagen:{domains:['automation','ai','integration','software'],detail:'Briefinginterface, n8n-voorbeeldworkflow en reviewstappen; bevat simulatiepaden.'},
  acquisition:{domains:['ai','integration','software','data'],detail:'Begrensde Firecrawl-pipeline, deterministische analyse en optionele OpenRouter-tekstverwerking.'},
  stayai:{domains:['cloud','ai','integration','software','data','security'],detail:'OpenRouter, hotel-API, Supabase Auth en eigenaargebonden databasebeleid; reserveringen zijn demo’s.'},
  security:{domains:['automation','software','data','security'],detail:'Crawler, patroon- en entropieanalyse, CWE/CVSS-classificatie en rapportexports.'},
  donation:{domains:['automation','integration','software'],detail:'Maatwerkkoppeling tussen een donatiestroom en OBS-alerts voor een klant.'},
  pr:{domains:['automation','integration','software','data'],detail:'GitHub API, PR-extractie en gestructureerde JSON-export.'},
  audio:{domains:['software'],detail:'Lokale FFmpeg/WebAssembly-conversie, voortgang en download in de browser.'},
  compliance:{domains:['ai','data','security'],detail:'NotebookLM-bronnenonderzoek naar GDPR en EU AI Act; geen eigen compliance-engine.'},
  repo:{domains:['integration','software','data'],detail:'GitHub Trees API, recursieve boomstructuur en JSON-export.'},
  portfolio:{domains:['cloud','automation','ai','integration','software','data'],detail:'Vercel, certificatenpipeline, OpenRouter-chat en openbare SkillMax+ cloud-API.'},
  hermes:{domains:['integration','software'],detail:'Websitegateway met een JSON-taak voor Hermes-agents richting Discord.'},
  registry:{domains:['ai','integration','data'],detail:'Gestructureerde documentatie van AI-diensten, capabilities, prompts en integraties.'},
  tarvos:{domains:['automation','integration','software','security'],detail:'n8n-communitynode, x402-webhook en validatie van netwerk, bedrag en betaalontvanger.'},
  aegix:{domains:['integration','software','security'],detail:'x402-betaalgateway en dashboard met tijdelijke wallets en auditinformatie; experimenteel project.'},
};

const google='https://www.coursera.org/professional-certificates/google-ai';
const workspace='https://www.coursera.org/specializations/gemini-for-google-workspace';
type Curriculum={match:RegExp;domains:ProfileDomain[];detail:string;url:string};
// Rules select reviewed curricula, not inferred competencies from issuer names.
// Completion comes exclusively from the dated cloud feed, not these descriptions.
export const curricula:Curriculum[]=[
  {match:/^(?:wharton )?ai applications in people management$/i,domains:['ai','automation','data','security'],detail:'HR-besluitvorming, trainingsdata, voorspelmodellen, privacy en bias.',url:'https://www.coursera.org/learn/wharton-ai-applications-people-management'},
  {match:/^(?:wharton )?ai applications in marketing and finance$/i,domains:['ai','data','security'],detail:'Personalisatie, kredietrisico, modelanalyse en frauderisico.',url:'https://www.coursera.org/learn/wharton-ai-applications-marketing-finance'},
  {match:/^(?:wharton )?ai fundamentals for non-data scientists$/i,domains:['ai','data'],detail:'Machine learning, deep learning, algoritmekwaliteit en trainingsdata.',url:'https://www.coursera.org/learn/wharton-ai-fundamentals-non-data-scientists'},
  {match:/^(?:google cloud )?introduction to generative ai$/i,domains:['ai'],detail:'Generatieve modeltypen, werking en toepassingen.',url:'https://www.coursera.org/learn/introduction-to-generative-ai'},
  {match:/^(?:google cloud )?introduction to large language models$/i,domains:['ai','cloud'],detail:'LLM-toepassingen, prompt tuning en Google-ontwikkeltools.',url:'https://www.coursera.org/learn/introduction-to-large-language-models'},
  {match:/^(?:google cloud )?introduction to responsible ai$/i,domains:['ai','security'],detail:'AI-principes en verantwoordelijkheid in ontwerpbeslissingen.',url:'https://www.coursera.org/learn/introduction-to-responsible-ai'},
  {match:/^(?:google )?start writing prompts like a pro$/i,domains:['ai','security'],detail:'Promptframework, evaluatie en verantwoord itereren.',url:'https://www.coursera.org/specializations/prompting-essentials-google'},
  {match:/^(?:google )?design prompts for everyday work tasks$/i,domains:['ai','automation'],detail:'Herhaalbare werkprocessen met tekst, tabellen en samenvattingen.',url:'https://www.coursera.org/specializations/prompting-essentials-google'},
  {match:/^(?:google )?speed up data analysis and presentation building$/i,domains:['ai','data','security'],detail:'Data-inzichten, formules, visualisaties en verantwoord datagebruik.',url:'https://www.coursera.org/specializations/prompting-essentials-google'},
  {match:/^(?:google )?use ai as a creative or expert partner$/i,domains:['ai','automation'],detail:'Promptketens, hergebruik en versiebeheer voor complexe taken.',url:'https://www.coursera.org/specializations/prompting-essentials-google'},
  {match:/^(?:google )?ai for app building$/i,domains:['ai','automation','software'],detail:'Werkprocessen analyseren en met AI een werkende webapp opbouwen.',url:google},
  {match:/^(?:google )?ai for data analysis$/i,domains:['ai','data'],detail:'Data opschonen, spreadsheetformules en visualisaties maken.',url:google},
  {match:/^(?:google )?ai for research and insight$/i,domains:['ai','data'],detail:'Onderzoeksbronnen combineren en AI-uitkomsten aan bronnen toetsen.',url:google},
  {match:/^(?:google )?ai for brainstorming and planning$/i,domains:['ai','automation','data'],detail:'Ideeën beoordelen, projectplannen en afhankelijkheden uitwerken.',url:google},
  {match:/^(?:google )?ai for writing and communicating$/i,domains:['ai','automation'],detail:'Gesprekken samenvatten en communicatie aanpassen aan de doelgroep.',url:google},
  {match:/^(?:google )?ai for content creation$/i,domains:['ai'],detail:'Visuele content genereren en beoordelen aan ontwerpcriteria.',url:google},
  {match:/^(?:google )?ai fundamentals$/i,domains:['ai','security'],detail:'AI-basiskennis, mogelijkheden, beperkingen en verantwoord gebruik.',url:google},
  {match:/^(?:google cloud )?gemini in google (sheets|drive)$/i,domains:['ai','automation','data'],detail:'Trackers en tabellen maken of informatie uit bestanden samenbrengen.',url:workspace},
  {match:/^(?:google cloud )?gemini in (gmail|google docs|google meet)$/i,domains:['ai','automation'],detail:'E-mail, documenten en vergaderinformatie verwerken met Gemini.',url:workspace},
  {match:/^(?:google cloud )?(gemini in google slides|create engaging video with google vids)$/i,domains:['ai'],detail:'Presentaties en videoconcepten maken en bewerken.',url:workspace},
  {match:/^(?:google cloud )?introduction to google workspace with gemini$/i,domains:['ai','automation'],detail:'Gemini toepassen in productiviteits- en samenwerkingsprocessen.',url:workspace},
  {match:/^introduction to model context protocol$/i,domains:['ai','integration','software'],detail:'MCP-clients en servers, tools, resources en prompts verbinden.',url:'https://www.coursera.org/learn/introduction-to-model-context-protocol'},
  {match:/^(?:wharton )?ai strategy and governance$/i,domains:['ai','data','security','automation'],detail:'Procesinnovatie, bias, databescherming, governance en uitlegbare AI.',url:'https://www.coursera.org/learn/wharton-ai-strategy-governance'},
];
export function curriculumFor(title:string){return curricula.find(c=>c.match.test(title.trim()))}
