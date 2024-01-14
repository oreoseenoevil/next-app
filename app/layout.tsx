import { GeistSans } from 'geist/font/sans'
import './globals.css'
import Providers from '@/Provider'
import Header from '@/components/Header'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <div className="flex-1 w-full flex flex-col gap-5 items-center min-h-screen">
          <Header />
          <main className="flex flex-col items-center w-full max-w-4xl">
            <Providers>{children}</Providers>
          </main>
          <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs mt-auto">
            <p>
              Develop by{' '}
              <a
                href="https://jessiet.dev"
                target="_blank"
                className="font-bold hover:underline"
                rel="noreferrer"
              >
                Jessie Tarrosa
              </a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  )
}
