<template>
  <div id="nutrition">
    <div class="container" id="vegetables">
      <div id="product-type-navbar">
        <button class="product-type-btn" @click="filterProducts()">All</button>
        <button class="product-type-btn" @click="filterProducts(1)">
          Vegetables
        </button>
        <button class="product-type-btn" @click="filterProducts(2)">
          Fruits
        </button>
      </div>
      <div id="product-list">
        <Products @product-clicked="productClicked" :products="products" />
      </div>
    </div>
    <div id="product-description-container">
      <button class="product-type-btn" @click="addProduct()">
        + Add product
      </button>
      <EditProduct
        v-if="selectedProduct"
        @remove="deleteProduct"
        @save-product="save"
        :produce="selectedProduct"
      />
    </div>
  </div>
</template>

<script>
import Products from "./Products";
import EditProduct from "./EditProduct";
import { db } from "../main";
export default {
  name: "Nutrition",
  components: {
    Products,
    EditProduct,
  },
  methods: {
    filterProducts(type) {
      if (!type) {
        this.products = this.dumpData;
      } else {
        this.products = this.dumpData.filter((p) => p.categoryId == type);
      }
    },
    productClicked(id) {
      this.selectedProduct = this.products.find((p) => p.id === id);
    },
    save(product) {
      console.log(product.vitamins);
      db.collection("Produce")
        .doc(product.id.toString())
        .set({ categoryId: product.categoryId, name: product.name })
        .then(() => {
          this.initProducts();
        });
    },
    deleteProduct() {
      db.collection("Produce")
        .doc(this.selectedProduct.id.toString())
        .delete()
        .then(() => this.initProducts());
    },
    addProduct() {
      const maxId = Math.max.apply(
        Math,
        this.dumpData.map(function (o) {
          return o.id;
        })
      );
      this.selectedProduct = { id: maxId + 1 };
    },
    initProducts() {
      // Product  1 -> vegetable; 2 -> fruit
      db.collection("Produce")
        .get()
        .then((querySnapshot) => {
          const arr = [];
          querySnapshot.forEach((doc) => {
            arr.push({
              id: doc.id,
              name: doc.data().name,
              categoryId: doc.data().categoryId,
            });
          });
          this.dumpData = arr;
          this.products = arr;
          this.initProduceVitamins();
        });
    },
    initProduceVitamins() {
      db.collection("ProduceVitamins")
        .get()
        .then((qs) => {
          const arr = [];
          qs.forEach((rt) => {
            arr.push({
              vitaminId: rt.data().vitaminId,
              produceId: rt.data().produceId,
            });
          });
          this.dumpData.forEach((it) => {
            it.vitamins = arr.filter((x) => x.produceId === it.id);
          });
          this.products = this.dumpData;
        });
    },
  },
  data() {
    return {
      products: [],
      dumpData: [],
      selectedProduct: Object,
    };
  },
  created() {
    this.initProducts();
  },
};
</script>

<style scoped>
#nutrition {
  display: flex;
  height: 100vh;
  margin-top: 71px;
}
#vegetables {
  width: 60%;
  overflow: auto;
  border-right: 1px solid #ccc;
}
#product-type-navbar,
#product-description-container {
  text-align: center;
}

.product-type-btn {
  font-size: 16px;
  background: #000;
  color: #fff;
  border: none;
  margin: 10px;
  padding: 15px;
  border-radius: 0;
  cursor: pointer;
  text-decoration: none;
  font-family: inherit;
}

.hide-btn {
  visibility: hidden;
}

#product-description-container {
  width: 40%;
}

#product-description-container #product-description-title h1 {
  text-align: center;
}

/* NAVBAR */

#navbar {
  background-color: #333;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
#navbar .topnav-left p {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}
#navbar .topnav-right p {
  float: right;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav-left p:hover,
.topnav-right p:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav-left p.active,
.topnav-right p.active {
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}
#navbar .topnav-right p img {
  width: 18px;
  height: 18px;
}
</style>