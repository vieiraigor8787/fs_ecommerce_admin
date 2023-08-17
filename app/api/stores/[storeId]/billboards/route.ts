import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

import prismadb from '@/lib/prismadb'

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { label, imageUrl } = body

    // validating required points
    if (!userId) {
      return new NextResponse('Usuário não autenticado', { status: 401 })
    }
    if (!label) {
      return new NextResponse('Painel é obrigatório', { status: 400 })
    }
    if (!imageUrl) {
      return new NextResponse('Imagem é obrigatória', { status: 400 })
    }
    if (!params.storeId) {
      return new NextResponse('Id da loja é obrigatório', { status: 400 })
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    })

    if (!storeByUserId) {
      return new NextResponse('Usuário não autorizado', { status: 403 })
    }

    // create new billboard
    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    })

    return NextResponse.json(billboard)
  } catch (error) {
    console.log(`[BILLBOARD_POST]`, error)
    return new NextResponse('Interal Error', { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse('Id da loja é obrigatório', { status: 400 })
    }

    // show all billboards available
    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    })

    return NextResponse.json(billboards)
  } catch (error) {
    console.log(`[BILLBOARD_GET]`, error)
    return new NextResponse('Interal Error', { status: 500 })
  }
}
