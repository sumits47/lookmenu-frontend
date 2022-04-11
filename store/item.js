import _ from 'lodash'

export const state = () => ({
  list: [],
  selected: {},
})

export const getters = {
  getItems: (state) => state.list,
  getSelected: (state) => state.selected,
}

export const mutations = {
  setItems: (state, value) => (state.list = value),
  setSelected: (state, value) => (state.selected = value),
}

export const actions = {
  async loadItems({ commit }, groupId) {
    const data = await this.$axios.$get(`/groups/${groupId}/items`)
    commit('setItems', data)
  },
  async addItem({ dispatch }, payload) {
    await this.$axios.$post('/items', payload)
    await dispatch('loadItems', payload.group)
  },
  async moveUp({ dispatch }, payload) {
    const { _id, group } = payload
    await this.$axios.$patch(`/items/${_id}/up`)
    await dispatch('loadItems', group)
  },
  async moveDown({ dispatch }, payload) {
    const { _id, group } = payload
    await this.$axios.$patch(`/items/${_id}/down`)
    await dispatch('loadItems', group)
  },
  async updateItem({ commit, dispatch }, payload) {
    const { _id } = payload
    const body = _.omit(payload, ['_id'])
    const data = await this.$axios.$patch(`/items/${_id}`, body)
    commit('setSelected', data)
    await dispatch('loadItems', data.group)
  },
  async removeItem({ dispatch }, id) {
    const item = await this.$axios.$get(`/items/${id}`)
    await this.$axios.$delete(`/items/${id}`)
    await dispatch('loadItems', item.group)
  },
}
