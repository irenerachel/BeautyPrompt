import React, { useState } from 'react';
import { Edit3, X, Plus } from 'lucide-react';

interface CustomPromptInputProps {
  customPrompts: string[];
  onCustomPromptsChange: (prompts: string[]) => void;
}

const CustomPromptInput: React.FC<CustomPromptInputProps> = ({
  customPrompts,
  onCustomPromptsChange
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddPrompt = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !customPrompts.includes(trimmedValue)) {
      onCustomPromptsChange([...customPrompts, trimmedValue]);
      setInputValue('');
    }
  };

  const handleRemovePrompt = (index: number) => {
    const newPrompts = customPrompts.filter((_, i) => i !== index);
    onCustomPromptsChange(newPrompts);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddPrompt();
    }
  };

  const suggestions = [
    '美丽的女孩', '帅气男孩', '可爱的小猫', '梦幻场景', '古风建筑',
    '现代都市', '自然风景', '科幻元素', '魔法世界', '童话风格'
  ];

  const handleSuggestionClick = (suggestion: string) => {
    if (!customPrompts.includes(suggestion)) {
      onCustomPromptsChange([...customPrompts, suggestion]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Edit3 className="h-5 w-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-800">自定义提示词</h3>
      </div>

      <div className="space-y-4">
        {/* 输入区域 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            添加自定义提示词
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入您想要的自定义提示词，如：美丽的女孩、梦幻场景等"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <button
              onClick={handleAddPrompt}
              disabled={!inputValue.trim()}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          <p className="text-xs text-gray-500">
            💡 提示：可以填写主语、场景描述、风格要求等，按回车键快速添加
          </p>
        </div>

        {/* 快捷建议 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            快捷建议
          </label>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={customPrompts.includes(suggestion)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* 已添加的自定义提示词 */}
        {customPrompts.length > 0 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              已添加的自定义提示词 ({customPrompts.length})
            </label>
            <div className="flex flex-wrap gap-2">
              {customPrompts.map((prompt, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  <span>{prompt}</span>
                  <button
                    onClick={() => handleRemovePrompt(index)}
                    className="hover:bg-primary-200 rounded-full p-0.5 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomPromptInput;
