<!-- src/components/RightPanel.vue -->
<template>
  <div class="right-panel">
    <div class="search-section" :class="{ 'filters-open': advancedOpen }">
      <div class="search-wrapper">
        <SearchBar
          v-model="searchQuery"
          :loading="store.isSearching"
          @clear="handleClearSearch"
        />
      </div>
      <button
        class="filter-toggle"
        :class="{ active: advancedOpen || activeFilterCount > 0 }"
        type="button"
        title="打开高级筛选"
        @click="advancedOpen = !advancedOpen"
      >
        <span>⚙</span>
        筛选
        <b v-if="activeFilterCount">{{ activeFilterCount }}</b>
      </button>
      <div class="nsfw-wrapper">
        <NSFWToggle v-model="store.showNSFW" />
      </div>

      <div v-if="advancedOpen" class="advanced-filter-panel">
        <div class="filter-panel-heading">
          <div>
            <span class="filter-kicker">ADVANCED FILTERS</span>
            <strong>组合筛选</strong>
          </div>
          <button class="reset-filter" type="button" @click="resetFilters">重置</button>
        </div>

        <div class="filter-fields">
          <label class="filter-field">
            <span>主分类</span>
            <select v-model="store.filterMainCategory">
              <option value="">全部分类</option>
              <option v-for="category in mainCategoryConfigs" :key="category.id" :value="category.id">
                {{ category.icon }} {{ category.label }}
              </option>
            </select>
          </label>

          <label class="filter-field">
            <span>子分类</span>
            <select v-model="store.filterSubCategory" :disabled="!store.filterMainCategory">
              <option value="">全部子分类</option>
              <option v-for="category in availableSubCategories" :key="category.key" :value="category.key">
                {{ category.label }}
              </option>
            </select>
          </label>

          <label class="filter-field">
            <span>标签匹配</span>
            <select v-model="tagMatchMode">
              <option value="all">包含全部关键词</option>
              <option value="any">匹配任一关键词</option>
            </select>
          </label>
        </div>
        <p class="filter-hint">在上方搜索框输入多个中文或英文标签，用空格或逗号分隔。</p>
      </div>
    </div>

    <SubButtonSection class="col-sub-buttons" />
    <SelectedSection class="col-selected" />
    <ActionBar class="action-bar" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { usePromptStore } from "../stores/promptStore";
import { mainCategoryConfigs } from "../data/categoryConfig";
import SubButtonSection from "./SubButtonSection.vue";
import SelectedSection from "./SelectedSection.vue";
import ActionBar from "./ActionBar.vue";
import SearchBar from "./SearchBar.vue";
import NSFWToggle from "./NSFWToggle.vue";
import { getAllPromptItems } from "../data/loader";
import { debounce } from "../utils/debounce";

const store = usePromptStore();
const searchQuery = ref(store.searchQuery);
const advancedOpen = ref(false);
const tagMatchMode = ref<"all" | "any">("all");

const availableSubCategories = computed(() => {
  const category = mainCategoryConfigs.find((item) => item.id === store.filterMainCategory);
  return category?.subCategories ?? [];
});

const activeFilterCount = computed(() =>
  Number(Boolean(searchQuery.value.trim())) +
  Number(Boolean(store.filterMainCategory)) +
  Number(Boolean(store.filterSubCategory))
);

const debouncedSearch = debounce(async (query: string) => {
  const normalizedQuery = query.trim();
  const mainCategory = store.filterMainCategory;
  const subCategory = store.filterSubCategory;

  if (!normalizedQuery && !mainCategory && !subCategory) {
    store.clearSearch();
    return;
  }

  store.setIsSearching(true);
  store.setSearchQuery(query);

  try {
    const allItems = await getAllPromptItems();
    const tokens = normalizedQuery
      .toLowerCase()
      .split(/[\s,，]+/)
      .map((token) => token.trim())
      .filter(Boolean);

    const results = allItems.filter(({ item, category, subCategory: itemSubCategory }) => {
      if (mainCategory && category !== mainCategory) return false;
      if (subCategory && itemSubCategory !== subCategory) return false;
      if (!store.showNSFW && item.nsfw) return false;

      if (tokens.length === 0) return true;
      const searchableText = `${item.chinese} ${item.english}`.toLowerCase();
      return tagMatchMode.value === "all"
        ? tokens.every((token) => searchableText.includes(token))
        : tokens.some((token) => searchableText.includes(token));
    });

    store.setSearchResults(results);
  } catch (error) {
    console.error("高级筛选失败:", error);
    store.setSearchResults([]);
  } finally {
    store.setIsSearching(false);
  }
}, 300);

watch(searchQuery, (newQuery) => {
  debouncedSearch(newQuery);
});

watch(
  [
    () => store.filterMainCategory,
    () => store.filterSubCategory,
    () => store.showNSFW,
    () => tagMatchMode.value,
  ],
  () => {
    if (
      store.filterSubCategory &&
      !availableSubCategories.value.some((category) => category.key === store.filterSubCategory)
    ) {
      store.filterSubCategory = "";
    }
    debouncedSearch(searchQuery.value);
  }
);

watch(
  () => store.searchQuery,
  (value) => {
    if (value !== searchQuery.value) searchQuery.value = value;
  }
);

const handleClearSearch = () => {
  searchQuery.value = "";
  debouncedSearch("");
};

const resetFilters = () => {
  searchQuery.value = "";
  store.clearSearch();
};

if (store.searchQuery || store.filterMainCategory || store.filterSubCategory) {
  debouncedSearch(store.searchQuery);
}
</script>
