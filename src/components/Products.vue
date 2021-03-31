<template>
  <div style='height: 80vh'>
    <div :key="product.id" v-for="product in products">
      <Product
        @product-clicked="$emit('product-clicked', product.id)"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import Product from "./Product";
import { db } from "../main";
export default {
  components: {
    Product,
  },
  props: {
    products: Array,
  },
  data() {
    return { products: [] };
  },
  created() {
    // Product Type 1 -> vegetable Type 2 -> fruit
    db.collection("Produce")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.products.push({
            id: doc.id,
            name: doc.data().name,
            type: doc.data().categoryId,
          });
        });
      });
  },
  emits: ["product-clicked"],
};
</script>