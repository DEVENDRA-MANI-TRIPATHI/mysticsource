import Navbar from '@/components/navbar'
import Providers from '@/components/providers'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <Navbar />
      <main className="container mx-auto">
        {children}
      </main>
    </Providers>
  )
}