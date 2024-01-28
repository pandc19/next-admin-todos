import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {

    await prisma.todo.deleteMany(); // delete * from todo

    await prisma.todo.createMany({
        data: [
            { description: 'Priedra del alma' },
            { description: 'Priedra del poder' },
            { description: 'Priedra del tiempo' },
            { description: 'Priedra del espacio' },
            { description: 'Priedra del realidad' },
            { description: 'Priedra del mente', complete: true },
        ]
    });

    return NextResponse.json({ message: 'Seed Executed' });
}