import type { Metadata } from 'next'
import './globals.css'
import StoreProvider from '@/store/StoreProvider'
import Header from '@/components/ui/Header'

export const metadata: Metadata = {
  title: 'Recursos IA Argentina',
  description: 'Directorio de cursos gratuitos de IA para la comunidad argentina',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <StoreProvider>
          <Header />
          <main>{children}</main>
        </StoreProvider>
      </body>
    </html>
  )
}
