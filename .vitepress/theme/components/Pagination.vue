<template>
  <ul class="pages flex">
        <li class="page-pre">
          <button :disabled="currentPage === 1" @click="goPage('')">←</button>
        </li>
        <li
          v-for="(_, index) in totalPage"
          :key="index"
          :class="[
            'page-item',
            `page-item-${index + 1}`,
            index + 1 === currentPage ? 'page-item-active' : '',
          ]"
        >
          <button
            :disabled="currentPage === index + 1"
            @click="goPage(`${index === 0 ? '' : index + 1}`)"
          >
            {{ index + 1 >= 10 ? index + 1 : "0" + (index + 1) }}
          </button>
        </li>
        <li class="page-next">
          <button
            :disabled="currentPage === totalPage"
            @click="
              goPage(
                `${currentPage === totalPage ? totalPage : currentPage + 1}`
              )
            "
          >
            →
          </button>
        </li>
      </ul>
</template>
<script setup>
defineProps(['currentPage','totalPage'])
import { useRouter } from "vitepress";
const router = useRouter();
const goPage = (page) => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  router.go(`/blog/${page}`);
};

</script>
<style scoped>
  
</style>