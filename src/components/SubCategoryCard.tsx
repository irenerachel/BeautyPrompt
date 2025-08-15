import React from 'react';
import { SubCategory } from '../types';
import PromptChip from './PromptChip';

interface SubCategoryCardProps {
  subCategory: SubCategory;
  selectedPhrases: Set<string>;
  onPhraseToggle: (phrase: string) => void;
  isActive?: boolean;
}

const SubCategoryCard: React.FC<SubCategoryCardProps> = ({
  subCategory,
  selectedPhrases,
  onPhraseToggle,
  isActive = true
}) => {
  const cardId = `subcategory-${subCategory.name.replace(/[^\w\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`;
  
  return (
    <div 
      id={cardId}
      className={`
        bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all duration-500
        ${isActive 
          ? 'animate-slide-up opacity-100 transform translate-y-0' 
          : 'opacity-50 transform translate-y-4'
        }
        ${isActive ? 'ring-2 ring-purple-200' : ''}
      `}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <span className={`w-2 h-2 rounded-full mr-2 transition-colors duration-300 ${
          isActive ? 'bg-purple-500' : 'bg-gray-300'
        }`}></span>
        {subCategory.name}
        {isActive && (
          <span className="ml-2 text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full animate-pulse">
            当前
          </span>
        )}
      </h3>
      <div className="flex flex-wrap gap-2">
        {subCategory.phrases.map((phrase) => (
          <PromptChip
            key={phrase}
            phrase={phrase}
            isSelected={selectedPhrases.has(phrase)}
            onClick={() => onPhraseToggle(phrase)}
          />
        ))}
      </div>
    </div>
  );
};

export default SubCategoryCard;
