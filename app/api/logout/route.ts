// app/api/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  // Clear the session cookie by setting it to expire
  const response = NextResponse.json({ message: 'Logout successful' });

  // Assuming 'session' is the name of your cookie, you can clear it like this
  response.cookies.set('session', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: new Date(0), // Set the expiration date to the past to delete the cookie
    path: '/', // Ensure the cookie is cleared from the root path
  });

  return response;
}
