'use client'

import * as z from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import { zodResolver } from '@hookform/resolvers/zod'
import { useStoreModal } from '@/hooks/useStoreModal'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Modal from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  name: z.string().min(1),
})

export const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal()

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmitModal = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      const response = await axios.post('api/stores', values)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="Criar sua loja"
      description="Crie uma nova loja e gerencie seus produtos e categorias"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitModal)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="p.ex: ecommerce"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage title="obrigatório" />
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button disabled={loading} variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button disabled={loading} type="submit">
                Continuar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  )
}
