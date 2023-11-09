<template>
  <Layout>
    <template #home-features-after>
      <ListPosts v-if="frontmatter.index"/>
    </template>
    <!-- <template #home-features-after>
        <Home/>
    </template> -->
    <!-- <template #layout-top>
      layout-top
    </template>
    <template #layout-bottom>
      layout-bottom
    </template> -->
  </Layout>
</template>
<script setup>
import DefaultTheme from 'vitepress/theme'
import {useData} from 'vitepress'
import ListPosts from './components/ListPosts.vue';

const { Layout } = DefaultTheme
const {page, frontmatter} = useData()
</script>
<style lang="less" scoped>
  
</style>