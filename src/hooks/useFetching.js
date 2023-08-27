import { useState } from "react"

export const useFetching = (callback, isLoadingDefault) =>{
    const [isLoading, setIsLoading] = useState(isLoadingDefault ? isLoadingDefault : false)
    const [error, setError] = useState('')
    const fetching =async (...args)=>{
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (e) {
            setError(e.message)
        } finally{
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error, setError]
}
