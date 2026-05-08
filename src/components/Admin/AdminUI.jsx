import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const SectionCard = ({ title, description, children }) => (
  <div className="bg-card border rounded-2xl p-8 space-y-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div>
      <h3 className="text-xl font-bold tracking-tight">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
    </div>
    {children}
  </div>
);

export const Input = ({ label, value, onChange, type = "text" }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold tracking-tight">{label}</label>
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all pr-10"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export const Textarea = ({ label, value, onChange }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-semibold tracking-tight">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      className="w-full px-4 py-2 border rounded-xl bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
    />
  </div>
);
