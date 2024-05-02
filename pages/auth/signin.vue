<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-card width="450" class="mx-auto card-border" outlined>
      <v-img src="../logo.png" max-height="100" contain class="my-5"></v-img>
      <p class="que-text">SNC Queuing System</p>
      <div class="hr-sect mx-15 my-5">Login</div>
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit()" class="mx-15">
        <v-text-field
          v-model="username"
          :rules="usernameRules"
          label="Username"
          prepend-inner-icon="mdi-account"
          outlined
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          type="password"
          prepend-inner-icon="mdi-lock"
          outlined
          required
        ></v-text-field>
        <v-btn
          :disabled="isLoading"
          :loading="isLoading"
          color="primary"
          block
          type="submit"
        >
          Sign In
        </v-btn>
      </v-form>
      <div class="my-4 text-center">
        <NuxtLink to="/register" class="nuxt-link">Create an account</NuxtLink>
      </div>
      <div class="version-text mb-4">version 1.0.0.1</div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'auth',
  middleware: 'auth',
  auth: 'guest',
  data() {
    return {
      valid: true,
      username: '',
      password: '',
      isLoading: false,
      usernameRules: [
        (v) => !!v || 'Username is required',
        //(v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [(v) => !!v || 'Password is required'],
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        // console.log("Successfully Login");
        // this.$router.push("/");
        this.login(this.username, this.password)
      }
    },

    login(username, password) {
      this.$auth
        .loginWith('local', {
          data: {
            identifier: username,
            password: password,
          },
        })
        .then((res) => {
          console.log('User Profile', res.data.user)
          console.log('User token', res.data.jwt)
        })
        .catch((error) => {
          console.log(error)
          if (error.response.data) {
            console.log(error.response.data.error.message)
            alert(error.response.data.error.message)
            this.isLoading = false
            this.isSignInDisabled = false
          }
        })
    },
  },
}
</script>
<style scoped>
.nuxt-link {
  text-decoration: none;
  padding-top: 5px;
}
.card-border {
  border-radius: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.hr-sect {
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: rgba(0, 0, 0, 0.7);
  font-weight: bold;
  margin: 8px 0;
}
.hr-sect::before,
.hr-sect::after {
  content: '';
  flex-grow: 1;
  background: rgba(0, 0, 0, 0.15);
  height: 1px;
  font-size: 0;
  line-height: 0;
  margin: 0 8px;
}
.que-text {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.7);
}
.version-text {
  text-align: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}
</style>