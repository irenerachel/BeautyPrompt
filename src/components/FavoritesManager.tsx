import React, { useState } from 'react';
import { Heart, Plus, X, Save, Loader2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface FavoritePrompt {
  id: string;
  name: string;
  phrases: string[];
  createdAt: string;
}

interface FavoritesManagerProps {
  selectedPhrases: string[];
  onLoadFavorite: (phrases: string[]) => void;
}

const FavoritesManager: React.FC<FavoritesManagerProps> = ({
  selectedPhrases,
  onLoadFavorite
}) => {
  const [favorites, setFavorites] = useLocalStorage<FavoritePrompt[]>('favorites', []);
  const [showModal, setShowModal] = useState(false);
  const [newFavoriteName, setNewFavoriteName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveFavorite = async () => {
    if (!newFavoriteName.trim() || selectedPhrases.length === 0) return;

    setIsSaving(true);
    
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 500));

    const newFavorite: FavoritePrompt = {
      id: Date.now().toString(),
      name: newFavoriteName.trim(),
      phrases: [...selectedPhrases],
      createdAt: new Date().toISOString()
    };

    setFavorites(prev => [...prev, newFavorite]);
    setNewFavoriteName('');
    setShowModal(false);
    setIsSaving(false);
  };

  const handleDeleteFavorite = (id: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };

  const handleLoadFavorite = (favorite: FavoritePrompt) => {
    onLoadFavorite(favorite.phrases);
  };

  return (
    <>
      {/* 收藏按钮 */}
      <button
        onClick={() => setShowModal(true)}
        className="btn-secondary flex items-center gap-2"
        disabled={selectedPhrases.length === 0}
      >
        <Heart size={16} />
        收藏组合 ({favorites.length})
      </button>

      {/* 模态框 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">收藏管理</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* 保存新收藏 */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">保存当前组合</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFavoriteName}
                    onChange={(e) => setNewFavoriteName(e.target.value)}
                    placeholder="输入收藏名称..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    disabled={selectedPhrases.length === 0}
                  />
                  <button
                    onClick={handleSaveFavorite}
                    disabled={!newFavoriteName.trim() || selectedPhrases.length === 0 || isSaving}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    保存
                  </button>
                </div>
              </div>

              {/* 收藏列表 */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">已收藏的组合</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {favorites.length === 0 ? (
                    <div className="text-gray-500 text-center py-4">
                      暂无收藏的组合
                    </div>
                  ) : (
                    favorites.map((favorite) => (
                      <div
                        key={favorite.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-800 truncate">
                            {favorite.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {favorite.phrases.length} 个提示词
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(favorite.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleLoadFavorite(favorite)}
                            className="p-1 text-primary-600 hover:bg-primary-100 rounded"
                            title="加载此组合"
                          >
                            <Plus size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteFavorite(favorite.id)}
                            className="p-1 text-red-600 hover:bg-red-100 rounded"
                            title="删除收藏"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FavoritesManager;
