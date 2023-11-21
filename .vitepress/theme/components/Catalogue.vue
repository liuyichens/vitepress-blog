<template>
  <div class="catalogue">
    目录页
    {{ frontmatter.title }}
    笔记列表
    <ul>
      <li v-for="note in noteList" :key="note.link">
        <a :href="note.link">{{ note.text }}</a>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { useData, useRoute, withBase } from "vitepress";
import {useSidebar} from 'vitepress/theme'
import {watch} from 'vue'
const { frontmatter } = useData();
const route = useRoute();
const {sidebar} = useSidebar()
let noteList = []
noteList = getAllNotes(sidebar.value)
watch(() => frontmatter.value.title,() => {
  noteList = getAllNotes(sidebar.value)
})

function getAllNotes(notes){
  const result = []
  notes.forEach(n => {
    if('items' in n){
      result.push(...getAllNotes(n.items))
    } else {
      result.push({
        text: n.text,
        link: '/'+n.link.replace(/\.md$/,'.html')
      })
    }
  })
  return result
}

</script>
<style scoped></style>
