'use client'
import { useEffect } from 'react'

import { useStoreModal } from '@/hooks/useStoreModal'

export default function SetupPage() {
  const { isOpen, onOpen } = useStoreModal()
  // const onOpen = useStoreModal((state) => state.onOpen)

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  return null
}
