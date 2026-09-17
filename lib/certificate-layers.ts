import manifest from '@/data/certificates.json';
import { groupCertificates } from './certificate-groups';

export const CERTIFICATES_PER_RING = 16;
const awards = new Set(groupCertificates(manifest.certificates).specializations.flatMap(group => group.certificates.map(card => card.id)));
export const specializationAwards=manifest.certificates.filter(card=>awards.has(card.id));
export function certificateLayerCount(format:string) {
  const moving=certificatesForFormat(format).filter(card=>!awards.has(card.id));
  return moving.length>CERTIFICATES_PER_RING?2:1;
}
export function movingCertificatesForFormat(format:string) {
  return certificatesForFormat(format).filter(card=>!awards.has(card.id));
}
export function certificatesForFormat(format: string) {
  return manifest.certificates.filter(card => {
    const guided = card.path.split('/').slice(1, -1).some(part => /^(practical courses?|praktijk[ -]?cursussen|praxiskurse|guided projects?)$/i.test(part.trim()));
    return format === 'all' || (format === 'specializations' ? awards.has(card.id) : format === 'guided-projects' ? guided : !awards.has(card.id) && !guided);
  });
}
