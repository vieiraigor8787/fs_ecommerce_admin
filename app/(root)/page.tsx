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

  return <div className="p-4">child</div>
}
