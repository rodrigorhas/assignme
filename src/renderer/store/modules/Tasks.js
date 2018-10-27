import store from '@/store'
import { ipcRenderer } from 'electron'
import { sort } from '../utils'

export const state = {
  tasks: [],
  taskToUpdate: null,
  taskStatus: 'idle'
}

export const actions = {
  getTasks () {
    ipcRenderer.send('get-tasks')
  },

  removeTask (_, task) {
    ipcRenderer.send('remove-task', task.id)
  },

  startTask (_, task) {
    ipcRenderer.send('update-task-status', { task, status: 'in_progress' })
  },

  finishTask (_, task) {
    ipcRenderer.send('update-task-status', { task, status: 'done' })
  },

  updateTask (_, task) {
    ipcRenderer.send('update-task', task)
  },

  createTask ({ state }, task) {
    task.id = Math.random()
    task.created = new Date()
    task.createdBy = state.user
    ipcRenderer.send('create-task', task)
  }
}

export const getters = {
  tasks: (state) => sort.byDeadline(state.tasks),
  taskToUpdate: (state) => state.taskToUpdate,
  taskStatus: (state) => state.taskStatus
}

export const mutations = {
  setTasks (state, tasks) {
    state.tasks = tasks
  },

  setTaskStatus (state, status) {
    state.taskStatus = status
  },

  removeTask (state, task) {
    state.tasks.splice(state.tasks.findIndex(x => x.id === task.id), 1)
    state.alert = {
      title: 'Successfully removed task',
      type: 'info',
      show: true
    }
  },

  startTask (state, task) {
    state.tasks[state.tasks.findIndex(x => x.id === task.id)].status = 'in_progress'
    state.alert = {
      title: 'Successfullt started task',
      type: 'info',
      show: true
    }
  },

  finishTask (state, task) {
    state.tasks[state.tasks.findIndex(x => x.id === task.id)].status = 'done'
    state.alert = {
      title: 'Successfully finished task',
      type: 'info',
      show: true
    }
  },

  setTaskToUpdate (state, task) {
    state.taskToUpdate = task
  },

  clearTaskToUpdate (state) {
    state.taskToUpdate = null
    state.alert = {
      title: 'Successfully updated task',
      type: 'info',
      show: true
    }
  }
}

export default {
  name: 'tasks',
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

/**
 * Renderer interactions
 */

ipcRenderer.on('all-tasks', (_, tasks) => {
  store.commit('tasks/setTasks', tasks)
})

ipcRenderer.on('removed-task', (_, id) => {
  store.commit('tasks/removeTask', { id })
})

ipcRenderer.on('updated-task-status', (_, { task, status }) => {
  let mutation
  if (status === 'in_progress') {
    mutation = 'startTask'
  } else if (status === 'done') {
    mutation = 'finishTask'
  }
  store.commit(`tasks/${mutation}`, task)
})

ipcRenderer.on('updated-task', (_, task) => {
  store.commit('tasks/clearTaskToUpdate', task)
})

ipcRenderer.on('created-task', () => {
  store.commit('alert/showAlert', {
    title: 'Successfully created task',
    type: 'info',
    show: true
  })
})
