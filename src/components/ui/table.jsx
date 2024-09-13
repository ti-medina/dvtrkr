import Link from 'next/link'
import styles from './table.module.css'

export default function ObjsTable(props) {
    const { id, objs, cols, sel, onClick, cardSel, onCardSelected } = props
    if (!objs) return null

    function onCellClick(row, col) {
        onClick && onClick(id, row, col)
    }
    function onCardClick(row, col, card) {
        onCardSelected && onCardSelected(id, row, col, card)
    }

    return (
        <table>
            <thead>
                <tr>
                    {cols.map((c, i) => {
                        return (
                            <th key={i}>
                                {typeof c == 'string'
                                    ? camelCase(c)
                                    : c.title || camelCase(c.name)}
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {objs.map((o, i) => (
                    <tr key={i} className={(o.id===sel && styles.sel) || ''}>
                        {cols.map((c, j) => {
                            const str = typeof c == 'string'
                            return (
                                <td key={j} onClick={(ev) => onCellClick(i, j)}>
                                    {str ? (
                                        o[c]
                                    ) : c.type == 'cards' ? (
                                        <Cards
                                            items={o[c.name]}
                                            sel={
                                                i === sel &&
                                                cardSel?.table === id &&
                                                cardSel?.row === i &&
                                                cardSel.card
                                            }
                                            onSel={(card) =>
                                                onCardClick(i, j, card)
                                            }
                                        />
                                    ) : c.type == 'object' ? (
                                        <NestedObject
                                            obj={o[c.name]}
                                            cb={c.cb}
                                        />
                                    ) : (
                                        (c.type == 'link' ? (
                                            <Anchor href={c.href(o)}>
                                                {o[c.name]}
                                            </Anchor>
                                        ) : (
                                            o[c.name]
                                        ))
                                    )}
                                </td>
                            )
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

function NestedObject(props) {
    const { obj, cb } = props
    return cb(obj)
}

function Cards(props) {
    const { items, sel, onSel } = props
    return (
        <div className={styles.cards}>
            {items &&
                items.map((t, j) => (
                    <div
                        key={j}
                        className={[styles.card, sel === j && styles.sel].join(
                            ' '
                        )}
                        onClick={(ev) => onSel(j)}
                    >
                        {t}
                    </div>
                ))}
        </div>
    )
}

function Anchor(props) {
    const { href, children } = props
    return (
        <Link className={styles.anc} href={href}>
            {children}
        </Link>
    )
}

function camelCase(str) {
    return str.replace(/^(.)/g, (match, char) => char.toUpperCase())
}
