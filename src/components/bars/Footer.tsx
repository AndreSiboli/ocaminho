import styles from '@/styles/bars/Footer.module.scss';
import Container from '../layout/Container';
import Logo from '../layout/Logo';
import Link from 'next/link';

import { FaGithubSquare, FaLinkedinIn, FaPager } from 'react-icons/fa';

export default function Footer() {
    const date = new Date() || 2024;

    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.footer_container}>
                    <div className={styles.footer_wrapper}>
                        <div className={styles.footer_infos}>
                            <div className={styles.infos}>
                                <h3>API</h3>
                                <div className={styles.infos_link}>
                                    <Link
                                        href="https://github.com/AndreSiboli/bible-api"
                                        target="_blank"
                                    >
                                        On Github
                                    </Link>
                                </div>
                            </div>
                            <div className={styles.infos}>
                                <h3>Social</h3>
                                <div className={styles.infos_link}>
                                    <Link
                                        href="https://github.com/andresiboli"
                                        target="_blank"
                                        aria-label="Github"
                                    >
                                        <FaGithubSquare />
                                    </Link>
                                    <Link
                                        href="https://www.linkedin.com/in/andr%C3%A9-siboli-81b969244/"
                                        target="_blank"
                                        aria-label="LinkedIn"
                                    >
                                        <FaLinkedinIn />
                                    </Link>
                                    <Link
                                        href="https://andresiboli.github.io/portifolio"
                                        target="_blank"
                                        aria-label="Portfolio"
                                    >
                                        <FaPager />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={styles.footer_logo}>
                            <Logo />
                        </div>
                    </div>
                    <div className={styles.footer_copyright}>
                        <p>Copyright &copy; {date.getFullYear()} All rights reserved.</p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
