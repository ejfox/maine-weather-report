<template>
  <div class="">
    <div
      v-if="bodyHtml"
      class="words contentWrapper content measure lh-copy" v-html="bodyHtml">
    </div>

    <div
      v-if="!bodyHtml"
      class="words contentWrapper content measure"
      v-html="bodyMarkdown">
    </div>
  </div>
</template>

<style>
</style>

<script>
import cheerio from 'cheerio'
import URL from 'url-parse'
// import _ from 'lodash'
import marked from 'marked'
import truncate from 'truncate'
import slugify from 'slugify'
export default {
  data: function  () {
    return {
      bodyHtml: null
    }
  },
  props: {
    bodyMarkdown: String,
    // bodyHtml: String
  },
  computed: {
  },
  created: function () {
    const parsedMarkdown = this.parseMarkdown(this.bodyMarkdown)
    // this.bodyHtml = this.processMarkdownHtml(parsedMarkdown)
    this.bodyHtml = parsedMarkdown
  },
  methods: {
    processMarkdownHtml: function(markdownHtml) {
      // Load parsed markdown into cheerio so we can do
      // jquery-style manipulations on the HTML
      const $ = cheerio.load(markdownHtml)

      $('h1, h2, h3, h4, h5').each(function(i, el){
        const headerID = $(el).text()
        const encodedHeaderID = slugify(headerID)
        $(el).attr('id', encodedHeaderID)
      })

      $('iframe').each(function(i, el){ $(el).addClass('mh3-ns') })

    // return parsed, sliced, and diced markdown
    return $.html()
  },
  parseMarkdown: function(markdown) {
    // console.log('Parsing markdown...')
    // Build markdown parser
    const markdownRenderer = marked.setOptions({
      renderer: new marked.Renderer(),
      // highlight: function (code) {
      //   return require('highlight.js').highlightAuto(code).value
      // }
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: true,
      xhtml: true
    })
    return markdownRenderer(markdown)

    // console.log('markdown-it-footnote', require('markdown-it-footnote'))

    // console.log('markdown-it-anchor', require('markdown-it-anchor').default)

    // const MarkdownIt = require('markdown-it')({
    //   html: true,
    //   breaks: true,
    //   typographer: true
    // })
    // .use(require('markdown-it-footnote'))
    //.use(require('../../helpers/footnote.js'))
    // .use(require('markdown-it-table-of-contents'), {
    //   includeLevel: [2,3],
    //   listType: 'ol',
    //   slugify: slugify
    // })
    // .use(require('markdown-it-strikethrough-alt'))

    return MarkdownIt.render(markdown)
  }
}
};
</script>

<style>

.font-half {
  font-size: 0.5em;
}

.table-of-contents {

}

.footnote-ref {
  /* font-family: 'Helvetica Neue', Helvetica, arial, sans-serif; */
}

.footnotes {
  font-size: 0.85em;
  line-height: 1em;
  margin-bottom: 12vh;
}
.footnotes-sep {
  margin-top: 12vh;
  margin-bottom: 12vh;
}
a.header-anchor, a.markdownIt-Anchor {
  color: #999 !important;
  text-decoration: none;
  opacity: 0.3;
  position: absolute;
  left: 1vw;
  font-size: 15px;
}

h2,h3,h4{
  margin: 0.5em 0;
}

hr {
  border-bottom: 0;
  border-top: 1px solid black;
  margin-top: 2em;
  margin-bottom: 2em;
}

p {
  margin-bottom: 1.5em;
}
</style>
