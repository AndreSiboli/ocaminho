import { useContext, useEffect } from 'react';
import { ApiContext } from '@/@context/Api';
import { SearchContext } from '@/@context/Search';
import styles from '@/styles/pages/Search.module.scss';

import Head from 'next/head';
import Container from '@/components/layout/Container';
import Verse from '@/components/layout/Verse';
import Select from '@/components/form/Select';

export default function Search() {
    const { inspec, findText } = useContext(SearchContext);
    const { version } = useContext(ApiContext);

    function renderVerses() {
        return !inspec || inspec.appearance === 0 ? (
            <p>Nada encontrado.</p>
        ) : (
            <div className={styles.verse}>
                {inspec.verses.map((verse) => (
                    <div className={styles.verse_container} key={verse._id}>
                        <Verse verse={verse} />
                    </div>
                ))}
            </div>
        );
    }

    function renderInfo() {
        return (
            inspec &&
            inspec.appearance > 0 && (
                <div className={styles.info}>
                    <p>
                        <span>Pesquisa:</span> {inspec.text}
                    </p>
                    <p>
                        <span>Ocorrências:</span> {inspec.appearance}
                    </p>
                </div>
            )
        );
    }

    useEffect(() => {
        findText();
    }, [version]);

    return (
        <>
            <Head>
                <title>O Caminho | Search</title>
            </Head>

            <main className={styles.search}>
                <Container>
                    <div className={styles.search_container}>
                        <h1>Resultados:</h1>
                        <Select />
                        <div className={styles.verses}>
                            <div className={styles.verses_wrapper}>{renderVerses()}</div>
                            <div className={styles.verses_infos}>{renderInfo()}</div>
                        </div>
                    </div>
                </Container>
            </main>
        </>
    );
}
