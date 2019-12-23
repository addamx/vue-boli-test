/**
 * ...
 */
import { fetchOptions } from '@src/from-generator-service/api'

export default {
  rule: 'getOptions',
  handler: (formName, field) => {
    return {
      [field.getOptions]: ({ commit, rootState }) => {
        fetchOptions(rootState[formName][field.getOptions].value).then(
          (options) => {
            commit(`${formName}/${field.id}/changeOptions`, options, {
              root: true,
            })
          }
        )
      },
    }
  },
}
