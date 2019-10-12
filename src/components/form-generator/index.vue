<template>
  <form>
    empty1x1
  </form>
</template>
<script>
import FormService from '@src/from-generator-service/form-service'

export default {
  name: 'FormGenerator',
  props: {
    formName: {
      type: String,
      default: 'from-demo', // TODO: 应该保证不重复
    },
    layoutPromise: {
      type: Function,
      default: () => Promise.resolve(),
    },
  },

  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.layoutPromise().then((res) => {
        FormService.init(this.formName, res)
        console.log(this.$store.state)
      })
    },
  },
}
</script>
