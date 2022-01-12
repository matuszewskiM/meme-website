<template>
    <div class='top-nav'>
        <router-link to="/" exact-path style="color: inherit; text-decoration: none;">
            <div class='btn top-nav-btn'>
                home
            </div>
        </router-link>
        <router-link to="/add" exact-path style="color: inherit; text-decoration: none;">
            <div class='btn top-nav-btn'>
                add
            </div>
        </router-link>
        <router-link  
                @click="fetchRandomPostId"
                :to="`/post/${randomPostId}`" exact-path style="color: inherit; text-decoration: none;"
        >
            <div class='btn top-nav-btn'>
                random
            </div>
        </router-link>
        <router-link to="/" exact-path style="color: inherit; text-decoration: none;">
            <div class='btn top-nav-btn'>
                top
            </div>
        </router-link>
        <router-link to="/" exact-path style="color: inherit; text-decoration: none;">
            <div class='btn top-nav-btn'>
                about
            </div>
        </router-link>
    </div>
</template>

<script>
const axios = require('axios')
export default {
    name: 'TopNav',
    data(){
        return {
            randomPostId: ''
        }
    },
    methods: {
        fetchRandomPostId(){
            axios.get('http://localhost:3000/posts/random')
                .then(res => {
                    this.randomPostId = res.data.post._id;
                })
        }
    },
    mounted(){
        this.fetchRandomPostId()
    }
}
</script>