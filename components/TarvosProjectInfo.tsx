"use client";

import { useLanguage } from '@/context/LanguageContext';

const content = {
 EN: {
  summary: 'Tarvos turns Solana services into open-source n8n integrations for visual and agent-built workflows running on infrastructure you control.',
  problem: 'The problem', problemText: 'Using Solana services in automation requires connecting provider APIs, payment handling and workflow logic. Tarvos brings these integrations into n8n with shared documentation for people and coding agents.',
  implementation: 'My implementation', implementationText: 'Built the Tarvos integration platform, public registry and documentation, alongside the Tarvos x402 Paygate community node. The node gates an n8n workflow behind a verified and settled USDC payment.',
  highlights: 'Tarvos x402 Paygate', items: ['The workflow starts only after PayAI verifies and settles an exact USDC payment on Solana Mainnet or Devnet using x402 v2.', 'One webhook serves both a browser wallet payment screen and a machine-readable payment challenge for bots and APIs.', 'Validates the network, asset, amount and payout wallet against trusted node settings before payment processing.', 'Requires no private keys in the node and has no runtime dependencies or custom Solana program.', 'Can return a payment receipt immediately or wait for the workflow result.'],
  boundary: 'Runs in your environment', boundaryText: 'Your n8n instance executes the workflows. Tarvos does not host workflow execution, store provider credentials or proxy node traffic. The repository describes the x402 node as source-installable; the npm package is not yet published.',
  hackathons: 'Hackathon nodes', x402Event: 'Built for the Common S3nse Best Pearls Hackathon (September 4–5, 2026).', tritonEvent: 'The next Tarvos node: Triton One, for the Colosseum Solana hackathon (until October 12, 2026).', x402Link: 'View x402 Paygate', tritonLink: 'View Triton One',
  stack: 'Node technology', websiteStack: 'Supporting website', source: 'Node source',
 },
 NL: {
  summary: 'Tarvos maakt van Solana-diensten open-source n8n-integraties voor visuele en door agents gebouwde workflows, op infrastructuur die je zelf beheert.',
  problem: 'Het probleem', problemText: 'Solana-diensten gebruiken in automatisering vraagt om koppelingen tussen provider-API’s, betalingsverwerking en workflowlogica. Tarvos brengt deze integraties naar n8n met gedeelde documentatie voor mensen en coding agents.',
  implementation: 'Mijn implementatie', implementationText: 'Het Tarvos-integratieplatform, het openbare register en de documentatie gebouwd, samen met de Tarvos x402 Paygate-communitynode. De node start een n8n-workflow pas na een geverifieerde en afgewikkelde USDC-betaling.',
  highlights: 'Tarvos x402 Paygate', items: ['De workflow start pas nadat PayAI een exacte USDC-betaling op Solana Mainnet of Devnet heeft geverifieerd en afgewikkeld via x402 v2.', 'Eén webhook biedt zowel een walletbetaalscherm in de browser als een machineleesbaar betaalverzoek voor bots en API’s.', 'Controleert netwerk, token, bedrag en ontvangende wallet tegen de vertrouwde node-instellingen vóór betalingsverwerking.', 'Vereist geen privésleutels in de node en heeft geen runtime-afhankelijkheden of eigen Solana-programma.', 'Kan direct een betalingsbewijs teruggeven of wachten op het workflowresultaat.'],
  boundary: 'Draait in je eigen omgeving', boundaryText: 'Je eigen n8n-instantie voert de workflows uit. Tarvos host geen workflowuitvoering, bewaart geen providergegevens voor toegang en fungeert niet als proxy voor nodeverkeer. De x402-node is volgens de repository vanuit de broncode te installeren; het npm-pakket is nog niet gepubliceerd.',
  hackathons: 'Hackathon-nodes', x402Event: 'Gebouwd voor de Common S3nse Best Pearls Hackathon (4–5 september 2026).', tritonEvent: 'De volgende Tarvos-node: Triton One, voor de Colosseum Solana hackathon (tot 12 oktober 2026).', x402Link: 'Bekijk x402 Paygate', tritonLink: 'Bekijk Triton One',
  stack: 'Technologie van de node', websiteStack: 'Ondersteunende website', source: 'Broncode node',
 },
 DE: {
  summary: 'Tarvos macht Solana-Dienste zu Open-Source-n8n-Integrationen für visuelle und von Agenten erstellte Workflows auf selbst kontrollierter Infrastruktur.',
  problem: 'Das Problem', problemText: 'Solana-Dienste in Automatisierungen einzusetzen erfordert Verbindungen zwischen Anbieter-APIs, Zahlungsabwicklung und Workflow-Logik. Tarvos bringt diese Integrationen mit gemeinsamer Dokumentation für Menschen und Coding-Agenten in n8n.',
  implementation: 'Meine Umsetzung', implementationText: 'Die Tarvos-Integrationsplattform, das öffentliche Verzeichnis und die Dokumentation zusammen mit dem Tarvos x402 Paygate Community Node entwickelt. Der Node startet einen n8n-Workflow erst nach einer geprüften und abgewickelten USDC-Zahlung.',
  highlights: 'Tarvos x402 Paygate', items: ['Der Workflow startet erst, nachdem PayAI eine exakte USDC-Zahlung auf Solana Mainnet oder Devnet über x402 v2 geprüft und abgewickelt hat.', 'Ein Webhook bietet sowohl eine Wallet-Zahlungsoberfläche im Browser als auch eine maschinenlesbare Zahlungsanforderung für Bots und APIs.', 'Prüft Netzwerk, Token, Betrag und Empfänger-Wallet vor der Zahlungsabwicklung anhand der vertrauenswürdigen Node-Einstellungen.', 'Benötigt keine privaten Schlüssel im Node und hat weder Laufzeitabhängigkeiten noch ein eigenes Solana-Programm.', 'Kann sofort einen Zahlungsbeleg zurückgeben oder auf das Workflow-Ergebnis warten.'],
  boundary: 'Läuft in deiner Umgebung', boundaryText: 'Deine eigene n8n-Instanz führt die Workflows aus. Tarvos hostet keine Workflow-Ausführung, speichert keine Anbieter-Zugangsdaten und leitet keinen Node-Verkehr weiter. Laut Repository lässt sich der x402-Node aus dem Quellcode installieren; das npm-Paket ist noch nicht veröffentlicht.',
  hackathons: 'Hackathon-Nodes', x402Event: 'Entwickelt für den Common S3nse Best Pearls Hackathon (4.–5. September 2026).', tritonEvent: 'Der nächste Tarvos-Node: Triton One, für den Colosseum Solana Hackathon (bis 12. Oktober 2026).', x402Link: 'x402 Paygate ansehen', tritonLink: 'Triton One ansehen',
  stack: 'Node-Technologie', websiteStack: 'Begleitende Website', source: 'Node-Quellcode',
 },
};
export function TarvosProjectInfo() {
 const { lang } = useLanguage();
 const text = content[lang];
 return <div className="bento-project-details tarvos-project-info" lang={lang.toLowerCase()}>
  <p className="bento-project-summary">{text.summary}</p>
  <section><h3>{text.problem}</h3><p>{text.problemText}</p></section>
  <section><h3>{text.implementation}</h3><p>{text.implementationText}</p></section>
  <section><h3>{text.highlights}</h3><ul>{text.items.map(item => <li key={item}>{item}</li>)}</ul></section>
  <section><h3>{text.hackathons}</h3>
   <p><strong>Tarvos x402 Paygate</strong><br />{text.x402Event}</p>
   <div className="bento-project-links"><a href="https://tarvos.tools/nodes/x402/" target="_blank" rel="noopener noreferrer">{text.x402Link} ↗</a></div>
   <p><strong>Tarvos Triton One</strong><br />{text.tritonEvent}</p>
   <div className="bento-project-links"><a href="https://tarvos.tools/nodes/triton-1/" target="_blank" rel="noopener noreferrer">{text.tritonLink} ↗</a></div>
  </section>
  <section><h3>{text.boundary}</h3><p>{text.boundaryText}</p></section>
  <section><h3>{text.stack}</h3><p>n8n · Python · TypeScript · Solana · USDC · x402 v2 · PayAI</p></section>
  <section><h3>{text.websiteStack}</h3><p>Astro · React · TypeScript · Tailwind CSS · Framer Motion · Three.js · D3 · Vite</p></section>
  <div className="bento-project-links"><a href="https://github.com/TarvosTools/n8n-nodes-Tarvos-x402" target="_blank" rel="noopener noreferrer">{text.source} ↗</a><a href="https://tarvos.tools" target="_blank" rel="noopener noreferrer">tarvos.tools ↗</a></div>
 </div>;
}
