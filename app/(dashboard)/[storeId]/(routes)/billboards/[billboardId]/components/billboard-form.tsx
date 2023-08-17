'use client'

import axios from 'axios'
import * as z from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { Billboard } from '@prisma/client'

import { useOrigin } from '@/hooks/useOrigin'
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
import { AlertModal } from '@/components/modals/alert-modal'

interface BillboardFormProps {
  initialData: Billboard | null
}

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
})

type BillboardFormValues = z.infer<typeof formSchema>

export const BillboardForm = ({ initialData }: BillboardFormProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  //onsubmit function
  const params = useParams()
  const router = useRouter()
  const origin = useOrigin()

  const title = initialData ? 'Editar painel' : 'Criar painel'
  const description = initialData ? 'Editar um painel' : 'Adicionar novo painel'
  const toastMessage = initialData ? 'Painel atualizado' : 'Painel criado'
  const action = initialData ? 'Salvar alterações' : 'Criar'

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: '',
    },
  })

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true)
      //route storeID
      await axios.patch(`/api/stores/${params.storeId}`, data)
      router.refresh()
      toast.success('Alterado com sucesso')
    } catch (error) {
      toast.error('OPS!! Algo deu errado')
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/stores/${params.storeId}`)
      router.refresh()
      router.push('/')
      toast.success('Loja excluída')
    } catch (error) {
      toast.error(
        'Tenha certeza que você excluiu todos os produtos e categorias primeiro.'
      )
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
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
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nome do painel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>

      <Separator />
    </>
  )
}
