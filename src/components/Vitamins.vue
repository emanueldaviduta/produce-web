<template>
  <div class="vitamin-container">
    <div class="vitamins-list">
      <h2>Vitamins</h2>
      <ul>
        <li :key="vitamin.id" v-for="vitamin in vitamins">
          <span @click="vitaminClick(vitamin)">{{ vitamin.name }}</span>
        </li>
      </ul>
    </div>
    <div class="produce-list">
      <h2>Produces with vitamin: {{ currentVitamin.name }}</h2>
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
    vitamins: [],
    currentVitamin: {},
  },
  data() {
    return { vitamins: [], produces: [], currentVitamin: {} };
  },
  created() {
    this.initVitamins();
  },
  methods: {
    vitaminClick(vitamin) {
      this.currentVitamin = vitamin;
      db.collection("ProduceVitamins")
        .where("vitaminId", "==", parseInt(vitamin.id, 10))
        .get()
        .then((qs) => {
          this.produces = [];
          const arr = [];
          qs.forEach((dr) => {
            arr.push(dr.data().produceId);
          });
          if (arr.length > 0) {
            db.collection("Produce")
              .where("id", "in", arr)
              .get()
              .then((data) => {
                data.forEach((doc) => {
                  this.produces.push({
                    id: doc.id,
                    name: doc.data().name,
                  });
                });
              });
          }
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
  padding: 5%;
}
.buttons {
  text-align: center;
  display: flex;
}
.vitamins-list {
  width: 30%;
  border-right: 1px solid #ccc;
  padding: 15px;
  height: 100%;
  overflow: auto;
  text-align: center;
}
.produce-list {
  width: 70%;
  padding: 15px;
}
.produce-list ul {
  width: 90%;
  margin: 20px auto;
}
.vitamins-list ul {
  margin: 30px;
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