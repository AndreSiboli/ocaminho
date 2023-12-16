import styles from '@/styles/form/SearchButton.module.scss';

import { FaSearch } from 'react-icons/fa';

interface PropsTypes{
    handleButton: Function
}

export default function SearchButton(props: PropsTypes) {
    const { handleButton } = props

    function openSearch(){
        handleButton()
    }

    return (
        <div className={styles.search_button}>
            <button aria-label="search button" onClick={openSearch}>
                <FaSearch />
            </button>
        </div>
    );
}
