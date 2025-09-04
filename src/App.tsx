import React, { useState, useMemo } from 'react';
import { promptData } from './data/generated-promptData';
import CategoryTab from './components/CategoryTab';
import SubCategoryCard from './components/SubCategoryCard';
import PromptBar from './components/PromptBar';
import SearchBar from './components/SearchBar';
import { CheckCircle } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import FavoritesManager from './components/FavoritesManager';
import Header from './components/Header';
import QuickGuide from './components/QuickGuide';
import CustomPromptInput from './components/CustomPromptInput';
import RandomPromptSelector from './components/RandomPromptSelector';

const App: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useLocalStorage('activeCategoryIndex', 0);
  const [selectedPhrases, setSelectedPhrases] = useLocalStorage('selectedPhrases', new Set<string>());
  const [customPrompts, setCustomPrompts] = useLocalStorage('customPrompts', [] as string[]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  // 过滤搜索结果的函数
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) {
      return promptData.categories;
    }

    return promptData.categories.map(category => ({
      ...category,
      subCategories: category.subCategories.map(subCategory => ({
        ...subCategory,
        phrases: subCategory.phrases.filter(phrase =>
          phrase.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(subCategory => subCategory.phrases.length > 0)
    })).filter(category => category.subCategories.length > 0);
  }, [searchTerm]);

  const activeCategory = filteredCategories[activeCategoryIndex] || filteredCategories[0];

  const handlePhraseToggle = (phrase: string) => {
    const newSelected = new Set(selectedPhrases);
    if (newSelected.has(phrase)) {
      newSelected.delete(phrase);
    } else {
      newSelected.add(phrase);
    }
    setSelectedPhrases(newSelected);
  };

  const handlePhraseRemove = (phrase: string) => {
    const newSelected = new Set(selectedPhrases);
    newSelected.delete(phrase);
    setSelectedPhrases(newSelected);
  };

  const handleCustomPromptRemove = (phrase: string) => {
    setCustomPrompts(customPrompts.filter(p => p !== phrase));
  };

  const handleClearAll = () => {
    setSelectedPhrases(new Set());
    setCustomPrompts([]);
  };

  const handleLoadFavorite = (phrases: string[]) => {
    // 分离自定义提示词和预设提示词
    const allPresetPhrases = new Set<string>();
    promptData.categories.forEach(category => {
      category.subCategories.forEach(subCategory => {
        subCategory.phrases.forEach(phrase => {
          allPresetPhrases.add(phrase);
        });
      });
    });

    const customPrompts = phrases.filter(phrase => !allPresetPhrases.has(phrase));
    const presetPhrases = phrases.filter(phrase => allPresetPhrases.has(phrase));

    setCustomPrompts(customPrompts);
    setSelectedPhrases(new Set(presetPhrases));
  };

  const handleCustomPromptsChange = (prompts: string[]) => {
    setCustomPrompts(prompts);
  };

  const handleRandomSelect = (phrases: string[]) => {
    // 分离自定义提示词和预设提示词
    const allPresetPhrases = new Set<string>();
    promptData.categories.forEach(category => {
      category.subCategories.forEach(subCategory => {
        subCategory.phrases.forEach(phrase => {
          allPresetPhrases.add(phrase);
        });
      });
    });

    const customPrompts = phrases.filter(phrase => !allPresetPhrases.has(phrase));
    const presetPhrases = phrases.filter(phrase => allPresetPhrases.has(phrase));

    setCustomPrompts(customPrompts);
    setSelectedPhrases(new Set(presetPhrases));
  };

  const handleCopyAll = () => {
    setShowCopySuccess(true);
    setTimeout(() => setShowCopySuccess(false), 2000);
  };

  // 排序函数：自定义提示词最前，主体分类第二优先级
  const sortPromptsByCategory = (phrases: string[], customPrompts: string[] = []) => {
    // 获取人物分类的所有提示词
    const characterPhrases = new Set<string>();
    promptData.categories[0]?.subCategories.forEach(subCategory => {
      if (subCategory.name === "人物 (Character)") {
        subCategory.phrases.forEach(phrase => characterPhrases.add(phrase));
      }
    });

    // 分离三类提示词
    const customPromptsInList = phrases.filter(phrase => customPrompts.includes(phrase));
    const characterPrompts = phrases.filter(phrase => characterPhrases.has(phrase) && !customPrompts.includes(phrase));
    const otherPrompts = phrases.filter(phrase => !characterPhrases.has(phrase) && !customPrompts.includes(phrase));

    // 优先级顺序：自定义提示词 > 人物提示词 > 其他提示词
    return [...customPromptsInList, ...characterPrompts, ...otherPrompts];
  };

  const selectedPhrasesArray = Array.from(selectedPhrases);
  const allPromptsArray = sortPromptsByCategory([...customPrompts, ...selectedPhrasesArray], customPrompts);

  return (
    <div className="min-h-screen bg-gray-50 pb-32 sm:pb-48">
      {/* 头部 */}
      <Header />
      
      {/* 工具栏 */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 移动端：垂直布局 */}
          <div className="md:hidden py-3">
            <div className="flex items-center justify-center mb-2">
              <span className="text-sm text-gray-600">
                已选择 <span className="font-semibold text-primary-600">{allPromptsArray.length}</span> 个提示词
              </span>
            </div>
            {customPrompts.length > 0 && (
              <div className="flex items-center justify-center mb-2">
                <span className="text-xs text-gray-500">
                  (自定义: {customPrompts.length}, 预设: {selectedPhrases.size})
                </span>
              </div>
            )}
            <div className="flex items-center justify-center space-x-2">
              <RandomPromptSelector
                promptData={promptData}
                onRandomSelect={handleRandomSelect}
              />
              <FavoritesManager
                selectedPhrases={allPromptsArray}
                onLoadFavorite={handleLoadFavorite}
              />
            </div>
          </div>
          
          {/* 桌面端：水平布局 */}
          <div className="hidden md:flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                已选择 <span className="font-semibold text-primary-600">{allPromptsArray.length}</span> 个提示词
                {customPrompts.length > 0 && (
                  <span className="text-xs text-gray-500 ml-1">
                    (自定义: {customPrompts.length}, 预设: {selectedPhrases.size})
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <RandomPromptSelector
                promptData={promptData}
                onRandomSelect={handleRandomSelect}
              />
              <FavoritesManager
                selectedPhrases={allPromptsArray}
                onLoadFavorite={handleLoadFavorite}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* 自定义提示词输入区域 */}
        <CustomPromptInput 
          customPrompts={customPrompts}
          onCustomPromptsChange={handleCustomPromptsChange}
        />
        
        {/* 搜索栏 */}
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {/* 分类标签 */}
        <div className="mb-4 sm:mb-8">
          <div className="flex overflow-x-auto pb-2 space-x-1">
            {filteredCategories.map((category, index) => (
              <CategoryTab
                key={category.mainCategory}
                category={category.mainCategory}
                isActive={index === activeCategoryIndex}
                onClick={() => setActiveCategoryIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* 内容区域 */}
        {activeCategory ? (
          <div className="space-y-4 sm:space-y-6">
            {activeCategory.subCategories.map((subCategory) => (
              <SubCategoryCard
                key={subCategory.name}
                subCategory={subCategory}
                selectedPhrases={selectedPhrases}
                onPhraseToggle={handlePhraseToggle}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <div className="text-gray-500 text-base sm:text-lg">
              没有找到匹配的提示词
            </div>
          </div>
        )}
      </main>

      {/* 底部提示词栏 */}
      <PromptBar
        selectedPhrases={allPromptsArray}
        onPhraseRemove={handlePhraseRemove}
        onClearAll={handleClearAll}
        onCopyAll={handleCopyAll}
        customPrompts={customPrompts}
        onCustomPromptRemove={handleCustomPromptRemove}
      />

      {/* 复制成功提示 */}
      {showCopySuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in">
          <CheckCircle size={16} />
          已复制到剪贴板
        </div>
      )}

      {/* 快速使用指南 */}
      <QuickGuide />
    </div>
  );
};

export default App;
