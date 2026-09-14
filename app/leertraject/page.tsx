import Link from 'next/link';
import { LearnTrajectoryPublic } from '@/components/LearnTrajectoryPublic';
export const metadata = { title: 'Leertraject · Gijs Hulsebos', description: 'Mijn gepubliceerde leertrajecten, voortgang en resultaten uit Skillmax.' };
export default function Page() { return <main className="mx-auto min-h-screen max-w-6xl px-6 py-12"><Link className="mb-8 inline-block text-sm text-zinc-400" href="/">← gijshulsebos.com</Link><LearnTrajectoryPublic /></main>; }
