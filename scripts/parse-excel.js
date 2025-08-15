const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

try {
  // 读取Excel文件
  console.log('正在读取Excel文件...');
  const workbook = XLSX.readFile('表格文档.xlsx');
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  console.log('工作表名称:', sheetName);

  // 转换为JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  console.log('数据行数:', jsonData.length);
  console.log('前5行数据:');
  jsonData.slice(0, 5).forEach((row, index) => {
    console.log(`第${index + 1}行:`, row);
  });

  // 保存原始数据到文件
  fs.writeFileSync('excel-data.json', JSON.stringify(jsonData, null, 2));
  console.log('\n原始数据已保存到 excel-data.json');

} catch (error) {
  console.error('解析Excel文件时出错:', error.message);
}
