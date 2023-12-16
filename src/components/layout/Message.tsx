import styles from '@/styles/layout/Message.module.scss';
import { useEffect, useState } from 'react';

interface PropsTypes {
    title: string;
    text: string;
    timer?: number;
    handleClear: Function
}

export default function Message(props: PropsTypes) {
    const { title, text, timer = 5000, handleClear } = props;
    const [appear, setAppear] = useState(false);

    useEffect(() => {
        if (!text) return;
        setAppear(true);

        setTimeout(() => {
            setAppear(false);
            handleClear()
        }, timer);

    }, [text]);

    return (
        <div className={`${styles.message} ${appear && styles.appear}`}>
            <h2>{title}</h2>
            <div className={styles.message_text}>
                <p>{text}</p>
            </div>
            <div className={styles.message_bar}>
                <div
                    className={appear ? styles.bar : ''}
                    style={{ animationDuration: `${timer / 1000}s ` }}
                ></div>
            </div>
        </div>
    );
}
