<template>
  <div class="serif">
    <!-- <nuxt-link to="/" id="home-link"
      :class="['sans-serif pa3 f3 db lh-solid tc link black underline bn']">
      EJFox.com
    </nuxt-link> -->

    <Nav />

    <main>
      <transition
        appear
        mode="out-in"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut">
        <nuxt/>
      </transition>
    </main>
  </div>
</template>
<script>
import Nav from '~/components/Nav.vue';
export default {
  components: {
    Nav
  }
}
</script>

<style>
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.bg-green {
  background-color: #8AA445 !important;
}

.green {
  color: #8AA445 !important;
}

html {
  font-size: 16px;
  font-size: 1.3em;
  line-height: 1.4em;
  /* word-spacing: 1px; */
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
body {
  scroll-behavior: smooth;
  background-color: #FDFAD9;
  border-top: 2em solid #8AA445;
}

a,a:link,a:visited,a:active {
  outline: 0;
}
/* a:link {
  color: #00449E;
}
a:visited {
  color: #5E2CA5;
} */

h2 {
  font-size: 5em;
  line-height: 0.9em;
}

h3 {
  font-size: 3em;
  line-height: 1em
}

h4 {
  font-size: 2.2em;
  line-height: 1em;
}


.animated {
  animation-duration: 1.4s;
  /* transition-timing-function: cubic-bezier(0.870, 0.260, 0.425, 0.885); */
}

pre, code {
  white-space: pre-wrap;
  word-wrap: break-word;
}

pre {
  overflow-x: auto;
}

.sans-serif {
  font-family: "Idlewild A", "Idlewild B";
  font-style: normal;
  font-weight: 800;
}

.serif {
  font-family: "Quarto A", "Quarto B";
}

</style>
