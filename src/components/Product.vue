<template>
  <div class="product" @click="onProductClick(product.id)">
    <!-- <img :src="'/img/' + product.img + '.jpg'" :alt="`${product.name}`" /> -->
    <!-- <img :src="require(`../assets/${product.img}.jpg`)" :alt="`${product.name}`" /> -->
    <div class="prod-text">{{ product.id }}. {{ product.name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  methods: {
    onProductClick(id) {
      this.$emit("product-clicked", id);
    },
  },
};
</script>

<style scoped>
.product {
  position: relative;
}
.prod-text {
  cursor: pointer;
  color: black;
  font-size: 18px;
  font-family: inherit;
}
.prod-text:hover{
	background-color: rgb(233, 233, 233);
}

img {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>