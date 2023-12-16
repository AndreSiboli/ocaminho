import { VerseType } from '@/@types/datas';
import styles from '@/styles/layout/Verse.module.scss';

interface PropsTypes {
    verse: VerseType;
}

export default function Verse(props: PropsTypes) {
    const { verse } = props;

    return (
        <div className={styles.verse}>
            <div className={styles.verse_content}>
                <p>{verse.text}</p>
            </div>
            <div className={styles.verse_chapter}>
                <p>
                    <span>{verse.book.name}</span> {verse.chapter}:{verse.number}
                </p>
            </div>
        </div>
    );
}
