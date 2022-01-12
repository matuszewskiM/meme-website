<template>
<div class="category-list">
    <div class="category" v-for="(category, i) in categories" :key='i'
        @click="pushToCategory(category.name)"
    >
        {{category.name}} <span>{{category.count}}</span>
    </div>
</div>
    
</template>

<script>
const axios = require('axios')
export default {
    name: "CategoryList",
    data(){
        return {
            categories: []
        }
    },
    methods: {
        pushToCategory(category){
            this.$router.push({name: 'PostsByCategory', params: {category: category}})
        }
    },
    created(){
        axios.get('http://localhost:3000/posts/categories/top')
            .then(res => this.categories = res.data.categories)
            .catch(err => console.log(err))
    },
}
</script>