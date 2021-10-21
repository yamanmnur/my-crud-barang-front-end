import PermintaanService from '../services/permintaan/PermintaanService';

  
export const permintaan = {
  state: {
      permintaan : {},
      modal : false,
  },
  getters: {
      getPermintaan: state=>state.permintaan,
      getModal: state=>state.modal
  },
  actions: {
    getDetailPermintaan({commit}, id) {
        return new Promise((resolve, reject) => {   
             PermintaanService.getDetailData(id).then(response => {
                commit('setPermintaan', response.data.data)
                commit('setModal')
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
  },
  mutations: {
    setPermintaan(state, payload) {
      state.permintaan = payload
    },
    setModal(state) {
      state.modal = true
    },
    
  }
}