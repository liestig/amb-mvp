import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import {jwtVerify} from "jose";

export async function verifyJwtToken(token: string, secret: string) {
    const {payload} = await jwtVerify(
        token,
        new TextEncoder().encode(secret)
    );
    return payload;
}

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken || !verifyJwtToken(accessToken, '1HN4MWA76T5Q6qtebqQR15x2DPNdW-CO_6YB174KHGEh6yCyXQhHnz1MXSeSHUzr_fK84fNoOqwHsatKFZJw9wwgyS5geYU6oxfprBZfVEJImkJj1LDX_V-IEhKR971nzG5TRcbHhsfvQYAvWiWpz1ToZLrMAgoHqki1T4zCVq8')) {
        request.cookies.delete('accessToken');
        return NextResponse.redirect(new URL('/', request.url).toString());
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profile', '/findMyChief'],
}
