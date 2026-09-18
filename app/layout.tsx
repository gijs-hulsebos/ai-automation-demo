import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ChatWidget } from '@/components/ChatWidget';

const generalSans = localFont({ src: './fonts/general-sans.woff2', weight: '200 700', display: 'swap',
  variable: '--font-general-sans',
});

const clashDisplay = localFont({ src: './fonts/clash-display.woff2', weight: '200 700', display: 'swap',
  variable: '--font-clash-display',
});

export const metadata: Metadata = {
  title: 'Gijs Hulsebos | AI Automation & Integration Engineer',
  description: 'I build AI-powered automation systems, chatbots and workflow integrations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${generalSans.variable} ${clashDisplay.variable} dark scroll-smooth`}>
      <body className="bg-zinc-950 text-zinc-50 font-sans antialiased selection:bg-indigo-500/30" suppressHydrationWarning>
        <LanguageProvider>
          {children}
          <LanguageSwitcher />
          <ChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
