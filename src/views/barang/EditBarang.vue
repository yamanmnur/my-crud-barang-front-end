<style scoped>
    .multiselect--active {
    z-index: 10 !important;
    }
</style>
<template>
    <CCard>
      <CCardHeader
        style="background: #1a3665; color: white"
        class="d-flex align-items-center font-weight-bold"
      >
        Edit Barang
        
      </CCardHeader>
      <CCardBody>
         <form @submit.prevent="postData">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="no_izin" class="font-weight-bold">Nama</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.nama"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="no_izin" class="font-weight-bold">Kuantiti</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="formData.kuantiti"
                />
              </div>

              <div class="form-group col-md-6">
                <label for="no_izin" class="font-weight-bold">Lokasi</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.lokasi"
                />
              </div>

              <div class="form-group col-md-6">
                <label for="no_izin" class="font-weight-bold">Satuan</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.satuan"
                />
              </div>

              <div class="form-group col-md-6">
                <label for="no_izin" class="font-weight-bold">Status</label>
                <select name="" class="form-control" id="" v-model="formData.status">
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </select>
              </div>
          
               
            </div>
           
            <div class="form-row">
                <button type="submit" class="btn btn-sm btn-success ml-auto" >
                    Simpan
                </button>
            </div>
            
          </form>
      </CCardBody>
   
    </CCard>
</template>
<script>
import BarangService from "../../services/barang/BarangService" 
import { AlertUtils } from "../../services/AlertUtils";

const fields = [
  { key: 'barang', _style:'min-width:200px' },
  { key: 'lokasi', _style:'min-width:100px;' },
  { key: 'qty', label : 'Tersedia', _style:'min-width:100px;' },
  { key: 'kuantiti', _style:'min-width:100px;' },
  { key: 'satuan', _style:'min-width:100px;' },
  { key: 'keterangan', _style:'min-width:100px;' },
  { key: 'status', _style:'min-width:100px;' },
  { 
    key: 'action', 
    label: '', 
    _style: 'width:1%', 
    sorter: false, 
    filter: false
  }
]

export default {
  mixins : [AlertUtils],
  name: 'AdvancedTables',
  data () {
    return {
      items: [],
      barang : [],
      peminta: [],
      formData : {
        nama : '',
        kuantiti : '',
        lokasi : '',
        satuan : '',
        status : '',
      },
      fields,
      details: [],
      collapseDuration: 0
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    postData() {
        let loader = this.$loading.show({
            // Optional parameters
            container: this.fullPage ? null : this.$refs.formContainer,
            canCancel: true,
            onCancel: this.onCancel,
        });
        BarangService.updateData(this.formData)
        .then(response => {
          loader.hide()
          this.alertSuccess();
          this.$router.push('/dashboard')
        })
    },
    getData() {
      BarangService.getDetailData(this.$route.params.id)
      .then(response => {
        this.formData = response.data.data
      })
   
    },
   
    getBadge (status) {
      switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: 'primary'
      }
    },
    toggleDetails (item) {
      this.$set(this.items[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => { this.collapseDuration = 0})
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>