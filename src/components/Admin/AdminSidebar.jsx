import { LogOut, ExternalLink, LayoutDashboard, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AdminSidebar = ({ tabs, activeTab, onTabChange, onLogout, isOpen, onClose }) => {
  const content = (
    <>
      <div className="p-6 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
            <LayoutDashboard size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight">Admin Portal</span>
        </div>
        <button onClick={onClose} className="md:hidden p-2 hover:bg-muted rounded-lg">
          <X size={20} />
        </button>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              onTabChange(tab.id);
              onClose();
            }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm font-medium",
              activeTab === tab.id 
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t space-y-2">
        <a 
          href="/" 
          className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ExternalLink size={18} /> View Website
        </a>
        <button 
          onClick={onLogout} 
          className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/5 rounded-lg transition-colors"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <div className={cn(
        "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 md:hidden transition-all duration-300",
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )} onClick={onClose} />
      
      {/* Sidebar Content */}
      <aside className={cn(
        "fixed md:sticky top-0 left-0 h-screen w-64 bg-card border-r z-50 transition-transform duration-300 md:translate-x-0 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {content}
      </aside>
    </>
  );
};
