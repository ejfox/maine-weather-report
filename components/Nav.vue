<template>
  <ul
    role="navigation" aria-label="Site navigation"
    id="navigation" class="w-100 list pv3 ph1 bn ttu mv2 mv3-l">
    
    <li class="ph3-ns"><nuxt-link class="link sans-serif silver tracked f3" to="/">MWR</nuxt-link></li>

    <!-- <li class="pr2 ph3-ns"><nuxt-link class="link underline blue" to="/projects">Projects</nuxt-link></li> -->
  </ul>
</template>

<script scoped>
export default {
  data: function () {
    return {
    }
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
