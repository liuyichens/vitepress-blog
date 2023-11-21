<template>
  <div class="">
    <h5 class="widgt-title relative mb-8 lg:mb-3 font-semibold text-slate-900 dark:text-slate-200">
      <span class="title relative">{{ title }}</span>
    </h5>
    <ul class="space-y-6 lg:space-y-2">
      <li v-for="(item, index) in forEachItems.slice(0, 10)" :key="index">
        <a class="block pl-1 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 text-sm"
          :href="`${path}${item.key}`">
          <span class="mx-1">{{ item.key }}</span>
          <sup class="text-[var(--vp-c-brand-1)]" v-if="item.value">{{ item.value }}</sup>
        </a>
      </li>
      <li v-if="forEachItems.length > 10">
        <a class="block pl-1 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 text-sm"
          :href="`${path}`">
          <span class="mx-1">更多...</span>
        </a>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: ''
  },
  path: {
    type: String,
    required: true,
    default: '/blog/'
  },
  items: {
    type: [Array, Object],
    required: true,
  }
})

const forEachItems = computed(() => {
  if (Array.isArray(props.items)) {
    return props.items.map(item => ({ key: item, value: '' }));
  } else if (typeof props.items === 'object') {
    return Object.entries(props.items).map(([key, value]) => ({ key, value }))
  }
  return []
})

</script>
<style scoped></style>