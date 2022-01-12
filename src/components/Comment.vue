<template>
<div class='comment'>
    <div class='comment-author'>
        <img class="comment-author-img" :src="imgSrc">
        {{nickname}}
    </div>
    <div class='comment-content'>
        {{content}}
    </div>
    <div class='comment-rating'>
        <div class='vote-button downvote'
            @click='downvote'
        >
            <fa-icon icon='minus' />
        </div>
        <div class='score'
            :class="{'positive': score> 0, 'negative': score < 0}"
        > 
            {{rating}}
        </div>
        <div class='vote-button upvote' 
            @click='upvote'
        >
            <fa-icon icon='plus' />
        </div>
    </div>
</div>   
</template>

<script>
const axios = require('axios')
export default {
    name: 'Comment',
    props: ['nickname',
        'content',
        'rating',
        'id',
        'refresh',
        'isUserLoggedIn',
        'logout',
        'createAlert',
        'imgSrc'
    ],
    methods: {
        upvote(){
            if (!this.isUserLoggedIn){
                this.createAlert('error', 'You must be logged in to vote for comment')
                return
            }
            const accessToken = localStorage.getItem('accessToken')
            axios.post(`http://localhost:3000/comment/${this.id}/upvote`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
            .then(() => {
                this.refresh()
            })
            .catch((err) => {
                if (err.response.status == 401 && this.isUserLoggedIn){
                    this.logout()
                    this.createAlert('error','Session expired, please log in again.')
                } 
            })
        },
        downvote(){
            console.log(this.isUserLoggedIn)
            if (!this.isUserLoggedIn){
                this.createAlert('error', 'You must be logged in to vote for comment')
                return
            }
            const accessToken = localStorage.getItem('accessToken')
            axios.post(`http://localhost:3000/comment/${this.id}/downvote`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
            .then(() => {
                this.refresh()
            })
            .catch((err) => {
                if (err.response.status == 401 && this.isUserLoggedIn){
                    this.logout()
                    this.createAlert('error','Session expired, please log in again.')
                } 
            })
        }
    }
}
</script>