"use client";
import { useLanguage } from '@/context/LanguageContext';

const copy = {
 EN: {
  summary: 'Aegix explores private payments for AI agents on Solana through an x402 payment gateway and an accompanying dashboard.',
  problem: 'The problem', problemText: 'Agent payments can expose a primary wallet address to service providers. Aegix is designed around temporary burner wallets, with payment and audit information brought together for the operator.',
  features: 'Inside the project', items: ['A dashboard with demo, devnet and mainnet modes.', 'A payment flow from a funded pool through a temporary wallet to the recipient.', 'x402 payment facilitation through PayAI, with Light Protocol in the presented architecture.', 'Separate merchant and operator views, plus API examples for pools, payments and audit history.'],
  access: 'Private source code', accessText: 'The landing page is public. The system’s GitHub repository is private and is not available for public browsing.',
  event: 'Built for the Colosseum Frontier Hackathon · May 11.', website: 'View landing page',
 },
 NL: {
  summary: 'Aegix onderzoekt private betalingen voor AI-agents op Solana met een x402-betaalgateway en een bijbehorend dashboard.',
  problem: 'Het probleem', problemText: 'Agentbetalingen kunnen het primaire walletadres zichtbaar maken voor dienstverleners. Aegix is opgezet rond tijdelijke wallets, met betaal- en auditinformatie samengebracht voor de beheerder.',
  features: 'In het project', items: ['Een dashboard met demo-, devnet- en mainnetmodi.', 'Een betaalstroom vanuit een gefinancierde pool via een tijdelijke wallet naar de ontvanger.', 'x402-betalingsverwerking via PayAI, met Light Protocol in de gepresenteerde architectuur.', 'Afzonderlijke weergaven voor dienstverlener en beheerder, plus API-voorbeelden voor pools, betalingen en auditgeschiedenis.'],
  access: 'Private broncode', accessText: 'De landingpage is openbaar. De GitHub-repository van het systeem is privé en kan niet publiek worden bekeken.',
  event: 'Gebouwd voor de Colosseum Frontier Hackathon · 11 mei.', website: 'Bekijk landingpage',
 },
 DE: {
  summary: 'Aegix untersucht private Zahlungen für KI-Agenten auf Solana mit einem x402-Zahlungsgateway und einem zugehörigen Dashboard.',
  problem: 'Das Problem', problemText: 'Agentenzahlungen können die primäre Wallet-Adresse gegenüber Dienstleistern offenlegen. Aegix setzt auf temporäre Wallets und bündelt Zahlungs- und Auditinformationen für den Betreiber.',
  features: 'Im Projekt', items: ['Ein Dashboard mit Demo-, Devnet- und Mainnet-Modi.', 'Ein Zahlungsablauf von einem finanzierten Pool über eine temporäre Wallet zum Empfänger.', 'x402-Zahlungsabwicklung über PayAI, mit Light Protocol in der vorgestellten Architektur.', 'Getrennte Ansichten für Dienstleister und Betreiber sowie API-Beispiele für Pools, Zahlungen und Auditverläufe.'],
  access: 'Privater Quellcode', accessText: 'Die Landingpage ist öffentlich. Das GitHub-Repository des Systems ist privat und nicht öffentlich einsehbar.',
  event: 'Entwickelt für den Colosseum Frontier Hackathon · 11. Mai.', website: 'Landingpage ansehen',
 },
};
export function AegixProjectInfo() {
 const { lang } = useLanguage();
 const text = copy[lang];
 return <div className="bento-project-details aegix-project-info" lang={lang.toLowerCase()}>
  <p className="bento-project-summary">{text.summary}</p>
  <div className="bento-project-links"><a href="https://aegix-restored-dashboard.vercel.app/" target="_blank" rel="noopener noreferrer">{text.website} ↗</a></div>
  <section><h3>{text.problem}</h3><p>{text.problemText}</p></section>
  <section><h3>{text.features}</h3><ul>{text.items.map(item => <li key={item}>{item}</li>)}</ul></section>
  <section><h3>Hackathon</h3><p>{text.event}</p></section>
  <section><h3>{text.access}</h3><p>{text.accessText}</p></section>
 </div>;
}
