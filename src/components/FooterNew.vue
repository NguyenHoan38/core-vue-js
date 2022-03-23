<template>
	<footer class="private-footer-new" v-if="!hideFooter">
		<div class="footer-bottom">
			<div class="row">
				<div class="col-lg-5">
					<h4 class="margin-0 footer__logo">
						<img src="@/assets/images/logo_footer.png" alt="Tập huấn">
					</h4>
					<!-- <div class="display-flex">  -->
						<!-- <div> -->
							<div class="footer-company font-sanpro-semibold font-size-16 primary-color-txt">
								Nhà xuất bản Giáo dục Việt Nam
							</div>
							<div class="footer-text font-size-14 font-sanpro secondary-color-txt">
								Địa chỉ: Số 81 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội
							</div>
							<div class="footer-text font-size-14 font-sanpro secondary-color-txt">
								Điện thoại: 024.38220801 - Fax: 024.39422010
							</div>
              <div class="footer-text__end"></div>
						<!-- </div> -->
						<!-- <div> -->
							<div class="footer-company font-sanpro-semibold font-size-16 primary-color-txt">
								Bộ phận hỗ trợ kỹ thuật nền tảng Tập huấn
							</div>
							<div class="footer-text font-size-14 font-sanpro secondary-color-txt">
								Điện thoại: 19004503 (08:00 - 17:00)
							</div>
							<div class="footer-text font-size-14 font-sanpro secondary-color-txt">
								Email: taphuansgk@nxbgd.vn
							</div>
						<!-- </div> -->
					<!-- </div> -->
				</div>
				<div class="col-lg-7">
					<ul class="ul-footer margin-0 p-0 justify-content-xl-end footer-link-info">
						<li><router-link :to="{name: 'page-about'}" class="title-ft font-size-16 font-sanpro-semibold">Giới thiệu</router-link></li>
						<li><router-link :to="{name: 'tro-giup'}" class="title-ft font-size-16 font-sanpro-semibold">Thông tin liên hệ</router-link></li>
						<li><router-link :to="{name: 'guidePage'}" class="title-ft font-size-16 font-sanpro-semibold">Hướng dẫn sử dụng </router-link></li>
						<!-- <li><router-link :to="{name: 'bao-mat'}" class="title-ft font-size-16 font-sanpro-semibold">Chính sách bảo mật</router-link></li>							 -->
					</ul>
					<div class="mt-2">
						<ul class="ul-footer margin-0 p-0 justify-content-xl-end">
							<li>
								<i class="fab fa-facebook-square footer-icon-facebk font-size-24"></i>&nbsp;
							</li>
							<li>
								<a href="mailto:hotro.th@aesgroup.edu.vn" class="primary-color" target="_blank"><i class="fas fa-envelope font-size-24"></i></a>
								<!-- <img src="@/assets/img/icon_email.png" alt="" style="height:16px;"> -->
							</li>
						</ul>
					</div>
				</div>
			</div>		
			<div class="row">
				<div class="col-12">
					<hr class="hr-css"/>
				</div>
			</div>			
			<div class="row copy-right">
				<div class="col-12 footer-text font-size-14 font-sanpro secondary-color-txt">
					© Copyright 2020 Tập huấn - Nhà xuất bản Giáo dục Việt Nam
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
	export default {
		name: 'Footer',
		data() {
			return {
				hideFooter: false
			};
		},
		watch: {
			'$route': 'checkDisplayFooter'
		},
		created() {
			this.checkDisplayFooter();
		},
		methods: {
			checkDisplayFooter() {
				// this.showFooter = this.$router.history.current.meta.hideFooter || this.$router.history.current.meta.public ? true : false;
				this.hideFooter = this.$router.history.current.meta.hideFooter ? true : false;
			}
		}
	};
</script>

<style lang="scss" scoped>
	// .__fix{
	// 	height: 30px;
	// 	line-height: 30px !important;
	// 	margin-top: -12px !important;
	// }
	.ul-footer li{
		list-style-type: none;
		// display: initial!important;
		color: #124abe;
		font-size: 14px;
		// line-height: 50px;
		font-weight: bold;
	}
	.ul-footer li .title-ft{
		color: #124abe !important;
		&:hover{
			color: #003096 !important;
		}
	}
	ul.ul-footer li:not(:last-child) {
		margin-right: 20px;
	}
	p.private-footer-new-p {
		font-size: 14px;
		color:#879AA9;
	}
	.hr-css{
		color:#E5E5EA;
	}
	.copy-right{
		padding-bottom: 30px;
	}
	.footer-company{
		margin-bottom: 2px;
	}
	.footer__logo {
		margin-bottom: 6px;
		img {
			max-height: 28px;
			margin-bottom: 5px;
		}
	}
	.footer-text{
		margin-bottom: 2px;

    &__end {
      margin-bottom: 10px;
    }
	}
	.footer-hr{
		margin-top: 15px;
		margin-bottom: 10px;
		border: 0;
		border-top: 2px solid rgba(0, 0, 0, 0.1);
	}

  .footer-link-info {
    li {
      line-height: 1.2;
    }
  }

  @media screen and ( max-width: 991px ) {
    .ul-footer {
      li {
        display: inline-block;  
      }
    }
    .footer-link-info {
      margin: 10px 0 0;
    }
  }
</style>