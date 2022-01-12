<template>
    <div class="register-modal">
        <div class="register-form">
            <div class='cross-button'
                @click="toggleRegisterModal"
            >
                <fa-icon icon="times" size="lg"/>
            </div>
            <h2>REGISTER</h2>
            Nickname:
            <input class="nickname"
                v-model="nickname"
            />
            Password:
            <input type="password"
                class="password"
                v-model="password"
            />
            <div class="btn register-submit">
                create account
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "RegisterModal",
    props:['toggleRegisterModal'],
    data(){
        return {
            nickname: "",
            password: ""
        }
    }
}
</script>