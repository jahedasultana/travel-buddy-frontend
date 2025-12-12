import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { deleteCookie, getCookie } from './utils/tokenHandler';
import { UserRole } from './types/user.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute } from './lib/authUtils';
import getLogedInUser from './utils/getLogedInUser';

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const logedInUser = await getLogedInUser()
    const accessToken = await getCookie('accessToken') || null

    // If access token available verify it and store user role otherwise delete accesstoken and refresh token if they are already available
    let userRole: UserRole | null = null;
    if (accessToken) {
        const verifiedToken: JwtPayload | string = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string);

        if (typeof verifiedToken === "string") {
            await deleteCookie("accessToken");
            await deleteCookie("refreshToken");
            return NextResponse.redirect(new URL('/login', request.url));
        }

        userRole = verifiedToken.role;
    }

    // redirect admin to user management when visit /admin/dashboard
    if(pathname === '/admin/dashboard'){
        return NextResponse.redirect(new URL('/admin/dashboard/users', request.url))
    }


    // Get current route owner
    const routerOwner = getRouteOwner(pathname);

    // check if it's an auth route
    const isAuth = isAuthRoute(pathname)

    // user is not premium
    if(!logedInUser?.verifiedBadge && (pathname.startsWith('/user') || pathname.startsWith('/admin'))){
        return NextResponse.redirect(new URL('/subscription', request.url))
    }

    // If already loged in and trying to visit auth page redirect to his own dashboard
    if (accessToken && isAuth) {
        return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
    }

    // allow user to visit open public routes
    if (routerOwner === null) {
        return NextResponse.next();
    }


    // If access token not available set a redirect searchparams with /login
    if (!accessToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Allow user if they want to visit common protected routes
    if (routerOwner === "COMMON") {
        return NextResponse.next();
    }


    // User is tring to access role based protected routes
    if (routerOwner === "ADMIN" || routerOwner === "USER") {
        if (userRole !== routerOwner) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
        }
    }

    

    return NextResponse.next()
}


export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ],
}