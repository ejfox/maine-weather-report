<template>
  <ol
    role="navigation" aria-label="Site navigation"
    id="navigation" class="w-100 list pv3 ph1 bn ttu mv2 mv3-l">
        <li v-for="post in posts" :key="post.date"
          :class="['lh-title tj ttu tracked-ns sans-serif w-100 w-third-l v-top word-wrap dib ma0 mv1 pa2 pa3-l h4-l', post._path.split('/')[2] === slug ? 'bg-light-green' : '']">
          <nuxt-link :to="post._path" :class="['link pointer', post._path.split('/')[2] === slug ? 'white' : 'light-green']">
            <span class="b">
              {{ post.title }}
            </span>
          </nuxt-link>
          <!-- <span class="f6 light-silver dib ttu dark-gray o-50">
            <i :class="['fas']" />
            {{ post.date | moment("MMM DD") }}
          </span> -->
        </li>
  </ol>
</template>

<script scoped>
export default {
  data() {
    const context = require.context('~/content/words/posts/', false, /\.json$/);

    let posts = context.keys().map(key => ({
      ...context(key),
      _path: `/words/${key.replace('.json', '').replace('./', '')}`
    }));


    posts = posts.sort(function(a,b) { return new Date(b.date) + new Date(a.date) })
    posts = posts.filter(post => !post.hidden)

    return {posts}
  },
  props: {
    slug: String
  },
  methods: {
  },
  mounted: function() {
  }
};
</script>
<style scoped="true">
#navigation {
  font-size: 1rem !important;
}
ul {
  text-align: center;
}
ul li {
  display: inline-block;
  cursor: pointer;
}
</style>
