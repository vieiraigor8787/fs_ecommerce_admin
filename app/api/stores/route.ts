import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import prismadb from '@/lib/prismadb'

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name } = body

    // validating required points
    if (!userId) {
      return new NextResponse('Usuário não autorizado', { status: 401 })
    }
    if (!name) {
      return new NextResponse('Nome é obrigatório', { status: 401 })
    }
    // create new store
    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    })

    return NextResponse.json(store)
  } catch (error) {
    console.log(`[STORES_POST]`, error)
    return new NextResponse('Interal Error', { status: 500 })
  }
}
