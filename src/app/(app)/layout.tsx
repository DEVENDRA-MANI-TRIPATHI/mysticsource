import Navbar from '@/components/navbar'
import Providers from '@/components/providers'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800">
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
      </div>
    </Providers>
  )
}