import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {

    await prisma.todo.deleteMany(); // delete * from todo
    await prisma.user.deleteMany(); // delete * from user

    const user = await prisma.user.create({
        data: {
            email: 'test1@google.com',
            password: bcrypt.hashSync('123456'),
            roles: ['admin', 'client', 'super-user'],
            todos: {
                create: [
                    { description: 'Priedra del alma' },
                    { description: 'Priedra del poder' },
                    { description: 'Priedra del tiempo' },
                    { description: 'Priedra del espacio' },
                    { description: 'Priedra del realidad' },
                    { description: 'Priedra del mente', complete: true },
                ]
            }
        }
    });

    // await prisma.todo.createMany({
    //     data: [
    //         { description: 'Priedra del alma' },
    //         { description: 'Priedra del poder' },
    //         { description: 'Priedra del tiempo' },
    //         { description: 'Priedra del espacio' },
    //         { description: 'Priedra del realidad' },
    //         { description: 'Priedra del mente', complete: true },
    //     ]
    // });

    return NextResponse.json({ message: 'Seed Executed' });
}