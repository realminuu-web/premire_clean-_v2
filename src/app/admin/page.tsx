import type { Metadata } from 'next';
import AdminApp from './_components/AdminApp';

export const metadata: Metadata = {
  title: '관리자 | 프리미어 클린',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminApp />;
}
