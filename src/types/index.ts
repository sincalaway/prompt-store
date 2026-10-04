// src/types/index.ts
export interface PromptItem {
  chinese: string;
  english: string;
  nsfw?: boolean;
}

export interface SelectedItem extends PromptItem {
  category: string;
  subCategory: string;
  weight?: number;
  weightEnabled?: boolean;
}

export interface SubCategoryConfig {
  key: string;
  label: string;
  fileName: string;
  sourceCategory?: string;
  nsfw?: boolean;
  count?: number;
}

export interface MainCategoryConfig {
  id: string;
  label: string;
  icon: string;
  subCategories: SubCategoryConfig[];
  nsfw?: boolean;
}

export interface SearchResult {
  item: PromptItem;
  category: string;
  subCategory: string;
  categoryLabel: string;
  subCategoryLabel: string;
}
