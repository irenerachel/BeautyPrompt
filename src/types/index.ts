export interface SubCategory {
  name: string;
  phrases: string[];
}

export interface MainCategory {
  mainCategory: string;
  subCategories: SubCategory[];
}

export interface PromptData {
  categories: MainCategory[];
}
