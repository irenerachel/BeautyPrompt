import React, { useState } from 'react';
import { Sparkles, Palette, Camera, Zap } from 'lucide-react';

const Header: React.FC = () => {
  const [showQRCode, setShowQRCode] = useState(false);

  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-8 w-8 text-yellow-300" />
                <h1 className="text-3xl font-bold">AI提示词可视化选择器</h1>
              </div>
              <div className="hidden md:flex items-center space-x-6 text-sm text-primary-100">
                <div className="flex items-center space-x-2">
                  <Palette className="h-4 w-4" />
                  <span>1374+ 精选提示词</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Camera className="h-4 w-4" />
                  <span>5大分类体系</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>一键组合生成</span>
                </div>
              </div>
            </div>
            
            <div className="text-right relative">
              <div 
                className="text-sm text-primary-100 cursor-pointer hover:text-white transition-colors"
                onMouseEnter={() => setShowQRCode(true)}
                onMouseLeave={() => setShowQRCode(false)}
              >
                欢迎关注公众号@阿真Irene
              </div>
              
              {/* 二维码弹窗 */}
              {showQRCode && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl p-2 z-50 w-52 h-52">
                  <img 
                    src="/images/qrcode.png" 
                    alt="公众号二维码" 
                    className="w-full h-full object-contain rounded-lg"
                    onError={(e) => {
                      // 如果图片加载失败，显示占位符
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center hidden">
                    <div className="text-center text-gray-500">
                      <div className="text-2xl mb-2">📱</div>
                      <div className="text-sm">二维码图片</div>
                      <div className="text-xs mt-1">请将二维码图片放在 public/images/qrcode.png</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 text-sm text-primary-100">
            <p>🎨 专为AI绘图设计的提示词管理工具，通过可视化界面快速组合和管理提示词，提升创作效率</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
