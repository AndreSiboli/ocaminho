import { useEffect, useState, useContext } from 'react';
import { ApiContext } from '@/@context/Api';
import styles from '@/styles/bars/Navbar/Index.module.scss';

import Container from '@/components/layout/Container';
import Search from '@/components/form/Search';
import Logo from '@/components/layout/Logo';
import LinkEffect from '@/components/links/LinkEffect';
import Dropbar from '@/components/buttons/Dropdown/Index';
import NavSearch from '@/components/bars/Navbar/NavSearch';
import SearchButton from '@/components/form/SearchButton';
import Menu from '@/components/bars/Navbar/Menu';
import { useRouter } from 'next/router';

export default function Navbar() {
    const { testament } = useContext(ApiContext);
    const Router = useRouter()
    const [active, setActive] = useState(false);
    const [search, setSearch] = useState(false);

    useEffect(() => {
        function resize() {
            const width = window.innerWidth;
            if (width > 900) setActive(false);
        }

        window.onresize = resize;

        return () => {
            window.onresize = null;
        };
    }, []);

    useEffect(()=>{
       if(active) defineActive()
    }, [Router.query])

    function openSearch() {
        if (active) defineActive();
        defineSearch();
    }

    function defineActive() {
        setActive((prevState) => !prevState);
    }

    function defineSearch() {
        setSearch((prevState) => !prevState);
    }

    return (
        <header className={`${styles.header} ${active && styles.active}`} id="toppage">
            <Container>
                {!search ? (
                    <div className={styles.header_container}>
                        <div className={`${styles.header_menu} ${active && styles.active}`}>
                            <div className={styles.menu} onClick={defineActive}>
                                <span className={styles.trace}></span>
                                <span className={styles.trace}></span>
                                <span className={styles.trace}></span>
                            </div>
                        </div>

                        <div className={styles.header_wrapper}>
                            <div className={styles.header_logo}>
                                <Logo />
                            </div>

                            <nav className={styles.header_links}>
                                <div className={styles.link}>
                                    <LinkEffect link="/word" text="Palavra" />
                                </div>
                                <div className={styles.link}>
                                    <LinkEffect link="/books/gn/1" text="Bíblia" />
                                </div>
                                <div className={styles.dropdown}>
                                    <Dropbar oldT={testament.old} newT={testament.new} />
                                </div>
                            </nav>

                            <div className={styles.header_search}>
                                <div className={styles.search_wrapper}>
                                    <Search />
                                </div>
                                <div className={styles.search_button}>
                                    <SearchButton handleButton={openSearch} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <NavSearch handleButton={defineSearch} />
                )}

                <Menu active={active} />
            </Container>
        </header>
    );
}
