<template>
<div class="slug-container cf pa5-l">
  <article id="post-container w-100 fl">
    <!-- Article header -->
    <header class="w-100 bb bt pv4">
      <div class="w-100 pa3">
        <h1 :class="['f1 f-subheadline-ns sans-serif-flyweight lh-solid mv3']">
          {{ title }}
        </h1>
      </div>

      <div v-if="dek">
        <div class="f3 f2-ns mv3 mv4-ns i b ph3 w-100 db lh-title">{{dek}}</div>
      </div>

      <!-- Timestamp -->
      <time v-if="!hidetimestamp"
        :class="['f6 f5-ns w-100 sans-serif ttu tracked gray dark-gray-ns']">
        <small class="w-100 db ph3 ph3-ns">{{ date | moment("MMMM Do, YYYY") }}</small>
      </time>
    </header>

    <section
    :class="['w-100 mt4 ph3 ph0-l']">
      <div id="body" class="pa2 pa3-ns tj">
        <Words v-if="body" :bodyMarkdown="body" />
        <h4 class="gray">Russell Zintel</h4>
      </div>
    </section>

  </article>

  <BottomNav :slug="slug" />
</div>
</template>

<script>
import Words from '~/components/blogtypes/words.vue'
import Nav from '~/components/Nav.vue';
import BottomNav from '~/components/BottomNav.vue';
import URL from 'url-parse'
// import _ from 'lodash'
import marked from 'marked'
import truncate from 'truncate'
import cheerio from 'cheerio'

export default {
  scrollToTop: true,
  components: {
    Words,
    Nav,
    BottomNav
  },
  data: function () {
    return {
      emojiIcon: '📓',
      hideTimestamp: false
    }
  },
  computed: {
  },
  head () {
    return {
      title: this.emojiIcon + ' ' + this.title + ' | EJ Fox',
      meta: [
        { property: 'name', content: this.title },
        { property: 'description', content: this.shortDescription },
        { property: 'og:description', content: this.shortDescription },
        { property: 'og:title', content: this.title },
        { property: 'og:type', content: 'article' },
        { property: 'twitter:title', content: this.title },
        { property: 'twitter:creator', content: 'mrejfox' },
        { property: 'twitter:description', content: this.emojiIcon + ' ' + this.shortDescription }
      ]
    }
  },
  async asyncData({ params }) {
    let post = await import('~/content/words/posts/' + params.slug + '.json');
    if(!post.body && post.bodyContent) { post.body = post.bodyContent }
    if(!post.bgcolorclass) { post.bgcolorclass = ''}
    if(!post.textcolorclass) { post.textcolorclass = '' }
    if(!post.audio) { post.audio = null }
    if(!post.inprogress) { post.inprogress = null }
    if(!post.dek) { post.dek = null }
    post.slug = params.slug

    // let toc = marked.lexer(post.body)
    // // console.log(post.body, toc)
    // toc = _.filter(toc, (t) => {
    //   return t.type === 'heading' && t.depth < 3
    // })
    // toc.map(t => {
    //   t.slug = '#'+slug(t.text, {lower: true, symbols: false})
    //   return t
    // })
    // post.toc = toc

    if(!post.dek) {
      let noHtmlBody = post.body
      noHtmlBody = noHtmlBody.replace(/<(?:.|\n)*?>/gm, '')
      post.shortDescription = truncate(noHtmlBody, 120)
    } else {
      post.shortDescription = post.dek
    }
    return post;
  },
  created: function () {
    this.setEmojiIcon()
  },
  activated: function () {
  },
  methods: {
    setEmojiIcon () {
      if (this.type === 'photos') {
        this.emojiIcon = '📷'
      } else if (this.type === 'code') {
        this.emojiIcon = '💻'
      } else if (this.type === 'audio') {
        this.emojiIcon = '🎵'
      }
    }
  },
};
</script>

<style scoped>
@media screen and (max-width: 640px) {
  h1, h2, h3, h4, h5 {
    word-wrap: break-word;
    hyphens: auto;
  }
}

@media screen and (min-width: 640px) {
  .f-headline {
    font-size: 10rem;
  }
}

article li
  list-style-type circle

article.photos h1 {
  text-align: center;
}

article.photos img {
  margin: 3rem 0
}

article.photos img:first-child {
  margin-top: 0;
}

.article-pop {
  border-radius: 4px;
  border-top: 1px solid rgba(250,250,250,0.1);
  border-bottom: 1px solid rgba(25,25,25,0.1);
  box-shadow: 2px 2px 12px 0px rgba( 0, 0, 0, 0.15 );
}

/* article.photos p {
  max-width: 32rem;
} */

img {
  max-width: 100%;
}


pre {
  word-wrap: break-word;
  white-space: pre-wrap;
  max-width: 100vw;
  overflow: auto;
}

code {
  word-wrap: break-word;
  white-space: pre-wrap;
}

.embed-container {
  margin-bottom: 2rem;
  margin-top: 2rem;
}
</style>
