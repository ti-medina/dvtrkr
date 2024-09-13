import { query } from '../db'

export async function getAllDevelopers() {
    const result = await query('SELECT JSON_OBJECT(*) FROM developers')
    return result.rows.map(r=>JSON.parse(r))
}

export async function getDeveloperByUsername(username) {
    const result = await query(`SELECT * FROM developers_v d WHERE d.developer.USERNAME='${username}'`)
    return result.rows.map(r=>JSON.parse(r)).pop()
}