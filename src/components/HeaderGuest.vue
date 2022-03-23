<template>
  <header>
		<div class="menu-pc">
			<div class="container-fluid">
				<div class="row">
					<div class="col-lg-2">
						<div class="inner-img">
							<router-link :to="{ name: 'home' }">
								<img src="@/assets/img/taphuan_logo.png" alt="">
							</router-link>
						</div>
					</div>
					<div class="col-lg-10">
						<nav>
							<ul class="nav justify-content-end">
								<li
									v-for="(item, index) in navigations"
									:key="index"
									class="nav-item"
								>
									<router-link :to="item.route" :class="'nav-link' + (($route.name == item.route.name ) ? ' active' : '')">{{ item.label }}</router-link>
								</li>
                  <li class="nav-separator"></li>
							    <li class="nav-item nav-auth">
									<router-link to="/dang-nhap" exact><button class="btn btn-primary btn-login">Đăng nhập</button></router-link>
								</li>
                  <li class="nav-item nav-auth">
									<router-link to="/dang-ky" exact><button class="btn btn-primary btn-register" >Đăng ký</button></router-link>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</div>
		<div class="menu-mb">
			<div class="container-fluid box">
				<div class="row">
					<div class="col-1">
						<div class="inner-menu js-btn-menu">
							<!-- <i class="fa fa-align-justify"></i> -->
							<div class="menus"></div>
						</div>
					</div>
					<div class="col-9">
						<div class="inner-img">
							<img src="@/assets/img/logo.jpg" alt="">
						</div>
					</div>
				</div>
			</div>
			<div class="nav-menu js-menu">
				<div class="title">MENU</div>
				<nav>
					<ul>
						<li><a href="HS_EBook.html" class="" title="">E-Book</a></li>
						<li><a href="" class="" title="">Luyện tập</a></li>
						<li><a href="HS_De_thi.html" class="" title="">Đề thi</a></li>
						<li><a href="" class="" title="">Lớp học</a></li>
						<li><a href="" class="" title="">Hỏi đáp</a></li>
					</ul>
				</nav>
			</div>
			<div class="js-background-overlay"></div>
		</div>
	</header>
</template>

<script>
import { mapActions, mapState } from 'vuex'
//import { checkResponse, get, post } from "@/utils/http"
 // import { VFBLogin as VFacebookLogin } from 'vue-facebook-login-component'
 // import GoogleLogin from 'vue-google-login'
// import moment from 'moment'

export default {
  name: 'HeaderGuest',
  // components: {
     // VFacebookLogin,
     // GoogleLogin
  // },
	data() {
		return {
      params: {
        nextUrl: this.$route.params.nextUrl
      },
			navigations: [
				{
					label: 'Home',
					route: {
					name: 'home'
					}
				},
				{
					label: 'Giới thiệu',
					route: {
					name: 'page-about'
					}
				},
				{
					label: 'Hỗ trợ',
					route: {
          name: 'page-support'
          }
				}
      ],
      
      show: true,
      
		}
  },
  computed: {
    ...mapState('auth', ['isLoggedIn', 'isLoading', 'errors', 'user'])
  },
  methods: {
    ...mapActions(`auth`, ['authLogin', 'authRegister', 'authLoginFacebook', 'authLoginGoogle','authLogout']),
  }
}
</script>

<style lang="scss" scoped>

.nav-separator {
  display: inline-block;
  border-left: 1px solid #8597a5;
  height: 32px;
  margin: 10px 12px 0;
}
.nav-auth {
  margin: 0px 6px 10px 6px;
    .btn-login{
        height: 30px;
        line-height: 15px;
        font-size: 14px;
        padding-left: 15px;
        padding-right: 15px;
    }
    .btn-register{
        background-color: #e1efff;
        border: 1px solid #e1efff;
        color: #124ABE;
        height: 30px;
        line-height: 15px;
        font-size: 14px;
        padding-left: 15px;
        padding-right: 15px;
    }
  .nav-link {
    background: #ddecfe;
    border: none;
    border-radius: 24px;
    color: #163fb3;
    line-height: 24px;
    padding: 2px 20px;

    &:hover, &.active {
      background: #163fb3;
      color: #fff;

      &:before {
        border: none;
      }
    }
  }
}
.btn{
    height: 32px;
    font-size: 13px;
    font-weight: 500;
}
.auth__input {
  background: #e9ecef;
  border: none;
  border-radius: 1.5rem;
  margin-bottom: 1.5rem;

  &--right {
    text-align-last: right;
  }
}

.auth__btn {
  background: #163fb3;
  border: none;
  border-radius: 1.5rem;
  margin-bottom: 1.5rem;
}

.auth__separator {
  position: relative;
  border-bottom: 1px solid #e9ecef;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;

  span {
    position: absolute;
    top: 0.3rem;
    left: calc(50% - 2.5rem);
    display: inline-block;
    width: 5rem;
    background: #fff;
    // color: #879AA9;
  }
}

</style>

<style lang="scss" scoped>
.tabs {
  .nav-item {

    .nav-link {
      border: none;
      border-bottom: 3px solid transparent;
      // color: #8597a5;
      font-size: 13px;

      &.active {
        color: #163fb3;
        border-bottom: 3px solid #163fb3;
      }
    }
  }
}
</style>