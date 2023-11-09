<template>
  <Layout>
    <template #home-features-after>
      <ListPosts v-if="frontmatter.index" />
    </template>
    <!-- <template #home-features-after>
        <Home/>
    </template> -->
    <!-- <template #layout-top>
      layout-top
    </template>
    <template #aside-bottom>
      aside-bottom
    </template> -->
  </Layout>
</template>
<script setup>
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import ListPosts from "./components/ListPosts.vue";

const { Layout } = DefaultTheme;
const { page, frontmatter } = useData();

import { nextTick, provide } from "vue";

const { isDark } = useData();

const enableTransitions = () =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

provide("toggle-appearance", async ({ clientX: x, clientY: y }) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`,
  ];

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
    }
  );
});
</script>
<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
.VPNavBarAppearance>.VPSwitch {
  border: none !important;
  background-color: transparent !important;
}
</style>
