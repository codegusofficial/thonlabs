import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Home() {
  return <div className="px-3 py-2">Dashboard - Home</div>;
}
