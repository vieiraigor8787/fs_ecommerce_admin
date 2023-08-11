import { useEffect, useState } from 'react'

import { StoreModal } from '@/components/modals/store-modal'

export const modalProvider = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <StoreModal></StoreModal>
    </>
  )
}
