<template>
  <div class='app'
    :class="{'modal-open': isLoginModalVisible}">
    <div class='alert-container'>
      <ul>
        <li v-for="(alert, i) in alerts" :key="i">
          <AlertModal 
            :type='alert.type' 
            :content="alert.content" 
            :id="alert.id" 
            :removeAlert="removeAlert"
          />
        </li>
      </ul>
    </div>
    <LoginModal 
      v-if="isLoginModalVisible" 
      :toggleLoginModal="toggleLoginModal"
      :createAlert="createAlert"
      :login='login'
    />
    <RegisterModal 
      v-if="isRegisterModalVisible" 
      :toggleRegisterModal="toggleRegisterModal"
      :createAlert="createAlert"
    />
    <SideBar 
      :toggleLoginModal="toggleLoginModal"
      :toggleRegisterModal="toggleRegisterModal"
      :isUserLoggedIn='isUserLoggedIn'
      :logout='logout'
      :userImgSrc="user.imgSrc"
      :userName="user.login"
    />
    <TopNav />
    <main>
      <router-view 
        :createAlert="createAlert"
        :isUserLoggedIn="isUserLoggedIn"
        :logout='logout'
      />
    </main>
  </div>
</template>

<script>
const axios = require('axios')
import TopNav from './components/TopNav'
import LoginModal from './components/LoginModal.vue'
import RegisterModal from './components/RegisterModal.vue'
import SideBar from './components/SideBar.vue'
import AlertModal from './components/AlertModal.vue'

export default {
  components: {
    TopNav,
    LoginModal,
    RegisterModal,
    SideBar,
    AlertModal,
  },
  data(){
    return{
      isLoginModalVisible: false,
      isRegisterModalVisible: false,
      alerts: [],
      user: {},
      isUserLoggedIn: false
    }
  },
  methods:
  {
    toggleLoginModal(){
      this.isLoginModalVisible = !this.isLoginModalVisible
    },
    toggleRegisterModal(){
      this.isRegisterModalVisible = !this.isRegisterModalVisible
    },
    createAlert(type, content){
      let alert = {
        type,
        content,
        id: Date.now()
      }
      this.alerts.push(alert)
      setTimeout(() => this.removeAlert(alert.id), 5000)
    },
    removeAlert(id){
      this.alerts = this.alerts.filter(elem => elem.id != id)
    },
    login(nickname, password){
      axios.post('http://localhost:3000/user/login', {
        login: nickname,
        password: password
      })
      .then(res => {
        localStorage.setItem('accessToken', res.data.accessToken)
        this.user = res.data.user
        this.isUserLoggedIn = true
        this.createAlert('success', 'Welcome back.')
        this.toggleLoginModal()
      })
      .catch(() => {
        this.createAlert('error', 'Failed login attempt.')
      })
    },
    logout(){
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      this.isUserLoggedIn = false
    },
    authenticateUser(){
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        axios.post('http://localhost:3000/user/authenticate', 
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          } 
        })
        .then(res => {
          this.user = (res.data.user)
          this.isUserLoggedIn = true
        })
        .catch(() => {
          this.logout()
          this.createAlert('error', 'Session expired, please log in again')
        })
      }
    }
  },
  mounted(){
    this.authenticateUser()
  }
}
</script>

<style lang='scss'>
  @import "./assets/styles.scss"
</style>

