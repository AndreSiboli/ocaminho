import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ChapterType } from '@/@types/datas';
import { ApiContext } from '@/@context/Api';
import { getChapter } from '@/requests/request';
import styles from '@/styles/pages/books/book.module.scss';

import Head from 'next/head';
import Container from '@/components/layout/Container';
import Select from '@/components/form/Select';
import Loading from '@/components/layout/Loading';
import ButtonImg from '@/components/buttons/ButtonImg';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Link from 'next/link';

export default function Book() {
    const Router = useRouter();
    const { version, books } = useContext(ApiContext);
    const [book, setBook] = useState<ChapterType | null>(null);
    const [loading, setLoading] = useState(true);

    async function obtainVerses() {
        const abbrev = Router.query.abbrev;
        const chapter = parseInt(Router.query.chapter as string);

        if (typeof abbrev !== 'string' || typeof chapter !== 'number') return;
        if (!abbrev || !chapter) return;

        const ret = await getChapter({
            abbrev,
            chapter,
            version,
        });

        setBook(ret);
    }

    async function nextChapter(num: number) {
        const abbrev = Router.query.abbrev;
        const chapter = parseInt(Router.query.chapter as string) + num;

        if (typeof abbrev !== 'string') return;
        if (!abbrev[0] || !abbrev[1]) return;
        if (isNaN(chapter) || !books) return;

        const curIndex = books.findIndex((book) => book.abbrev === abbrev);
        const curBook = books[curIndex];

        if (chapter <= 0) {
            if (abbrev === 'gn') return;
            const prevBook = books[curIndex - 1];
            const prevAbbrev = prevBook.abbrev;
            Router.push(`/books/${prevAbbrev}/${prevBook.chapters}`);
            return;
        } else if (curBook.chapters < chapter) {
            if (abbrev === 'ap') return;
            const nextBook = books[curIndex + 1];
            const nextAbbrev = nextBook.abbrev;
            Router.push(`/books/${nextAbbrev}/1`);
            return;
        }

        Router.push(`/books/${abbrev}/${chapter}`);
    }

    useEffect(() => {
        async function asyncObtain() {
            setLoading(true);
            if (!Router.query || !version) return;
            await obtainVerses();
            setLoading(false);
        }

        asyncObtain();
    }, [Router.query.abbrev, Router.query.chapter, version]);

    function renderBook() {
        return book ? (
            <>
                <h1>
                    <Link href={`/books/${book.book.abbrev}`}>
                        {book.book.name} {book.chapter.number}
                    </Link>
                </h1>

                <div className={styles.book_wrapper}>
                    <div className={styles.book_buttons}>
                        <ButtonImg
                            Svg={FaAngleLeft}
                            label="Livro/Capitulo anterior"
                            handleFunction={() => nextChapter(-1)}
                        />

                        <ButtonImg
                            Svg={FaAngleRight}
                            label="Livro/Capitulo posterior"
                            handleFunction={() => nextChapter(1)}
                        />
                    </div>

                    <div className={styles.book_verses}>
                        {book.verses.map((verse) => (
                            <div className={styles.verse} key={verse._id}>
                                <span>{verse.number}.</span> {verse.text}
                            </div>
                        ))}
                    </div>
                </div>
            </>
        ) : (
            <div className={styles.book_notFound}>
                <h1>Livro não encontrado.</h1>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{`O Caminho | ${book?.book.name || 'Livro'}`}</title>
            </Head>

            <main className={styles.book}>
                <Container>
                    <div className={styles.book_container}>
                        <Select />
                        {loading ? (
                            <div className={styles.book_loading}>
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
