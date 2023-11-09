<script setup name="home">
import { computed } from "vue";
import { useData } from "vitepress";
import { data as posts } from "../../../utils/posts.data";
const { params } = useData();
const PAGE_SIZE = 10;

const currentPosts = computed(() => {
  const { page } = params.value || { page: 1 };
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  return posts.slice(start, end);
});
</script>

<template>
  <div class="home-container">
    <div class="container">
      <div class="content">
        <div class="content-container">
          <ul class="space-y-16">
            <li v-for="{ title, url, date, excerpt } of currentPosts">
              <article class="relative group">
                <div class="realtive">
                  <h3
                    class="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-200"
                  >
                    <a :href="url">
                      {{ title }}
                    </a>
                  </h3>
                  <div
                    class="whitespace-nowrap text-sm leading-6 dark:text-slate-400"
                  >
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
                  <span class="relative"
                    >阅读全文<span class="sr-only"
                      >, Meet Studio: Our beautiful new agency site
                      template</span
                    ></span
                  >
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
            </li>
          </ul>
        </div>
      </div>
      <div class="aside">
        <div class="aside-container">
          <div class="aside-content">
            <div class="home-aside">
              <div>
                <h2>分类</h2>
              </div>
              <div>
                <h2>标签</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.home-container {
  padding: 32px 24px 20px;
}

@media (min-width: 768px) {
  .home-container {
    padding: 32px 32px 20px;
  }
}

@media (min-width: 960px) {
  .home-container {
    padding: 32px 32px 20px;
  }

  .home-container .container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  .home-container .content {
    width: 70%;
    flex: 1;
  }
}

@media (min-width: 1280px) {
  .home-container .aside {
    display: block;
  }
}

@media (min-width: 1440px) {
  .home-container .container {
    max-width: 1200px;
  }
}

.container {
  margin: 0 auto;
  width: 100%;
}

.aside {
  position: relative;
  display: none;
  order: 2;
  flex-grow: 1;
  width: 100%;
  max-width: 256px;
}

.aside-container {
  position: fixed;
  top: 0;
  padding-top: calc(
    var(--vp-nav-height) + var(--vp-layout-top-height, 0px) +
      var(--vp-doc-top-height, 0px) + 32px
  );
  width: 224px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;
}

.aside-content {
  display: flex;
  flex-direction: column;
  min-height: calc(
    100vh - (var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 32px)
  );
  padding-bottom: 32px;
}

.home-aside {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.content {
  position: relative;
  margin: 0 auto;
  width: 100%;
}

@media (min-width: 960px) {
  .content {
    padding: 0 32px 80px;
  }
}

@media (min-width: 1280px) {
  .content {
    order: 1;
    margin: 0;
    min-width: 640px;
  }
}

.content-container {
  margin: 0 auto;
}
</style>
