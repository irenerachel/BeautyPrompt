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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">随机选择设置</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* 总数量设置 */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  总选择数量
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={totalCount}
                  onChange={(e) => setTotalCount(Math.max(1, Math.min(30, parseInt(e.target.value) || 1)))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* 分类权重设置 */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  分类权重设置 (权重越高，该分类选择的提示词越多)
                </label>
                {promptData.categories.map((category, index) => (
                  <div key={category.mainCategory} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800 truncate">
                        {category.mainCategory}
                      </div>
                      <div className="text-xs text-gray-500">
                        预计选择: {Math.floor((totalCount * categoryWeights[index]) / categoryWeights.reduce((sum, w) => sum + w, 0))} 个
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <input
                        type="number"
                        min="0"
                        max="5"
                        value={categoryWeights[index]}
                        onChange={(e) => handleWeightChange(index, parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      {index === categoryWeights.length - 1 && (
                        <span className="text-xs text-primary-600 font-medium">推荐</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* 预览 */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-700 mb-2">选择预览:</div>
                <div className="text-xs text-gray-600 space-y-1">
                  {calculateCategoryCounts().map((count, index) => (
                    <div key={index}>
                      {promptData.categories[index].mainCategory}: {count} 个提示词
                    </div>
                  ))}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleRandomSelect}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <Shuffle size={16} />
                  开始随机选择
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RandomPromptSelector;
