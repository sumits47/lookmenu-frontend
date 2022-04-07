import _ from 'lodash'

export const state = () => ({
  list: [],
  selected: {},
})

export const getters = {
  getMenus: (state) => state.list,
  getSelected: (state) => state.selected,
}

export const mutations = {
  setMenus: (state, value) => (state.list = value),
  setSelected: (state, value) => (state.selected = value),
}

export const actions = {
  async loadMenus({ commit }, placeId) {
    const data = await this.$axios.$get(`/places/${placeId}/menus`)
    commit('setMenus', data)
  },
  async addMenu({ dispatch }, payload) {
    await this.$axios.$post('/menus', payload)
    await dispatch('loadMenus', payload.place)
  },
  async updateMenu({ commit, dispatch }, payload) {
    const { _id } = payload
    const body = _.omit(payload, ['_id'])
    const data = await this.$axios.$patch(`/menus/${_id}`, body)
    commit('setSelected', data)
    await dispatch('loadMenus', data.place)
  },
  async loadMenu({ commit }, menuId) {
    const data = await this.$axios.$get(`/menus/${menuId}`)
    commit('setSelected', data)
  },
  async removeMenu({ dispatch }, id) {
    const menu = await this.$axios.$get(`/menus/${id}`)
    await this.$axios.$delete(`/menus/${id}`)
    await dispatch('loadMenus', menu.place)
  },
}
