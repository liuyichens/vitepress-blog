<template>
  <PageTemplate>
    <template #blogList>
      <ul>
      <li v-for="(yearPost, index) in archives" :key="yearPost.year">
        <div class="select-none relative h-20 pointer-events-none slide-enter"
        :style="{
          '--enter-stage': index - 2,
          '--enter-step': '60ms'
        }">
        <span class="text-[8em] text-transparent absolute -left-12 -top-8 font-bold text-stroke-2 text-stroke-[#aaa] opacity-10">
          {{ yearPost.year }}
        </span>
        </div>
        <div class="slide-enter py-4" :style="{
          '--enter-stage': index,
          '--enter-step': '60ms'
        }" v-for="(post, pIndex) in yearPost.posts">
          <div class="flex items-center gap-4">
            <div class="min-w-[130px]">
              <span class="text-base leading-6 font-medium text-gray-500 dark:text-gray-300">
                <time :datetime="post.date.time">{{ post.date.string }}</time>
              </span>
            </div>
            <a :href="post.url" class="text-slate-900 hover:text-[var(--vp-c-brand-1)] transition-colors dark:text-white break-all">{{ post.title }}</a>
          </div>
        </div>
      </li>
    </ul>
    </template>
    </PageTemplate>
</template>
<script setup>
import PageTemplate from "./PageTemplate.vue";
import {useArchives} from '../composables/useArchives'
const archives = useArchives()

</script>
<style lang="less" scoped>
  
</style>