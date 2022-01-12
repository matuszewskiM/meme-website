<template>
    <div class="side-bar" v-if="isUserLoggedIn">
        <div class='option'>
            <div class="icon user-img">
                <img :src="userImgSrc" class='sidebar-user-img' />
            </div>
            <div class='description'>
                Hello, {{userName}}!
            </div>
        </div>
        <div class='option'>
            <div class="icon">
                <fa-icon icon="plus" />
            </div>
            <div class='description'>
                add new meme
            </div>
        </div>
        <div class='option'>
            <div class="icon">
                <fa-icon icon="user-friends" />
            </div>
            <div class='description'>
                your friends
            </div>
        </div>
        <div class='option'>
            <div class="icon">
                <fa-icon icon="cog" />
            </div>
            <div class='description'>
                account settings
            </div>
        </div>
        <div class='option'
            @click='logout'
        >
            <div class="icon">
                <fa-icon icon="power-off" />
            </div>
            <div class='description'>
                log out
            </div>
        </div>        
    </div>
    <div class="side-bar logged-out" v-else>
        <div class='option'
            @click='toggleLoginModal'
        >
            <div class="icon">
                <fa-icon icon="sign-in-alt" />
            </div>
            <div class='description'>
                login
            </div>
        </div>
        <div class='option'
            @click='toggleRegisterModal'
        >
            <div class="icon">
                <fa-icon icon="user-plus" />
            </div>
            <div class='description'>
                register
            </div>
        </div>       
    </div>
</template>
<script>
export default {
    name: "SideBar",
    props: ['toggleLoginModal', 'toggleRegisterModal', 'logout', 'isUserLoggedIn', 'userName', "userImgSrc"],
}
</script>