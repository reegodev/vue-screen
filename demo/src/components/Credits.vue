<template>
  <div class="credits">
    Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> 
    from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.credits {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background-color: #38454f;
  color: #fff;
  font-size: 12px;

  .md & {
    font-size: 16px;
  }

  a {
    color: #fff;
    text-decoration: underline;
  }
}
</style>
