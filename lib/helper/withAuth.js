import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/authContext';

const withAuth = (WrappedComponent) => {
    const Wrapper = (props) => {
        const { user } = useAuth();
        const router = useRouter();

        useEffect(() => {
            // If the user is not authenticated, redirect them to the login page
            if (!user) {
                router.push('/signin');
            }
        }, [user, router]);

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuth;
