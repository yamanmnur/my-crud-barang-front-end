import axios from '@/services/axios.service'

import baseUrl from '../../services/base-url';
import ApiRoute from '../../services/api.route'
const API_URL = baseUrl()+"/";


class BarangService {

  getData() {
    return axios.get(API_URL + ApiRoute.getBarang);
  }

  getDetailData(id) {
    return axios.get(API_URL + ApiRoute.getDetailBarang + id);
  }

  postData(formData) {
    return axios.post(API_URL + ApiRoute.postDataBarang, formData);
  }

  updateData(formData) {
    return axios.put(API_URL + ApiRoute.updateDataBarang, formData)
  }

  deleteData(id) {
    return axios.delete(API_URL + ApiRoute.deleteDataBarang + id)
  }

}

export default new BarangService();
