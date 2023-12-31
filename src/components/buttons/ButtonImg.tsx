import { IconType } from 'react-icons/lib';
import styles from '@/styles/pages/books/book.module.scss';

interface PropsTypes {
    label: string;
    Svg: IconType;
    handleFunction: Function;
}

export default function ButtonImg(props: PropsTypes) {
    const { label, Svg, handleFunction } = props;

    function doSomething() {
        handleFunction();
    }

    return (
        <div className={styles.book_button}>
            <button onClick={doSomething} aria-label={label}>
                {<Svg />}
            </button>
        </div>
    );
}
