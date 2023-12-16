import { createContext, useState, ReactNode, useEffect } from 'react';
import { BooksType, RandomVerseType } from '@/@types/datas';
import { getAllBooks, getRandomVerse } from '@/requests/request';
import { preVerses } from '@/utils/verses';

interface ContextProps {
    books: BooksType[] | null;
    testament: TestBook;
    dailyWord: RandomVerseType;
    version: string;
    defineVersion: Function;
}

interface TestBook {
    old: BooksType[] | null;
    new: BooksType[] | null;
}

export const ApiContext = createContext<ContextProps>({
    books: null,
    testament: { old: null, new: null },
    dailyWord: preVerses,
    version: 'nvi',
    defineVersion: (text: string) => {},
});

export function ApiProvider({ children }: { children: ReactNode }) {
    const [books, setBooks] = useState<BooksType[] | null>(null);
    const [testament, setTestament] = useState<TestBook>({ old: null, new: null });
    const [dailyWord, setDailyWord] = useState<RandomVerseType>(preVerses);
    const [version, setVersion] = useState('nvi');

    function defineVersion(text: string) {
        setVersion(text);
    }

    //It gets all books and filter it
    useEffect(() => {
        async function getBooks() {
            const books = await getAllBooks();
            if (!books) return;

            const test: { old: BooksType[]; new: BooksType[] } = {
                old: [],
                new: [],
            };

            books.forEach((book) => {
                if (book.testament === 'VT') test.old.push(book);
                else if (book.testament === 'NT') test.new.push(book);
            });

            setBooks(books);
            setTestament(test);
        }
        getBooks();
    }, []);

    //It gets a random verse
    useEffect(() => {
        async function getVerse(version: string) {
            const verse1 = await getRandomVerse(version);
            const verse2 = await getRandomVerse(version);

            if (!verse1 || !verse2) return;

            setDailyWord({ verse1, verse2 });
        }

        getVerse('nvi');
    }, []);

    return (
        <ApiContext.Provider value={{ books, testament, dailyWord, version, defineVersion }}>
            {children}
        </ApiContext.Provider>
    );
}
