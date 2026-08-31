'use client';

import { useRouter } from 'next/navigation';
import TourDetailPage from '../src/TourDetailPage';
import { localizedPath } from './paths';

export default function TourClient({ id, lang = 'zh' }) {
  const router = useRouter();
  return <TourDetailPage tourId={id} onBack={() => router.push(localizedPath(lang, '/'))} />;
}
