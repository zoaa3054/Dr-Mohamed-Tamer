import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Accomplishments = ({ items }) => {
  const { t } = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <CheckCircle className="text-primary" /> {t('common.accomplishments')}
      </h2>
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-4"
      >
        {items.map((acc) => (
          <motion.div 
            key={acc.id} 
            variants={item}
            className="p-4 bg-card border rounded-lg shadow-sm hover:shadow-md border-l-4 border-l-primary transition-all"
          >
            <h3 className="font-bold text-lg">{acc.title}</h3>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Accomplishments;
