import Search from '@/components/form/Search';
import styles from '@/styles/bars/Navbar/NavSearch.module.scss';

interface PropsTypes {
    handleButton: Function;
}

export default function NavSearch(props: PropsTypes) {
    const { handleButton } = props;

    function closeSearch() {
        handleButton();
    }

    return (
        <div className={styles.navSearch}>
            <Search />
            <div className={styles.navSearch_cancel}>
                <button onClick={closeSearch}>Cancelar</button>
            </div>
        </div>
    );
}
