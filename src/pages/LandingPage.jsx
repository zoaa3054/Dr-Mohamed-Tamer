import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLandingData } from '../hooks/useLandingData';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';
import Navbar from '../components/Landing/Navbar';
import Hero from '../components/Landing/Hero';
import About from '../components/Landing/About';
import Certificates from '../components/Landing/Certificates';
import Accomplishments from '../components/Landing/Accomplishments';
import Contact from '../components/Landing/Contact';
import Footer from '../components/Landing/Footer';
import { TracingBeam } from '../components/ui/tracing-beam';

const LandingPage = ({ previewData = null }) => {
  const { data: hookData, loading } = useLandingData();
  const { t, i18n } = useTranslation();
  
  const data = previewData || hookData;

  if ((loading && !previewData) || !data) return <div className="flex items-center justify-center min-h-screen bg-background"><Loader2 className="animate-spin text-primary" /></div>;

  const currentLang = i18n.language.charAt(0).toUpperCase() + i18n.language.slice(1);
  const title = data.hero[`title${currentLang}`] || t('common.doctor_name');
  const description = data.hero[`subtitle${currentLang}`] || t('common.physiotherapist');

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
      <Helmet>
        <title>{t('common.doctor_name')} | {t('common.physiotherapist')}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="physiotherapy, physical therapy, sports injuries, rehabilitation, Dr. Mohamed Tamer, علاج طبيعي, تأهيل إصابات" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={`${t('common.doctor_name')} | ${t('common.physiotherapist')}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${window.location.origin}/doctor.png`} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:title" content={`${t('common.doctor_name')} | ${t('common.physiotherapist')}`} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={`${window.location.origin}/doctor.png`} />

        <link rel="canonical" href={window.location.href} />
        <html lang={i18n.language} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} />
      </Helmet>

      <Navbar />

      <main className="relative">
        <TracingBeam>
          <Hero data={data.hero} socials={data.socials} />
          <About data={data.about} />

          <div className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-12">
            <Certificates items={data.certificates} />
            <Accomplishments items={data.accomplishments} />
          </div>

          <Contact contact={data.contact} socials={data.socials} />
        </TracingBeam>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
