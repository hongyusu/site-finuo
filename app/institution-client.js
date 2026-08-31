'use client';

import { useRouter } from 'next/navigation';
import InstitutionDetailPage from '../src/InstitutionDetailPage';
import { localizedPath } from './paths';

export default function InstitutionClient({ id, lang = 'zh' }) {
  const router = useRouter();
  return <InstitutionDetailPage institutionId={id} onBack={() => router.push(localizedPath(lang, '/education'))} />;
}
