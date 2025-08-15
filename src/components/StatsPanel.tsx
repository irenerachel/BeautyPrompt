import React from 'react';
import { BarChart3, Tag, Layers, Clock } from 'lucide-react';
import { promptData } from '../data/generated-promptData';

interface StatsPanelProps {
  selectedPhrases: string[];
}

const StatsPanel: React.FC<StatsPanelProps> = ({ selectedPhrases }) => {
  // 计算统计数据
  const stats = React.useMemo(() => {
    let totalCategories = 0;
    let totalSubCategories = 0;
    let totalPhrases = 0;

    promptData.categories.forEach(category => {
      totalCategories++;
      totalSubCategories += category.subCategories.length;
      category.subCategories.forEach(subCategory => {
        totalPhrases += subCategory.phrases.length;
      });
    });

    return {
      totalCategories,
      totalSubCategories,
      totalPhrases,
      selectedCount: selectedPhrases.length,
      selectionRate: totalPhrases > 0 ? ((selectedPhrases.length / totalPhrases) * 100).toFixed(1) : '0'
    };
  }, [selectedPhrases]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <BarChart3 size={20} />
        统计信息
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
            <Layers size={24} className="text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{stats.totalCategories}</div>
          <div className="text-sm text-gray-500">主要分类</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
            <Tag size={24} className="text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{stats.totalSubCategories}</div>
          <div className="text-sm text-gray-500">子分类</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2">
            <BarChart3 size={24} className="text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{stats.totalPhrases}</div>
          <div className="text-sm text-gray-500">总提示词</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-2">
            <Clock size={24} className="text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{stats.selectedCount}</div>
          <div className="text-sm text-gray-500">已选择 ({stats.selectionRate}%)</div>
        </div>
      </div>
      
      {selectedPhrases.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <strong>当前选择:</strong> {selectedPhrases.join(', ')}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPanel;
