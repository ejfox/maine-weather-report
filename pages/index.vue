<template>
  <section class="w-80 center db f3 cf mb4 serif">
    <h1 class="lh-title f1 f-headline-l green serif tc mt1">Maine Weather Report</h1>

    <h2 class="lh-title f2 f1 dark-green serif tc">Summer 2019 • Issue 1</h2>
    <section id="allposts" class="category pv4 db cf">
      <!-- <h2 class="fl f1 pl2 db mr4 lh-title">All posts</h2> -->
      <ul class="db f5 list">
        <li v-for="post in posts" :key="post.date"
          :class="['lh-title tc tl-ns ttu tracked-ns sans-serif w-100 w-50-ns pa2 v-top pa4-ns word-wrap dib mv2']">
          <nuxt-link :to="post._path" :class="['link dim green']">
            <span class="b">
              {{ post.title }}
            </span>
          </nuxt-link>
          <span class="f5 light-silver db ttu gray">
            <i :class="['fas']" />
            {{ post.date | moment("MMM DD") }}
          </span>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import Nav from '~/components/Nav.vue';

export default {
  components: {
    Nav
  },
  methods: {
  },
  data() {
    // Using webpacks context to gather all files from a folder
    const context = require.context('~/content/words/posts/', false, /\.json$/);

    let posts = context.keys().map(key => ({
      ...context(key),
      _path: `/words/${key.replace('.json', '').replace('./', '')}`
    }));


    posts = posts.sort(function(a,b) { return new Date(b.date) - new Date(a.date) })
    posts = posts.filter(post => !post.hidden)
    return { posts };
  }
};
</script>

<style scoped>
ul { padding: 0;}
/* li { list-style-type: none } */

.intro a:link, .intro a:hover {
  color: black;
  text-decoration: underline;
}

.intro a:visited, .intro a:focus {
  color: #414346;
  /*text-decoration: none;*/
}
</style>
