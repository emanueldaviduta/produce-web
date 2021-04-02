<template>
  <div class="login-box">
    <div>
      <img class="logo" src="../assets/logo.png" />
    </div>
    <form class="form-box" @submit.prevent="login">
      <input
        class="form-input"
        type="email"
        required
        v-model="email"
        placeholder="Email"
      />
      <input
        class="form-input"
        type="password"
        required
        v-model="password"
        placeholder="Password"
      />
      <p v-if="errorMsg != null" class="error-msg">{{ errorMsg }}</p>
      <input class="form-btn form-input" type="submit" value="SignIn" />
      <input
        class="form-btn form-input"
        type="button"
        value="SignUp"
        @click="signUp"
      />
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
  created() {
    this.setAuthUser();
  },
  methods: {
    setAuthUser() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.authUser = user.user;
          this.$router.push("/home");
        } else {
          // No user is signed in.
        }
      });
    },
    login() {
      this.errorMsg = null;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          this.authUser = userCredential.user;
          this.$router.push("/home");
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
          this.$router.push("/home");
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
  display: inline-block;
}
.error-msg {
  color: red;
  font-size: 12px;
}
</style>