import { PromptData } from '../types';

// 最小化测试数据
export const promptData: PromptData = {
  "categories": [
    {
      "mainCategory": "主体 (Subject)",
      "subCategories": [
        {
          "name": "人物 (Character)",
          "phrases": [
            "女主角",
            "男主角",
            "Q版角色"
          ]
        }
      ]
    },
    {
      "mainCategory": "场景 (Scene)",
      "subCategories": [
        {
          "name": "环境 (Environment)",
          "phrases": [
            "室内",
            "室外",
            "城市"
          ]
        }
      ]
    },
    {
      "mainCategory": "风格 (Style)",
      "subCategories": [
        {
          "name": "艺术风格 (Art Style)",
          "phrases": [
            "写实",
            "卡通",
            "水彩"
          ]
        }
      ]
    },
    {
      "mainCategory": "情感与氛围 (Emotion & Atmosphere)",
      "subCategories": [
        {
          "name": "情绪 (Mood)",
          "phrases": [
            "开心",
            "悲伤",
            "平静"
          ]
        }
      ]
    },
    {
      "mainCategory": "特效与细节 (Effects & Details)",
      "subCategories": [
        {
          "name": "光影 (Lighting)",
          "phrases": [
            "自然光",
            "人工光",
            "背光"
          ]
        }
      ]
    }
  ]
};
