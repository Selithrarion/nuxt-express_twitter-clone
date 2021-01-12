<template>
	<div class="login">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
          <div class="login__heading text-center">
            <v-icon large color="primary">mdi-twitter</v-icon>
            <p class="text-h5 font-weight-bold pt-10">Войти в Твиттер</p>
          </div>
          <v-form>
            <v-text-field
              v-model="registerLogin"
              filled
              label="Логин или Email"
              type="text"
              background-color="#f5f8fa"
            ></v-text-field>
            <v-text-field
              v-model="registerPassword"
              filled
              label="Пароль"
              type="password"
              background-color="#f5f8fa"
            ></v-text-field>

            <v-btn
              class="mx-auto"
              color="primary"
              rounded
              block
              :disabled="registerLogin === '' || registerPassword === ''"
              :loading="isLoading"
              @click="tryTologin"
            >Войти</v-btn
            >
          </v-form>
        </v-col>
      </v-row>
      <BaseVSnackbar :is-visible="snackbarError"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {mapActions} from 'vuex'

  export default Vue.extend({
    layout: 'empty',
    middleware: ['isNoAuth'],
    data() {
      return {
        registerLogin: '',
        registerPassword: '',
        isLoading: false,
        snackbarError: false,
      }
    },
    methods: {
      ...mapActions({
        login: 'login'
      }),
      async tryTologin() {
        this.isLoading = true
        try {
          const formData = {
            username: this.registerLogin,
            password: this.registerPassword
          }
          await this.login(formData)
          this.$router.push('/home')
        } catch (err) {
          this.isLoading = false
          this.snackbarError = true
          console.error(err)
        }
      }
    }
  })
</script>
