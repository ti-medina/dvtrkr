"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Developers() {
    const [developers, setDevelopers] = useState(undefined)

    useEffect(() => {
        fetch(`/api/developers/`)
        .then(res=>res.json())
        .then(obj=>setDevelopers(obj))
    }, [])

    if (developers === undefined)
        return <div className='cont'>Loading...</div>

    return (
        <div className='cont'>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Alias</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        developers.map(dev=>(
                            <tr key={dev.USERNAME}>
                                <td><Link href={`/developers/${dev.USERNAME}`}>{dev.USERNAME}</Link></td>
                                <td>{dev.ALIAS}</td>
                                <td>{dev.NAME}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
