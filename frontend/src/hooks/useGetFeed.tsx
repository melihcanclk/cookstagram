import { useEffect, useState } from 'react'
import { getCookie } from '../utils/getCookie'

export const useGetFeed = () => {
    const [feed, setFeed] = useState<IndividualPost[]>()
    const session = getCookie('session')

    useEffect(() => {
        const getFeed = async () => {
            const res = await fetch('http://localhost:3000/feed', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session}`
                },

            })
            const data = await res.json()
            console.log(data.posts)
            setFeed(data.posts)
        }
        getFeed()
    }, [])

    return [
        // define as IndividualFeed[] to avoid undefined error
        feed as IndividualPost[],
    ]
}