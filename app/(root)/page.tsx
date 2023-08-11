'use client'

import Modal from '@/components/ui/modal'

export default function SetupPage() {
  return (
    <div className="p-4">
      <Modal title="ola" description="ola, mundo" isOpen onClose={() => {}}>
        child
      </Modal>
    </div>
  )
}
