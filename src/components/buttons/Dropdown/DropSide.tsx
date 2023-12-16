import { BooksType } from '@/@types/datas';
import styles from '@/styles/buttons/Dropdown/DropSide.module.scss';

import DropLink from './DropLink';

interface PropsTypes {
    name: string;
    items: BooksType[] | null;
    handleClose: Function;
}

export default function DropSide(props: PropsTypes) {
    const { name, items, handleClose } = props;

    return (
        <nav className={styles.books}>
            <div className={styles.books_testament}>
                <h2>{name}</h2>
            </div>
            <div className={styles.books_container}>
                {items &&
                    items.map((book) => (
                        <DropLink
                            content={book.name}
                            link={`/books/${book.abbrev}/1`}
                            handleClose={handleClose}
                            key={book.name}
                        />
                    ))}
            </div>
        </nav>
    );
}
