import React from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';

interface SubCategoryNavigationProps {
  subCategories: Array<{ name: string; id: string }>;
  activeSubCategory: string;
  onSubCategoryChange: (id: string) => void;
}

const SubCategoryNavigation: React.FC<SubCategoryNavigationProps> = ({
  subCategories,
  activeSubCategory,
  onSubCategoryChange
}) => {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-6 border border-purple-100">
      <div className="flex items-center mb-3">
        <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">快速导航</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {subCategories.map((subCategory) => (
          <button
            key={subCategory.id}
            onClick={() => onSubCategoryChange(subCategory.id)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105
              ${activeSubCategory === subCategory.id
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-200'
                : 'bg-white text-gray-700 border border-purple-200 hover:bg-purple-50 hover:border-purple-300'
              }
            `}
          >
            <div className="flex items-center">
              <span>{subCategory.name}</span>
              {activeSubCategory === subCategory.id && (
                <ChevronRight className="h-4 w-4 ml-1 animate-pulse" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryNavigation;
