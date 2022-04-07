import _ from 'lodash'

export const state = () => ({
  list: [],
  selected: {},
})

export const getters = {
  getCategories: (state) => state.list,
  getSelected: (state) => state.selected,
}

export const mutations = {
  setCategories: (state, value) => (state.list = value),
  setSelected: (state, value) => (state.selected = value),
}

export const actions = {
  async loadCategories({ commit }, menuId) {
    const data = await this.$axios.$get(`/menus/${menuId}/categories`)
    commit('setCategories', data)
  },
  async addCategory({ dispatch }, payload) {
    await this.$axios.$post('/categories', payload)
    await dispatch('loadCategories', payload.menu)
  },
  async moveUp({ dispatch }, payload) {
    const { _id, menu } = payload
    await this.$axios.$patch(`/categories/${_id}/up`)
    await dispatch('loadCategories', menu)
  },
  async moveDown({ dispatch }, payload) {
    const { _id, menu } = payload
    await this.$axios.$patch(`/categories/${_id}/down`)
    await dispatch('loadCategories', menu)
  },
  async updateCategory({ commit, dispatch }, payload) {
    const { _id } = payload
    const body = _.omit(payload, ['_id'])
    const data = await this.$axios.$patch(`/categories/${_id}`, body)
    commit('setSelected', data)
    await dispatch('loadCategories', data.menu)
  },
  async removeCategory({ dispatch }, id) {
    const category = await this.$axios.$get(`/categories/${id}`)
    await this.$axios.$delete(`/categories/${id}`)
    await dispatch('loadCategories', category.menu)
  },
}
