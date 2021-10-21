<template>
    <CModal
      title="Modal title"
      color="warning"
      :show.sync="modal"
    >

    {{ detailPermintaan }}
     
    </CModal>
</template>
<script>
import { mapGetters } from 'vuex';
 

export default {
 computed : {
    ...mapGetters({
        detailPermintaan: 'getPermintaan',
        modal: 'getModal',
    }),
  },
}
</script>
