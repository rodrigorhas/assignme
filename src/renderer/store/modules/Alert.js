export const initialState = {
  title: '',
  type: '',
  show: false
}

export const state = Object.assign({}, initialState)

export const mutations = {
  close (state) {
    Object.assign(state, {
      title: '',
      type: '',
      show: false
    })
  },

  show (state, payload) {
    Object.assign(state, payload)
    state.show = true
  }
}

export const getters = {
  alert: (state) => state,
  show: (state) => state.show
}

export default {
  name: 'alert',
  namespaced: true,
  state,
  getters,
  mutations
}
