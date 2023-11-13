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
        class="mt-2 mb-4 prose prose-slate prose-a:relative prose-a:z-10 dark:prose-invert max-w-none"
        v-html="excerpt"
      ></div>
    </div>
    <a
      class="flex items-center text-sm text-[--vp-c-brand-1] font-medium"
      :href="url"
    >
      <span class="relative">阅读全文</span>

      <svg
        viewBox="0 0 24 24"
        display="inline-block"
        vertical-align="middle"
        width="1.2em"
        height="1.2em"
        class="relative mt-px overflow-visible text-[--vp-c-brand-1]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="m11.293 17.293l1.414 1.414L19.414 12l-6.707-6.707l-1.414 1.414L15.586 11H6v2h9.586z"
        />
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
.article-item {
  @apply before:absolute before:left-0 before:-top-5 before:w-[5%]
  before:h-[2px] before:bg-[var(--vp-c-brand-1)];
}
</style>
