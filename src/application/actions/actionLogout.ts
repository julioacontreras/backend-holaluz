import { auth } from '@/adapters/auth';
import { ActionResponse } from '@/adapters/broker';

export const actionLogout = (): ActionResponse => {
    try {

        const isSuccessful = auth.logout();
        return {
            result: {},
            status: isSuccessful ? 'ok' : 'usert-not-found'
        };

    } catch(e) {
        console.error(e);
        return {
            result: {},
            status: 'internal-error'
        };
    }
};
