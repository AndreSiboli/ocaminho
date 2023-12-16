import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { BooksType } from '@/@types/datas';
import styles from '@/styles/buttons/Dropdown/Index.module.scss';

import DropSide from '@/components/buttons/Dropdown/DropSide';

import { FaAngleDown } from 'react-icons/fa';

interface PropsTypes {
    oldT: BooksType[] | null;
    newT: BooksType[] | null;
}

export default function Dropbar(props: PropsTypes) {
    const { oldT, newT } = props;
    const [active, setActive] = useState(false);
    const drop = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.onclick = function (e) {
            if (!drop.current) return;
            const target = e.target as HTMLDivElement;

            if (!drop.current.contains(target)) {
                setActive(false);
            }
        };

        return () => {
            window.onclick = null;
        };
    }, [active]);

    function defineActive() {
        setActive((prevState) => !prevState);
    }

    return (
        <div className={`${styles.dropdown} ${active && styles.active}`} ref={drop}>
            <div className={styles.dropdown_button}>
                <p onClick={defineActive}>
                    Livros <FaAngleDown />
                </p>
            </div>

            <div className={styles.dropdown_subitems}>
                <div className={styles.subitems}>
                    {!oldT || !newT ? (
                        <div className={styles.error}>
                            <p>Não foi possivel carregar.</p>
                        </div>
                    ) : (
                        <>
                            <DropSide name="Antigo" items={oldT} handleClose={defineActive} />
                            <DropSide name="Novo" items={newT} handleClose={defineActive} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
