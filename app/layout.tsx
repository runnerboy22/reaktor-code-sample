'use client';

import AuthContext from './AuthContext';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
