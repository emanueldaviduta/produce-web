<template>
  <div class="navbar-box">
    <img src="../assets/logo.png" />
    <ul class="navbar">
      <!-- <li @click="goTo(1)">First Page</li> -->
      <li @click="goTo(2)">Produce</li>
      <li @click="goTo(3)">Vitamins</li>
      <li @click="goTo(4)">Table</li>
      <li @click="logout">Logout</li>
    </ul>
  </div>
  <div id="sect2">
    <Nutrition />
  </div>
  <hr />
  <div id="sect3">
    <Vitamins />
  </div>
  <hr />
  <div id="sect4">
    <Table />
  </div>
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
    Vitamins,
  },
  methods: {
    goTo(ind) {
      const myElement = document.getElementById("sect" + ind);
      const topPos = myElement.offsetTop;
      document.body.scrollTop = topPos;
      document.documentElement.scrollTop = topPos - 71; //navbar
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.authUser = null;
          this.$router.push("/login");
        });
    },
  },
};
</script>