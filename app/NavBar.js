'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import AppAppBar from '../src/components/AppAppBar';
import { LANGS, localizedPath, splitLangPath } from './paths';

const BOOKING_URL = 'https://travel.finuo.fi/search?vendor_id=14';

function siteFromPathname(pathname) {
  if (pathname.startsWith('/education')) return 'education';
  if (pathname.startsWith('/mice')) return 'mice';
  return 'experience';
}

export default function NavBar({ lang = 'zh' }) {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const { t } = useTranslation();

  // The URL keeps Chinese unprefixed, so work from the bare path throughout.
  const [, barePath] = splitLangPath(pathname);

  // Detail pages render their own back-bar; no global navbar there.
  if (barePath.startsWith('/tour/') || barePath.startsWith('/institution/')) {
    return null;
  }

  const activeSite = siteFromPathname(barePath);

  const navItemsBySite = {
    experience: [
      { label: t('nav.nordic'), sectionId: 'nordic' },
      { label: t('nav.china'), sectionId: 'china' },
      { label: t('nav.chinaGuide'), sectionId: 'chinaGuide' },
      { label: t('nav.book'), href: BOOKING_URL },
      { label: t('nav.testimonials'), sectionId: 'testimonials' },
      { label: t('nav.faq'), sectionId: 'faq' },
      { label: t('nav.contact'), sectionId: 'contact' },
    ],
    education: [
      { label: t('nav.schools'), sectionId: 'schools' },
      { label: t('nav.training'), sectionId: 'training' },
      { label: t('nav.studyTours'), sectionId: 'studyTours' },
      { label: t('nav.faq'), sectionId: 'faq' },
      { label: t('nav.contact'), sectionId: 'contact' },
    ],
    mice: [
      { label: t('nav.miceList'), sectionId: 'miceList' },
      { label: t('nav.miceServices'), sectionId: 'miceServices' },
      { label: t('nav.testimonials'), sectionId: 'testimonials' },
      { label: t('nav.contact'), sectionId: 'contact' },
    ],
  };

  const handleSiteChange = (site) => {
    router.push(localizedPath(lang, site === 'experience' ? '/' : `/${site}`));
  };

  // Switching language navigates to the same page in the other language, so
  // each language has its own crawlable URL instead of a client-side toggle.
  const handleLanguageChange = (next) => {
    router.push(localizedPath(next, barePath));
  };

  return (
    <AppAppBar
      activeSite={activeSite}
      onSiteChange={handleSiteChange}
      navItems={navItemsBySite[activeSite] || navItemsBySite.experience}
      currentLang={lang}
      languages={LANGS}
      onLanguageChange={handleLanguageChange}
    />
  );
}
