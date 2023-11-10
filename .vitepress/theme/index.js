// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './styles/main.css'
import CusLayout from './Layout.vue'
import ListPosts from './components/ListPosts.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: CusLayout,
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component('ListPosts',ListPosts)
  }
}
