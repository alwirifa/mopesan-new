import { NextResponse } from 'next/server';

const isProtectedRoute = (pathname: string) => {

  const protectedRoutes = ['/dashboard', '/dashboard/settings/admin'];
  return protectedRoutes.some(route => pathname.startsWith(route));
};

export function middleware(request: { nextUrl: { pathname: any; }; }) {
  const { pathname } = request.nextUrl;

  if (isProtectedRoute(pathname)) {
    const token = localStorage.getItem('token');

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
