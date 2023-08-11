'use client'
import { useEffect } from 'react'

import { useStoreModal } from '@/hooks/useStoreModal'

export default function SetupPage() {
  const isOpen = useStoreModal((state) => state.isOpen)
  const onOpen = useStoreModal((state) => state.onOpen)

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  return <div className="p-4">child</div>
}
