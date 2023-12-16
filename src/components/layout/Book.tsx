import { BooksType } from '@/@types/datas';
import styles from '@/styles/layout/Book.module.scss';

import Link from 'next/link';

interface PropsTypes {
    book: BooksType;
}

export default function Book(props: PropsTypes) {
    const { book } = props;

    return (
        <Link href={`/books/${book.abbrev}`} className={styles.book}>
            <h3>{book.name}</h3>
            <p>
                <span>Grupo:</span> {book.group}
            </p>
            <p>
                <span>Autor:</span> {book.author}
            </p>
            <p>
                <span>Capítulos:</span> {book.chapters}
            </p>
        </Link>
    );
}
