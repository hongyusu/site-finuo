'use client';

import { useRouter } from 'next/navigation';
import InstitutionDetailPage from '../../../src/InstitutionDetailPage';

export default function InstitutionClient({ id }) {
  const router = useRouter();
  return <InstitutionDetailPage institutionId={id} onBack={() => router.push('/education')} />;
}
