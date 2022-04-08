import _ from 'lodash'

export const state = () => ({
  list: [],
  selected: {},
})

export const getters = {
  getGroups: (state) => state.list,
  getSelected: (state) => state.selected,
}

export const mutations = {
  setGroups: (state, value) => (state.list = value),
  setSelected: (state, value) => (state.selected = value),
}

export const actions = {
  async loadGroups({ commit }, categoryId) {
    const data = await this.$axios.$get(`/categories/${categoryId}/groups`)
    commit('setGroups', data)
  },
  async addGroup({ dispatch }, payload) {
    await this.$axios.$post('/groups', payload)
    await dispatch('loadGroups', payload.category)
  },
  async moveUp({ dispatch }, payload) {
    const { _id, category } = payload
    await this.$axios.$patch(`/groups/${_id}/up`)
    await dispatch('loadGroups', category)
  },
  async moveDown({ dispatch }, payload) {
    const { _id, category } = payload
    await this.$axios.$patch(`/groups/${_id}/down`)
    await dispatch('loadGroups', category)
  },
  async updateGroup({ commit, dispatch }, payload) {
    const { _id } = payload
    const body = _.omit(payload, ['_id'])
    const data = await this.$axios.$patch(`/groups/${_id}`, body)
    commit('setSelected', data)
    await dispatch('loadGroups', data.category)
  },
  async removeGroup({ dispatch }, id) {
    const group = await this.$axios.$get(`/groups/${id}`)
    await this.$axios.$delete(`/groups/${id}`)
    await dispatch('loadGroups', group.category)
  },
}
