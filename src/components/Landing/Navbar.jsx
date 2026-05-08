import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { Sun, Moon, Languages, ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('common.home'), href: '#hero' },
    { label: t('common.about'), href: '#about' },
    { label: t('common.contact'), href: '#contact' },
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
    { code: 'tr', label: 'Türkçe' },
  ];

  const toggleLang = () => setIsLangOpen(!isLangOpen);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      scrolled ? "bg-background/80 backdrop-blur-md py-2" : "bg-transparent border-transparent py-4"
    )}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#hero" className="font-bold text-xl text-primary tracking-tight hover:opacity-80 transition-opacity">
          {t('common.doctor_name')}
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Language Toggle */}
          <div className="relative">
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-card/50 hover:bg-muted transition-all text-xs md:text-sm font-medium backdrop-blur-sm"
            >
              <Languages size={16} />
              <span className="uppercase">{(i18n.resolvedLanguage || i18n.language || 'en').split('-')[0]}</span>
              <ChevronDown size={14} className={cn("transition-transform", isLangOpen && "rotate-180")} />
            </button>

            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsLangOpen(false)} />
                <div className="absolute top-full mt-2 ltr:right-0 rtl:left-0 bg-card border rounded-xl shadow-xl overflow-hidden z-20 min-w-[120px] animate-in fade-in slide-in-from-top-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={cn(
                        "w-full px-4 py-2 text-start text-sm hover:bg-muted transition-colors flex items-center justify-between",
                        (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0] === lang.code && "text-primary font-bold bg-primary/5"
                      )}
                    >
                      {lang.label}
                      {(i18n.resolvedLanguage || i18n.language || 'en').split('-')[0] === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full border bg-card/50 hover:bg-muted transition-all shadow-sm backdrop-blur-sm"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden hover:bg-muted rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 top-20 bg-background/95 backdrop-blur-md z-40 md:hidden transition-all duration-300 flex flex-col items-center justify-center gap-8 text-2xl font-bold",
        isMobileMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-10"
      )}>
        {navLinks.map((link) => (
          <a 
            key={link.href} 
            href={link.href} 
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-primary transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
