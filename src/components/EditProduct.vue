<template>
  <form @submit.prevent="handleSubmit">
    <label class="form-label">Name:</label>
    <input class="form-input" type="text" required v-model="produce.name" />

    <label class="form-label">Type:</label>
    <select
      class="form-input"
      required
      v-model="produce.categoryId"
      :disabled="false"
    >
      <option value="1">Vegetable</option>
      <option value="2">Fruit</option>
    </select>

    <label class="form-label">Vitamins:</label>
    <div>
      <div
        class="vitamin-row"
        :key="vitamin.id"
        v-for="vitamin in vitaminsData"
      >
        <input
          type="checkbox"
          id="vitamin.id"
          name="vitamin.name"
          :value="vitamin.id"
          v-model="produce.vitamins"
        />
        <label for="vitamin.id">{{ vitamin.name }}</label
        ><br />
      </div>
    </div>

    <div>
      <div class="input-half">
        <label class="form-label">Calories:</label>
        <input class="form-input" type="number" v-model="produce.calories" />
      </div>

      <div class="input-half">
        <label class="form-label">Proteins:</label>
        <input class="form-input" type="number" v-model="produce.proteins" />
      </div>

      <div class="input-half">
        <label class="form-label">Lipid:</label>
        <input class="form-input" type="number" v-model="produce.lipid" />
      </div>

      <div class="input-half">
        <label class="form-label">Carbohydrat:</label>
        <input class="form-input" type="number" v-model="produce.carbohydrat" />
      </div>

      <div class="input-half">
        <label class="form-label">Fiber:</label>
        <input class="form-input" type="number" v-model="produce.fiber" />
      </div>
    </div>

    <div id="product-edit-buttons">
      <div>
        <button class="product-edit-btn">Save</button>
        <button class="product-edit-btn" @click.prevent="remove()">
          Remove
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { db } from "../main";
export default {
  props: {
    produce: {
      id: 0,
      name: "",
      categoryId: 0,
      vitamins: [],
      calories: 0,
      proteins: 0,
      lipid: 0,
      carbohydrat: 0,
      fiber: 0,
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("save-product", this.produce);
    },
    remove() {
      this.$emit("remove");
    },
    initVitamins() {
      db.collection("Vitamins")
        .get()
        .then((qs) => {
          qs.forEach((doc) => {
            this.vitaminsData.push({
              id: doc.id,
              name: doc.data().name,
            });
          });
        });
    },
  },
  data() {
    return { vitaminsData: [] };
  },
  created() {
    this.initVitamins();
  },
};
</script>

<style>
form {
  max-width: 420px;
  margin: 0px auto 30px;
  background: white;
  text-align: left;
  padding: 0 40px;
  border-radius: 10px;
}
.form-label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
.form-input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
.vitamin-row {
  display: flex;
  width: 50%;
  display: inline-block;
}
.vitamin-row input {
  margin: 5px;
}
.input-half {
  width: 50%;
  display: inline-block;
  padding-right: 20px;
}

#product-edit-buttons {
  text-align: center;
  margin-top: 10px;
}

.product-edit-btn {
  font-size: 14px;
  background: #a2a2a2;
  color: #fff;
  border: none;
  margin: 5px;
  padding: 5px;
  cursor: pointer;
  text-decoration: none;
  font-family: inherit;
}
</style>