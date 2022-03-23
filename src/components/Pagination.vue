<template>
  <div>
    <paginate
        v-if="totalPage > 1"
        v-model="pageActive"
        :page-count="totalPage"
        :page-range="3"
        :margin-pages="2"
        :click-handler="clickCallback"
        :prev-text="`<i class='fas fa-angle-left'></i>`"
        :next-text="`<i class='fas fa-angle-right'></i>`"
        :container-class="'pagination'"
        :page-class="'page-item'">
    </paginate>
  </div>
</template>

<script>
    import Paginate from 'vuejs-paginate'

    export default {
        data() {
            return {
                pageActive: 1
            }
        },
        props: [
            "totalPage",
            "page"
        ],
        watch: {
            page(newVal, oldVal) {
                this.pageActive = newVal
            }
        },
        mounted() {
          this.pageActive = 1
        },
        methods:{
            clickCallback (pageNum) {
                this.$emit("eventPagination", pageNum)
            },
        }
    }
</script>
<style lang="css" scoped>
    .pagination {
        position: relative;
        border: 1px solid black;
    }
    .pagination ul a {
        padding: 10px !important;
    }
    .page-item {
        width: 25px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        border: 1px solid #40505E;
    }
</style>