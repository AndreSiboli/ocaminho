import axios from 'axios';
import { BooksType, VerseType } from '@/@types/datas';
import { SearchType } from '@/@types/datas';

const url = process.env.NEXT_API_URL;
const config = {};

export async function getAllBooks() {
    const data: BooksType[] | null = await axios
        .get(`${url}/books`, config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log('Não foi possivel se conectar a api.');
        });

    if (!data) return null;
    return data;
}

interface ChapterType {
    chapter: number;
    abbrev: string;
    version: string;
}

export async function getChapter(props: ChapterType) {
    const { chapter, abbrev, version } = props;

    const urls = `${url}/verses/${version}/${abbrev}/${chapter}`;

    const data = await axios
        .get(urls, config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log('Não foi possivel se conectar a api.');
        });

    if (!data) return null;
    return data;
}

interface Verse1Type {
    chapter: number;
    number: number;
    abbrev: string;
    version: string;
}

export async function getVerse(props: Verse1Type) {
    const { chapter, abbrev, version, number } = props;
    const urls = `${url}/verses/${version}/${abbrev}/${chapter}/${number}`;

    const data = await axios
        .get(urls, config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log('Não foi possivel se conectar a api.');
        });

    if (!data) return null;
    return data;
}

export async function getRandomVerse(version: string) {
    const data: VerseType | null = await axios
        .get(`${url}/random/${version}`, config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log('Não foi possivel se conectar a api.');
        });

    if (!data) return null;
    return data;
}

export async function getRandomChapter({ version, abbrev }: { version: string; abbrev: string }) {
    const data: VerseType | null = await axios
        .get(`${url}/random/${version}/${abbrev}`, config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log('Não foi possivel se conectar a api.');
        });

    if (!data) return null;
    return data;
}

interface SearchTypes {
    version: string;
    text: string;
}

export async function getSearch(props: SearchTypes) {
    const data: SearchType | null = await axios
        .post(`${url}/search`, props, config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log('Não foi possivel se conectar a api.');
        });

    if (!data) return null;
    return data;
}
