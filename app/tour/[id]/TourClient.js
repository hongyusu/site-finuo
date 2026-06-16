'use client';

import { useRouter } from 'next/navigation';
import TourDetailPage from '../../../src/TourDetailPage';

export default function TourClient({ id }) {
  const router = useRouter();
  return <TourDetailPage tourId={id} onBack={() => router.push('/')} />;
}
