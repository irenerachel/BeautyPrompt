import React, { useState } from 'react';
import { promptData } from './data/test-promptData';

const TestApp: React.FC = () => {
  const [selectedPhrases, setSelectedPhrases] = useState<string[]>([]);

  const handlePhraseToggle = (phrase: string) => {
    setSelectedPhrases(prev => 
      prev.includes(phrase) 
        ? prev.filter(p => p !== phrase)
        : [...prev, phrase]
    );
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>AI提示词测试应用</h1>
      <p>已选择 {selectedPhrases.length} 个提示词</p>
      
      {promptData.categories.map((category, categoryIndex) => (
        <div key={categoryIndex} style={{ marginBottom: '20px' }}>
          <h2>{category.mainCategory}</h2>
          {category.subCategories.map((subCategory, subIndex) => (
            <div key={subIndex} style={{ marginBottom: '10px' }}>
              <h3>{subCategory.name}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {subCategory.phrases.map((phrase, phraseIndex) => (
                  <button
                    key={phraseIndex}
                    onClick={() => handlePhraseToggle(phrase)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: selectedPhrases.includes(phrase) ? '#3b82f6' : '#e5e7eb',
                      color: selectedPhrases.includes(phrase) ? 'white' : 'black',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    {phrase}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
      
      {selectedPhrases.length > 0 && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f3f4f6', borderRadius: '5px' }}>
          <h3>已选择的提示词：</h3>
          <p>{selectedPhrases.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default TestApp;
