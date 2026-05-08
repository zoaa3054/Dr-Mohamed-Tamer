import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-12 border-t">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>{t('common.footer_text')}</p>
      </div>
    </footer>
  );
};

export default Footer;
