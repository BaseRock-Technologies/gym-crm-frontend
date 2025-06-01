import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/authContext';
import { Spinner } from '@/components/ui/spinner';

const withAuth = (WrappedComponent) => {
    const Wrapper = (props) => {
        const { user, loading } = useAuth();
        const router = useRouter();

        useEffect(() => {
            // If loading is true, do not redirect yet
            if (!loading && !user) {
                router.push('/signin');
            }
        }, [user, loading, router]);

        return (
            <div className='relative w-full h-full'>
                {loading && (
                    <div className="fixed bg-white/80 z-[9999] top-0 left-0 w-full min-h-screen flex justify-center items-center">
                        <Spinner />
                    </div>
                )}
                <WrappedComponent {...props} />
            </div>
        )
    };

    return Wrapper;
};

export default withAuth;