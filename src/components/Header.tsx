import React, { useState } from 'react';
import { Sparkles, Palette, Camera, Zap } from 'lucide-react';

const Header: React.FC = () => {
  const [showQRCode, setShowQRCode] = useState(false);

  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 sm:py-6">
          {/* 移动端：垂直布局 */}
          <div className="md:hidden">
            <div className="flex items-center justify-center mb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-300" />
                <h1 className="text-xl sm:text-2xl font-bold">AI提示词可视化选择器</h1>
              </div>
            </div>
            
            <div className="flex items-center justify-center mb-3">
              <div className="text-center">
                <div 
                  className="text-xs cursor-pointer hover:text-white transition-colors"
                  onMouseEnter={() => setShowQRCode(true)}
                  onMouseLeave={() => setShowQRCode(false)}
                >
                  <span className="text-primary-100">欢迎关注公众号</span>
                  <span className="text-yellow-300 font-bold text-sm ml-1">@阿真Irene</span>
                </div>
                
                {/* 移动端二维码弹窗 */}
                {showQRCode && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl p-2 z-50 w-40 h-40">
                    <img 
                      src="/images/qrcode.png" 
                      alt="公众号二维码" 
                      className="w-full h-full object-contain rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center hidden">
                      <div className="text-center text-gray-500">
                        <div className="text-xl mb-1">📱</div>
                        <div className="text-xs">二维码图片</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-center text-xs text-primary-100">
              <p>🎨 AI绘图提示词工具，可视化界面快速组合提示词，效率UPUP！</p>
            </div>
          </div>
          
          {/* 桌面端：水平布局 */}
          <div className="hidden md:block">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-8 w-8 text-yellow-300" />
                  <h1 className="text-3xl font-bold">AI提示词可视化选择器</h1>
                </div>
                <div className="flex items-center space-x-6 text-sm text-primary-100">
                  <div className="flex items-center space-x-2">
                    <Palette className="h-4 w-4" />
                    <span>2000+ 精选提示词</span>
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
                  className="text-sm cursor-pointer hover:text-white transition-colors"
                  onMouseEnter={() => setShowQRCode(true)}
                  onMouseLeave={() => setShowQRCode(false)}
                >
                  <span className="text-primary-100">欢迎关注公众号</span>
                  <span className="text-yellow-300 font-bold text-base ml-1">@阿真Irene</span>
                </div>
                
                {/* 桌面端二维码弹窗 */}
                {showQRCode && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl p-2 z-50 w-52 h-52">
                    <img 
                      src="/images/qrcode.png" 
                      alt="公众号二维码" 
                      className="w-full h-full object-contain rounded-lg"
                      onError={(e) => {
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
              <p>🎨 AI绘图提示词工具，可视化界面快速组合提示词，效率UPUP！</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
