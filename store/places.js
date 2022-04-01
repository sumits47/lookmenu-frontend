export const state = () => ({
  list: [],
})

export const getters = {
  getPlaces: (state) => state.list,
}

export const mutations = {
  setPlaces: (state, value) => (state.list = value),
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
}
