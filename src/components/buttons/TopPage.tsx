import styles from '@/styles/buttons/TopPage.module.scss';

import Link from 'next/link';

import { FaAngleUp } from 'react-icons/fa';

interface PropsTypes {
    link: string;
}

export default function TopPage(props: PropsTypes) {
    const { link } = props;

    return (
        <Link href={link} className={styles.top_page} aria-label='Botão para topo da página'>
            <FaAngleUp />
        </Link>
    );
}
