import store from '@state/store'

const RELATIVEPROPS = ['displayWithRule']

export default {
  data() {
    return {}
  },
  init(formName = 'from-demo', layout) {
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
    data.groups.forEach((group) => {
      group.list.forEach((field) => {
        fieldCollection[field.id] = {
          id: field.id,
          namespaced: true,
          state: {
            ...field,
            show: true,
          },
          actions: {},
          mutations: {
            toggleShow(state, payload) {
              state.show = payload
            },
          },
        }
        let fieldModule = fieldCollection[field.id]

        let actionsFunc = []

        RELATIVEPROPS.forEach((prop) => {
          if (prop in field) {
            let action = () => {}

            switch (field[prop]) {
              case 'displayWithRule':
                if (field[prop] === 2) {
                  action = (state, commit, rootState) => {
                    let show = field.displayWith.every((v) => {
                      return v.values.some(
                        (value) => value === rootState[formName][v.field].value
                      )
                    })
                    commit('toggleShow', show)
                  }
                }

                actionsFunc.push(action)
                break
            }
          }
        })

        fieldModule.actions.runAll = function runAll(state, commit, rootState) {
          actionsFunc.forEach((func) => {
            func(state, commit, rootState)
          })
        }
      })
    })

    console.log(form)
    console.log(fieldCollection)

    // 注册模块 `myModule`
    store.registerModule(formName, {
      ...form,
      modules: fieldCollection,
    })
    // // 注册嵌套模块 `nested/myModule`
    // store.registerModule(['nested', 'myModule'], {
    //   // ...
    // })
  },
  createFieldAction() {},
}
