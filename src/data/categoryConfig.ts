// src/data/categoryConfig.ts
// 按“主体 + 场景 + 风格 + 镜头语言 + 氛围词 + 细节修饰”重组的词库分类
import type { MainCategoryConfig, SubCategoryConfig } from '../types';

const sub = (sourceCategory: string, key: string, label: string, fileName: string, nsfw = false): SubCategoryConfig => ({
  key, label, fileName, nsfw, sourceCategory
});

export const mainCategoryConfigs: MainCategoryConfig[] = [
  {
    id: 'subject',
    label: '主体',
    icon: '🎯',
    nsfw: false,
    subCategories: [
      sub('body', 'bodyparts', '身体部位', 'bodyparts', false),
      sub('body', 'ass', '臀部', 'ass', true),
      sub('body', 'breasts', '胸部', 'breasts', false),
      sub('body', 'face', '面部', 'face', false),
      sub('body', 'ears', '耳朵', 'ears', false),
      sub('body', 'eyes', '眼镜', 'eyes', false),
      sub('body', 'eyebrows', '眉毛', 'eyebrows', false),
      sub('body', 'nose', '鼻子', 'nose', false),
      sub('body', 'hair', '头发', 'hair', false),
      sub('body', 'haircolor', '发色', 'haircolor', false),
      sub('body', 'hairstyles', '发型', 'hairstyles', false),
      sub('body', 'hand', '手', 'hand', false),
      sub('body', 'gestures', '手势', 'gestures', false),
      sub('body', 'feet', '脚', 'feet', false),
      sub('body', 'neck', '脚颈部和领饰', 'neck', false),
      sub('body', 'on', '位置', 'on', false),
      sub('body', 'posture', '姿势', 'posture', false),
      sub('body', 'pussy', '阴部', 'pussy', true),
      sub('body', 'penis', '阴茎', 'penis', true),
      sub('body', 'shoulders', '肩膀', 'shoulders', false),
      sub('body', 'skincolor', '肤色', 'skincolor', false),
      sub('body', 'tail', '尾巴', 'tail', false),
      sub('body', 'wings', '翅膀', 'wings', false),
      sub('body', 'injury', '受伤', 'injury', false),
      sub('apparel', 'attire', '服装', 'attire', false),
      sub('apparel', 'dress', '裙子', 'dress', false),
      sub('apparel', 'legwear', '腿部服装', 'legwear', false),
      sub('apparel', 'mask', '面具', 'mask', false),
      sub('apparel', 'sexualattire', '性吸引力', 'sexualattire', true),
      sub('apparel', 'bra', '胸罩', 'bra', false),
      sub('apparel', 'panties', '内裤', 'panties', false),
      sub('apparel', 'sleeves', '袖子', 'sleeves', false),
      sub('apparel', 'swimsuit', '泳装', 'swimsuit', false),
      sub('apparel', 'nudity', '裸露', 'nudity', true),
      sub('sex', 'sexacts', '性行为', 'sexacts', true),
      sub('sex', 'simulatedsexacts', '模拟性行为', 'simulatedsexacts', true),
      sub('sex', 'sexualpositions', '性爱姿势', 'sexualpositions', true),
      sub('sex', 'bdsm', '虐恋和酷刑', 'bdsm', true),
      sub('objects', 'airplanes', '飞机', 'airplanes', false),
      sub('objects', 'armor', '盔甲', 'armor', false),
      sub('objects', 'vehicles', '车辆', 'vehicles', false),
      sub('objects', 'helicopters', '直升机', 'helicopters', false),
      sub('objects', 'ships', '船舶', 'ships', false),
      sub('objects', 'weapons', '武器', 'weapons', false),
      sub('objects', 'sexobjects', '性物品', 'sexobjects', true),
      sub('creatures', 'animals', '动物', 'animals', false),
      sub('creatures', 'birds', '鸟类', 'birds', false),
      sub('creatures', 'cats', '猫', 'cats', false),
      sub('creatures', 'dogs', '狗', 'dogs', false),
      sub('creatures', 'legendary', '传奇生物', 'legendary', false),
      sub('plants', 'plant', '植物', 'plant', false),
      sub('plants', 'tree', '树', 'tree', false),
      sub('plants', 'flowers', '花卉', 'flowers', false),
      sub('realword', 'companies', '公司/品牌', 'companies', false),
      sub('realword', 'jobs', '工作', 'jobs', false),
    ]
  },
  {
    id: 'scene',
    label: '场景',
    icon: '🏞️',
    nsfw: false,
    subCategories: [
      sub('composition', 'backgrounds', '背景', 'backgrounds', false),
      sub('realword', 'holidays', '节日', 'holidays', false),
      sub('realword', 'locations', '地点', 'locations', false),
    ]
  },
  {
    id: 'style',
    label: '风格',
    icon: '🎨',
    nsfw: false,
    subCategories: [
      sub('composition', 'atisticlicense', '艺术许可', 'atisticlicense', false),
      sub('composition', 'fineartparody', '美术模仿', 'fineartparody', false),
      sub('composition', 'patterns', '图案', 'patterns', false),
      sub('composition', 'symbols', '符号', 'symbols', false),
      sub('composition', 'text', '文本', 'text', false),
      sub('composition', 'japanesedialects', '日语方言', 'japanesedialects', false),
      sub('composition', 'yeartags', '年份标签', 'yeartags', false),
      sub('apparel', 'fashionstyle', '时尚风格', 'fashionstyle', false),
    ]
  },
  {
    id: 'camera',
    label: '镜头语言',
    icon: '🎥',
    nsfw: false,
    subCategories: [
      sub('composition', 'imagecomposition', '图像构成', 'imagecomposition', false),
      sub('composition', 'charactercount', '字符数', 'charactercount', false),
    ]
  },
  {
    id: 'mood',
    label: '氛围词',
    icon: '🌙',
    nsfw: false,
    subCategories: [
      sub('composition', 'colors', '颜色', 'colors', false),
    ]
  },
  {
    id: 'detail',
    label: '细节修饰',
    icon: '✨',
    nsfw: false,
    subCategories: [
      sub('composition', 'censorship', '审查制度', 'censorship', false),
      sub('apparel', 'accessories', '配饰', 'accessories', false),
      sub('apparel', 'handwear', '手部穿戴', 'handwear', false),
      sub('apparel', 'headwear', '头饰', 'headwear', false),
      sub('apparel', 'neckwear', '颈部及颈部饰品', 'neckwear', false),
      sub('apparel', 'embellishment', '装饰', 'embellishment', false),
      sub('apparel', 'eyewear', '眼镜', 'eyewear', false),
      sub('apparel', 'makeup', '化妆', 'makeup', false),
      sub('apparel', 'covering', '遮挡', 'covering', false),
      sub('objects', 'audio', '音频', 'audio', false),
      sub('objects', 'cards', '卡片', 'cards', false),
      sub('objects', 'playingcard', '扑克牌', 'playingcard', false),
      sub('objects', 'doors', '门', 'doors', false),
      sub('objects', 'eyewear', '眼镜', 'eyewear', false),
      sub('objects', 'piercings', '穿孔', 'piercings', false),
    ]
  }
]

export const mainButtons = mainCategoryConfigs.map(({ id, label, icon, nsfw }) => ({
  id, label, icon, nsfw
}));
