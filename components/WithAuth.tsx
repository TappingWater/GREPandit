import { useRouter } from 'next/router';
import { useEffect, useState, CSSProperties } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import React from 'react';

import { CognitoUser } from '@aws-amplify/auth';
import { PulseLoader } from 'react-spinners';

export interface UserPageProps {
  user: CognitoUser;
}

export function WithAuth(Component: React.ComponentType<any>) {
    return function ProtectedRoute() {
        const Router = useRouter();
        const { user, authStatus } = useAuthenticator();
        const [shouldRedirect, setShouldRedirect] = useState(false);

        useEffect(() => {
            if (authStatus !== 'authenticated') {
                setShouldRedirect(true);
            }
        }, [authStatus]);

        useEffect(() => {
            let timeoutId: NodeJS.Timeout;
            if (shouldRedirect) {
                timeoutId = setTimeout(() => Router.replace('/login'), 2000);
            }
            return () => clearTimeout(timeoutId);
        }, [shouldRedirect, Router]);

        if (authStatus !== 'authenticated') {
            return (
                <div className="h-[calc(100vh-100px)] w-[100%] font-tabs text-xl text-center flex flex-col items-center justify-center space-y-8">
                    Unauthenticated user. Redirecting to login page.
                    <PulseLoader color='white'></PulseLoader>
                </div>);
        }

        return <Component user={user} />;
    }
}

