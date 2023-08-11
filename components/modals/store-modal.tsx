import { useStoreModal } from '@/hooks/useStoreModal'
import Modal from '@/components/ui/modal'

export const storeModal = () => {
  const { isOpen, onClose } = useStoreModal()

  return (
    <Modal
      title="Criar sua loja"
      description="Crie uma nova loja e gerencie seus produtos e categorias"
      isOpen={isOpen}
      onClose={onClose}
    >
      Criar sua loja virtual
    </Modal>
  )
}
