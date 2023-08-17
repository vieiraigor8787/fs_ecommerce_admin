'use client'

import { Trash } from 'lucide-react'
import { Store } from '@prisma/client'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'

interface SettingsFormProps {
  initialData: Store
}

export const SettingsForm = ({ initialData }: SettingsFormProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Configurações"
          description="Configure suas preferências de loja"
        />
        <Button variant="destructive" size="icon" onClick={() => {}}>
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </>
  )
}
