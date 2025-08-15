import React, { useState } from 'react';
import { HelpCircle, X, MousePointer, Search, Copy, Heart, Download, Edit3 } from 'lucide-react';

const QuickGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      icon: <Edit3 className="h-5 w-5" />,
      title: "添加自定义提示词",
      description: "在页面顶部添加您自己的提示词，如主语、场景描述等"
    },
    {
      icon: <MousePointer className="h-5 w-5" />,
      title: "点击选择提示词",
      description: "浏览分类标签，点击词汇按钮将其添加到已选列表"
    },
    {
      icon: <Search className="h-5 w-5" />,
      title: "搜索快速定位",
      description: "使用搜索框快速查找所需的提示词"
    },
    {
      icon: <Copy className="h-5 w-5" />,
      title: "一键复制组合",
      description: "点击底部'复制全部'按钮，将所有选中的提示词复制到剪贴板"
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: "收藏常用组合",
      description: "保存常用的提示词组合，下次直接加载使用"
    },
    {
      icon: <Download className="h-5 w-5" />,
      title: "导出txt文件",
              description: "将选择的提示词导出为txt格式，方便在其他工具中使用"
    }
  ];

  return (
    <>
      {/* 帮助按钮 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-full shadow-lg z-40 transition-colors"
        title="使用指南"
      >
        <HelpCircle size={20} />
      </button>

      {/* 模态框 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">快速使用指南</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="text-sm text-gray-600">
                <p>本工具包含 <strong>1374个精选提示词</strong>，分为 <strong>5大分类</strong>，帮助您快速组合AI绘图提示词。</p>
              </div>

              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{step.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">💡 小贴士</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 提示词会自动保存到本地，刷新页面不会丢失</li>
                  <li>• 可以收藏多个常用组合，方便重复使用</li>
                  <li>• 支持实时搜索，快速定位所需提示词</li>
                  <li>• 导出的JSON文件可在其他AI工具中使用</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickGuide;
