import { WidgetItem } from '@/components/WidgetItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin');
    }

    return (
        <div className="grid gap-6 grid-cols-1">

            {/* TODO: src/components <WidgetItem /> */}
            <WidgetItem title="Usuario conectado S-Side">
                <div className='flex flex-col'>
                    <span>{session.user?.name}</span>
                    <span>{session.user?.image}</span>
                    <span>{session.user?.email}</span>
                </div>

                <div>{JSON.stringify(session)}</div>

            </WidgetItem>
            {/* TODO: Fin <WidgetItem /> */}

        </div>
    );
}