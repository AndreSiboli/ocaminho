import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Word(){
    const Router = useRouter()

    useEffect(()=>{
        Router.push('/construction')
    }, [])

    return(<div style={{minHeight: '550px'}}></div>)
}