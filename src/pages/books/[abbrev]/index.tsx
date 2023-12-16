import { useContext, useEffect, useState } from 'react';
import { BooksType } from '@/@types/datas';
import { useRouter } from 'next/router';
import { ApiContext } from '@/@context/Api';
import styles from '@/styles/pages/books/abbrev.module.scss';

import Head from 'next/head';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import Loading from '@/components/layout/Loading';

export default function Abbrev() {
    const Router = useRouter();
    const { version, books } = useContext(ApiContext);
    const [book, setBook] = useState<BooksType | null>(null);
    const [loading, setLoading] = useState(true);

    async function obtainVerses() {
        const abbrev = Router.query.abbrev;
        if (typeof abbrev !== 'string' || !abbrev) return;
        if (!books) return;

        const book = books.filter((book) => book.abbrev === abbrev)[0];
        if (!book) return;

        setBook(book);
    }

    function renderBook() {
        return book ? (
            <div className={styles.abbrev_book}>
                <div className={styles.abbrev_wrapper}>
                    <div className={styles.book_info}>
                        <h1>{book.name}</h1>
                        <p>
                            <span>Autor:</span> {book.author}
                        </p>
                        <p>
                            <span>Grupo:</span> {book.group}
                        </p>
                        <p>
                            <span>Abreviação:</span> {book.abbrev}
                        </p>
                        <p className={styles.paragraph_comment}>
                            <span>Comentário:</span> Comentários serão adicionados em atualizações futuras.
                        </p>
                    </div>
                </div>

                <div className={styles.book_verses}>
                    <h2>Capítulos</h2>
                    <div className={styles.book_number}>
                        {Array.from(Array(book.chapters), (e, i) => (
                            <Link href={`/books/${book.abbrev}/${i + 1}`} key={i}>
                                {i + 1}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        ) : (
            <div className={styles.abbrev_notFound}>
                <h2>Nada encontrado.</h2>
            </div>
        );
    }

    useEffect(() => {
        async function asyncObtain() {
            setLoading(true);
            if (!Router.query.abbrev || !version) return;
            await obtainVerses();
            setLoading(false);
        }

        asyncObtain();
    }, [Router.query.abbrev, version]);

    return (
        <>
            <Head>
                <title>{`O Caminho | ${book?.name || 'Livro'}`}</title>
            </Head>

            <main className={styles.abbrev}>
                <Container>
                    <div className={styles.abbrev_container}>
                        {loading ? (
                            <div className={styles.abbrev_loading}>
                                <Loading />
                            </div>
                        ) : (
                            renderBook()
                        )}
                    </div>
                </Container>
            </main>
        </>
    );
}
