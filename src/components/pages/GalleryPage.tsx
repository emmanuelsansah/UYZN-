import React, { useState } from 'react';
import { Image as ImageIcon, Video, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GalleryItem } from '../../types';

export const GalleryPage: React.FC = () => {
  const { gallery } = useApp();
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="max-w-3xl space-y-2">
        <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider font-mono">
          Visual Media Archives
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
          UYZN Activity Gallery
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="group cursor-pointer bg-white dark:bg-[#0E1A12] rounded-2xl overflow-hidden border border-slate-200 dark:border-emerald-900/60 shadow-xs space-y-3 p-3 transition-transform hover:-translate-y-1"
          >
            <div className="aspect-video relative rounded-xl overflow-hidden bg-slate-950">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 bg-slate-950/80 text-white font-mono text-[10px] rounded">
                {item.category}
              </span>
            </div>

            <div className="p-2 space-y-1">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="max-w-3xl w-full bg-slate-900 text-white rounded-2xl overflow-hidden p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base">{selectedImage.title}</h3>
              <button onClick={() => setSelectedImage(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video rounded-xl overflow-hidden bg-slate-950">
              <img src={selectedImage.imageUrl} alt={selectedImage.title} className="w-full h-full object-cover" />
            </div>
            <p className="text-xs text-slate-300">{selectedImage.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
};
