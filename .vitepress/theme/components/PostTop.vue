<template>
  <div class="slide-enter mb-4">
    <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">{{ post.title }}</h1>
  </div>
</template>
<script setup>
import { data as posts } from "../../../utils/posts.data";
import { computed } from "vue";
import { useRoute } from "vitepress";
const route = useRoute();

const post = computed(() => posts[findCurrentIndex()])

function findCurrentIndex() {
<<<<<<< HEAD
  const currentPath = decodeURIComponent(route.path);
=======
  const currentPath =decodeURIComponent(route.path)
>>>>>>> master
  const result = posts.findIndex((p) => p.url === currentPath);
  if (result === -1) console.error(`blog post missing: ${route.path}`);
  return result;
}
</script>
<style scoped></style>
