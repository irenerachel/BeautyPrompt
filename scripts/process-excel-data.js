const fs = require('fs');

// 读取Excel数据
const excelData = JSON.parse(fs.readFileSync('excel-data.json', 'utf8'));

// 处理数据
function processExcelData(rawData) {
  const categories = {};
  
  // 跳过表头行
  const dataRows = rawData.slice(1);
  
  dataRows.forEach((row, index) => {
    if (!row || row.length < 3) {
      console.warn(`警告: 第${index + 2}行数据不完整，已跳过`);
      return;
    }
    
    const mainCategory = row[0]?.toString().trim();
    const subCategory = row[1]?.toString().trim();
    const phrases = row[2]?.toString().trim();
    
    if (!subCategory || !phrases) {
      console.warn(`警告: 第${index + 2}行数据缺失，已跳过`);
      return;
    }
    
    // 如果主要分类为空，使用前一个主要分类
    const currentMainCategory = mainCategory || Object.keys(categories)[Object.keys(categories).length - 1];
    
    if (!currentMainCategory) {
      console.warn(`警告: 第${index + 2}行没有主要分类，已跳过`);
      return;
    }
    
    // 处理提示词字符串，分割并去重
    const phraseArray = phrases
      .split(',')
      .map(phrase => phrase.trim())
      .filter(phrase => phrase.length > 0);
    
    if (phraseArray.length === 0) {
      console.warn(`警告: 第${index + 2}行没有有效提示词，已跳过`);
      return;
    }
    
    // 构建数据结构
    if (!categories[currentMainCategory]) {
      categories[currentMainCategory] = {};
    }
    
    if (!categories[currentMainCategory][subCategory]) {
      categories[currentMainCategory][subCategory] = new Set();
    }
    
    // 添加提示词到Set中（自动去重）
    phraseArray.forEach(phrase => {
      categories[currentMainCategory][subCategory].add(phrase);
    });
  });
  
  // 转换为最终格式
  const result = {
    categories: Object.entries(categories).map(([mainCategory, subCategoriesObj]) => ({
      mainCategory,
      subCategories: Object.entries(subCategoriesObj).map(([subCategoryName, phrasesSet]) => ({
        name: subCategoryName,
        phrases: Array.from(phrasesSet)
      }))
    }))
  };
  
  return result;
}

// 处理数据
const processedData = processExcelData(excelData);

// 生成TypeScript文件内容
const tsContent = `import { PromptData } from '../types';

// 此文件由Excel转JSON工具自动生成
// 生成时间: ${new Date().toLocaleString('zh-CN')}
export const promptData: PromptData = ${JSON.stringify(processedData, null, 2)};
`;

// 写入文件
fs.writeFileSync('src/data/generated-promptData.ts', tsContent, 'utf8');

console.log('✅ 数据处理完成！');
console.log('输出文件: src/data/generated-promptData.ts');
console.log(`主要分类数量: ${processedData.categories.length}`);

// 显示统计信息
let totalSubCategories = 0;
let totalPhrases = 0;

processedData.categories.forEach(category => {
  totalSubCategories += category.subCategories.length;
  category.subCategories.forEach(subCategory => {
    totalPhrases += subCategory.phrases.length;
  });
});

console.log(`子分类数量: ${totalSubCategories}`);
console.log(`提示词总数: ${totalPhrases}`);

// 显示分类详情
console.log('\n📊 分类详情:');
processedData.categories.forEach(category => {
  console.log(`\n${category.mainCategory}:`);
  category.subCategories.forEach(subCategory => {
    console.log(`  - ${subCategory.name}: ${subCategory.phrases.length} 个提示词`);
  });
});
