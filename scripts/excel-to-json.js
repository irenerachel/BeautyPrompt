#!/usr/bin/env node

/**
 * Excel转JSON工具脚本
 * 将Excel表格数据转换为AI提示词选择器所需的JSON格式
 * 
 * 使用方法：
 * 1. 安装依赖：npm install xlsx
 * 2. 运行脚本：node scripts/excel-to-json.js <excel文件路径>
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// 检查命令行参数
if (process.argv.length < 3) {
  console.log('使用方法: node excel-to-json.js <excel文件路径>');
  console.log('示例: node excel-to-json.js ./data/prompts.xlsx');
  process.exit(1);
}

const excelFilePath = process.argv[2];

// 检查文件是否存在
if (!fs.existsSync(excelFilePath)) {
  console.error(`错误: 文件 ${excelFilePath} 不存在`);
  process.exit(1);
}

try {
  // 读取Excel文件
  console.log(`正在读取Excel文件: ${excelFilePath}`);
  const workbook = XLSX.readFile(excelFilePath);
  
  // 获取第一个工作表
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  // 将工作表转换为JSON
  const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
  console.log(`成功读取工作表: ${sheetName}`);
  console.log(`数据行数: ${rawData.length}`);
  
  // 处理数据
  const processedData = processExcelData(rawData);
  
  // 生成输出文件路径
  const outputPath = path.join(__dirname, '../src/data/generated-promptData.ts');
  
  // 生成TypeScript文件内容
  const tsContent = generateTypeScriptFile(processedData);
  
  // 写入文件
  fs.writeFileSync(outputPath, tsContent, 'utf8');
  
  console.log(`✅ 转换完成！`);
  console.log(`输出文件: ${outputPath}`);
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
  
} catch (error) {
  console.error('转换过程中发生错误:', error.message);
  process.exit(1);
}

/**
 * 处理Excel数据
 * @param {Array} rawData - 原始Excel数据
 * @returns {Object} 处理后的数据
 */
function processExcelData(rawData) {
  const categories = {};
  
  // 跳过表头行（如果有的话）
  const dataRows = rawData.slice(1);
  
  dataRows.forEach((row, index) => {
    if (!row || row.length < 3) {
      console.warn(`警告: 第${index + 2}行数据不完整，已跳过`);
      return;
    }
    
    const mainCategory = row[0]?.toString().trim();
    const subCategory = row[1]?.toString().trim();
    const phrases = row[2]?.toString().trim();
    
    if (!mainCategory || !subCategory || !phrases) {
      console.warn(`警告: 第${index + 2}行数据缺失，已跳过`);
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
    if (!categories[mainCategory]) {
      categories[mainCategory] = {};
    }
    
    if (!categories[mainCategory][subCategory]) {
      categories[mainCategory][subCategory] = new Set();
    }
    
    // 添加提示词到Set中（自动去重）
    phraseArray.forEach(phrase => {
      categories[mainCategory][subCategory].add(phrase);
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

/**
 * 生成TypeScript文件内容
 * @param {Object} data - 处理后的数据
 * @returns {string} TypeScript文件内容
 */
function generateTypeScriptFile(data) {
  const dataString = JSON.stringify(data, null, 2);
  
  return `import { PromptData } from '../types';

// 此文件由Excel转JSON工具自动生成
// 生成时间: ${new Date().toLocaleString('zh-CN')}
export const promptData: PromptData = ${dataString};
`;
}

console.log('📝 Excel转JSON工具');
console.log('将Excel表格数据转换为AI提示词选择器所需的JSON格式');
console.log('');
