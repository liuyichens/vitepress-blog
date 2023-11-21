// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './styles/main.css'
import CusLayout from './Layout.vue'
import ListPosts from './components/ListPosts.vue'
import Archive from './components/Archive.vue'
import Category from './components/Category.vue'
import Tag from './components/Tag.vue'
import NotFound from './components/NotFound.vue'
import Catalogue from './components/Catalogue.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: CusLayout,
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component('ListPosts', ListPosts)
    app.component('Archive', Archive)
    app.component('Category', Category)
    app.component('Tag', Tag)
    app.component('NotFound', NotFound)
    app.component('Catalogue', Catalogue)
  }
}
