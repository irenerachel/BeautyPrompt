import React from 'react';
import { SubCategory } from '../types';
import PromptChip from './PromptChip';

interface SubCategoryCardProps {
  subCategory: SubCategory;
  selectedPhrases: Set<string>;
  onPhraseToggle: (phrase: string) => void;
}

const SubCategoryCard: React.FC<SubCategoryCardProps> = ({
  subCategory,
  selectedPhrases,
  onPhraseToggle
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-slide-up">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
        {subCategory.name}
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
