import { getDeveloperByUsername } from "@/app/db/developers";

export async function GET(req) {
    const username = req.url.split('/').pop()
    return Response.json(await getDeveloperByUsername(username))
}