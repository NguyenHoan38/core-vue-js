<template>
  <div class="login-wrap">
    <div class="login-content">
      <div class="login-img">
        <!-- <img :src="imgLogo" alt="Logo"> -->
      </div>
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  { required: true, message: 'Xin vui lòng nhập email!' },
                  { type: 'email', message: 'Định dạng email chưa đúng' },
                ],
              },
            ]"
            placeholder="Email"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: 'login.password_required' }],
              },
            ]"
            type="password"
            placeholder="Password"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="[
              'remember',
              { valuePropName: 'checked', initialValue: true },
            ]"
            >{{ "login.remember_me" }}</a-checkbox
          >
          <a class="login-form-forgot" href="">Forgot password</a>
          <a-button
            type="primary"
            html-type="submit"
            :loading="loading"
            class="login-form-button"
            >Login</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import 'ant-design-vue/dist/antd.css'
// const imgLogo = require('./../../assets/images/logo.png')
// import { notification } from 'ant-design-vue';
// import { getRole } from '@/modules/users/roles/_api/'
// import { saveAuthPers, saveAuthRoleDetail } from '@/utils/jwt'
// import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'

export default {
  name: 'Login',
  data () {
    return {
      // imgLogo,
      loading: false,
      connection: null
    }
  },
  head: {
    title: function () {
      return {
        inner: this.$t('login.title')
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      const self = this
      self.loading = true
      self.form.validateFields(async (err, values) => {
        if (!err) {
          const { password } = values
          const userName = values.email
          const loginToken = await self.$store.dispatch('auth/authLogin', {
            userName,
            password
          })
          if (loginToken) {
            const actions = [
              self.$store.dispatch('auth/fetchUser', loginToken),
              self.$store.dispatch('auth/getAllRoleModule'),
              self.$store.dispatch('auth/getRoles')
            ]
            // loginToken && await self.$store.dispatch('auth/fetchUser', loginToken);
            // loginToken && await self.$store.dispatch('common/getAllRoleModule');
            // self.$router.push({path: self.$route.query.redirect || '/books'})
            Promise.all(actions).then((res) => {
              res[0] && self.setInfoAuth(res[0])
              // self.connectSignalr(loginToken)
            })
          }
          self.loading = false
        } else {
          self.loading = false
        }
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.login-wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background: #97e4d7;

  .login-content {
    max-width: 420px;
    margin: 0 auto;

    @media screen and (max-width: 575px) {
      max-width: 90vw;
    }
  }

  .login-img {
    margin-bottom: 20px;
    text-align: center;

    img {
      max-width: 110px;
    }
  }

  .login-form {
    background: #fff;
    padding: 25px 15px 15px;
  }
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
