import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: string;
}

export const EditorialGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g1',
      title: 'Dimensional French Balayage',
      category: 'Hair Art',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
      aspect: 'h-96'
    },
    {
      id: 'g2',
      title: 'Haute Bridal Airbrush Glow',
      category: 'Haute Bridal',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
      aspect: 'h-80'
    },
    {
      id: 'g3',
      title: 'The Royal Hot Towel Architecture',
      category: 'Grooming',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
      aspect: 'h-80'
    },
    {
      id: 'g4',
      title: '24K Bio-Gold Cellular Infusion',
      category: 'Glow Therapy',
      image: 'https://images.unsplash.com/photo-1512290900672-1f55b9a897b6?auto=format&fit=crop&w=1200&q=80',
      aspect: 'h-96'
    },
    {
      id: 'g5',
      title: 'Bespoke Layered Coiffure',
      category: 'Hair Art',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
      aspect: 'h-80'
    },
    {
      id: 'g6',
      title: 'Silken Keratin Transformation',
      category: 'Hair Art',
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=80',
      aspect: 'h-96'
    }
  ];

  const categories = ['All', 'Hair Art', 'Glow Therapy', 'Haute Bridal', 'Grooming'];

  const filteredItems = activeTab === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeTab);

  return (
    <section id="gallery" className="relative py-28 px-6 md:px-12 bg-[#09090D] border-t border-[#1E1E26]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-10 bg-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Visual Portfolio
            </span>
            <div className="h-[1px] w-10 bg-[#D4AF37]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FBF9F5] leading-tight mb-6">
            EDITORIAL LOOKBOOK & <br />
            <span className="italic text-gold-gradient font-normal">
              ARTISTIC TRANSFORMATIONS.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#EFECE6]/70 font-light leading-relaxed">
            A visual anthology of our recent hair sculpts, haute bridal looks, and dermal skin alchemy captured inside the Elegance Saloon atelier.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-14 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === cat
                  ? 'bg-[#D4AF37] text-[#070709] font-semibold shadow-md shadow-[#D4AF37]/20'
                  : 'bg-[#0D0D14] text-[#EFECE6]/70 hover:text-[#D4AF37] border border-[#23232E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className={`group relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer bg-[#0D0D14] ${item.aspect}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

              {/* Hover Overlay Details */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <span className="self-start px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-[#F3E5AB] bg-[#070709]/80 border border-[#D4AF37]/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.category}
                </span>

                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-xl text-[#FBF9F5] mb-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#D4AF37]">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Click to expand</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-10 animate-in fade-in duration-300">
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:text-[#D4AF37] transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
            <img
              src={activeImage.image}
              alt={activeImage.title}
              className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] block mb-1">
                {activeImage.category}
              </span>
              <h4 className="font-serif text-2xl text-[#FBF9F5]">
                {activeImage.title}
              </h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
