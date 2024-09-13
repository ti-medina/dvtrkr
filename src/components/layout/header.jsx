"use client"

import Image from 'next/image'
import React from 'react'

import styles from './header.module.css'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import localFont from 'next/font/local'

const logoFont = localFont({
    src: '../../../public/fonts/OracleSans-regular.ttf',
    display: 'swap',
    fontWeight: 70
})

const menu = [
    { title: 'Manager', href: '/mgr', submenu: ['TIMEDINA'] },
    {
        title: 'Developer', href: '/dev', submenu: [
            {
                title: 'JSON',
                href: '/dev',
                submenu: ['EFJOSE', 'JVALERA', 'RBPAREDE']
            },
            {
                title: 'LOBS',
                href: '/dev',
                submenu: ['DIANMONT']
            },
            {
                title: 'OBJECTS',
                href: '/dev',
                submenu: ['FFOCIL', 'TIMEDINA']
            },
            {
                title: 'TEXT',
                href: '/dev',
                submenu: ['SDELAHOZ', 'ZEMONTES']
            },
            {
                title: 'XDK',
                href: '/dev',
                submenu: ['ALEXISG', 'MIGSILVA']
            },
            {
                title: 'XML',
                href: '/dev',
                submenu: ['DAVCARDE', 'ERNALVAR', 'FALAVEZ', 'JOAAGUIR']
            },
        ]
    },
]

export default function Header() {
    return (<>
        <div className={styles.cont}>
            <div className={styles.hdr}>
                <Link href='/' className={styles.logo}>
                    <div><Image src='/images/logo.png' quality={100} width={40} height={50} alt='DevTracker' /></div>
                    <span className={logoFont.className}>DevTracker</span>
                </Link>
                <Menu />
                <Options />
            </div>
        </div>
        <Breadcrumbs />
    </>
    )
}

function Breadcrumbs() {
    const path = usePathname();
    const arr = path.split('/')

    if (arr.length < 2 || !arr[1])
        return null;

    arr[0] = '⌂'
    return (
        <div className={styles.brdc}>
            {arr.map((l, i) => {
                const all = arr.slice(1, i + 1)
                return <div key={i}>
                    {i > 0 && <p>{'>'}</p>}
                    <Link className={styles.lnk} href={'/' + all.join('/')}>{l}</Link>
                </div>
            })}
        </div>
    )
}


function Menu() {
    return (
        <ul className={styles.mnu}>
            {menu.map((m, i) => (
                <li key={i}>
                    <Link href={m.href} style={{pointerEvents: 'none', cursor:'default'}}>{m.title}</Link>
                    <SubMenu submenu={m.submenu} baseref={m.href} />
                </li>
            ))}
        </ul>
    )
}

function SubMenu({ submenu, baseref, level }) {
    if (submenu?.length < 1) return null;

    const lvl = (level || 1);

    return (
        <ul className={[styles.submenu, styles['lvl'+lvl]].join(' ')}>
            {submenu.map((s, j) => {
                const simple = typeof (s) == 'string'  
                const title = simple ? s : s.title
                const href = simple ? baseref + '/' + title : s.href
                return (
                    <li key={j}>
                        <Link href={href}>{title}</Link>
                        { !simple && <SubMenu submenu={s.submenu} baseref={href} level={lvl+1} /> }
                    </li>
                )
            })}
        </ul>
    )
}

function Options() {
    return (
        <div>
            <ul>
                <li><Image src='/images/user.svg' alt='user' width={25} height={25} /></li></ul>
        </div>
    )
}