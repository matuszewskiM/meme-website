<template>
<div class="container">
  <div class="posts-container">
    <ul>
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
      :pagesCount='pagesCount'
      :currentPage="currentPage"
      :changePage="changePage"
    />
  </div>
  <CategoryList />
</div>
</template>

<script>
const axios = require('axios')
import Post from "../components/Post.vue"
import CategoryList from "../components/CategoryList.vue"
import Pagination from "../components/Pagination.vue"

export default {
    name: "PostByCategory",
    props: ['isUserLoggedIn', 'logout', 'createAlert'],
    components: {
        Post,
        CategoryList, 
        Pagination
    },
    data(){
      return{
        posts: [],
        currentPage: 1,
        pagesCount: 10
      }
    },
    methods:{
      fetchPosts(){
        axios.get(`http://localhost:3000/posts/category/${this.$route.params.category}/${this.currentPage}`)
          .then(res => this.posts = res.data.posts)
      },
      changePage(number){
        this.currentPage = Number(number);
        this.$router.push({name: 'PostsByCategoryPage', params: {category: this.$route.params.category, page: this.currentPage}});
        window.scrollTo(0, 0)
      },
    },
    mounted(){
      axios.get(`http://localhost:3000/posts/category/${this.$route.params.category}/pages_count`)
      .then(res => {
        this.pagesCount = res.data.pagesCount
      })
      this.currentPage = Number(this.$route.params.page) || 1;
      this.fetchPosts();
      this.$watch(
        () => this.$route.params,
        (toParams) => {
          if(toParams.category){
            if (toParams.page)
              this.changePage(toParams.page)
            else
              //this.changePage(1)
              this.$router.push({name: 'PostsByCategory', params: {category: toParams.category}})
            axios.get(`http://localhost:3000/posts/category/${this.$route.params.category}/pages_count`)
            .then(res => {
              this.pagesCount = res.data.pagesCount
            })
            this.fetchPosts()
          }
        })
    },
}
</script>