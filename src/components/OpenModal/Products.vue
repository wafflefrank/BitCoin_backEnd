<template>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>分類</td>
        <td>標題</td>
        <td class="text-right">200</td>
        <td class="text-right">100</td>
        <td>
          <span class="text-success">啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm">編輯</button>
            <button class="btn btn-outline-danger btn-sm">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Products',
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
    };
  },
  components: {
    // ProductModal,
  },
  methods: {
    getProducts() {
      this.$http
        .post('/testapi/backend/addValue', this.products)
        .then((res) => {
          if (res.data.code === 200) {
            console.log(res.data);
            this.products = res.data.products;
            this.pagination = res.data.pagination;

            console.log(res.data);
          } else {
            this.$swal.fire('註冊失敗', `${res.data.msg}`, 'error');
            console.log(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
          console.log('test');
        });
    },
    openModal() {
      this.tempProduct = {};
      const productComponent = this.$refs.ProductModal;
      productComponent.showModal();
    },
    updateProduct(item) {
      this.tempProduct = item;
      const productComponent = this.$refs.ProductModal;
      this.$http.post('/testapi/backend/addValue', { data: this.tempProduct }).then((res) => {
        console.log(res);
        productComponent.hideModal();
        this.getProducts();
      });
    },
  },
};
</script>
