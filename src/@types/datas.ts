export interface BooksType {
    abbrev: string;
    author: string;
    chapters: number;
    group: string;
    name: string;
    testament: string;
}

export interface ChapterType {
    book: {
        abbrev: string;
        author: string;
        group: string;
        name: string;
        version: string;
    };
    chapter: {
        number: number;
        verses: number;
    };
    verses: { _id: string; number: number; text: string }[];
}

export interface VerseType {
    book: {
        abbrev: string;
        author: string;
        group: string;
        name: string;
        version: string;
    };
    _id: string;
    chapter: number;
    number: number;
    text: string;
}

export interface RandomVerseType {
    verse1: VerseType;
    verse2: VerseType;
}

export interface SearchType {
    appearance: number;
    version: string;
    text: string;
    verses: VerseType[];
}
