import React from 'react';
import { Download } from 'lucide-react';

interface ExportButtonProps {
  selectedPhrases: string[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ selectedPhrases }) => {
  const handleExport = () => {
    if (selectedPhrases.length === 0) return;

    // 生成txt格式的内容
    const exportContent = `AI绘图提示词组合
生成时间: ${new Date().toLocaleString('zh-CN')}
提示词数量: ${selectedPhrases.length}

提示词列表:
${selectedPhrases.map((phrase, index) => `${index + 1}. ${phrase}`).join('\n')}

完整提示词文本:
${selectedPhrases.join(', ')}`;

    const blob = new Blob([exportContent], {
      type: 'text/plain;charset=utf-8'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-prompts-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* 移动端：小按钮 */}
      <button
        onClick={handleExport}
        disabled={selectedPhrases.length === 0}
        className="md:hidden btn-secondary flex items-center gap-1 text-xs px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed flex-1"
        title="导出为txt文件"
      >
        <Download size={14} />
        导出
      </button>
      
      {/* 桌面端：正常按钮 */}
      <button
        onClick={handleExport}
        disabled={selectedPhrases.length === 0}
        className="hidden md:flex btn-secondary items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        title="导出为txt文件"
      >
        <Download size={16} />
        导出txt
      </button>
    </>
  );
};

export default ExportButton;
