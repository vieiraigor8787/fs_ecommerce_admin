import { Store } from '@prisma/client'

import { PopoverTrigger } from '@/components/ui/popover'

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[]
}

export default function StoreSwitcher() {
  return <div>store-switcher</div>
}
