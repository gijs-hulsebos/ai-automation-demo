import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Mail, Linkedin, Github } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <Header />
      <main className="pt-32 pb-20 px-6">
        {/* Hero */}
        <section className="text-center mb-24">
          <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight text-white mb-5 leading-[1.1]">
            Get in Touch
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Interested in AI automation, integrations or consulting? Feel free to reach out.
          </p>
        </section>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Options */}
          <section>
            <h2 className="text-xl font-medium text-white mb-8">Contact Details</h2>
            <div className="space-y-6">
              <a href="mailto:gijs@gijshulsebos.com" className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors">
                <Mail className="w-6 h-6 text-indigo-400" />
                <div>
                  <div className="text-sm font-medium text-white">Email</div>
                  <div className="text-sm text-zinc-400">gijs@gijshulsebos.com</div>
                </div>
              </a>
              <a href="https://linkedin.com/in/gijshulsebos" className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors">
                <Linkedin className="w-6 h-6 text-indigo-400" />
                <div>
                  <div className="text-sm font-medium text-white">LinkedIn</div>
                  <div className="text-sm text-zinc-400">linkedin.com/in/gijshulsebos</div>
                </div>
              </a>
              <a href="https://github.com/gijshulsebos" className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors">
                <Github className="w-6 h-6 text-indigo-400" />
                <div>
                  <div className="text-sm font-medium text-white">GitHub</div>
                  <div className="text-sm text-zinc-400">github.com/gijshulsebos</div>
                </div>
              </a>
            </div>
            <p className="text-zinc-500 text-sm mt-8">
              I’m currently open to AI automation, integration and consulting opportunities.
            </p>
          </section>

          {/* Contact Form */}
          <section>
            <h2 className="text-xl font-medium text-white mb-8">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
                <input type="text" id="name" className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                <input type="email" id="email" className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-1">Message</label>
                <textarea id="message" rows={4} className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-indigo-500"></textarea>
              </div>
              <button type="submit" className="w-full px-4 py-2 rounded-lg bg-white text-zinc-950 font-medium hover:bg-zinc-200 transition-colors">
                Send Message
              </button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
