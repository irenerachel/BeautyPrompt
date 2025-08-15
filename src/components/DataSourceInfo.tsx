import React from 'react';
import { Info, FileText, Database, Calendar } from 'lucide-react';

const DataSourceInfo: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-blue-800 mb-2">数据来源说明</h4>
          <div className="text-sm text-blue-700 space-y-2">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>本工具基于Excel表格数据构建，包含1374个精选AI绘图提示词</span>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>数据已按5大分类体系整理：主体、风格、构图、环境、画质</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>支持Excel数据导入，可随时更新和扩展提示词库</span>
            </div>
          </div>
          <div className="mt-3 text-xs text-blue-600">
            💡 提示：如需添加新的提示词，请按照Excel模板格式整理数据，然后使用转换脚本生成新的数据文件
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSourceInfo;
