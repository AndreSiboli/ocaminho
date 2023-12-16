import { useContext, useState, KeyboardEvent } from 'react';
import { SearchContext } from '@/@context/Search';
import styles from '@/styles/form/Search.module.scss';

import { FaSearch } from 'react-icons/fa';

export default function Search() {
    const { findText, textRef } = useContext(SearchContext);
    const [loading, setLoading] = useState(false);

    function pressEnter(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') search();
    }

    async function search() {
        setLoading(true);
        await findText();
        setLoading(false);
    }

    return (
        <div className={styles.search}>
            <input
                type="text"
                name="search"
                id="search"
                placeholder="Encontrar"
                ref={textRef}
                autoComplete="off"
                onKeyDown={pressEnter}
            />
            <div className={styles.search_button}>
                <button aria-label="search button" onClick={search}>
                    {!loading ? <FaSearch /> : <div className={styles.loading} />}
                </button>
            </div>
        </div>
    );
}
