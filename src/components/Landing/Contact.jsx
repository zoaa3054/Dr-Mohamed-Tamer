import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = ({ contact, socials }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Contact from ${formData.name}`;
    const body = formData.message;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">{t('common.contact')}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Have a question or want to book a session? Dr. Mohamed Tamer is here to help you on your journey to recovery.
            </p>

            <div className="space-y-4">
              <ContactInfo icon={<Mail />} label="Email" value={contact.email} />
              <ContactInfo icon={<Phone />} label="Phone" value={contact.phone} />
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-card p-8 rounded-2xl border shadow-xl space-y-4"
          >
            <div className="space-y-4">
              <InputField label="Name" value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} />
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  className="w-full p-3 border rounded-lg bg-background outline-none focus:ring-2 focus:ring-primary h-32 resize-none transition-all"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20"
            >
              <Send size={18} /> {t('common.send_email')}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const InputField = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      className="w-full p-3 border rounded-lg bg-background outline-none focus:ring-2 focus:ring-primary transition-all"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
    />
  </div>
);

const ContactInfo = ({ icon, label, value }) => {
  if (!value) return null;
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex items-center gap-4 p-4 bg-card border rounded-xl shadow-sm hover:shadow-md transition-all group"
    >
      <div className="p-3 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{label}</p>
        <p className="font-medium group-hover:text-primary transition-colors">{value}</p>
      </div>
    </motion.div>
  );
};

export default Contact;
