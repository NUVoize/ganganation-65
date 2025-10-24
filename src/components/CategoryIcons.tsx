import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Droplet, Waves, ShoppingBag, Cigarette } from 'lucide-react';

const categories = [
  {
    name: 'Weed',
    path: '/products/weed',
    icon: Leaf,
    color: 'from-green-400 to-green-600'
  },
  {
    name: 'Hash/Oil/Wax/Edibles',
    path: '/products/concentrates',
    icon: Droplet,
    color: 'from-amber-400 to-amber-600'
  },
  {
    name: 'Shrooms',
    path: '/products/shrooms',
    icon: Waves,
    color: 'from-purple-400 to-purple-600'
  },
  {
    name: 'Leafs & Papers',
    path: '/products/accessories',
    icon: ShoppingBag,
    color: 'from-blue-400 to-blue-600'
  },
  {
    name: 'Vape',
    path: '/products/vape',
    icon: Cigarette,
    color: 'from-pink-400 to-pink-600'
  }
];

export const CategoryIcons: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.path}
              to={category.path}
              className="group flex flex-col items-center gap-3 transition-transform hover:scale-110"
            >
              <div className="relative">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${category.color} opacity-50 blur-xl group-hover:opacity-80 transition-opacity animate-glow-pulse`} />
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-card/60 backdrop-blur-md border-2 border-accent/50 flex items-center justify-center group-hover:border-accent transition-all shadow-lg">
                  <Icon className="w-10 h-10 md:w-12 md:h-12 text-accent group-hover:text-accent/90" />
                </div>
              </div>
              <span className="font-impact text-sm md:text-base text-center text-foreground group-hover:text-accent transition-colors tracking-wide">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
