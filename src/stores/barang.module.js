import BarangService from '../services/barang/BarangService';

  
export const barang = {
  state: {
      barang : {},
      modal : false,
  },
  getters: {
      getBarang: state=>state.barang,
      getModal: state=>state.modal
  },
  actions: {
    getDetailBarang({commit}, id) {
        return new Promise((resolve, reject) => {   
            BarangService.getDetailData(id).then(response => {
                commit('setBarang', response.data.data)
                commit('setModal')
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
  },
  mutations: {
    setBarang(state, payload) {
      state.barang = payload
    },
    setModal(state) {
      state.modal = true
    },
    
  }
}