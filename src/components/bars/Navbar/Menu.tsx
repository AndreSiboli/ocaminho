import { useContext, useEffect } from 'react';
import styles from '@/styles/bars/Navbar/Menu.module.scss';

import Dropbar from '@/components/buttons/Dropdown/Index';
import LinkEffect from '@/components/links/LinkEffect';
import { ApiContext } from '@/@context/Api';

interface PropsTypes {
    active: boolean;
}

export default function Menu(props: PropsTypes) {
    const { testament } = useContext(ApiContext);
    const { active } = props;

    useEffect(() => {
        if (active) {
            document.body.style.overflow = 'hidden';
            return;
        }
        document.body.style.overflow = 'auto';
    }, [active]);

    return (
        <div className={`${styles.menu} ${active && styles.active}`}>
            <div className={styles.menu_wrapper}>
                <nav className={styles.menu_links}>
                    <div>
                        <LinkEffect link="/word" text="Palavra" />
                    </div>
                    <div className={styles.menu_link}>
                        <LinkEffect link="/books/gn/1" text="Bíblia" />
                    </div>
                    <div className={styles.menu_dropdown}>
                        <Dropbar oldT={testament.old} newT={testament.new} />
                    </div>
                </nav>
            </div>
        </div>
    );
}
