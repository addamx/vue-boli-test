import store from '@state/store'
import relativeRules from './relativeRules'

// const RELATIVEPROPS = ['displayWithRule']

export default {
  data() {
    return {}
  },
  init(formName, layout) {
    console.log(layout)
    this.createState(formName, layout)
  },
  createState(formName, data) {
    const form = {
      namespaced: true,
      state: {
        formName,
      },
    }

    form.state.formStyle = data.formStyle
    const fieldCollection = {}

    const tempActionsMap = {}
    data.groups.forEach((group) => {
      group.list.forEach((field) => {
        // 添加必要的mutations
        fieldCollection[field.id] = {
          id: field.id,
          namespaced: true,
          state: {
            ...field,
            show: true,
          },
          actions: {
            runRelatives() {},
          },
          mutations: {
            toggleShow(state, payload) {
              state.show = payload
            },
            changeValue(state, payload) {
              state.value = payload
            },
          },
        }

        if (field.type === 'select') {
          fieldCollection[
            field.id
          ].mutations.changeOptions = function changeOptions(state, payload) {
            state.options = payload
          }
        }

        // 检测联动规则, 收集相应的action
        for (let rule in relativeRules) {
          if (rule in field) {
            let relMap = relativeRules[rule].handler(formName, field)
            for (let i in relMap) {
              if (!tempActionsMap[i]) {
                tempActionsMap[i] = []
              }
              tempActionsMap[i].push(relMap[i])
            }
          }
        }
      })
    })

    // 生成联动相关的action
    console.log(tempActionsMap)
    let i = 0
    for (let fieldId in tempActionsMap) {
      let _allActions = []

      tempActionsMap[fieldId].forEach((action) => {
        fieldCollection[fieldId].actions['relative_' + i] = action
        _allActions.push(`${formName}/${fieldId}/relative_${i}`)
        i++
      })

      fieldCollection[fieldId].actions['runRelatives'] = function runRelatives({
        dispatch,
      }) {
        /* before relative actions */
        _allActions.forEach((actionName) => {
          dispatch(actionName, null, { root: true })
        })
        /* after relative actions */
      }
    }

    // 注册模块
    store.registerModule(formName, {
      ...form,
      modules: fieldCollection,
    })

    // run all relative actions once
    // TODO: maybe unnecessary?
    let $actions = store._actions
    for (let actionName in $actions) {
      let reg = new RegExp(`${formName}/.*/runRelatives`)
      if (reg.test(actionName)) {
        store.dispatch(actionName)
      }
    }
  },
  createFieldAction() {},
}
