import LandingPageMice from '../../src/LandingPageMice';

export const metadata = {
  title: 'Finuo · MICE & Events in Helsinki — Conferences, Exhibitions, Team Building | 芬诺会议会展',
  description:
    'MICE services in Helsinki and the Nordics: conferences, exhibitions (Slush, Habitare, Nordic Business Forum), bespoke programs and hospitality. 芬兰会议会展与落地执行。',
  alternates: { canonical: '/mice' },
};

export default function Page() {
  return <LandingPageMice />;
}
