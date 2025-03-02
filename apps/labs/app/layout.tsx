import '@repo/ui/core/styles/globals';
import '@repo/ui/core';

import type { Metadata } from 'next';
import CoreProvider from './_providers/core-provider';
import { fonts } from '@repo/ui/core/fonts';
import { ThonLabsWrapper } from '@thonlabs/nextjs';
import { Toaster } from '@repo/ui/toaster';

export const metadata: Metadata = {
  title: {
    template: '%s · ThonLabs',
    default: 'ThonLabs',
  },
  icons: {
    icon: '/favicon.png',
  },
  robots: {
    follow: false,
    index: false,
  },
};

async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fonts.className} bg-background text-text`}>
        <ThonLabsWrapper
          environmentId={process.env.NEXT_PUBLIC_TL_ENV_ID as string}
          publicKey={process.env.NEXT_PUBLIC_TL_PK as string}
          baseURL={process.env.NEXT_PUBLIC_TL_API as string}
        >
          <CoreProvider>{children}</CoreProvider>
        </ThonLabsWrapper>
        <Toaster />
      </body>
    </html>
  );
}

export default RootLayout;
