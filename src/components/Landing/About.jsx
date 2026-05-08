import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const About = ({ data }) => {
  const { i18n, t } = useTranslation();
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0];
  const lang = currentLang.charAt(0).toUpperCase() + currentLang.slice(1);
  const content = data[`content${lang}`] || data.contentEn;

  return (
    <section id="about" className="pb-20 pt-10 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold"
          >
            {t('common.about')}
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground leading-relaxed italic"
          >
            "{content}"
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
