<template>
  <header class="header" v-if="!hiddenHeader">
    <div class="header__overlay" :class="{'menu-open': visibleMenuMobile}" @click="closeMenuMobile"></div>
    <div class="header-wrap display-flex-center justify-content-between">
      <div class="icon-menu-mobile" @click="openMenuMobile">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="header__logo">
        <a href="javascript:;" class="display-block" @click="directToLinkModule">
          <img src="@/assets/images/logo_nxb.png" alt="Tập huấn" />
        </a>
      </div>
      <div class="header__action display-flex-center">
        <ul class="header__nav margin-0 p-0" :class="{'menu-open': visibleMenuMobile}">
          <li
            v-for="(item, index) in navigations"
            :key="index"
            class="nav-item"
            v-if="authInfo && item.module.includes(authInfo.roleCode)"
          >
            <a
              href="javascript:;"
              v-if="item.not_email_public && authInfo.email === emailPublic"
              class="nav-link"
              @click="openFormLogin(item)"
            >{{ item.label }}</a>
            <router-link
              class="nav-link"
              :to="item.route"
              :class="{'active': subIsActive(item.active)}"
              @click.native="closeMenuMobile"
            >{{ item.label }}</router-link>
          </li>
        </ul>
        <div
          class="header__notification position-rel"
          v-if="authInfo.email != emailPublic"
          v-click-outside="hidenCollapseNoti"
        >
          <div
            class="icon-toggle"
            @click="toggleCollapseNoti"
            :class="{'active': openCollapseNoti  || this.$route.path =='/thong-bao'}"
          >
            <img src="@/assets/img/HS.png" alt="Notification" />

            <span class="header__notification__dot" v-if="numberNotify >0">
              {{numberNotify}}
              <!-- <span  :class="{'ping':!displayNotification}"></span> -->
            </span>
          </div>
          <b-collapse id="alert_notification" class="collapse" :visible="openCollapseNoti">
            <template v-if="notificationData && notificationData.length > 0">
              <vue-custom-scrollbar class="header__notification__collaspe">
                <div
                  class="item display-flex"
                  v-for="(item, index) of notificationData"
                  :key="`noti_${index}`"
                  @click="showInfoNoti(item, index)"
                  :class="{'background-isRead':!item.isRead}"
                >
                  <!-- <img src="@/assets/img/HS-2.jpg" alt="">
                  :src="items.avatar != null ? appUrl + items.avatar : thumbUrl('GV_Tap_huan-3.jpg')"-->
                  <img :src="item.avatar != null ? appUrl + item.avatar : thumbUrl('HS-2.jpg')" />
                  <div>
                    <!-- <span class="content font-size-14 primary_text_color"  v-if="item.notificationTypeId <pleaseLeaveSchool || item.notificationTypeId.includes([notiTeacherConfirm, agreeLearnSchool, agreeLearnJoinSchool])">
                      <b class="primary-color-txt font-sanpro-semibold">{{ item.name }}</b>
                      <br />
                      {{ item.title }}

                    </span> -->
                    <span class="content font-size-14 primary_text_color"  v-if=" item.notificationTypeId===confirmUpdatedInformatton">
                      <b class="primary-color-txt font-sanpro-semibold"> Giáo viên {{ item.name }}</b>
                      <br />
                         Đã cập nhật thông tin cá nhân. Nhà trường cần xác nhận để giáo viên sử dụng tài khoản.
                    </span>
                    <div class="display-flex display-flex-center selectio-notifi"  v-if=" item.notificationTypeId===confirmUpdatedInformatton">
                        <button
                        v-if="!item.isAcept && !item.isClickForm"
                        @click="confirmInfo(item)"
                        class="btn btn-main border-rd-20 btn-h-30 font-sanpro-semibold"
                        >Xác nhận</button>
                        <span v-if="item.isAcept">Đã xác nhận</span>
                        <span v-if="item.isClickForm && !item.isAcept">Đã yêu cầu chinh sửa</span>
                        <button   class="btn primary-color font-size-14" @click="showModalDetail(item)">
                         Xem chi tiết
                      </button>
                    </div>
                    <span class="content font-size-14 primary_text_color"  v-if=" item.notificationTypeId=== agreeUpdatedInformation">
                      <b class="primary-color-txt font-sanpro-semibold"> Trường {{ item.name }}</b>
                      <br />
                         xác nhận thông tin cá nhân của bạn. 
                    </span>
                    <!-- notificationTypeId=6 xin rời khói trường -->
                     <span class="content font-size-14 primary_text_color" v-else-if="item.notificationTypeId ===pleaseLeaveSchool">
                      <b class="primary-color-txt font-sanpro-semibold"> {{ item.name }}</b>
                      <br />
                      Xin rời khói trường {{item.schoolName}}
                    </span>
                    <span class="content font-size-14 primary_text_color" v-else-if="item.notificationTypeId === pleaseJoinSchool">
                      <b class="primary-color-txt font-sanpro-semibold">Giáo  viên {{ item.name }}</b>
                      <br />
                      Xin tham gia trường {{item.schoolName}}
                    </span>
                    <span class="content font-size-14 primary_text_color" v-else-if="item.notificationTypeId === pleaseTripForOfficals">
                      <b class="primary-color-txt font-sanpro-semibold"> {{ item.name }}</b>
                      <br />
                      Đã yêu cầu chuyển đơn vị công tác cho cán bộ
                    </span>
                    <span class="content font-size-14 primary_text_color" v-else-if="item.notificationTypeId === pleaseLeadFailureSchool">
                      <b class="primary-color-txt font-sanpro-semibold"> {{ item.name }}</b>
                      <br />
                        Từ chối yêu cầu rời trường của bạn
                    </span>
                    <span class="content font-size-14 primary_text_color" v-else-if="item.notificationTypeId === pleaseJoinFailSchool">
                      <b class="primary-color-txt font-sanpro-semibold"> {{ item.name }}</b>
                      <br />
                        Từ chối yêu cầu tham gia  trường của bạn
                    </span>
                    <span class="content font-size-14 primary_text_color"  v-else>
                      <b class="primary-color-txt font-sanpro-semibold">{{ item.name }}</b>
                      <br />
                      {{ item.title }}

                    </span>
                    <br />
                    <!-- <span class="secondary_text_color font-size-14" v-if="item.notificationTypeId ==1">{{ moment(item.createAt).format('HH:mm - DD/MM/YYYY') }}</span> -->
                    <span
                      class="secondary_text_color font-size-14"
                    >{{ moment(item.sendDate).format('HH:mm - DD/MM/YYYY') }}</span>
                  </div>
                </div>
              </vue-custom-scrollbar>
              <a
                @click="exitNotifile"
                to="/thong-bao"
                href="javascript:;"
                class="display-block text-center text-right primary-color font-size-15"
              >Xem tất cả</a>
            </template>
            <p
              v-else
              class="font-size-15 secondary-color-txt text-center margin-0"
            >Không có thông báo nào!</p>
          </b-collapse>
        </div>
        <!-- <div class="header__apps position-rel" v-if="authInfo.roleCode === authTeacher"> -->
        <div
          class="header__apps position-rel"
          v-if="authInfo.email !== emailPublic"
          v-click-outside="hiddenCollapseSwitchPlatform"
        >
          <div class="icon-toggle border-rd-50" @click="toggleCollapseSwitchPlatform">
            <img src="@/assets/img/4dots-icon.png" class="border-rd-50" style="height:30px;" alt />
          </div>
          <b-collapse id="transform" :visible="openCollapseSwitchPlatform">
            <div class="wrap">
              <a href="http://hanhtrangso.nxbgd.vn" target="_blank" class="item">
                <img src="@/assets/img/hts-logo.png" alt />
                <p class="content font-sanpro-semibold">Hành trang số</p>
              </a>
              <router-link to="/" class="item active">
                <img src="@/assets/img/logo4dots.png" target="_blank" alt />
                <p class="content font-sanpro-semibold active">Tập huấn</p>
              </router-link>
            </div>
          </b-collapse>
        </div>
        <div v-if="authInfo.email == emailPublic" class="header__moveLogin display-flex-center">
          <button
            @click="openFormLogin"
            class="btn-moveLogin font-sanpro-semibold font-size-15 color-light primary-bg-color form-30h font-primary-bold p-0"
          >Đăng nhập</button>
        </div>
        <div
          class="header__account position-rel"
          v-if="authInfo.email != emailPublic"
          v-click-outside="hiddenCollapseAcc"
        >
          <a
            href="javascript:;"
            @click="toggleCollapseAcc"
            class="icon-user-account border-rd-50 icon-toggle"
          >
            <img
              class="border-rd-50"
              alt="người dùng"
              :src="!authInfo.avatar || authInfo.avatar == null? imgAvatar : `${appUrl}${authInfo.avatar}`"
            />
          </a>
          <b-collapse id="nav_user" class="collapse text-center" :visible="openCollapseAcc">
            <!-- authInfo && item.module.includes(authInfo.roleCode) -->
            <router-link
              to="/trang-ca-nhan-nxb"
              v-if="authPublishing.includes(authInfo.roleCode)"
              class="item active m-t-5"
              data-toggle="collapse"
              v-b-toggle.nav_user
            >Trang cá nhân</router-link>
            <router-link
              to="/cai-dat-nxb/thong-tin-tai-khoan"
              v-if="authPublishing.includes(authInfo.roleCode)"
              class="item"
              data-toggle="collapse"
              v-b-toggle.nav_user
            >Cài đặt</router-link>

            <router-link
              to="/trang-ca-nhan"
              v-if="authInfo.email != emailPublic && authTeacher.includes(authInfo.roleCode) "
              class="item active m-t-5"
              data-toggle="collapse"
              v-b-toggle.nav_user
            >Trang cá nhân</router-link>
            <router-link
              to="/cai-dat"
              v-if="authInfo.email != emailPublic && authTeacher.includes(authInfo.roleCode)"
              class="item"
              data-toggle="collapse"
              v-b-toggle.nav_user
            >Cài đặt</router-link>

            <router-link
              to="/trang-ca-nhan-so-giao-duc"
              v-if="authInfo.email !== emailPublic &&  authDepartment.includes(authInfo.roleCode) "
              class="item active m-t-5"
              data-toggle="collapse"
              v-b-toggle.nav_user
            >Trang cá nhân</router-link>
            <router-link
              to="/cai-dat-so"
              v-if="authInfo.email !== emailPublic && authDepartment.includes(authInfo.roleCode)"
              class="item"
              data-toggle="collapse"
              v-b-toggle.nav_user
            >Cài đặt</router-link>

            <router-link
              to="/trang-ca-nhan-truong"
              v-if="authInfo.email !== emailPublic && authSchool.includes(authInfo.roleCode) "
              class="item active m-t-5"
              data-toggle="collapse"
              v-b-toggle.nav_user
            >Trang cá nhân</router-link>
            <router-link
              to="/trang-ca-nhan-truong/cai-dat-truong"
              v-if="authInfo.email !== emailPublic && authSchool.includes(authInfo.roleCode)"
              class="item"
              data-toggle="collapse"
              v-b-toggle.nav_user
            >Cài đặt</router-link>

            <router-link
              to="/trang-ca-nhan-phong-giao-duc"
              v-if="authInfo.email !== emailPublic && authRoom.includes(authInfo.roleCode) "
              class="item active m-t-5"
              data-toggle="collapse"
              v-b-toggle.nav_user
            >Trang cá nhân</router-link>
            <router-link
              to="/cai-dat-phong"
              v-if="authInfo.email !== emailPublic && authRoom.includes(authInfo.roleCode)"
              class="item"
              data-toggle="collapse"
              v-b-toggle.nav_user
            >Cài đặt</router-link>

            <router-link
              :to="{name: 'helperCenterEdit'}"
              v-if="authInfo.email !== emailPublic && authPublishing.includes(authInfo.roleCode) "
              class="item"
            >Trung tâm trợ giúp</router-link>
            <a
              href="javascript:;"
              class="item"
              @click="logoutTeacher"
              v-if="authInfo.email != emailPublic && authTeacher.includes(authInfo.roleCode)"
            >Đăng xuất</a>
            <a
              href="javascript:;"
              class="item"
              @click="logout"
              v-if="authInfo.email != emailPublic && !authTeacher.includes(authInfo.roleCode)"
            >Đăng xuất</a>
          </b-collapse>
        </div>
      </div>
    </div>
    <LoginPopup v-if="authInfo.email == emailPublic" />
    <modalUnirse v-if="authInfo.email != emailPublic"/>
    <TransferWorkUnitNotifi :codeTeacher="codeTeacher" :dataList="dataList"/>
    <ModalNotiRequestEditInfo
      :dataSource="notificationSingle"
      v-if="this.$route.name !='ViewNoticeAll'"
    />
    <ViewChangTeacheng  v-if="this.$route.name !='ViewNoticeAll'"/>
    <ModalNotifiList  />
    <ModalDetailNotifiTeacher  @handleModalShowdetail="handleModalShowdetail" />
    <EditInfo  :isClickFormEdit="isClickFormEdit"/>
  </header>
</template>

<script>
const signalR = require("@aspnet/signalr");
// const questionHub = new Vue() ;
//  Vue.prototype.$questionHub = questionHub
import { mapActions, mapState, mapGetters } from "vuex";
import { APP_CONFIG } from "@/utils/constants";
import { MODAL_ID_REQ_INFO_EDIT } from "@/store/common/constants";
import {
  MODULE_ADMINISTRATOR,
  MODULE_TEACHER,
  MODULE_PUBLISHING,
  MODULE_CTDMPP,
  MODULE_TCBT,
  MODULE_DEPARTMENT,
  MODULE_SCHOOL,
  EMAIL_PUBLIC,
  MODULE_ROOM,
  ID_MODAL_LOGIN,
} from "@/store/auth/constants";
	import { PLEASE_LEAVE_SCHOOL, PLEASE_JOIN_SCHOOL, AGREE_LEARN_SCHOOL, AGREE_LEARN_JOIN_SCHOOL,PLEASE_TRIP_FOR_OFFICIALS,PLEASE_LEAD_FAILURE_SCHOOL,PLEASE_JOIN_FAIL_SCHOOL,CONFIRM_UPDATED_INFORMATION,AGREE_UPDATED_INFORMATION, NOTI_TEACHER_CONFIRM } from '@/store/common/constants'
	// import { CONTENT_TYPE_VIDEO, CONTENT_TYPE_PDF, CONTENT_TYPE_WORD, CONTENT_TYPE_POWERPOINT } from '@/store/common/constants'
import { getAuth } from "@/utils/jwt";
import mixinsCommon from "@/store/common/mixinsCommon";
import ViewChangTeacheng from "./../modules/notification/noticeAll/_views/ViewChangTeacheng";
import ModalNotifiList from "./../modules/notification/noticeAll/_components/ModalNotifiList";
import ModalDetailNotifiTeacher from "./../modules/notification/noticeAll/_components/ModalDetailNotifiTeacher";
import EditInfo from "./../modules/notification/noticeAll/_components/EditInfo";
import modalUnirse from "./modal/modalUnirse";
import {
  apiGetNotiInfoNewAccountTeacher,
  fetchNotification,
  readNotification,
  apiGetTimeTeacher,
  apiGetTeacherCode,
  apiGetNotiInfoDeniedChangeSchoolTeacher,
  apiNotificationSend,
  apiAcceptTeachetConfirmAccExits
} from "@/store/common/api";
import moment from "moment";
import { notificationHub } from "./../main";
import ClickOutside from "vue-click-outside";
import vueCustomScrollbar from "vue-custom-scrollbar";
import TransferWorkUnitNotifi from "./../modules/notification/noticeAll/_components/TransferWorkUnitNotifi";

import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";
// import { APP_CONFIG } from "@/utils/constants";

const imgAvatar = require("@/assets/images/HS-2.jpg");

export default {
  name: "Header",
  mixins: [mixinsCommon],
  install(Vue) {
    const questionHub = new Vue();
    Vue.prototype.$questionHub = questionHub;
  },
  directives: {
    ClickOutside,
  },
  components: {
    EditInfo,
    ModalDetailNotifiTeacher,
    ModalNotifiList,
    TransferWorkUnitNotifi,
    modalUnirse,
    ViewChangTeacheng,
    vueCustomScrollbar,
    LoginPopup: () => import("@/views/auth/LoginPopup.vue"),
    ModalNotiRequestEditInfo: () => import("@/components/modal/ModalNotiRequestEditInfo.vue")
  },
  data() {
    return {
      // plea PLEASE_LEAVE_SCHOOL
      pleaseLeaveSchool: PLEASE_LEAVE_SCHOOL, //6
      pleaseJoinSchool:PLEASE_JOIN_SCHOOL, //7
      agreeLearnSchool:AGREE_LEARN_SCHOOL, //8
      agreeLearnJoinSchool:AGREE_LEARN_JOIN_SCHOOL, //9
      pleaseTripForOfficals:PLEASE_TRIP_FOR_OFFICIALS, //10
      pleaseLeadFailureSchool:PLEASE_LEAD_FAILURE_SCHOOL, //11
      pleaseJoinFailSchool:PLEASE_JOIN_FAIL_SCHOOL, //12
      confirmUpdatedInformatton:CONFIRM_UPDATED_INFORMATION,//13
      agreeUpdatedInformation:AGREE_UPDATED_INFORMATION, //14
      notiTeacherConfirm: NOTI_TEACHER_CONFIRM, //15
      isClickFormEdit:false,
      showFormInfo:true,
      dataList: {},
      codeTeacher:'',
      isRead:false,
      numberNotify: 0,
      appUrl: APP_CONFIG.appUrl,
      imgAvatar,
      menus: {
        buttonText: "Slide",
      },
      displayNotification: true,
      currentMenu: "slide",
      hiddenHeader: false,
      authInfo: {},
      cdnUrl: APP_CONFIG.cdnUrl,
      nameHeader: this.$route.path,
      navigations: [
        {
          label: "Tập huấn",
          route: {
            name: "teacherTraining",
          },
          module: [MODULE_TEACHER],
          active: ["/giao-vien"],
        },
        // {
        // 	label: 'Tập huấn',
        // 	route: {
        // 		name: 'teacherTraining'
        // 	},
        // 	module: [MODULE_PUBLISHING],
        // 	active: ['/thong-bao']
        // },
        {
          label: "Tài liệu bổ sung",
          route: {
            name: "teacherDocument",
          },
          module: [MODULE_TEACHER],
          active: ["/tai-lieu-giao-vien"],
          not_email_public: true,
        },
        {
          label: "Tin tức",
          route: {
            name: "ViewNews",
          },
          module: [MODULE_TEACHER],
          active: ["/tin-tuc"],
        },
        {
          label: "Quản lý tập huấn",
          route: {
            name: "TrainingList",
          },
          module: [MODULE_PUBLISHING, MODULE_CTDMPP, MODULE_TCBT],
          active: ["/nha-xuat-ban"],
        },
        {
          label: "Thống kê tập huấn",
          route: {
            name: "StatisticalList",
          },
          module: [MODULE_PUBLISHING, MODULE_CTDMPP, MODULE_TCBT],
          active: ["/thong-ke-nha-xuat-ban"],
        },

        {
          label: "Quản lý tài khoản",
          route: {
            name: "AccountList",
          },
          module: [MODULE_PUBLISHING, MODULE_CTDMPP, MODULE_TCBT],
          active: ["/tai-khoan-nha-xuat-ban"],
        },
        {
          label: "Tin tức",
          route: {
            name: "ViewNews",
          },
          module: [MODULE_PUBLISHING, MODULE_CTDMPP, MODULE_TCBT],
          active: ["/tin-tuc"],
        },
        {
          label: "Lịch trình",
          route: {
            name: "ViewSchedule",
          },
          module: [MODULE_PUBLISHING],
          active: ["/lich-trinh"],
        },
        {
          label: "Tập huấn",
          route: {
            name: "ViewHome",
          },
          module: [MODULE_DEPARTMENT],
          active: ["/so-giao-duc-dao-tao"],
        },
        {
          label: "Thống kê tập huấn",
          route: {
            name: "ViewStatistics",
          },
          module: [MODULE_DEPARTMENT],
          active: ["/thong-ke-tap-huan-so"],
        },
        {
          label: "Quản lý tài liệu",
          route: {
            name: "DocumentList",
          },
          module: [MODULE_DEPARTMENT],
          active: ["/tai-lieu-so-giao-duc-dao-tao"],
        },
        {
          label: "Quản lý tài khoản",
          route: {
            name: "AccountListDepartment",
          },
          module: [MODULE_DEPARTMENT],
          active: ["/tai-khoan-so-giao-duc-dao-tao"],
        },
        {
          label: "Tin tức",
          route: {
            name: "ViewNews",
          },
          module: [MODULE_DEPARTMENT],
          active: ["/tin-tuc-so"],
        },

        {
          label: "Tập huấn",
          route: {
            name: "ViewTraining",
          },
          module: [MODULE_ROOM],
          active: ["/phong-giao-duc-dao-tao"],
        },
        {
          label: "Thống kê tập huấn",
          route: {
            name: "ViewStatisticRoom",
          },
          module: [MODULE_ROOM],
          active: ["/thong-ke-tap-huan-phong"],
        },
        {
          label: "Quản lý tài liệu",
          route: {
            name: "DocumentRoom",
          },
          module: [MODULE_ROOM],
          active: ["/tai-lieu-phong-giao-duc-dao-tao"],
        },
        {
          label: "Quản lý tài khoản",
          route: {
            name: "ViewDepartmentAccount",
          },
          module: [MODULE_ROOM],
          active: ["/tai-khoan-phong-giao-duc-dao-tao"],
        },
        {
          label: "Tin tức",
          route: {
            name: "ViewNews",
          },
          module: [MODULE_ROOM],
          active: ["/tin-tuc-phong"],
        },

        {
          label: "Tập huấn",
          route: {
            name: "ViewHomeSchool",
          },
          module: [MODULE_SCHOOL],
          active: ["/truong"],
        },

        {
          label: "Thống kê tập huấn",
          route: {
            name: "ViewStatisticSchools",
          },
          module: [MODULE_SCHOOL],
          active: ["/thong-ke-tap-huan-truong"],
        },
        {
          label: "Quản lý tài liệu",
          route: {
            name: "ViewDocumentSchool",
          },
          module: [MODULE_SCHOOL],
          active: ["/tai-lieu-truong"],
        },
        {
          label: "Quản lý tài khoản",
          route: {
            name: "ViewDepartmentAccountSchool",
          },
          module: [MODULE_SCHOOL],
          active: ["/tai-khoan-truong"],
        },
        {
          label: "Tin tức",
          route: {
            name: "ViewNews",
          },
          module: [MODULE_SCHOOL],
          active: ["/tin-tuc-truong"],
        },

        {
          label: "Hỏi đáp",
          route: {
            name: "ViewQuestionAnswer",
          },
          module: [MODULE_ADMINISTRATOR],
          active: ["/admin"],
        },
        {
          label: "Cài đặt chung",
          route: {
            name: "ViewGuide",
          },
          module: [MODULE_ADMINISTRATOR],
          active: ["/cai-dat-chung"],
        },
        {
          label: "Quản lý tài khoản",
          route: {
            name: "ViewCreateAccount",
          },
          module: [MODULE_ADMINISTRATOR],
          active: ["/quan-ly-tai-khoan"],
        },
      ],
      visibleMenuMobile: false,
      emailPublic: [EMAIL_PUBLIC],
      authPublishing: [MODULE_PUBLISHING, MODULE_CTDMPP, MODULE_TCBT],
      authTeacher: [MODULE_TEACHER],
      authDepartment: [MODULE_DEPARTMENT],
      authSchool: [MODULE_SCHOOL],
      authRoom: [MODULE_ROOM],
      authAdmin: [MODULE_PUBLISHING, MODULE_CTDMPP, MODULE_TCBT],
      routerNameRequiredLogin: "",
      notificationData: [],
      notificationSingle: {},
      openCollapseNoti: false,
      openCollapseSwitchPlatform: false,
      openCollapseAcc: false,
    };
  },

  computed: {
    ...mapState("auth", ["isLoggedIn", "user", "loginPopupData"]),
    ...mapState("common", ["getPramDisplay", "getCountNotifiNotRed"]),
    ...mapGetters({
      getTimeStart: "common/getTimeStart",
      setTimeTeacher: "common/setTimeTeacher",
      getChangUpdateProfile: "common/getChangUpdateProfile",
      getChangeDataListTeacher: "common/getChangeDataListTeacher",
    }),
  },
  created() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${APP_CONFIG.appUrl}message-hub`)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection
      .start({ transport: "longPolling" })
      .then(() => {
        this.ready = true; // toggle ready flag here
      })
      .catch((err) => {
        console.error(err.toString());
      });
  },
  watch: {
    getChangUpdateProfile() {
      this.fetchAuthProfile().then((res) => {
        this.authInfo = getAuth();
      });
    },
    getCountNotifiNotRed(newVal) {
      this.numberNotify = newVal.count;
    },
    getPramDisplay(newVal) {
      this.actionCountNotificationNotRead().then((res) => {
        if (res && res.data && !res.errors) {
          this.numberNotify = res.data.data.count;
        }
      });
      let data = false;
      this.actionDisplayNotification(data);
      let self = this;
      let values = {};
      values.notificationTypeId = 0;
      (values.keyword = ""), (values.pageIndex = 1);
      (values.pageSize = this.pleaseTripForOfficals),
        (values.sort = ""),
        (values.direction = ""),
        fetchNotification(values).then((res) => {
          if (res && res.data && !res.errors) {
            self.notificationData = res.data.list;
            self.notificationData.map((doc) => {
              if (!doc.isRead) {
                this.displayNotification = false;
              }
              // !item.isRead
            });
          }
        });
    },
    $route: "checkDisplayHeader",
    async loginPopupData(newVal) {
      // this.routerNameRequiredLogin && await this.$router.push({name: this.routerNameRequiredLogin});
      this.routerNameRequiredLogin = "";
      // this.authInfo = newVal;
      // this.checkDisplayHeader();
      this.authInfo = getAuth();
    },
  },
  mounted() {
    //  this.$bvModal.show("modalTransferWorkUnit");
    let self = this;
    this.authInfo = getAuth()
    this.connection.on("ReceiveMessage", function () {
      self.actionCountNotificationNotRead().then((res) => {
        if (res && res.data && !res.errors) {
          self.numberNotify = res.data.data.count;
        }
      });
    });
  },
  methods: {
    moment,
    ...mapActions(`auth`, ["authLogout", "fetchAuthProfile"]),
    ...mapActions(`common`, [
      "setLoading",
      "actionDisplayNotification",
      "actionGetTimeTeacher",
      "actionCountNotificationNotRead",
      "setDataNotifiDetail",
      "actiongetChangedSchoolTeaching",
      "setChangeDatalistTeacher",
      "setDisplayButton",
      "acGetListNotiNotYetAccept",
      "acGetNotificationFinishInfoTeacher",
      "acGetRequestDenied"
    ]),

    ...mapActions('notification', [
      'actionGetListClassAndSubject',
      'acSetShowForm'
    ]),
    // ...mapActions(`common`, [
 
    // ]),
    
    handleModal () {
        this.$bvModal.show("modalDetailNotifi");
    },
    thumbUrl(filename) {
      return require(`@/assets/img/${filename}`);
    },
    directToLinkModule() {
      if (this.authInfo.email == this.emailPublic) {
        this.$router.push({ path: "/trang-chu" });
      } else {
        switch (this.authInfo.roleCode) {
          case MODULE_TEACHER:
            this.$router.push("/giao-vien").catch(()=>{});
            break;
          case MODULE_PUBLISHING:
            this.$router.push({ path: '/nha-xuat-ban' })
            break;
          case MODULE_CTDMPP:
            this.$router.push({ path: '/nha-xuat-ban' })
            break;
          case MODULE_TCBT:
            this.$router.push({ path: '/nha-xuat-ban' })
            break;
          case MODULE_DEPARTMENT:
            this.$router.push({ path: '/so-giao-duc-dao-tao' })
            break;
          case MODULE_ROOM:
            this.$router.push({ path: '/phong-giao-duc-dao-tao' })
            break;
          case MODULE_ADMINISTRATOR:
            this.$router.push({ path: '/admin' })
            break;
          default:
            this.$router.push({ path: '/truong' })
            break;
        }
      }
    },
    // @/assets/img/HS-2.jpg
    logout() {
      this.authLogout();
    },
    changeNumber(mess) {},
    logoutTeacher() {
      // this.authLogout();

      var date1 = localStorage.getItem("timeStartUser");
      date1 = new Date(date1);

      var date2 = new Date();

      var diff = date2.getTime() - date1.getTime();

      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= days * (1000 * 60 * 60 * 24);

      var hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * (1000 * 60 * 60);
      if (String(hours).length == 1) {
        hours = "0" + hours;
      }
      var mins = Math.floor(diff / (1000 * 60));
      diff -= mins * (1000 * 60);
      if (String(mins).length == 1) {
        mins = "0" + mins;
      }

      var seconds = Math.floor(diff / 1000);
      diff -= seconds * 1000;
      if (String(seconds).length == 1) {
        seconds = "0" + seconds;
      }
      var totalTimeSystem = hours + ":" + mins + ":" + seconds;
      this.actionGetTimeTeacher({
        ...this.setTimeTeacher,
        time: totalTimeSystem,
      }).then((res) => {
        if (res.status === "success") {
          this.authLogout();
        }
      });
    },
    handleModalShowdetail () {
      this.showFormInfo = true
    },
    getNotification() {
      let self = this;
      let values = {};
      values.notificationTypeId = 0;
      values.keyword = "";
      values.pageIndex = 1;
      values.pageSize = 10;
      values.sort = "";
      values.direction = "";
      if (this.authInfo.roleCode != "ADMIN") {
        this.actionCountNotificationNotRead().then((res) => {
          if (res && res.data && !res.errors) {
            self.numberNotify = res.data.data.count;
          }
        });
      }
    },

    checkDisplayHeader() {
      let metaRouterCurr = this.$router.history.current.meta;
      this.hiddenHeader =
        metaRouterCurr.hideHeader ||
        (metaRouterCurr.public && !metaRouterCurr.page_all_app) ||
        !getAuth()
          ? true
          : false;
      // this.hiddenHeader = ((metaRouterCurr.hideHeader || metaRouterCurr.public) && !metaRouterCurr.page_all_app) || !getAuth() ? true : false;
      this.authInfo = getAuth();
      !this.hiddenHeader &&
        this.authInfo.email !== this.emailPublic &&
        this.getNotification();
      this.checkRouterReqiredLogin();
      // this.actionCountNotificationNotRead().then(res => {
      // 	if(res && res.data && !res.errors) {
      // 		self.numberNotify = res.data.data;
      // 	}
      // })
    },
    subIsActive(input) {
      const paths = Array.isArray(input) ? input : [input];
      return paths.some((path) => {
        return this.$route.path.indexOf(path) === 0; // current path starts with this path string
      });
    },
    toggle() {
      this.open = !this.open;
    },

    openMenuMobile() {
      this.visibleMenuMobile = true;
    },

    closeMenuMobile() {
      this.visibleMenuMobile = false;
    },

    checkRouterReqiredLogin() {
      let routerMetaCurr = this.$route.meta;
      if( routerMetaCurr.required_login && this.getCountNotifiNotRed.isWaitingAccept ) {
      
         this.openIsLeaveSchool();
         return
      } 
      if (
        routerMetaCurr.required_login &&
         this.authInfo.email === EMAIL_PUBLIC
      ) {
        this.$router.go(-1);
        this.openFormLogin(this.$route.name);
      }
    },
    openIsLeaveSchool(){
       this.$router.go(-1);
       this.$bvModal.show('modal-unirse');
      //  this.routerNameRequiredLogin = val;
    },
    openFormLogin(val) {
      this.routerNameRequiredLogin = val;
      this.$bvModal.show(ID_MODAL_LOGIN);
    },

    showInfoNoti(val, index) {
      let self = this;
      this.openCollapseNoti = false;
      if (val && val.notificationId ) {
        readNotification(val.notificationId).then((res) => {
          if (res && !res.errors) {
            self.actionCountNotificationNotRead().then((res) => {
              if (res && res.data && !res.errors) {
                self.numberNotify = res.data.data.count;
              }
            });
            self.notificationData[index]["isRead"] = true;
          }
        });
        // if (val.notificationTypeId === NOTI_TEACHER_CONFIRM && !val.isRead) {
        //   apiAcceptTeachetConfirmAccExits(val.notificationId)
        // }
        self.notificationSingle = val;
        self.setDataNotifiDetail(val);
        if (val.notificationTypeId ===this.agreeUpdatedInformation ) {
          this.$bvModal.show("modalDetailNotifi");
          this.acGetNotificationFinishInfoTeacher(val.notificationId)
          this.actionGetListClassAndSubject({teacherId:val.id})
          this.acSetShowForm(true)
          // this.$bvModal.hide("modalNotifiList");
          return
        }
        if (val.notificationTypeId ===this.confirmUpdatedInformatton && this.showFormInfo){
           self.$bvModal.show("modalNotifiList");
           this.acGetListNotiNotYetAccept({keyword:"",pageIndex:1,pageSize:10,sort:"",direction:""})
           return
        }
        if(val.notificationTypeId === this.pleaseJoinFailSchool){
          apiGetNotiInfoDeniedChangeSchoolTeacher({notificationId:val.notificationId}).then(res =>{
            this.dataList = res.data;
          })
          self.$bvModal.show("modalTransferWorkUnitNotifi");
            return
        }
        if(val.notificationTypeId === this.agreeLearnJoinSchool){
            apiGetNotiInfoNewAccountTeacher({notificationId:val.notificationId}).then(res =>{
            this.dataList = res.data;
          })
          self.$bvModal.show("modalTransferWorkUnitNotifi");
            return
        }
        // notificationTypeId ===7 yeu câu tham gia trường
        if(val.notificationTypeId === this.pleaseJoinSchool  || val.notificationTypeId ===this.pleaseTripForOfficals){

          if(!val.isAcept && val.isClickForm){
                 apiGetNotiInfoDeniedChangeSchoolTeacher({notificationId:val.notificationId}).then(res =>{
            this.dataList = res.data;
          })
          }else{
          apiGetNotiInfoNewAccountTeacher({notificationId:val.notificationId}).then(res =>{
            this.dataList = res.data;
            if(!val.isAcept && res.data.checkForm !==1){
              apiGetTeacherCode().then(res =>{
                this.codeTeacher = res.data
              })
            }
          })
          }
          self.$bvModal.show("modalTransferWorkUnitNotifi");
            return
        }
        if(val.notificationTypeId ===5 ){
          this.actiongetChangedSchoolTeaching(val.notificationId)
          self.setChangeDatalistTeacher(!this.getChangeDataListTeacher);
          self.setDisplayButton(val.isRead)
          self.$bvModal.show("modalNotifiEditteacheng");
          return
        }else if(val.notificationTypeId !==5 && val.notificationTypeId !== this.confirmUpdatedInformatton && val.notificationTypeId !== this.agreeUpdatedInformation){
          self.$bvModal.show(MODAL_ID_REQ_INFO_EDIT);
        }
      }
    },
   confirmInfo (item) {
      this.showFormInfo = false
     apiNotificationSend ({id:item.notificationId}).then(res =>{
            if (res && !res.errors) {
                this.$toast.success("Xác nhận thành công!");
                // this.acGetListNotiNotYetAccept ({keyword:"",pageIndex:1,pageSize:10,sort:"",direction:""})
            }
        }) 
   },
    showModalDetail (item) {
        this.showFormInfo = false
        item.isAcept? this.acSetShowForm(true): this.acSetShowForm(false)
      
        this.acGetNotificationFinishInfoTeacher(item.notificationId)
        this.actionGetListClassAndSubject({teacherId:item.id})
        if(item.isClickForm && !item.isAcept) {
          console.log('22222222222222',item.isClickForm);
          // console.log('2222222222',item.id);
          this.acGetRequestDenied({teacherId:item.id})
          this.isClickFormEdit = true
          this.$bvModal.show("editInfo");
          this.$bvModal.hide("modalNotifiList");
          return
        }
        this.isClickFormEdit = false
        this.$bvModal.show("modalDetailNotifi");
        this.$bvModal.hide("modalNotifiList");
    },
    toggleCollapseNoti() {
      this.openCollapseNoti = !this.openCollapseNoti;
      fetchNotification({
        keyword: "",
        notificationTypeId: 0,
        pageIndex: 1,
        pageSize: 10,
        sort: "",
        direction: "",
      }).then((res) => {
        if (res && res.data && !res.errors) {
          this.notificationData = res.data.list;
        }
      });
    },
    exitNotifile() {
      this.$router.push({ name: "ViewNoticeAll" });
      this.openCollapseNoti = false;
    },
    hidenCollapseNoti() {
      this.openCollapseNoti = false;
    },

    toggleCollapseSwitchPlatform() {
      this.openCollapseSwitchPlatform = !this.openCollapseSwitchPlatform;
    },

    hiddenCollapseSwitchPlatform() {
      this.openCollapseSwitchPlatform = false;
    },

    toggleCollapseAcc() {
      this.openCollapseAcc = !this.openCollapseAcc;
    },

    hiddenCollapseAcc() {
      this.openCollapseAcc = false;
    },
  },
};
</script>

<style lang="scss" scope>
@import "./../assets/scss/mixins";
@import "./../assets/scss/variables";
@import "./../assets/scss/general";
.selectio-notifi {
  margin-bottom: -19px;
}
.background-isRead {
  background: #f3f6fb;
}
.header__account {
  #nav_user {
    a.active {
      background-color: #e1efff;
      color: #0f3dba;
      font-weight: 600;
      border-radius: 6px;
      &:active {
        background-color: #e1efff;
        color: #0f3dba;
        font-weight: 600;
        border-radius: 6px;
      }
      &:hover {
        background-color: #e1efff;
        color: #0f3dba;
        font-weight: 600;
        border-radius: 6px;
      }
    }
  }
}
.header {
  border-bottom: 1px solid #d8d8d8;

  &__logo {
    img {
      max-height: 45px;
    }
  }

  &-wrap {
    padding: 0 15px;
  }

  &__nav {
    li {
      @extend .display-inline-block;

      &:not(:last-child) {
        margin-right: 3px;
      }

      a {
        @extend .position-rel;
        @extend .font-size-16;
        @extend .font-sanpro-semibold;
        @extend .secondary-color-txt;
        letter-spacing: 0.03em;
        padding: 0 15px;
        line-height: 60px;

        &:before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          height: 4px;
          width: 0;
          border-top: 4px solid #0f3dba;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
          @extend .display-block;
          @extend .effect-transition-fast;
          @extend .primary-bg-color;
        }

        &.router-link-active,
        &:hover {
          &:before {
            @extend .full-width;
          }
        }
      }
    }
  }
  &__apps {
    margin-left: 8px;
  }
  &__moveLogin {
    .btn-moveLogin {
      margin-left: 15px;
      width: 124px;
      border: 0;
      border-radius: 20px;
      outline: 0;
      height: 30px;
      line-height: 28px;
      &:hover {
        color: #0f3dba;
        border: 1px solid #0f3dba;
        background: #fff;
      }
    }
  }

  &__notification {
    margin-left: 35px;

    &__dot {
      position: absolute;
      right: 0px;
      width: 19px;
      height: 19px;
      // display: block;
      @extend .position-center-y;
      @extend .border-rd-50;
      background: $color_err;
      margin-top: -5px;
      pointer-events: none;
      justify-content: center;
      display: flex;
      flex-direction: center;
      align-items: center;
      font-size: 9px;
      color: #fff;
      .ping {
        border: 1px solid $color_err;
        width: 8px;
        height: 8px;
        opacity: 1;
        background-color: rgba($color_err, 0.5);
        border-radius: 100%;
        -moz-animation: sonar 1.25s linear infinite;
        -o-animation: sonar 1.25s linear infinite;
        -webkit-animation: sonar 1.25s linear infinite;
        animation: sonar 1.25s linear infinite;
        display: block;
      }
    }

    &__collaspe {
      max-height: 400px;
      overflow-x: hidden;
      overflow: scroll;
    }
  }

  .icon-toggle {
    line-height: 60px;
    padding: 0 10px;
    cursor: pointer;

    &.active {
      &:before {
        content: "";
        width: 35px;
        height: 35px;
        display: block;
        position: absolute;
        top: 0;
        background: $btn_hover_color;
        z-index: -1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        @extend .border-rd-50;
        margin: 0 auto;
      }
    }
  }

  &__account {
    // margin-left: 8px;
    .icon-toggle {
      img {
        width: 30px;
        height: 30px;
        @extend .border-rd-50;
        // border: 2px solid $primary_color;
      }
    }
  }
}

.icon-menu-mobile {
  width: 40px;
  align-items: center;
  cursor: pointer;

  span {
    @extend .display-block;
    width: 100%;
    height: 3px;
    @extend .bg-color-dark;

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
}

#alert_notification,
#transform,
#nav_user,
#switchPlatform {
  position: absolute;
  top: 100%;
  right: 0;
  @extend .bg-color-light;
  @extend .box-shadow-main;
  @extend .border-rd-4;
  z-index: 2;
}

#alert_notification {
  width: 335px;
  padding: 10px 0;
  z-index: 11;

  .item {
    padding: 10px;
    border-bottom: 1px solid #f1f1f1;
    cursor: pointer;

    img {
      width: 30px;
      height: 30px;
      @extend .border-rd-50;
      margin-right: 15px;
    }

    .content {
      @extend .font-size-14;
      color: #40505e;
    }
    &:hover {
      @extend .bg-color-hover;
    }

    &:not(:last-child) {
      // border-bottom: 1px solid #d1d1d1;
    }
  }
}

#transform {
  padding: 15px 10px 10px;
  width: 230px;

  .wrap {
    @extend .display-flex;
    flex-wrap: wrap;
  }

  .item {
    width: 49%;
    @extend .text-center;
    margin-bottom: 5px;
    @extend .secondary-color-txt;

    &:nth-child(even) {
      margin-right: 1%;
    }

    &:nth-child(odd) {
      margin-left: 1%;
    }

    img {
      width: 25px;
      height: 25px;
      margin-bottom: 5px;
    }

    .content {
      line-height: 1.3;
      @extend .margin-0;
    }

    &.active,
    &:hover {
      @extend .primary-color;
    }
  }
}

#nav_user {
  width: 140px;

  .item {
    padding: 5px 8px;
    @extend .font-size-14;
    @extend .secondary-color-txt;
    @extend .display-block;
    @extend .full-width;

    &.active,
    &:hover {
      @extend .primary-color;
      @extend .bg-color-hover;
    }
  }
}
.icon-menu-mobile {
  display: none;
}

@media screen and (min-width: 768px) and (max-width: 1199px) {
  .header {
    &__notification {
      margin-left: 10px;
    }

    .icon-toggle {
      padding: 0 6px;
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .header {
    &__logo {
      max-width: 130px;
    }

    &__nav {
      li {
        a {
          font-size: 14px;
          padding: 0 6px;
        }
      }
    }
  }
}

@media screen and (max-width: 1199px) {
  .icon-menu-mobile {
    display: block;
  }

  .header {
    &__apps,
    &__notification {
      display: none;
    }

    &__logo {
      max-width: 55%;
    }

    &__nav {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      background: #fff;
      z-index: 9;
      -webkit-overflow-scrolling: touch;
      -webkit-transition: -webkit-transform 0.3s;
      transition: -webkit-transform 0.3s;
      -o-transition: transform 0.3s;
      transition: transform 0.3s;
      transition: transform 0.3s, -webkit-transform 0.3s;
      transition: transform 0.3s, -webkit-transform 0.3s;
      -webkit-backface-visibility: hidden;
      -webkit-transition-duration: 0.3s;
      -o-transition-duration: 0.3s;
      transition-duration: 0.3s;
      -webkit-transform: translate(-120%, 0px);
      -ms-transform: translate(-120%, 0px);
      transform: translate(-120%, 0px);
      width: 300px;
      li {
        width: 100%;
        display: block;

        a {
          line-height: 50px;

          &:before {
            display: none;
          }
        }

        &:not(:last-child) {
          border-bottom: 1px solid #d1d1d1;
        }
      }

      &.menu-open {
        -webkit-transform: translate(0px, 0px);
        -ms-transform: translate(0px, 0px);
        transform: translate(0px, 0px);
        -webkit-box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.5);
        box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.5);
      }
    }

    &__overlay.menu-open {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba($primary_color, 0.7);
      z-index: 3;
    }
  }
}

@media screen and (min-width: 576px) and (max-width: 767px) {
  .header__nav {
    width: 60vw;
  }
}

@media screen and (max-width: 575px) {
  .icon-menu-mobile {
    width: 35px;
  }

  .header__nav {
    width: 80vw;
  }
}
</style>