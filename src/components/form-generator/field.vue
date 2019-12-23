<template>
  <div>
    <template v-if="type === 'text' && show">
      <label :for="id">{{ label }}</label>
      <input
        v-if="show"
        :id="id"
        :value="value"
        type="text"
        @input="onChange"
      />
    </template>
    <template v-if="type === 'select' && show">
      <label :for="id">{{ label }}</label>
      <select :id="id" :value="value" @change="onChange">
        <option value="">Please select</option>
        <option
          v-for="(option, index) in options"
          :key="index"
          :selected="option === value"
          :value="option"
          >{{ option }}</option
        >
      </select>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Field',
  props: {
    id: {
      type: String,
      default: '',
    },
    formName: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  computed: {
    // ...mapState({
    //   show: (state) => {
    //     console.log(JSON.stringify(state))
    //     console.log(JSON.stringify(this))
    //     return (
    //       state[this.formName][this.id].show
    //     )
    //   },

    //   value: (state) =>
    //     state[this.formName][this.id].value,
    // }),
    show() {
      return this.$store.state[this.formName][this.id].show
    },
    value() {
      return this.$store.state[this.formName][this.id].value
    },
    label() {
      return this.$store.state[this.formName][this.id].label
    },
    options() {
      return this.$store.state[this.formName][this.id].options
    },
  },
  methods: {
    onChange(e) {
      this.$store.commit(
        `${this.formName}/${this.id}/changeValue`,
        e.target.value
      )

      // let $actions = this.$store._actions
      // for (let actionName in $actions) {
      //   let reg = new RegExp(`${this.formName}/${this.id}/relative_`)
      //   if (reg.test(actionName)) {
      //     this.$store.dispatch(actionName)
      //   }
      // }
      this.$store.dispatch(`${this.formName}/${this.id}/runRelatives`)
    },
  },
}
</script>
