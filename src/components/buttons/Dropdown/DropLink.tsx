import styles from '@/styles/buttons/Dropdown/DropLink.module.scss';

import Link from 'next/link';

interface PropsTypes {
    link: string;
    content: string;
    handleClose: Function;
}

export default function DropLink(props: PropsTypes) {
    const { link, content, handleClose } = props;

    return (
        <Link href={link} className={styles.link} onClick={() => handleClose()}>
            {content}
        </Link>
    );
}
