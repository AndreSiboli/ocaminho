import styles from '@/styles/layout/Logo.module.scss';
import Link from 'next/link';

export default function Logo() {
    return (
        <div className={styles.logo}>
            <Link href='/'>
                <h1>O Caminho</h1>
            </Link>
        </div>
    );
}
