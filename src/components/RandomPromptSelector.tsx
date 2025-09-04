import React, { useState } from 'react';
import { Shuffle, Settings, X } from 'lucide-react';
import { PromptData } from '../types';

interface RandomPromptSelectorProps {
  promptData: PromptData;
  onRandomSelect: (phrases: string[]) => void;
}

const RandomPromptSelector: React.FC<RandomPromptSelectorProps> = ({
  promptData,
  onRandomSelect
}) => {
  const [showModal, setShowModal] = useState(false);
  const [totalCount, setTotalCount] = useState(20);
  const [categoryWeights, setCategoryWeights] = useState<number[]>([1, 1, 1, 1, 3]); // 最后一个分类权重为3，确保能获得更多提示词

  // 计算每个分类应该选择的提示词数量
  const calculateCategoryCounts = () => {
    const totalWeight = categoryWeights.reduce((sum, weight) => sum + weight, 0);
    const counts: number[] = [];
    
    // 特殊处理：如果总数为20且最后一个分类权重较高，确保最后一个分类获得约10个
    if (totalCount === 20 && categoryWeights[4] >= 3) {
      counts[4] = 10; // 最后一个分类固定10个
      const remainingCount = totalCount - 10;
      const remainingWeights = categoryWeights.slice(0, 4);
      const remainingTotalWeight = remainingWeights.reduce((sum, weight) => sum + weight, 0);
      
      for (let i = 0; i < 4; i++) {
        const weight = remainingWeights[i];
        const baseCount = Math.floor((remainingCount * weight) / remainingTotalWeight);
        counts[i] = baseCount;
      }
      
      // 处理余数
      const remainder = remainingCount - counts.slice(0, 4).reduce((sum, count) => sum + count, 0);
      for (let i = 0; i < remainder; i++) {
        const maxWeightIndex = remainingWeights.indexOf(Math.max(...remainingWeights));
        counts[maxWeightIndex]++;
      }
    } else {
      // 常规权重分配
      for (let i = 0; i < categoryWeights.length; i++) {
        const weight = categoryWeights[i];
        const baseCount = Math.floor((totalCount * weight) / totalWeight);
        counts.push(baseCount);
      }
      
      // 处理余数，优先分配给权重高的分类
      const remainder = totalCount - counts.reduce((sum, count) => sum + count, 0);
      for (let i = 0; i < remainder; i++) {
        const maxWeightIndex = categoryWeights.indexOf(Math.max(...categoryWeights));
        counts[maxWeightIndex]++;
      }
    }
    
    return counts;
  };

  // 从数组中随机选择指定数量的元素
  const randomSelect = <T,>(array: T[], count: number): T[] => {
    if (count >= array.length) return [...array];
    
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const handleRandomSelect = () => {
    const categoryCounts = calculateCategoryCounts();
    const selectedPhrases: string[] = [];
    
    promptData.categories.forEach((category, categoryIndex) => {
      const targetCount = categoryCounts[categoryIndex] || 0;
      if (targetCount === 0) return;
      
      // 收集该分类下所有子分类的提示词
      const allPhrases: string[] = [];
      category.subCategories.forEach(subCategory => {
        allPhrases.push(...subCategory.phrases);
      });
      
      // 随机选择指定数量的提示词
      const selectedFromCategory = randomSelect(allPhrases, targetCount);
      selectedPhrases.push(...selectedFromCategory);
    });
    
    onRandomSelect(selectedPhrases);
    setShowModal(false);
  };

  const handleQuickRandom = () => {
    // 快速随机选择，使用默认设置：总共20个，最后一个分类10个
    const defaultWeights = [1, 1, 1, 1, 3];
    const counts: number[] = [];
    
    // 最后一个分类固定10个
    counts[4] = 10;
    const remainingCount = 20 - 10;
    const remainingWeights = defaultWeights.slice(0, 4);
    const remainingTotalWeight = remainingWeights.reduce((sum, weight) => sum + weight, 0);
    
    for (let i = 0; i < 4; i++) {
      const weight = remainingWeights[i];
      const baseCount = Math.floor((remainingCount * weight) / remainingTotalWeight);
      counts[i] = baseCount;
    }
    
    // 处理余数
    const remainder = remainingCount - counts.slice(0, 4).reduce((sum, count) => sum + count, 0);
    for (let i = 0; i < remainder; i++) {
      const maxWeightIndex = remainingWeights.indexOf(Math.max(...remainingWeights));
      counts[maxWeightIndex]++;
    }
    
    const selectedPhrases: string[] = [];
    
    promptData.categories.forEach((category, categoryIndex) => {
      const targetCount = counts[categoryIndex] || 0;
      if (targetCount === 0) return;
      
      const allPhrases: string[] = [];
      category.subCategories.forEach(subCategory => {
        allPhrases.push(...subCategory.phrases);
      });
      
      const selectedFromCategory = randomSelect(allPhrases, targetCount);
      selectedPhrases.push(...selectedFromCategory);
    });
    
    onRandomSelect(selectedPhrases);
  };

  const handleWeightChange = (index: number, value: number) => {
    const newWeights = [...categoryWeights];
    newWeights[index] = Math.max(0, Math.min(5, value)); // 限制在0-5之间
    setCategoryWeights(newWeights);
  };

  return (
    <>
      {/* 快速随机按钮 */}
      <button
        onClick={handleQuickRandom}
        className="btn-primary flex items-center gap-2"
        title="快速随机选择20个提示词"
      >
        <Shuffle size={16} />
        随机选择
      </button>

      {/* 高级随机按钮 */}
      <button
        onClick={() => setShowModal(true)}
        className="btn-secondary flex items-center gap-2"
        title="自定义随机选择设置"
      >
        <Settings size={16} />
        高级随机
      </button>

      {/* 随机选择设置模态框 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] sm:max-h-[80vh] overflow-hidden flex flex-col">
            {/* 固定头部 */}
            <div className="flex items-center justify-between p-2 sm:p-4 border-b flex-shrink-0">
              <h3 className="text-sm sm:text-lg font-semibold">随机选择设置</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* 可滚动内容区域 */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-4 min-h-0">
              {/* 总数量设置 */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  总选择数量
                </label>
                <div className="flex items-center justify-center space-x-3">
                  <button
                    onClick={() => setTotalCount(Math.max(1, totalCount - 1))}
                    disabled={totalCount <= 1}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    −
                  </button>
                  <div className="flex items-center justify-center w-16 h-8 bg-gray-100 rounded-lg text-sm font-medium">
                    {totalCount}
                  </div>
                  <button
                    onClick={() => setTotalCount(Math.min(30, totalCount + 1))}
                    disabled={totalCount >= 30}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 分类权重设置 */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  分类权重设置
                </label>
                <div className="text-xs text-gray-500 mb-2">
                  权重越高，该分类选择的提示词越多
                </div>
                {promptData.categories.map((category, index) => (
                  <div key={category.mainCategory} className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-sm font-medium text-gray-800 truncate">
                          {category.mainCategory}
                        </div>
                        <div className="text-xs text-gray-500">
                          预计: {Math.floor((totalCount * categoryWeights[index]) / categoryWeights.reduce((sum, w) => sum + w, 0))} 个
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        <button
                          onClick={() => handleWeightChange(index, Math.max(0, categoryWeights[index] - 1))}
                          disabled={categoryWeights[index] <= 0}
                          className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          −
                        </button>
                        <div className="flex items-center justify-center w-8 h-6 bg-white border border-gray-300 rounded text-xs font-medium">
                          {categoryWeights[index]}
                        </div>
                        <button
                          onClick={() => handleWeightChange(index, Math.min(5, categoryWeights[index] + 1))}
                          disabled={categoryWeights[index] >= 5}
                          className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          +
                        </button>
                        {index === categoryWeights.length - 1 && (
                          <span className="text-xs text-primary-600 font-medium ml-1 hidden sm:inline">推荐</span>
                        )}
                      </div>
                    </div>
                    {index === categoryWeights.length - 1 && (
                      <div className="text-xs text-primary-600 font-medium sm:hidden">
                        推荐设置
                      </div>
                    )}
                  </div>
                ))}
              </div>


            </div>

            {/* 固定底部操作按钮 */}
            <div className="flex gap-2 sm:gap-3 p-2 sm:p-4 border-t bg-gray-50 flex-shrink-0">
              <button
                onClick={handleRandomSelect}
                className="flex-1 btn-primary flex items-center justify-center gap-1 sm:gap-2 text-sm py-3 sm:py-2"
              >
                <Shuffle size={16} />
                <span className="hidden sm:inline">开始随机选择</span>
                <span className="sm:hidden">随机选择</span>
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-3 sm:px-4 py-3 sm:py-2 text-gray-600 hover:text-gray-800 text-sm"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RandomPromptSelector;

