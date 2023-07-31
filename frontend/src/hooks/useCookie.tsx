import { useEffect, useState } from 'react'
import { getCookie } from '../utils/getCookie';

export const useSession = () => {

    const [session, setSession] = useState('');

    useEffect(() => {
        const cookie = getCookie('session');
        setSession(cookie);
    }, []);

    return [session];
}
