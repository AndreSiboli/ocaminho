import styles from '@/styles/links/LinkEffect.module.scss'
import Link from 'next/link'

interface PropsTypes{
    link: string
    text: string
}

export default function LinkEffect(props: PropsTypes){
    const {link, text} = props

    return(
        <Link href={link} className={styles.link}>
            {text}
        </Link>
    )
}