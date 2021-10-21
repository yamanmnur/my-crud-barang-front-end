<template>
    <CCard>
      <CCardHeader
        style="background: #1a3665; color: white"
        class="d-flex align-items-center font-weight-bold"
      >
        Barang
        <CButton
          color="info"
          style="float: right"
          @click="tambahBarang"
          class="btn-md ml-auto button-md-block px-3"
          >Tambah</CButton
        >
      </CCardHeader>
      <CCardBody>
          <CDataTable
            :items="items"
            :fields="fields"
            column-filter
            table-filter
            items-per-page-select
            :items-per-page="5"
            hover
            sorter
            pagination
          >
          <template #status="{item}">
            <td>
              <CBadge :color="getBadge(item.status)">
                {{item.status}}
              </CBadge>
            </td>
          </template>
          <template #show_details="{item}">
             <td class="py-2 text-center d-flex">
                <CButton
                   color="info"
                  square
                  class="btn-sm"
                  @click="updateData(item)"
                >
                  Edit
                
                </CButton>
             
              &nbsp;&nbsp;
                <CButton
                  square
                  color="danger"
                  class="btn-sm"
                  @click="deleteData(item)"
                >
                  Delete
                </CButton>
              </td>
          </template>
          <template #details="{item}">
            <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
              <CCardBody>
                <CMedia :aside-image-props="{ height: 102 }">
                  <h4>
                    {{item.username}}
                  </h4>
                  <p class="text-muted">User since: {{item.registered}}</p>
                  <CButton size="sm" color="info" class="">
                    User Settings
                  </CButton>
                  <CButton size="sm" color="danger" class="ml-1">
                    Delete
                  </CButton>
                </CMedia>
              </CCardBody>
            </CCollapse>
          </template>
        </CDataTable>  
      </CCardBody>
      <my-modal></my-modal>
    </CCard>
    
</template>
<script>
import { mapActions } from 'vuex';

import BarangService from "../services/barang/BarangService" 
import { AlertUtils } from "../services/AlertUtils";
import ModalPermintaan from './ModalPermintaan.vue'
const fields = [
  { key: 'kode', _style:'min-width:200px' },
  { key: 'nama', label : 'Nama', _style:'min-width:100px;' },
  { key: 'lokasi', _style:'min-width:100px;' },
  { key: 'status', _style:'min-width:100px;' },
  { 
    key: 'show_details', 
    label: '', 
    _style: 'width:1%', 
    sorter: false, 
    filter: false
  }
]

export default {
  mixins : [AlertUtils],
  components: {
        'my-modal': ModalPermintaan,
  },
  name: 'AdvancedTables',
  data () {
    return {
      items: [],
      fields,
      details: [],
      collapseDuration: 0
    }
  },
  mounted() {
    this.getData();
  },
  computed : {

  },
  methods: {
    ...mapActions(['getDetailBarang']),
  
    deleteData(item) {
      var vm = this;
      this.$swal
        .fire({
          title: "Peringatan!",
          text: "Apakah anda yakin ingin menghapus data ini ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya",
          cancelButtonText: "Tidak",
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          reverseButtons: true,
        })
        .then((result) => {
        if (result.value) {
          BarangService.deleteData(item.id)
            .then((response) => {
              vm.alertDeleteSuccess();
              vm.getData()
            })
            .catch((error) => {
              this.alertError();
              vm.getData()
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.$swal.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
    },
    updateData(item) {
      this.$router.push({ path : '/dashboard/edit-barang/'+item.id})
    },
    tambahBarang() {
      this.$router.push( { path : '/dashboard/tambah-barang'})
    },
    getData() {
      let loader = this.$loading.show({
          // Optional parameters
          container: this.fullPage ? null : this.$refs.formContainer,
          canCancel: true,
          onCancel: this.onCancel,
      });
      BarangService.getData()
      .then(response => {
        loader.hide();
        this.items = response.data.data
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