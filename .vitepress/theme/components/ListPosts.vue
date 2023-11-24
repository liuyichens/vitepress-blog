<script setup name="home">
import PageTemplate from "./PageTemplate.vue";
import ListArticleItem from "./ListArticleItem.vue";
import Pagination from "./Pagination.vue";
import AsideListItem from "./AsideListItem.vue";
import { ref, computed } from "vue";
import { useData } from "vitepress";
import { data as posts } from "../../../utils/posts.data";
import { blogConfig } from "../../../config";
const { params } = useData();
const PAGE_SIZE = blogConfig.pageSize;

const totalPage = Math.ceil(posts.length / PAGE_SIZE);

const currentPage = ref(1);

const tags = computed(() => {
  const allTags = posts
    .filter((p) => p !== "" && p != undefined && p)
    .map((p) => p.tags)
    .flat();
  return [...new Set(allTags)];
});

const categories = computed(() => {
  const categoryObj = {};
  posts.forEach((p) =>
    p.category.forEach((c) => {
      if (Object.keys(categoryObj).includes(c)) {
        categoryObj[c]++;
      } else {
        categoryObj[c] = 1;
      }
    })
  );
  return categoryObj;
});

const currentPosts = computed(() => {
  const { page } = params.value || { page: 1 };
  currentPage.value = page;
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  return posts.slice(start, end);
});
</script>

<template>
  <PageTemplate>
    <template #blogList>
      <ul class="space-y-16">
        <li
          v-for="({ title, url, date, excerpt }, index) in currentPosts"
          class="slide-enter"
          :style="{
            '--enter-state': index,
            '--enter-step': '60ms',
          }"
        >
          <ListArticleItem
            :url="url"
            :title="title"
            :date="date"
            :excerpt="excerpt"
          />
        </li>
      </ul>
    </template>
    <template #paginationWrapper>
      <Pagination :current-page="currentPage" :total-page="totalPage" />
    </template>
    <template #asideList>
      <AsideListItem :title="`分类`" :items="categories" :path="`/category/`" />
      <AsideListItem :title="`标签`" :items="tags" :path="`/tag/`" />
    </template>
  </PageTemplate>
</template>
<style scoped></style>
