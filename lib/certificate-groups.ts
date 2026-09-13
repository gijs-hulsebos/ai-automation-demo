export type Certificate = {
  id: string;
  path: string;
  title: string;
  issuer: string;
  image: string;
  credential: string;
};

export type Specialization = {
  id: string;
  title: string;
  issuer: string;
  certificates: Certificate[];
  courses: Certificate[];
};

// Both spellings occur in the source repository. A folder is a grouping,
// not proof of completion: only PDFs directly inside it are program awards.
export function groupCertificates(certificates: Certificate[]) {
  const specializations = new Map<string, Specialization>();
  const standalone: Certificate[] = [];
  for (const certificate of certificates) {
    const parts = certificate.path.split('/');
    const index = parts.findIndex((part, i) => i > 0 && i < parts.length - 1 && /\bspeciali[sz]ation\b/i.test(part));
    if (index < 0) {
      standalone.push(certificate);
      continue;
    }
    const id = parts.slice(0, index + 1).join('/');
    let group = specializations.get(id);
    if (!group) {
      group = { id, title: parts[index], issuer: certificate.issuer, certificates: [], courses: [] };
      specializations.set(id, group);
    }
    (index === parts.length - 2 ? group.certificates : group.courses).push(certificate);
  }
  const compare = (a: { issuer: string; title: string }, b: { issuer: string; title: string }) => a.issuer.localeCompare(b.issuer) || a.title.localeCompare(b.title);
  return {
    specializations: [...specializations.values()].sort(compare).map(group => ({ ...group, courses: group.courses.sort(compare) })),
    standalone: standalone.sort(compare),
  };
}
