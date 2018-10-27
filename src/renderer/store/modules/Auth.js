import store from '@/store'
import { ipcRenderer } from 'electron'

export const state = {
  user: null,
  isThereUser: false,
  checkedForUser: false
}

export const actions = {
  signIn (_, user) {
    ipcRenderer.send('signin', user)
  },
  signUp (_, user) {
    ipcRenderer.send('signup', user)
  }
}

export const mutations = {
  signIn (state, user) {
    state.user = user.username

    state.alert = {
      title: 'Successfully signed in',
      type: 'info',
      show: true
    }
  },

  signInError (state) {
    state.user = null
    state.alert = {
      title: 'Error signing in',
      type: 'error',
      show: true
    }
  },

  signOut (state) {
    state.user = null
    state.tasks = []
    state.alert = {
      title: 'Successfully signed out',
      type: 'info',
      show: true
    }
  },

  signUp (state, user) {
    state.user = user.username
    state.alert = {
      title: 'Successfully created account' + user.name,
      type: 'info',
      show: true
    }
  },

  checkForUser (state) {
    ipcRenderer.send('check-for-user')
  },

  isThereUser (state, isThereUser) {
    state.checkedForUser = true
    state.isThereUser = isThereUser
  }
}

export const getters = {
  authenticated: (state) => !!state.user,
  user: (state) => state.user,
  isThereUser: (state) => state.isThereUser,
  checkedForUser: (state) => state.checkedForUser
}

export default {
  name: 'auth',
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}

/**
 * Renderer interactions
 */

ipcRenderer.on('signed-in', (_, user) => {
  store.commit('auth/signIn', user)
})

ipcRenderer.on('signin-error', () => {
  store.commit('auth/signInError')
})

ipcRenderer.on('checked-for-user', (_, isThereUser) => {
  store.commit('auth/isThereUser', isThereUser)
})

ipcRenderer.on('signed-up', (_, user) => {
  store.commit('auth/signUp', user)
})
