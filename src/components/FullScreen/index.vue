<template>
  <div style="margin: 0 10px">
    <svg-icon
      @click="onScreenfull"
      className="fullscreen"
      iconClass="fullscreen"
    ></svg-icon>
  </div>
</template>
<script>
import screenfull from 'screenfull'
export default {
  name: 'FullScreen',
  data() {
    return {}
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    onScreenfull() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    }
  }
}
</script>
<style scoped lang="scss">
.fullscreen {
  color: #fff;
  font-size: 25px;
  cursor: pointer;
}
</style>
