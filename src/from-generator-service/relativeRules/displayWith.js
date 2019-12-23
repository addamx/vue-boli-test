/**
 * ...
 */
export default {
  rule: 'displayWithRule',
  /**
   * field = {
      displayWithRule: 2,
      displayWith: [
        {
          field: 'age',
          values: ['18', '19', '20'],
        },
        {
          field: 'name',
          values: ['Tom'],
        },
      ],
   * }
   */
  handler: (formName, field) => {
    let result = {}
    field.displayWith.forEach((fieldDep) => {
      result[fieldDep.field] = ({ commit, rootState }) => {
        let method = field.displayWithRule === 1 ? 'some' : 'every'
        let displayWidth = field.displayWith
        let show = displayWidth[method]((i) => {
          return i.values.some(
            (value) => value === rootState[formName][i.field].value
          )
        })
        if (rootState[formName][field.id].show !== show) {
          commit(`${formName}/${field.id}/toggleShow`, show, { root: true })
        }
      }
    })
    return result
  },
}
