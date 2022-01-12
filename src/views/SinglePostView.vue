<template>
    <div class="container">
        <div class="post-container">
            <Post
                :title="post.title"
                :created="post.created"
                :categories="post.categories"
                :imgSrc="post.imgSrc"
                :rating="post.rating"
                :author="post.author"
                :id='post._id'
                :createAlert="createAlert"
                :isUserLoggedIn='isUserLoggedIn'
                :logout='logout'
                :refresh="fetchPost"
            />
            <div class='comment-form'>
                <textarea @input="updateCommentInputHeight" 
                    placeholder="Comment length must be between 2-300 characters...."
                    v-model="newCommentContent"
                />
                <div class='btn comment-form-submit'
                    @click="addComment"    
                >
                    Submit
                </div>
            </div>
            <ul>
                <li v-for="(comment, i) in post.comments" :key="i">
                    <Comment 
                        :nickname='comment.author.login'
                        :content='comment.content'
                        :rating='comment.rating'
                        :id='comment._id'
                        :refresh='fetchPost'
                        :isUserLoggedIn="isUserLoggedIn"
                        :logout="logout"
                        :createAlert="createAlert"
                        :imgSrc="comment.author.imgSrc"
                    />
                </li>
            </ul>
        </div>
        <CategoryList />
    </div>
</template>

<script>
import Post from '../components/Post.vue'
import Comment from '../components/Comment.vue'
import CategoryList from '../components/CategoryList.vue'
const axios = require('axios')

export default {
    name: "SinglePostView",
    props: ['isUserLoggedIn', 'logout', 'createAlert'],
    components: {
        Post,
        Comment,
        CategoryList
    },
    data(){
        return{
            post: {},
            comments: {},
            newCommentContent: ''
        }
    },
    methods: {
        fetchPost(){
            axios.get(`http://localhost:3000/posts/${this.$route.params.id}`)
                .then(res => {
                    this.post = res.data.post
                    document.title = this.post.title
                    })
                .catch(err => console.log(err))
        },
        updateCommentInputHeight(e){
            e.target.style.height = e.target.scrollHeight + 1 + 'px';
        },
        addComment(){
            if (!this.isUserLoggedIn){
                this.createAlert('error', 'You must be logged in to add comment.')
                return
            }
            if (this.newCommentContent.length > 300 || this.newCommentContent.length < 2)
                return null

            const accessToken = localStorage.getItem('accessToken')
            axios.post(`http://localhost:3000/post/${this.$route.params.id}/add_comment`,
                {
                    commentContent: this.newCommentContent
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
            })
            .then(() => {
                this.createAlert('success', 'Added new comment')
                this.fetchPost()
            })
            .catch(err => {
                if (err.response.status == 401){
                    this.createAlert('error','Session expired, please log in again')
                    this.logout()
                    return
                }
                this.createAlert('error','error')
                return
            })
        }
    },
    created(){
        this.fetchPost();
        this.$watch(
            () => this.$route.params,
            (toParams) => {
                if(toParams.id){
                    this.fetchPost()
                }
            }
        )
    },
}
</script>