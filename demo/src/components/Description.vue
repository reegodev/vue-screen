<template>
  <div class="description">
    <h1>VueScreen</h1>
    <p>Reactive window size and media query states for VueJS.<br>Resize the page to see it in action.</p>
    <a href="https://github.com/matteo-rigon/vue-screen">
      <Github/>
      Check it out on Github
    </a>
  </div>
</template>

<script>
import Github from './Github.vue'

export default {
  components: {
    Github,
  },
}
</script>

<style lang="scss">
.description {
  text-align: center;
  margin-bottom: 40px;
  margin-top: -80px;
  font-size: 16px;

  .screen.landscape:not(.md) & {
    margin-bottom: 0;
  }

  h1 {
    font-size: 30px;
    margin-bottom: 20px;
    font-weight: 700;
  }

  a {
    display: inline-block;
    padding: 15px;
    margin-top: 15px;
    background-color: #d86767;
    text-decoration: none;
    border-radius: 3px;
    color: #fff;
    transition: background-color 0.3s ease-out;

    &:hover {
      opacity: 0.8;
    }

    svg {
      height: 22px;
      width: auto;
      vertical-align: sub;
      margin-right: 5px;
      fill: currentColor;
    }

    .screen.landscape:not(.md) & {
      padding: 8px;
      font-size: 14px;

      svg {
        height: 18px;
      }
    }
  }
}
</style>
