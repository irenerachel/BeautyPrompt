import React from 'react'
import ReactDOM from 'react-dom/client'
import TestApp from './TestApp.tsx'
import './index.css'

try {
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(
    <React.StrictMode>
      <TestApp />
    </React.StrictMode>
  );
} catch (error) {
  console.error('React渲染错误:', error);
  document.getElementById('root')!.innerHTML = `
    <div style="padding: 20px; color: red; font-family: Arial, sans-serif;">
      <h1>应用加载错误</h1>
      <p>错误信息: ${error.message}</p>
      <p>请检查浏览器控制台获取更多信息。</p>
    </div>
  `;
}
