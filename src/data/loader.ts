// src/data/loader.ts
import type { PromptItem } from '../types';
import { mainCategoryConfigs } from './categoryConfig';

// 动态导入所有提示词数据
const promptDataCache: Record<string, PromptItem[]> = {};

const getSourceCategory = (category: string, subCategory: string) => {
  const config = mainCategoryConfigs.find((item) => item.id === category);
  const subConfig = config?.subCategories.find((item) => item.key === subCategory);
  return subConfig?.sourceCategory || category;
};

// 加载指定公式分类下的提示词数据；sourceCategory 用于兼容原有 data 目录
export async function loadPromptItems(category: string, subCategory: string): Promise<PromptItem[]> {
  const sourceCategory = getSourceCategory(category, subCategory);
  const cacheKey = `${sourceCategory}/${subCategory}`;

  if (promptDataCache[cacheKey]) {
    return promptDataCache[cacheKey];
  }

  try {
    const module = await import(`./${sourceCategory}/${subCategory}.ts`);
    const items = module.items || [];
    promptDataCache[cacheKey] = items;
    return items;
  } catch (error) {
    console.error(`加载提示词失败：${sourceCategory}/${subCategory}`, error);
    return [];
  }
}

// 预加载所有提示词数据并统计数量
export async function preloadAllPromptItems() {
  const promises: Promise<void>[] = [];

  for (const mainConfig of mainCategoryConfigs) {
    for (const subConfig of mainConfig.subCategories) {
      promises.push(
        loadPromptItems(mainConfig.id, subConfig.key).then((items) => {
          subConfig.count = items.length;
        })
      );
    }
  }

  await Promise.all(promises);
}

// 获取单个分类的提示词数量
export async function getPromptCount(category: string, fileName: string): Promise<number> {
  return (await loadPromptItems(category, fileName)).length;
}

// 获取所有分类的统计数（总数量和 NSFW 数量）
export async function getCategoryCounts(): Promise<Record<string, { total: number; nonNSFW: number }>> {
  const counts: Record<string, { total: number; nonNSFW: number }> = {};

  for (const mainConfig of mainCategoryConfigs) {
    let total = 0;
    let nonNSFW = 0;

    for (const subConfig of mainConfig.subCategories) {
      const items = await loadPromptItems(mainConfig.id, subConfig.key);
      total += items.length;
      nonNSFW += items.filter((item) => !item.nsfw).length;
    }

    counts[mainConfig.id] = { total, nonNSFW };
  }

  return counts;
}

// 获取所有提示词（用于搜索）
export async function getAllPromptItems(): Promise<Array<{
  item: PromptItem;
  category: string;
  subCategory: string;
  categoryLabel: string;
  subCategoryLabel: string;
}>> {
  const loadPromises = mainCategoryConfigs.flatMap((mainConfig) =>
    mainConfig.subCategories.map(async (subConfig) => {
      const items = await loadPromptItems(mainConfig.id, subConfig.key);
      return items.map((item) => ({
        item,
        category: mainConfig.id,
        subCategory: subConfig.key,
        categoryLabel: mainConfig.label,
        subCategoryLabel: subConfig.label,
      }));
    })
  );

  const nestedResults = await Promise.all(loadPromises);
  return nestedResults.flat();
}
