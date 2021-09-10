const state = {
  cards: null,
}
const getters = {
  getCards(state) {
    return state.cards
  },
}
const mutations = {
  setCards(state, payload) {
    state.cards = payload

  },
  setDeleteTag(state, payload) {
    state.cards.forEach(item => {
      if (item.id === payload.idCard) {
        item.tags.forEach((subItem, index) => {
          if (index === payload.idTag) {
            return item.tags.splice(index, 1);
          }
        })
      }
    })
  },
  setAddTag(state, payload) {
    state.cards.forEach(item => {
      if (item.id === payload.idCard) {
        return item.tags.push(payload.tag);
      }
    })
  }
}
const actions = {
  async getList({commit}, query) {
    let res = await this._vm.$axios.get(`https://pixabay.com/api/?key=6227482-a30a0e9255fcc41c73cb10f52&q=${query}&image_type=all&per_page=100`)
      .then(res => res.data)
    let newHits = res.hits.map(el => {
      return {
        id: el.id,
        pageURL: el.pageURL,
        webformatURL: el.webformatURL,
        tags: el.tags.split(','),
        likes: el.likes,
        comments: el.comments
      }
    })
    commit('setCards', newHits)
  },
  addTag({commit}, payload) {
    commit('setAddTag', payload)
  },

  deleteTag({commit}, payload) {
    commit('setDeleteTag', payload)
  }


}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
