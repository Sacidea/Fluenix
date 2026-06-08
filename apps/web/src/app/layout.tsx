import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { DM_Sans, EB_Garamond, JetBrains_Mono } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import Providers from './providers'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
})

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Fluenix — AI English Lab for Software Engineers',
    template: '%s | Fluenix'
  },
  description: 'The first AI-driven communication laboratory built exclusively for software engineers targeting FAANG-level environments. Master standups, code reviews, and behavioral interviews.',
  keywords: ['English for developers', 'FAANG interview preparation', 'technical English', 'AI language learning', 'software engineer communication'],
  openGraph: {
    title: 'Fluenix — AI English Lab for Software Engineers',
    description: 'Master engineering English with AI-powered labs: Scenario Simulation, Technical Writing, Grammar Intelligence, and more.',
    url: 'https://fluenix.app',
    siteName: 'Fluenix',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fluenix — AI English Lab for Software Engineers',
    description: 'Master engineering English with 8 specialized AI-powered modules.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider 
      appearance={{
        variables: {
          colorPrimary: '#09090b',
          colorText: '#09090b',
          colorTextSecondary: '#71717a',
          colorBackground: '#ffffff',
          colorInputBackground: '#ffffff',
          colorInputText: '#09090b',
          borderRadius: '8px',
        },
        elements: {
          card: {
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e4e4e7',
            borderRadius: '12px',
          },
          formButtonPrimary: {
            boxShadow: 'none',
            textTransform: 'none',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            backgroundColor: '#09090b',
            '&:hover': {
              backgroundColor: '#27272a',
            }
          },
          socialButtonsBlockButton: {
            borderRadius: '8px',
            border: '1px solid #e4e4e7',
            transition: 'all 0.2s ease',
            backgroundColor: '#fafafa',
            '&:hover': {
              backgroundColor: '#f4f4f5',
            }
          },
          formFieldInput: {
            borderRadius: '8px',
            border: '1px solid #e4e4e7',
            backgroundColor: '#fafafa',
            transition: 'all 0.2s ease',
            '&:focus': {
              borderColor: '#09090b',
              boxShadow: 'none',
            }
          },
          footerActionLink: {
            color: '#09090b',
            fontWeight: '600',
            '&:hover': {
              color: '#3f3f46',
            }
          }
        }
      }}
      afterSignOutUrl="/"
    >
      <html lang="en">
        <body className={`${dmSans.variable} ${ebGaramond.variable} ${jetbrainsMono.variable} ${dmSans.className}`}>
          <NextTopLoader color="#6366f1" showSpinner={false} />
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}