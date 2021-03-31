<template>
  <div id="app">
    <div v-if="true" class="navbar-box">
      <img src="./assets/logo.png" />
      <ul class="navbar">
        <li>First Page</li>
        <li>Administration</li>
        <li>About</li>
        <li @click="logout">Logout</li>
      </ul>
    </div>
    <Nutrition />
    <Table />
  </div>
  <div v-if="false" class="container">
    <Login />
  </div>
</template>

<script>
import Nutrition from "./components/Nutrition";
import Table from "./components/Table";
import Login from "./components/Login";
import { authUser } from "./components/Login";

export default {
  name: "App",
  components: {
    Nutrition,
    Login,
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
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Poppins", sans-serif;
}

.container {
  border-radius: 5px;
}
.navbar-box {
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
}
.navbar-box img {
  width: 65px;
  margin-left: 30px;
}
.navbar {
  display: flex;
}
.navbar li {
  padding: 10px 5px;
    margin: 10px 5px;
  list-style-type: none;
  cursor: pointer;
}
.navbar li:hover {
  background-color: rgb(223, 223, 223);
}
</style>
