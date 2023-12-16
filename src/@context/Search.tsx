import { createContext, useState, useRef, useContext, ReactNode, LegacyRef } from 'react';
import { useRouter } from 'next/router';
import { getSearch } from '@/requests/request';
import { SearchType } from '@/@types/datas';
import { ApiContext } from '@/@context/Api';

interface ContextProps {
    findText: Function;
    inspec: SearchType | null;
    textRef: LegacyRef<HTMLInputElement>;
}

export const SearchContext = createContext<ContextProps>({
    findText: () => {},
    inspec: null,
    textRef: null,
});

export function SearchProvider({ children }: { children: ReactNode }) {
    const Router = useRouter();
    const { version } = useContext(ApiContext);
    const [inspec, setInspec] = useState<SearchType | null>(null);
    const textRef = useRef<HTMLInputElement>(null);

    async function findText() {
        if (!textRef.current || !textRef.current.value) return;
        const ret = await getSearch({ text: textRef.current.value, version });
        if (!ret) return;

        setInspec(ret);

        if (Router.pathname === '/search') return;
        Router.push('/search');
    }

    return (
        <SearchContext.Provider value={{ findText, inspec, textRef }}>
            {children}
        </SearchContext.Provider>
    );
}
