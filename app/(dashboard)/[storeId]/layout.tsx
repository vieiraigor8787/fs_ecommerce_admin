import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'
import prismadb from '@/lib/prismadb'

interface DashboardLayoutProps {
  children: React.ReactNode
  params: {
    storeId: string
  }
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  })

  if (!store) {
    redirect('/')
  }

  return (
    <>
      <div>navbar</div>
      {children}
    </>
  )
}
