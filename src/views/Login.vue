<template>
  <div class="login-box">
    <div>
      <img class="logo" src="../assets/logo.png" />
    </div>
    <form class="form-box" @submit.prevent="login">
      <input type="email" required v-model="email" placeholder="Email" />
      <input
        type="password"
        required
        v-model="password"
        placeholder="Password"
      />
      <span v-if="errorMsg != null" class="error-msg">{{ errorMsg }}</span>
      <input class="form-btn" type="submit" value="SignIn" />
      <input class="form-btn" type="button" value="SignUp" />
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return { authUser: null, email: null, password: null, errorMsg: null };
  },
  watch: {
    $route: "setAuthUser",
  },
  created(){
      this.authUser = firebase.auth().currentUser;
  },
  methods: {
    setAuthUser() {
      this.authUser = firebase.auth().currentUser;
    },
    login() {
      this.errorMsg = null;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          this.authUser = userCredential.user;
          this.$router.push('/home');
        })
        .catch((error) => {
          this.errorMsg = error.message;
        });
    },
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          this.authUser = userCredential.user;
        })
        .catch((error) => {
          this.errorMsg = error.code + " - " + error.message;
        });
    },
  },
};
</script>

<style>
.logo {
  margin: 0 50px;
}
.login-box {
  width: 300px;
  margin: 150px auto;
}
.form-box input {
  margin: 5px 0;
}
.form-btn {
  width: 50%;
  display: inline-block;
}
.error-msg {
  color: red;
  font-size: 12px;
}
</style>