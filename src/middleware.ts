import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const authPages = ["/auth/login", "/auth/register",];
const appPages = ["/app", "/help", "/history", "/license", "/settings"];

export async function middleware(req: NextRequest) {
    const token = await getToken({ req});

    const { pathname } = req.nextUrl;


    if (token && authPages.some(page => pathname.startsWith(page))) {
        const dashboardUrl = new URL("/app", req.url);
        return NextResponse.redirect(dashboardUrl);
    }


    if (!token && appPages.some(page => pathname.startsWith(page))) {
        const loginUrl = new URL("/auth/login", req.url);
        return NextResponse.redirect(loginUrl);
    }


    return NextResponse.next();
}

export const config = {
    matcher: ["/app/:path*", "/auth/:path*",],
};