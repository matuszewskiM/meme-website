<template>
    <div class="post">
        <h2 class="title"
        @click="goToPost"
        >
            {{title}}
        </h2>
        <div class='date'>
            {{created.slice(0, 10)}} | ({{created.slice(11, 16)}})
        </div>
        
        <div class="categories">
            <div class='category' v-for="(category, i) in categories" :key="i"
                @click="pushToCategory(category.name)"
            >
                #{{category.name}}
            </div>
        </div>
        <img class='meme-img' :src="imgSrc" />
        <div class='upvote'>
            <div class='upvote-counter'>
                {{rating}}
            </div>
            <div class='btn upvote-btn'
                @click='upVotePost'
            >
                ^upvote^
            </div>
        </div>
        <div class='post-footer'>
            <div class='author'>
                {{author.login}}
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios')
export default {
    name: 'Post',
    props: ['refresh','title','created','categories','imgSrc','rating','author', 'id', 'isUserLoggedIn', 'logout', 'createAlert'],
    methods: {
        upVotePost(){
            if (!this.isUserLoggedIn){
                this.createAlert('error', 'You must be logged in to vote for post.')
                return
            }
            const accessToken = localStorage.getItem('accessToken')
            axios.post(`http://localhost:3000/post/${this.id}/upvote`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(() => this.refresh())
            .catch(err => {
                if (err.response.status == 401) {
                    this.createAlert('error', 'Session expired, please log in again')
                    this.logout()
                    return
                }
                this.createAlert('error', 'Something went wrong...')
            })
        },
        goToPost(){
            this.$router.push({name: 'SinglePost', params: {id: this.id}})
        },
        pushToCategory(category){
            this.$router.push({name: 'PostsByCategory', params: {category: category}})
        }
    }
}
</script>