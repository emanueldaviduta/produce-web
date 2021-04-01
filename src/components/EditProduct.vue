<template>
  <form @submit.prevent="handleSubmit">
    <label class="form-label">Id:</label>
    <input
      class="form-input"
      type="number"
      required
      v-model="produce.id"
      readonly
    />

    <label class="form-label">Name:</label>
    <input
      class="form-input"
      type="text"
      required
      v-model="produce.name"
      :readonly="false"
    />

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
          @change="checkVitamin($event)"
        />
        <label for="vitamin.id">{{ vitamin.name }}</label
        ><br />
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
      id: {
        type: Number,
        default: 0,
      },
      name: {
        type: String,
        default: "",
      },
      categoryId: {
        type: Number,
        default: 1,
      },
      vitamins: {
        type: String,
        default: "",
      },
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("save-product", this.produce);
    },
    remove() {
      this.$emit("remove");
    },
    checkVitamin(ev, id) {
      console.log(this.produce.vitamins);
      // 	  if (ev.currentTarget) {
      //     this.produce.vitamins.push(id);
      //   } else {
      //     this.produce.vitamins = this.produce.vitamins.filter((x) => x != id);
      //   }
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
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
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