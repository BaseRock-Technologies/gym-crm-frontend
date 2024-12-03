import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();
        return NextResponse.json({ status: 'success', username, password})
    } catch (error) {
        return NextResponse.json({ status: 'error'})
    }
}