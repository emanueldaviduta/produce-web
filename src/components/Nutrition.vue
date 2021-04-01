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
      <p v-if="messageInfo != undefined">{{ messageInfo }}</p>
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
      this.vitaminsClone = this.selectedProduct.vitaminsDetails;
    },
    save(product) {
      // verify vitamins
      this.removeProduceDifference(product);
      this.addProduceDifference(product);
      // update produce
      db.collection("Produce")
        .doc(product.id.toString())
        .set(product)
        .then(() => {
          this.initProducts();
          this.showInfo("Produce updated");
        })
        .catch((error) => {
          this.messageInfo = error.message;
        });
    },
    deleteProduct() {
      db.collection("Produce")
        .doc(this.selectedProduct.id.toString())
        .delete()
        .then(() => {
          this.initProducts();
          this.showInfo("Produce deleted");
          this.selectedProduct = {};
        });
    },
    addProduct() {
      const maxId = this.dumpData.length > 0 ? Math.max.apply(Math, this.dumpData.map((o) =>  o.id)) : 0;
      this.selectedProduct = { id: maxId + 1, vitamins: [] };
    },
    addProduceDifference(product) {
      const dff = this.arr_diff(
        this.vitaminsClone.map((x) => x.vitaminId),
        product.vitamins
      );
      if (dff && dff.length > 0) {
        dff.forEach((item) => {
          db.collection("ProduceVitamins").add({
            produceId: parseInt(product.id, 10),
            vitaminId: parseInt(item, 10),
          });
        });
      }
    },
    removeProduceDifference(product) {
      const toDelete = this.vitaminsClone.filter(
        (x) => product.vitamins.indexOf(x.vitaminId) == -1
      );
      if (toDelete && toDelete.length > 0) {
        toDelete.forEach((element) => {
          db.collection("ProduceVitamins").doc(element.id).delete();
          this.vitaminsClone.splice(this.vitaminsClone.indexOf(element), 1);
        });
      }
    },
    showInfo(msg) {
      setTimeout(() => {
        this.messageInfo = msg;
      }, 3000);
    },
    initProducts() {
      // Product  1 -> vegetable; 2 -> fruit
      db.collection("Produce")
        .get()
        .then((querySnapshot) => {
          const arr = [];
          querySnapshot.forEach((doc) => {
            const obj = doc.data();
            obj.id = doc.id;
            arr.push(obj);
          });
          this.dumpData = arr;
          this.products = arr;
          
          this.selectedProduct = this.products[0];
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
              id: rt.id,
              vitaminId: rt.data().vitaminId,
              produceId: rt.data().produceId,
            });
          });
          this.dumpData.forEach((it) => {
            const std = arr.filter((x) => x.produceId === parseInt(it.id, 10));
            it.vitaminsDetails = std;
            it.vitamins = std.map((d) => d.vitaminId);
          });
          this.products = this.dumpData;
        });
    },
    arr_diff(a1, a2) {
      var a = [],
        diff = [];
      for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
      }
      for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
          delete a[a2[i]];
        } else {
          a[a2[i]] = true;
        }
      }
      for (var k in a) {
        diff.push(k);
      }
      return diff;
    },
  },
  data() {
    return {
      products: [],
      dumpData: [],
      selectedProduct: Object,
      vitaminsClone: [],
      messageInfo: null,
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