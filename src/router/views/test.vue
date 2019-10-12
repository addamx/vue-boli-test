<script>
import Layout from '@layouts/main.vue'
import formGenerator from '@components/form-generator/index.vue'

import { fetchLayout } from '@src/from-generator-service/api'

export default {
  page: {
    title: 'Test',
    meta: [{ name: 'description', content: 'The Test page.' }],
  },
  components: { Layout, formGenerator },
  data: function() {
    return {
      fetchLayout,
    }
  },
}
</script>

<template>
  <Layout>
    <form-generator form-name="demoFrom" :layout-promise="fetchLayout" />
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
</style>
