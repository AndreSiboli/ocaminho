import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { ApiProvider } from '@/@context/Api';
import { SearchProvider } from '@/@context/Search';
import styles from '@/styles/layout/MainContainer.module.scss';

import Navbar from '../bars/Navbar/Index';
import Footer from '../bars/Footer';
import TopPage from '../buttons/TopPage';

const inter = Inter({ subsets: ['latin'] });

export default function MainContainer({ children }: { children: ReactNode }) {
    return (
        <div className={inter.className}>
            <ApiProvider>
                <SearchProvider>
                    <Navbar />
                    <div className={styles.main_container}>{children}</div>
                    <Footer />
                    <TopPage link="#toppage" />
                </SearchProvider>
            </ApiProvider>
        </div>
    );
}
