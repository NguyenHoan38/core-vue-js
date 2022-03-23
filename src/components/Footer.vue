<template>
	<footer v-if="!showFooter">
		<div class="footer-top">
			<div class="container box">
				<div class="row">
					<div class="col-lg-4 col-md-6 col-sm-6">
						<div class="inner-img">
							<a href="" title=""><img src="@/assets/img/logo.png" alt=""></a><br>
							<span>Chúng tôi có một nền tảng cơ sở dữ liệu về: Sách giáo khoa, sách tham khảo, các bộ đề, hướng dẫn gải, công cự lớp học online,... phục vụ việc học và nghiên cứu kiến thức cho cả học sinh và giáo viên các cấp</span>
						</div>
					</div>
					<div class="col-lg-8 col-md-6 col-sm-6">
						<div class="row">
							<div class="col-lg-3 col-md-3 col-sm-6">
								<ul>
									<li>
										<router-link :to="{ name: 'home' }">
											Home
										</router-link>
									</li>
									<li><a href="#" title="">Học sinh</a></li>
									<li><a href="#" title="">Giáo viên</a></li>
								</ul>
							</div>
							<div class="col-lg-3 col-md-3 col-sm-6">
								<ul>
									<li>
										<router-link :to="{ name: 'page-about' }">
											Giới thiệu
										</router-link>
									</li>
									<li><a href="" title="">Bài viết</a></li>
									<li><a href="" title="">Đội ngũ Góc học tập</a></li>
									<li><a href="" title="">Ban Biên tập</a></li>
									<li><a href="" title="">Premium</a></li>
									<li><a href="" title="">Cộng tác viên</a></li>
									<li><a href="" title="">Đối tác của chúng tôi</a></li>
									<li><a href="" title="">Tuyển dụng</a></li>
								</ul>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6">
								<ul>
									<li>
										<router-link :to="{ name: 'page-support' }">
											Hỗ trợ
										</router-link>
									</li>
									<li><a href="" title="">Trung tâm trợ giúp</a></li>
									<li><a href="" title="">Tài khoản Học sinh</a></li>
									<li><a href="" title="">Tài khoản Giáo viên</a></li>
									<li><a href="" title="">Premium</a></li>
									<li><a href="" title="">Chính sách & điều khoản</a></li>
									<li><a href="" title="">Chính sách bảo mật</a></li>
								</ul>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6">
								<ul>
									<li><span>Tải về</span></li>
									<li><a href="" title="">IOS</a></li>
									<li><a href="" title="">Android</a></li>
									<li><a href="" title=""> </a></li><br>
									<li><span>Liên hệ</span></li>
									<li><a href="" title="">Gmail</a></li>
									<li><a href="" title="">Facebook</a></li>
								</ul>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="footer-bottom">
			<div class="container">
				<div class="row">
					<div class="col-12">
						<span>© Copyright Study Hub - Nhà xuất bản Giáo dục</span>
					</div>
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
				showFooter: true
			};
		},
		watch: {
			'$route': 'checkDisplayFooter'
		},
		methods: {
			checkDisplayFooter() {
				this.showFooter = this.$router.history.current.meta.hideFooter || this.$router.history.current.meta.public ? true : false;
			}
		}
	};
</script>

<style lang="scss" scoped>
</style>