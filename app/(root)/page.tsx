'use client'

import { useState, useEffect } from 'react'

import Modal from '@/components/ui/modal'

export default function SetupPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    mounted && (
      <div className="p-4">
        <Modal title="ola" description="ola, mundo" isOpen onClose={() => {}}>
          child
        </Modal>
      </div>
    )
  )
}
