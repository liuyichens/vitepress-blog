<template>
  <article class="relative group article-item">
    <div class="realtive pr-8">
      <h3
        class="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-200"
      >
        <a :href="url">
          {{ title }}
        </a>
      </h3>
      <div class="whitespace-nowrap text-sm leading-6 dark:text-slate-400">
        {{ date.string }}
      </div>
      <div
        class="mt-2 mb-4 prose prose-slate prose-a:relative prose-a:z-10 dark:prose-invert max-w-none line-clamp-2"
        v-html="excerpt"
      ></div>
    </div>
    <a
      class="flex items-center text-sm text-[--vp-c-brand-1] font-medium"
      :href="url"
    >
      <span class="relative">阅读全文</span>
      <svg
        class="relative mt-px overflow-visible ml-2.5 text-[--vp-c-brand-1]"
        width="3"
        height="6"
        viewBox="0 0 3 6"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M0 0L3 3L0 6"></path>
      </svg>
    </a>
  </article>
</template>
<script setup>
defineProps({
  url: String,
  title: String,
  date: Object,
  excerpt: String,
});
</script>
<style scoped>
.article-item{
  @apply before:absolute before:left-0 before:-top-5 before:w-[5%]
  before:h-[2px] before:bg-[var(--vp-c-brand-1)]
}
</style>
