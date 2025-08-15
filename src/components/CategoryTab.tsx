import React from 'react';
import { User, Palette, Layout, Mountain, Camera } from 'lucide-react';

interface CategoryTabProps {
  category: string;
  isActive: boolean;
  onClick: () => void;
}

const CategoryTab: React.FC<CategoryTabProps> = ({ category, isActive, onClick }) => {
  // 根据分类名称获取对应的图标
  const getIcon = (categoryName: string) => {
    if (categoryName.includes('主体') || categoryName.includes('Subject')) {
      return <User className="w-4 h-4" />;
    } else if (categoryName.includes('风格') || categoryName.includes('Style')) {
      return <Palette className="w-4 h-4" />;
    } else if (categoryName.includes('构图') || categoryName.includes('Composition')) {
      return <Layout className="w-4 h-4" />;
    } else if (categoryName.includes('环境') || categoryName.includes('Environment')) {
      return <Mountain className="w-4 h-4" />;
    } else if (categoryName.includes('画质') || categoryName.includes('Image Quality')) {
      return <Camera className="w-4 h-4" />;
    }
    return null;
  };

  return (
    <button
      className={`px-6 py-3 rounded-t-lg font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-2 border ${
        isActive
          ? 'bg-white text-primary-600 border-b-2 border-primary-500 shadow-md border-gray-200'
          : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-gray-200 shadow-sm hover:shadow-md'
      }`}
      onClick={onClick}
    >
      {getIcon(category)}
      {category}
    </button>
  );
};

export default CategoryTab;
