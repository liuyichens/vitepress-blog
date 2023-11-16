<template>
  <div>
    <h1>{{ params.category }}</h1>
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
console.log(route);
</script>
<style lang="less" scoped></style>
