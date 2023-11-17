<template>
  <div>
    <h1>{{ category }}</h1>
    <PageTemplate>
      <template #blogList>
        
      </template>
    </PageTemplate>
  </div>
</template>
<script setup>
import PageTemplate from "./PageTemplate.vue";
import {useData, useRoute} from 'vitepress'
const route = useRoute()
const {params} = useData()
const category = params.value?.category ?? '全部分类'
</script>
<style lang="less" scoped></style>
