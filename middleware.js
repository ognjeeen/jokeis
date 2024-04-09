export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/jokes/add', '/profile', '/jokes/saved'],
};
