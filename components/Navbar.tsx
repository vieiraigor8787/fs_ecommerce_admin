import { UserButton } from '@clerk/nextjs'

export default function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div>aqui será a troca de lojas</div>
        <div>aqui serão os links</div>
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  )
}
