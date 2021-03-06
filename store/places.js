import _ from 'lodash'

export const state = () => ({
  list: [],
  selected: {},
  demo: {},
})

export const getters = {
  getPlaces: (state) => state.list,
  getSelected: (state) => state.selected,
  getDemo: (state) => state.demo,
}

export const mutations = {
  setPlaces: (state, value) => (state.list = value),
  setSelected: (state, value) => (state.selected = value),
  setDemo: (state, value) => (state.demo = value),
}

export const actions = {
  async loadPlaces({ commit }) {
    const data = await this.$axios.$get('/places')
    commit('setPlaces', data)
  },
  async addPlace({ dispatch }, payload) {
    await this.$axios.$post('/places', payload)
    await dispatch('loadPlaces')
  },
  async loadPlace({ commit }, id) {
    const data = await this.$axios.$get(`/places/${id}`)
    commit('setSelected', data)
  },
  async updatePlace({ commit }, payload) {
    const { _id } = payload
    const body = _.omit(payload, ['_id'])
    const data = await this.$axios.$patch(`/places/${_id}`, body)
    commit('setSelected', data)
  },
  async removePlace({ dispatch }, id) {
    await this.$axios.$delete(`/places/${id}`)
    await dispatch('loadPlaces')
  },
  async loadDemo({ commit }) {
    const data = await this.$axios.$get('/places/demo')
    commit('setDemo', data)
  },
}
