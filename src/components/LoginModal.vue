<template>
    <div class="login-modal">
        <div class="login-form">
            <div class='cross-button'
                @click="toggleLoginModal"
            >
                <fa-icon icon="times" size="lg"/>
            </div>
            <h2>LOGIN</h2>
            Nickname:
            <div class='notice'>
                <span v-if="isNicknameNoticeVisible"> 
                    <fa-icon icon="exclamation-triangle" />
                    Nickname must be alphanumeric between 8-16 characters.
                </span>
            </div>
            <input class="nickname"
                v-model="nickname"
                @input="setNicknameNotice"
            />
            Password:
            <div class='notice'>
                <span v-if="isPasswordNoticeVisible"> 
                    <fa-icon icon="exclamation-triangle" />
                    Password must be alphanumeric between 8-16 characters.
                </span>
            </div>
            <input type="password"
                class="password"
                v-model="password"
                @input="setPasswordNotice"
            />
            <div class="btn login-submit"
                @click='submitController'
            >   
                <span v-if="isNicknameNoticeVisible || isPasswordNoticeVisible">
                    incorrect login data
                    <fa-icon icon="exclamation-triangle" />
                </span>
                <span v-else>
                    login
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoginModal",
    props:['toggleLoginModal', 'login'],
    data(){
        return {
            nickname: "",
            password: "", 
            isNicknameNoticeVisible: false,
            isPasswordNoticeVisible: false
        }
    },
    methods: {
        setNicknameNotice(){
            let pattern = /^([a-zA-Z0-9]){8,16}$/
            if (pattern.test(this.nickname) || this.nickname == '')
                this.isNicknameNoticeVisible = false
            else 
                this.isNicknameNoticeVisible = true
        },
        setPasswordNotice(){
            let pattern = /^([a-zA-Z0-9]){8,16}$/
            if (pattern.test(this.password) || this.password == '')
                this.isPasswordNoticeVisible = false
            else 
                this.isPasswordNoticeVisible = true
        },
        validateNickname(){
            let pattern = /^([a-zA-Z0-9]){8,16}$/
            if (pattern.test(this.nickname))
                return true
            return false
        },
        validatePassword(){
            let pattern = /^([a-zA-Z0-9]){8,16}$/
            if (pattern.test(this.password))
                return true
            return false
        },
        submitController(){
            if (this.validateNickname() && this.validatePassword())
                return this.login(this.nickname, this.password)
            return null
        }
    }
}
</script>