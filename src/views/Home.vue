<template>
  <div class="navbar-box">
    <img src="../assets/logo.png" />
    <ul class="navbar">
      <li>First Page</li>
      <li>Produce</li>
      <li>Vitamins</li>
      <li @click="logout">Logout</li>
    </ul>
  </div>
  <Nutrition />
  <hr />
  <Vitamins />
  <hr />
  <Table />
</template>
<script>
import Nutrition from "../components/Nutrition";
import Table from "../components/Table";
import Vitamins from "../components/Vitamins";
import firebase from "firebase/app";
import "firebase/auth";

import { authUser } from "./Login";
export default {
  components: {
    Nutrition,
    Table,
    Vitamins
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.authUser = null;
        });
    },
  },
}
</script>