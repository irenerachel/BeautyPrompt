import React from 'react';

interface PromptChipProps {
  phrase: string;
  isSelected: boolean;
  onClick: () => void;
}

const PromptChip: React.FC<PromptChipProps> = ({ phrase, isSelected, onClick }) => {
  return (
    <button
      className={`chip ${isSelected ? 'chip-selected' : 'chip-unselected'} animate-fade-in`}
      onClick={onClick}
      title={phrase}
    >
      {phrase}
    </button>
  );
};

export default PromptChip;
