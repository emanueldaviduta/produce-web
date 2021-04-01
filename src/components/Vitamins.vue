<template>
  <div class="vitamin-container">
    <div class="vitamins-list">
      <ul>
        <li :key="vitamin.id" v-for="vitamin in vitamins">
          <span @click="vitaminClick(vitamin.id)">{{ vitamin.name }}</span>
        </li>
      </ul>
    </div>
    <div class="produce-list">
      <ul>
        <li :key="produce.id" v-for="produce in produces">
          {{ produce.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { db } from "../main";
export default {
  props: {
    vitamins: Array,
  },
  data() {
    return { vitamins: [], produces: [] };
  },
  created() {
    this.initVitamins();
  },
  methods: {
    vitaminClick(vitaminId) {
      db.collection("Produce")
        .where("vitaminId", "==", vitaminId)
        .get()
        .then((qs) => {
          qs.forEach((doc) => {
            this.produces.push({
              id: doc.id,
              name: doc.data().name,
            });
          });
        });
    },
    initVitamins() {
      db.collection("Vitamins")
        .get()
        .then((qs) => {
          qs.forEach((doc) => {
            this.vitamins.push({
              id: doc.id,
              name: doc.data().name,
            });
          });
        });
    },
  },
};
</script>
<style>
.vitamin-container {
  height: calc(100vh - 71px);
  display: flex;
}
.buttons {
  text-align: center;
  display: flex;
}
.vitamins-list {
  width: 30%;
  margin-right: 1px solid #ccc;
}
.produce-list {
  width: 70%;
}
.vitamins-list ul {
  margin: 60px;
}
.vitamins-list li {
  cursor: pointer;
  color: black;
  font-size: 30px;
  font-family: inherit;
  font-weight: bold;
}
li {
  list-style-type: none;
}
</style>