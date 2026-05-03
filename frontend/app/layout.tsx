import type { Metadata } from 'next'
import './globals.css'
import StoreProvider from '@/store/StoreProvider'
import Header from '@/components/ui/Header'
import ParticlesBackground from '@/components/ui/ParticlesBackground'

export const metadata: Metadata = {
  title: 'Recursos IA',
  description: 'Directorio de cursos gratuitos de IA para la comunidad argentina',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ParticlesBackground />
        <StoreProvider>
          <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <footer style={{ textAlign: 'center', padding: '48px 32px', marginTop: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--lunar-6)' }}>
              <a href="https://www.linkedin.com/in/yesicavenialgo/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                Ye
              </a>
            </footer>
          </div>
        </StoreProvider>
      </body>
    </html>
  )
}
