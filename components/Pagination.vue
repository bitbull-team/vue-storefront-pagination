<template>
  <div class="toolbar" v-if="pageNumber > 1">
    <p class="button"
       :class="{current: current === 1 }"
       @click="gotopage(current -1, $event)">
        <i class="material-icons arrow-left">keyboard_arrow_left</i>Prev
    </p>
    <p class="button"
       :class="{current: current === pageNumber }"
       @click="gotopage(current + 1, $event)">
        Next<i class="material-icons arrow-right">keyboard_arrow_right</i>
    </p>
    <div class="pagination">
      <span class="page"
        v-for="(page, key) in pages"
        :class="{current: page === current }"
        :key="key"
        @click="gotopage(page, $event)">
        {{ page }}
       </span>
    </div>
  </div>
</template>

<script>
  import { baseFilterProductsQuery } from '@vue-storefront/store/helpers'
  export default {
    name: 'pagination',
    data () {
      return {
        current: 1
      }
    },
    props: {
      perpage: {
        type: Number,
        required: true
      }
    },
    methods: {
      gotopage (page, event) {
        if (!event.target.classList.contains('current')) {
          let searchProductQuery = baseFilterProductsQuery(this.$store.state.category.current)
          this.$store.dispatch('category/products', {
            current: page, perPage: this.perpage,
            searchProductQuery: searchProductQuery
          }).then((res) => {
            this.current = page
          })
        }
      }
    },
    computed: {
      productsTotal () {
        return this.$store.state.product.list.total
      },
      pageNumber () {
        return Math.ceil(this.productsTotal/this.perpage)
      },
      pages () {
        return Array.from({length: this.pageNumber}, (v, k) => k +1)
      }
    }
  }
</script>

<style lang="scss" scoped>
.toolbar {
  padding: 20px 0;
}
.button {
    display: inline-block;
    border: 1px solid;
    font-size: 15px;
    padding: 2px 15px;
    margin: 5px;
    text-transform: uppercase;
    font-weight: bold;
    line-height: 1.5;
    cursor: pointer;
    &.current {
        cursor: auto;
        opacity: 0.4;
    }
}
.arrow-left {
    float:left;
}
.arrow-right {
    float: right;
}
.page {
    cursor: pointer;
    padding: 5px 3px;
    text-align: center;
    display: inline-block;
    margin: 0 3px;
  &.current {
     font-weight: bold;
     cursor: auto;
     border-bottom: 1px solid;
  }
}
</style>