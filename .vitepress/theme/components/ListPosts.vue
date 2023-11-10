<script setup name="home">
import PageTemplate from "./PageTemplate.vue";
import ListArticleItem from "./ListArticleItem.vue";
import { ref, computed } from "vue";
import { useData, useRouter } from "vitepress";
import { data as posts } from "../../../utils/posts.data";
import { blogConfig } from "../../../config";
const { params } = useData();
const PAGE_SIZE = blogConfig.pageSize;

const totalPage = Math.ceil(posts.length / PAGE_SIZE);

const currentPage = ref(1);

const tags = computed(() => {
  const allTags = posts.map((p) => p.tags).flat();
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

const router = useRouter();
const goPage = (page) => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  router.go(`/blog/${page}`);
};
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
          <ListArticleItem :url="url" :title="title" :date="date" :excerpt="excerpt"/>
        </li>
      </ul>
    </template>
    <template #paginationWrapper>
      <ul class="pages flex">
        <li class="page-pre">
          <button :disabled="currentPage === 1" @click="goPage('')">←</button>
        </li>
        <li
          v-for="(_, index) in totalPage"
          :key="index"
          :class="[
            'page-item',
            `page-item-${index + 1}`,
            index + 1 === currentPage ? 'page-item-active' : '',
          ]"
        >
          <button
            :disabled="currentPage === index + 1"
            @click="goPage(`${index === 0 ? '' : index + 1}`)"
          >
            {{ index + 1 > 10 ? index + 1 : "0" + (index + 1) }}
          </button>
        </li>
        <li class="page-next">
          <button
            :disabled="currentPage === totalPage"
            @click="
              goPage(
                `${currentPage === totalPage ? totalPage : currentPage + 1}`
              )
            "
          >
            →
          </button>
        </li>
      </ul>
    </template>
    <template #asideList>
      <div class="">
        <h5
          class="widgt-title relative mb-8 lg:mb-3 font-semibold text-slate-900 dark:text-slate-200"
        >
          <span class="title relative">分类</span>
        </h5>
        <ul class="space-y-6 lg:space-y-2">
          <li v-for="(count, category, index) in categories" :key="index">
            <a
              class="block pl-1 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 text-sm"
              href=""
            >
              <span class="mx-1">{{ category }}</span
              ><sup class="text-[var(--vp-c-brand-1)]">{{ count }}</sup>
            </a>
          </li>
        </ul>
      </div>
      <div class="">
        <h5
          class="widgt-title relative mb-8 lg:mb-3 font-semibold text-slate-900 dark:text-slate-200"
        >
          <span class="title relative">标签</span>
        </h5>
        <ul class="space-y-6 lg:space-y-2">
          <li v-for="(tag, index) in tags" :key="index">
            <a
              class="block pl-1 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 text-sm"
              href=""
            >
              <span class="mx-1">{{ tag }}</span>
            </a>
          </li>
        </ul>
      </div>
    </template>
  </PageTemplate>
</template>
<style scoped></style>
