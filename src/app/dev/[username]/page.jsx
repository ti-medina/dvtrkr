'use client'
import Dialog from '@/components/ui/dialog'
import Section from '@/components/ui/section'
import ObjsTable from '@/components/ui/table'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import styles from './page.module.css'

export default function Developer(props) {
    const {
        params: { username },
    } = props

    const [developer, setDeveloper] = useState(undefined)
    const [tagSel, setTagSel] = useState({})

    const router = useRouter()
    const params = useSearchParams()
    const url = usePathname()
    const sel = parseInt(params.get('sel'))
    function setQuary(q) {
        router.replace(`${url}${q ? '?' + q : ''}`)
    }
    const addToQuery = useCallback(
        (name, value) => {
            const newParams = new URLSearchParams(params.toString())
            newParams.set(name, value)
            setQuary(newParams.toString())
        },
        [params]
    )
    const deleteFromQuery = useCallback(
        (name) => {
            const newParams = new URLSearchParams(params.toString())
            newParams.delete(name)
            setQuary(newParams.toString())
        },
        [params]
    )

    useEffect(() => {
        fetch(`/api/dev/${username}`)
            .then((res) => res.json())
            .then((obj) => setDeveloper(obj))
    }, [])

    function getIdFromRow(table, row) {
        switch (table) {
            case 'projects':
                return developer.projects[row].id
            case 'backports':
                return developer.backports[row].id
        }
        return null
    }

    function onClick(table, row, col) {
        addToQuery('sel', getIdFromRow(table, row))
    }

    function onCardSelected(table, row, col, tag) {
        setTagSel({ table, row, col, card: tag })
    }

    function onEdit() {
        addToQuery('edit', 'y')
    }

    function onDlgClose() {
        deleteFromQuery('edit')
    }

    function onDlgSave() {
        onDlgClose()
    }

    if (developer === undefined) return <div className='cont'>Loading...</div>

    return (
        <div className={styles.main}>
            <Dialog
                title='Status Updates'
                open={sel > 0 && (params.get('edit') == 'y')}
                onClose={onDlgClose}
            ></Dialog>
            <ActionsPane
                active={sel}
                onClick={() => deleteFromQuery('sel')}
                onEdit={onEdit}
            />
            <div className='cont'>
                <Section title='Projects' expanded={true}>
                    <ObjsTable
                        id='projects'
                        objs={developer.projects}
                        cols={projectCols}
                        sel={sel}
                        onClick={onClick}
                        cardSel={tagSel}
                        onCardSelected={onCardSelected}
                    />
                </Section>
                <Section title='High Priority Bugs' expanded={true}>
                    <ObjsTable
                        id='hpb'
                        objs={developer.highpri}
                        cols={projectCols}
                        sel={sel}
                        onClick={onClick}
                    />
                </Section>
                <Section title='Backports' expanded={true}>
                    <ObjsTable
                        id='backports'
                        objs={developer.backports}
                        cols={backportCols}
                        sel={sel}
                        onClick={onClick}
                    />
                </Section>
                <Section title='RTIs' expanded={true}>
                    <ObjsTable
                        id='rtis'
                        objs={developer.rtis}
                        cols={projectCols}
                        sel={sel}
                        onClick={onClick}
                    />
                </Section>
                <Section title='Bugs' expanded={true}>
                    <ObjsTable
                        id='bugs'
                        objs={developer.bugs}
                        cols={projectCols}
                        sel={sel}
                        onClick={onClick}
                    />
                </Section>
                <Section title='Backlog' expanded={false}>
                    <ObjsTable
                        id='backlog'
                        objs={developer.backlog}
                        cols={projectCols}
                        sel={sel}
                        onClick={onClick}
                    />
                </Section>
            </div>
        </div>
    )
}

function ActionsPane(props) {
    const { active, onClick, onEdit } = props
    return (
        <div
            className={[styles.leftBar, active ? styles.active : ''].join(' ')}
        >
            <button className={styles.close} onClick={onClick}>
                🗙
            </button>
            <div className={styles.btnGrp}>
                <ActionPaneButton icon='📄'> Mark Open</ActionPaneButton>
                <ActionPaneButton icon='🔨'> Mark Fixed</ActionPaneButton>
                <ActionPaneButton icon='🖋️' onClick={onEdit}>
                    Status Update
                </ActionPaneButton>
            </div>
        </div>
    )
}

function ActionPaneButton(props) {
    const { icon, onClick, children } = props
    return (
        <button className={styles.btn} onClick={onClick}>
            <span>{children}</span>
            <div>{icon}</div>
        </button>
    )
}

const projectCols = [
    { name: 'num', title: 'ID' },
    'description',
    'status',
    { name: 'tags', type: 'cards' },
]
const backportCols = [
    {
        name: 'num',
        type: 'link',
        href: (obj) =>
            'https://beat.oraclecorp.com/ords/r/apps/bugdb/bugdetails?p42_rptno=' +
            obj.num,
    },
    'description',
    'status',
    'severity',
    { name: 'tags', type: 'cards' },
    {
        name: 'updates',
        type: 'object',
        cb: (obj) => obj?.length > 0 && obj[0].upd,
    },
]
