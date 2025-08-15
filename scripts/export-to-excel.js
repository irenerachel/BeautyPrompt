const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// 读取生成的promptData
const promptDataPath = path.join(__dirname, '../src/data/generated-promptData.ts');
const promptDataContent = fs.readFileSync(promptDataPath, 'utf8');

// 提取数据部分（去掉import和export语句）
const dataMatch = promptDataContent.match(/export const promptData: PromptData = ({[\s\S]*});/);
if (!dataMatch) {
  console.error('无法解析promptData文件');
  process.exit(1);
}

// 将TypeScript对象转换为JavaScript对象
const dataString = dataMatch[1];
const promptData = eval('(' + dataString + ')');

// 创建工作簿
const workbook = XLSX.utils.book_new();

// 为每个主分类创建一个工作表
promptData.categories.forEach((mainCategory, mainIndex) => {
  const worksheetData = [];
  
  // 添加表头
  worksheetData.push(['主分类', '子分类', '提示词']);
  
  // 添加数据
  mainCategory.subCategories.forEach((subCategory) => {
    subCategory.phrases.forEach((phrase) => {
      worksheetData.push([
        mainCategory.mainCategory,
        subCategory.name,
        phrase
      ]);
    });
  });
  
  // 创建工作表
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  
  // 设置列宽
  worksheet['!cols'] = [
    { width: 20 }, // 主分类
    { width: 25 }, // 子分类
    { width: 40 }  // 提示词
  ];
  
  // 添加工作表到工作簿
  const sheetName = `分类${mainIndex + 1}_${mainCategory.mainCategory.replace(/[^\w\s]/g, '').substring(0, 20)}`;
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
});

// 创建一个汇总工作表
const summaryData = [];
summaryData.push(['主分类', '子分类', '提示词数量', '提示词列表']);

promptData.categories.forEach((mainCategory) => {
  mainCategory.subCategories.forEach((subCategory) => {
    summaryData.push([
      mainCategory.mainCategory,
      subCategory.name,
      subCategory.phrases.length,
      subCategory.phrases.join(', ')
    ]);
  });
});

const summaryWorksheet = XLSX.utils.aoa_to_sheet(summaryData);
summaryWorksheet['!cols'] = [
  { width: 20 }, // 主分类
  { width: 25 }, // 子分类
  { width: 15 }, // 提示词数量
  { width: 100 } // 提示词列表
];

XLSX.utils.book_append_sheet(workbook, summaryWorksheet, '汇总');

// 保存文件
const outputPath = path.join(__dirname, '../prompt-database.xlsx');
XLSX.writeFile(workbook, outputPath);

console.log(`✅ 数据库已成功导出到: ${outputPath}`);
console.log(`📊 包含 ${promptData.categories.length} 个主分类`);
console.log(`📋 包含 ${promptData.categories.reduce((total, cat) => total + cat.subCategories.length, 0)} 个子分类`);
console.log(`📝 包含 ${promptData.categories.reduce((total, cat) => total + cat.subCategories.reduce((subTotal, subCat) => subTotal + subCat.phrases.length, 0), 0)} 个提示词`);
