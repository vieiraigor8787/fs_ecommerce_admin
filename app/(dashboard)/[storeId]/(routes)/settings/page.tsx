import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'

import prismadb from '@/lib/prismadb'

interface SettingsProps {
  params: {
    storeId: string
  }
}

const SettingsPage = async ({ params }: SettingsProps) => {
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

  return <div className="">hello settings</div>
}

export default SettingsPage
