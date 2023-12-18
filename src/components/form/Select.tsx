import { useContext, ChangeEvent } from 'react';
import { ApiContext } from '@/@context/Api';
import styles from '@/styles/form/Select.module.scss';

export default function Select() {
    const { defineVersion, version } = useContext(ApiContext);

    const versions = [
        { name: 'Nova Versão Internacional', abbrev: 'NVI' },
        { name: 'Nova Versão Transformadora', abbrev: 'NVT' },
        { name: 'Nova Tradução da Linguagem de Hoje', abbrev: 'NTLH' },
        { name: 'Almeida Revista e Atualizada', abbrev: 'ARA' },
        { name: 'Nova Almeida Atualizada', abbrev: 'NAA' },
    ];

    function changeVersion(e: ChangeEvent<HTMLSelectElement>) {
        defineVersion(e.target.value);
    }

    return (
        <select className={styles.select} onChange={changeVersion} defaultValue={version} aria-label='Escolha a versão da bíblia'>
            {versions.map((opt) => (
                <option value={opt.abbrev.toLowerCase()} key={opt.abbrev}>
                    {opt.name} {`(${opt.abbrev})`}
                </option>
            ))}
        </select>
    );
}
