import { useContext, useState } from 'react';
import { ApiContext } from '@/@context/Api';
import styles from '@/styles/Home.module.scss';

import Head from 'next/head';
import Container from '@/components/layout/Container';
import Verse from '@/components/layout/Verse';
import Book from '@/components/layout/Book';
import Message from '@/components/layout/Message';
import { BooksType } from '@/@types/datas';

export default function Home() {
    const { dailyWord, testament } = useContext(ApiContext);
    const [message, setMessage] = useState(
        'Apenas a versão NVI está disponível no momento. Mais versões virão ao decorrer das atualizações.'
    );

    function clearMessage() {
        setTimeout(() => {
            setMessage('');
        }, 500);
    }

    function renderBooks(testament: BooksType[] | null) {
        return testament ? (
            <div className={styles.books_wrapper}>
                {testament.map((book) => (
                    <Book book={book} key={book.abbrev} />
                ))}
            </div>
        ) : (
            <p>Não foi possivel carregar os livros.</p>
        );
    }

    return (
        <>
            <main className={styles.main}>
                <Container>
                    <div className={styles.main_container}>
                        <div className={styles.main_verse}>
                            <div className={styles.verse_title}>
                                <h1>Palavras do Dia.</h1>
                            </div>
                            <div className={styles.verse_container}>
                                <Verse verse={dailyWord.verse1} />
                                <Verse verse={dailyWord.verse2} />
                            </div>
                        </div>
                    </div>
                </Container>
            </main>

            <section className={styles.books}>
                <Container>
                    <div className={styles.books_container}>
                        <div className={styles.books_types}>
                            <h2>Antigo Testamento</h2>
                            {renderBooks(testament.old)}
                        </div>
                        <div className={styles.books_types} style={{ marginBottom: '2em' }}>
                            <h2>Novo Testamento</h2>
                            {renderBooks(testament.new)}
                        </div>
                    </div>
                </Container>
            </section>

            <Message title="Aviso" text={message} timer={10000} handleClear={clearMessage} />
        </>
    );
}
