import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Export the default middleware from next-auth
export { default } from 'next-auth/middleware';

export function middleware(request: NextRequest) {
  // Split the URL path into parts
  const urlPathName = request.nextUrl.pathname;

  const pathParts = urlPathName.split('/');

  const fisrtIndex = pathParts[1];

  const removedData = [
    '_next',
    'icons',
    'images',
    'api',
    'buy',
    'music',
    'sitemap.xml',
    'learn',
  ];
  // const exceptUrl = ['/sitemap.xml'];

  const skipUrl = ['https://staging.iktaraa.com/', 'http://localhost:3000/'];

  if (skipUrl.includes(process.env.NEXTAUTH_URL || '')) {
    removedData.push('learn-music');
  }
  if (!removedData.includes(fisrtIndex)) {
    if (urlPathName !== '/') {
      const removedDataSplit = request.url.split('/');
      removedDataSplit.splice(3, 0, 'buy');
      const newUrlString = removedDataSplit.join('/');
      return NextResponse.redirect(new URL(newUrlString, request.url));
    }
  }
}

export const config = {
  matcher: '/:path*',
};
