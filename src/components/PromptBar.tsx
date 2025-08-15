import React, { useState } from 'react';
import { Copy, X, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import ExportButton from './ExportButton';

interface PromptBarProps {
  selectedPhrases: string[];
  onPhraseRemove: (phrase: string) => void;
  onClearAll: () => void;
  onCopyAll: () => void;
  customPrompts?: string[];
  onCustomPromptRemove?: (phrase: string) => void;
}

const PromptBar: React.FC<PromptBarProps> = ({
  selectedPhrases,
  onPhraseRemove,
  onClearAll,
  onCopyAll,
  customPrompts = [],
  onCustomPromptRemove
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const handleCopy = () => {
    const promptText = selectedPhrases.join(', ');
    navigator.clipboard.writeText(promptText).then(() => {
      onCopyAll();
    });
  };

  // 根据提示词数量决定是否显示折叠功能
  const shouldShowCollapse = selectedPhrases.length > 6;
  const isExpanded = !isCollapsed || !shouldShowCollapse;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-7xl mx-auto">
        {/* 头部区域 - 始终显示 */}
        <div className="p-3 sm:p-4 pb-2">
          {/* 移动端：垂直布局 */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-gray-800">
                  已选提示词 ({selectedPhrases.length})
                </h3>
                {shouldShowCollapse && (
                  <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    title={isCollapsed ? "展开" : "收起"}
                  >
                    {isCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                )}
              </div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={handleCopy}
                disabled={selectedPhrases.length === 0}
                className="btn-primary flex items-center gap-1 text-xs px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed flex-1"
              >
                <Copy size={14} />
                复制全部
              </button>
              <ExportButton selectedPhrases={selectedPhrases} />
              <button
                onClick={onClearAll}
                disabled={selectedPhrases.length === 0}
                className="btn-secondary flex items-center gap-1 text-xs px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed flex-1"
              >
                <Trash2 size={14} />
                清空全部
              </button>
            </div>
          </div>
          
          {/* 桌面端：水平布局 */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-800">
                已选提示词 ({selectedPhrases.length})
              </h3>
              {shouldShowCollapse && (
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  title={isCollapsed ? "展开" : "收起"}
                >
                  {isCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                disabled={selectedPhrases.length === 0}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Copy size={16} />
                复制全部
              </button>
              <ExportButton selectedPhrases={selectedPhrases} />
              <button
                onClick={onClearAll}
                disabled={selectedPhrases.length === 0}
                className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 size={16} />
                清空全部
              </button>
            </div>
          </div>
        </div>
        
        {/* 提示词列表区域 - 可折叠 */}
        {selectedPhrases.length > 0 && isExpanded && (
          <div className="px-3 sm:px-4 pb-3 sm:pb-4">
            <div className="flex flex-wrap gap-1.5 sm:gap-2 max-h-24 sm:max-h-32 overflow-y-auto">
              {selectedPhrases.map((phrase) => {
                const isCustom = customPrompts.includes(phrase);
                return (
                  <div
                    key={phrase}
                    className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium ${
                      isCustom 
                        ? 'bg-orange-100 text-orange-800 border border-orange-200' 
                        : 'bg-primary-100 text-primary-800'
                    }`}
                  >
                    <span className="truncate max-w-20 sm:max-w-none">{phrase}</span>
                    {isCustom && (
                      <span className="text-xs bg-orange-200 text-orange-700 px-1 rounded hidden sm:inline">自定义</span>
                    )}
                    <button
                      onClick={() => isCustom && onCustomPromptRemove ? onCustomPromptRemove(phrase) : onPhraseRemove(phrase)}
                      className="hover:bg-opacity-80 rounded-full p-0.5 transition-colors flex-shrink-0"
                    >
                      <X size={12} className="sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* 空状态 */}
        {selectedPhrases.length === 0 && (
          <div className="px-3 sm:px-4 pb-3 sm:pb-4">
            <div className="text-gray-500 text-center py-3 sm:py-4 text-sm sm:text-base">
              点击上方词汇按钮来添加提示词
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptBar;
