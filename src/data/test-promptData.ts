import { PromptData } from '../types';

export const promptData: PromptData = {
  categories: [
    {
      mainCategory: "主体 (Subject)",
      subCategories: [
        {
          name: "人物 (Character)",
          phrases: ["Q版古典女神", "BJD人偶", "女主角", "强势富家女", "可爱萝莉", "成熟御姐", "温柔少女", "冷酷女王"]
        },
        {
          name: "外貌与特征 (Appearance & Features)",
          phrases: ["丹凤眼", "乌黑秀发", "亮粉色唇彩", "白皙肌肤", "红润脸颊", "长睫毛", "高挺鼻梁", "樱桃小嘴"]
        },
        {
          name: "服装 (Clothing)",
          phrases: ["古典汉服", "现代连衣裙", "校服", "职业装", "休闲装", "礼服", "运动装", "睡衣"]
        }
      ]
    },
    {
      mainCategory: "场景 (Scene)",
      subCategories: [
        {
          name: "室内场景 (Indoor)",
          phrases: ["温馨卧室", "豪华客厅", "书房", "厨房", "浴室", "办公室", "咖啡厅", "图书馆"]
        },
        {
          name: "室外场景 (Outdoor)",
          phrases: ["美丽花园", "海边沙滩", "城市街道", "森林小径", "山顶风景", "湖边", "公园", "校园"]
        }
      ]
    },
    {
      mainCategory: "风格 (Style)",
      subCategories: [
        {
          name: "艺术风格 (Art Style)",
          phrases: ["写实风格", "动漫风格", "油画风格", "水彩画", "素描", "插画风格", "像素艺术", "抽象艺术"]
        }
      ]
    },
    {
      mainCategory: "情感与氛围 (Emotion & Atmosphere)",
      subCategories: [
        {
          name: "情感表达 (Emotion)",
          phrases: ["开心笑容", "忧郁眼神", "温柔表情", "自信姿态", "害羞脸红", "愤怒表情", "悲伤情绪", "神秘微笑"]
        }
      ]
    },
    {
      mainCategory: "特效与细节 (Effects & Details)",
      subCategories: [
        {
          name: "光影效果 (Lighting)",
          phrases: ["逆光", "侧光", "顶光", "柔光", "强光", "阴影", "光晕", "光束"]
        },
        {
          name: "材质与质感 (Texture)",
          phrases: ["丝绸质感", "金属光泽", "毛绒质感", "玻璃透明", "木质纹理", "皮革质感", "陶瓷光滑", "布料柔软"]
        }
      ]
    }
  ]
};
