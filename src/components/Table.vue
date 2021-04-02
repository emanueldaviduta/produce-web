<template>
  <div class="table-box">
    <DataTable :value="produces">
      <template #header>
        <div class="table-header">
          Produces
          <Button icon="pi pi-refresh" @click="refreshData()"></Button>
        </div>
      </template>
      <Column field="name" header="Name" sortable="true"></Column>
      <Column header="Category" sortable="true">
        <template #body="produce">
          {{ produce.data.categoryId == 1 ? "Vegetable" : "Fruit" }}
        </template>
      </Column>
      <Column field="calories" header="Calories" sortable="true"></Column>
      <Column field="proteins" header="Proteins" sortable="true"></Column>
      <Column field="lipid" header="Lipid" sortable="true"></Column>
      <Column field="carbohydrat" header="Carbohydrat" sortable="true"></Column>
      <Column field="fiber" header="Fiber" sortable="true"></Column>
    </DataTable>
  </div>
</template>

<script>
import { db } from "../main";
export default {
  data() {
    return {
      produces: null,
    };
  },
  mounted() {
    db.collection("Produce")
      .get()
      .then((querySnapshot) => {
        const arr = [];
        querySnapshot.forEach((doc) => {
          const obj = doc.data();
          arr.push(obj);
        });
        this.produces = arr;
      });
  },
  methods: {
    refreshData() {
      db.collection("Produce")
        .get()
        .then((querySnapshot) => {
          const arr = [];
          querySnapshot.forEach((doc) => {
            const obj = doc.data();
            arr.push(obj);
          });
          this.produces = arr;
        });
    },
  },
};
</script>
<style scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.table-box {
  margin: 20px;
  border: 1px solid #ccc;
}

.product-image {
  width: 100px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>
