import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export const ListSection = ({ title, icon, items, onUpdate, renderItem }) => {
  const addItem = () => onUpdate([...items, { id: Date.now(), title: '', year: '' }]);
  const removeItem = (id) => onUpdate(items.filter(i => i.id !== id));
  const updateItem = (id, newItem) => onUpdate(items.map(i => i.id === id ? newItem : i));

  return (
    <div className="bg-card border rounded-2xl p-8 space-y-6 shadow-sm h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        </div>
        <button onClick={addItem} className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all">
          <Plus size={18} />
        </button>
      </div>
      
      <div className="flex-1 space-y-3 overflow-y-auto max-h-[400px] pr-2">
        {items.map((item) => (
          <div key={item.id} className="flex gap-2 items-start group">
            <div className="flex-1">{renderItem(item, (ni) => updateItem(item.id, ni))}</div>
            <button onClick={() => removeItem(item.id)} className="p-2 text-destructive opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive/5 rounded-lg">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
