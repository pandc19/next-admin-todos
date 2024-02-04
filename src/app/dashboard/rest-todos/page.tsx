// 'use client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getUserServerSession } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export const metadata = {
    title: 'Listado de Todos',
    description: 'SEO Title',
};

export default async function RestTodosPage() {

    const user = await getUserServerSession();
    if (!user) redirect('/api/auth/signin');

    const todos = await prisma.todo.findMany({
        where: { userId: user.id },
        orderBy: { description: 'asc' }
    });

    // useEffect(() => {
    //     fetch('/api/todos')
    //         .then(resp => resp.json())
    //         .then(console.log);
    // }, []);

    return (
        <div>
            <div className="w-full px-3 mx-5 mb-5">
                <NewTodo />
            </div>

            <TodosGrid todos={todos} />
        </div>
    );
}