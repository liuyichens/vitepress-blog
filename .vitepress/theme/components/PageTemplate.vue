<script setup>

</script>

<template>
  <div class="home-container">
    <div class="container">
      <div class="content">
        <div class="content-container">
          <slot name="blogList"/>
          <div class="pagination-wrapper slide-enter mt-10">
            <slot name="paginationWrapper"/>
          </div>
        </div>
      </div>
      <div class="aside">
        <div class="aside-container">
          <div class="aside-content">
            <div class="home-aside slide-enter-content space-y-12 lg:space-y-8">
              <slot name="asideList"/>
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
  position: sticky;
  top: 65px;
  width: 224px;
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
    padding: 0 32px 20px;
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
