'use client'

import * as z from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { Store } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Heading from '@/components/ui/heading'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface SettingsFormProps {
  initialData: Store
}

const formSchema = z.object({
  name: z.string().min(1),
})

type SettingsFormValues = z.infer<typeof formSchema>

export const SettingsForm = ({ initialData }: SettingsFormProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: SettingsFormValues) => {
    console.log(data)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Configurações"
          description="Configure suas preferências de loja"
        />
        <Button
          disabled={loading}
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nome da loja "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            Salvar alterações
          </Button>
        </form>
      </Form>
    </>
  )
}
