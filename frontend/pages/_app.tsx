import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '../styles/animations.css';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <SessionProvider session={session}>
      <Toaster position="top-right" />
      {loading && <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">Загрузка...</div>}
      <Component {...pageProps} />
    </SessionProvider>
  );
}
