import { useEffect, useState } from "react";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch(url)
            .then(res => {
                if (!res.ok) { // error coming back from server
                    throw Error('could not fetch the data for that resource');
                } 
                return res.json();
            }).then(data => {
                setData(data);
                setIsPending(false);
                setError(null);
            }).catch(err => {
                // auto catches network / connection error
                setIsPending(false);
                setError(err.message);
            })
        }, 100);
        
    }, []);

    return { data, isPending, error};
}