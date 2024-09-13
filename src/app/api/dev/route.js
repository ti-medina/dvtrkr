import { getAllDevelopers } from "@/app/db/developers";


export async function GET(req) {
    return Response.json(await getAllDevelopers())
}