import Container from '@/components/layout/Container';
import styles from '@/styles/pages/404.module.scss';

import { FaCross } from 'react-icons/fa';

export default function Error404() {
    return (
        <div className={styles.error404}>
            <Container>
                <div className={styles.error404_container}>
                    <div className={styles.error404_title}>
                        <h1>
                            404<span><FaCross/> Page not found</span>
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    );
}
