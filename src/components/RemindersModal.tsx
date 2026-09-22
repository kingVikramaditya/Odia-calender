import React, { useState } from 'react';
import { X, Bookmark, Bell, Trash2, Calendar, Plus, Check } from 'lucide-react';
import { LanguageMode } from '../types';

export interface SavedItem {
  id: string;
  dateStr: string;
  titleOdia: string;
  titleEn: string;
  type: 'bookmark' | 'reminder';
  note?: string;
  createdAt: number;
}

interface RemindersModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: SavedItem[];
  onRemoveItem: (id: string) => void;
  onAddReminder: (item: Omit<SavedItem, 'id' | 'createdAt'>) => void;
  onSelectDateStr: (dateStr: string) => void;
  language: LanguageMode;
  currentSelectedDateStr: string;
}

export const RemindersModal: React.FC<RemindersModalProps> = ({
  isOpen,
  onClose,
  savedItems,
  onRemoveItem,
  onAddReminder,
  onSelectDateStr,
  language,
  currentSelectedDateStr,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newNote, setNewNote] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  if (!isOpen) return null;
  const isOdia = language === 'or';

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddReminder({
      dateStr: currentSelectedDateStr,
      titleOdia: newTitle.trim(),
      titleEn: newTitle.trim(),
      type: 'reminder',
      note: newNote.trim(),
    });

    setNewTitle('');
    setNewNote('');
    setIsAdding(false);
  };

  return (
    <div 
      id="reminders-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="reminders-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col transition-all"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-odia">
                {isOdia ? 'ସଂରକ୍ଷିତ ତାରିଖ ଓ ମନେପକାଣି (Reminders)' : 'Saved Dates & Reminders'}
              </h3>
              <p className="text-xs text-neutral-500 font-medium font-odia">
                {isOdia ? 'ଆପଣଙ୍କ ବ୍ରତ, ଉପବାସ ଓ ଶୁଭ କାର୍ଯ୍ୟର ସୂଚୀ' : 'Personal religious observances and bookmarked days'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action button to add reminder */}
        <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/40">
          {!isAdding ? (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full py-2.5 px-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold font-odia flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{isOdia ? `${currentSelectedDateStr} ତାରିଖ ପାଇଁ ରିମାଇଣ୍ଡର ଯୋଡ଼ନ୍ତୁ` : `Add Reminder for ${currentSelectedDateStr}`}</span>
            </button>
          ) : (
            <form onSubmit={handleCreate} className="space-y-3 font-odia">
              <input
                type="text"
                placeholder={isOdia ? "ଶୀର୍ଷକ (ଯଥା: ଏକାଦଶୀ ଉପବାସ, ମାଣବସା ପୂଜା)..." : "Title (e.g. Ekadashi Fasting, Puja)..."}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs outline-none focus:border-rose-500 text-neutral-900 dark:text-white"
                autoFocus
              />
              <input
                type="text"
                placeholder={isOdia ? "ଅତିରିକ୍ତ ଟିପ୍ପଣୀ (ଐଚ୍ଛିକ)..." : "Note (Optional)..."}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs outline-none focus:border-rose-500 text-neutral-900 dark:text-white"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-colors"
                >
                  {isOdia ? 'ସଂରକ୍ଷଣ କରନ୍ତୁ' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-1.5 rounded-xl bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-bold hover:bg-neutral-300 transition-colors"
                >
                  {isOdia ? 'ବାତିଲ୍' : 'Cancel'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* List of items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {savedItems.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 font-odia text-xs">
              କୌଣସି ତାରିଖ ସଂରକ୍ଷିତ ହୋଇନାହିଁ । କ୍ୟାଲେଣ୍ଡରର ବୁକମାର୍କ ଚିହ୍ନ ଉପରେ କ୍ଲିକ୍ କରି ତାରିଖ ସଂରକ୍ଷଣ କରନ୍ତୁ ।
            </div>
          ) : (
            savedItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80 flex items-center justify-between gap-3 group"
              >
                <div 
                  className="cursor-pointer flex-1"
                  onClick={() => {
                    onSelectDateStr(item.dateStr);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className={`p-1 rounded-lg ${
                      item.type === 'bookmark' ? 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                    }`}>
                      {item.type === 'bookmark' ? <Bookmark className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5" />}
                    </span>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-odia">
                      {isOdia ? item.titleOdia : item.titleEn}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-odia mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-neutral-400" />
                      {item.dateStr}
                    </span>
                    {item.note && <span>• {item.note}</span>}
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 rounded-xl text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-neutral-700 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
