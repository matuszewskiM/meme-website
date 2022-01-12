<template>
<div class="container" v-if="posts.length > 0">
  <div class="posts-container">
    <div class='loading-icon' v-if="isLoading"> 
      <fa-icon icon="spinner" size="5x" :pulse="true" />
    </div>
    <ul v-else>
      <li class="posts-list" v-for='(post,i) in posts' :key='i'>
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
          :refresh="fetchPosts"
        />
      </li>
    </ul>
    <Pagination 
      v-if="!isLoading"
      :pagesCount='pagesCount'
      :currentPage="page"
      :changePage="changePage"
    />
  </div>
  <CategoryList />
</div>
</template>

<script>
import CategoryList from '../components/CategoryList.vue'
import Post from '../components/Post.vue'
import Pagination from '../components/Pagination.vue'
const axios = require('axios')
export default {
    name: 'PostsView',
    props: ['isUserLoggedIn', 'logout', 'createAlert'],
    components:{
      Post,
      CategoryList,
      Pagination
    },
    data(){
      return {
        posts: [],
        pagesCount: 2,
        page: 1,
        isLoading: false
      }
    },
    methods: {
      fetchPosts(){
        this.isLoading = true;
        axios.get(`http://localhost:3000/posts/page/${this.page}`) //paginacja!
        .then(res => {
          this.posts = res.data.posts;
          document.title = this.page > 1 ? `Memes: page ${this.page}` : 'Home page'
          this.toggleLoadingIcon();
        })
      },
      changePage(number){
        console.log(number)
        this.page = Number(number);
        this.$router.push({name: 'Posts', params: {page: number}});
        window.scrollTo(0, 0)
      },
      toggleLoadingIcon(){
        setTimeout(() => this.isLoading = false, 250)
      }
    },
    mounted(){
      axios.get(`http://localhost:3000/posts/pages_count`)
        .then(res => {
          this.pagesCount = res.data.pagesCount;
        })
      this.page = Number(this.$route.params.page) || 1;
      this.fetchPosts();
      this.$watch(
            () => this.$route.params,
            (toParams) => {
                if(toParams.page) {
                  this.changePage(toParams.page)
                  this.fetchPosts()
                }
                else{
                  this.page = 1;
                  this.fetchPosts()
                }
            }
        )
    }
  }
</script>