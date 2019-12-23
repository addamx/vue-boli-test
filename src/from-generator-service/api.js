import layout from './layout'

export const fetchLayout = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return layout
}

const listMap = {
  男: ['text1', 'text2', 'text3', 'showjob'],
  女: ['text4', 'showjob', 'text5', 'text6'],
}

export const fetchOptions = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return listMap[id]
}
