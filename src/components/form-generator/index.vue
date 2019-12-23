<template>
  <form>
    <fieldset v-for="(group, index) in groups" :key="index">
      <Field
        v-for="field in group.list"
        :id="field.id"
        :key="field.id"
        :type="field.type"
        :form-name="formName"
      />
    </fieldset>
    <pre>{{ JSON.stringify($store.state.demoForm, null, 4) }}</pre>
  </form>
</template>
<script>
import FormService from '@src/from-generator-service/form-service'
import Field from './field.vue'

// import { createNamespacedHelpers } from 'vuex'

// const { mapState, mapActions } = createNamespacedHelpers('demoForm')

export default {
  name: 'FormGenerator',
  components: {
    Field,
  },
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
  data() {
    return {
      groups: [],
    }
  },
  mounted() {
    this.init()
    window.formGeneratorTest = this
  },
  methods: {
    init() {
      this.layoutPromise().then((res) => {
        this.groups = res.groups
        FormService.init(this.formName, res)
        console.log(this.$store.state)
      })
    },
  },
}
</script>
