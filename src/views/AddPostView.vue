<template>
    <div class="add-post">
        <div class="post-form">
            <h3>Title:</h3>
            <div class='title-notice' 
                v-if='isTitleNoticeVisible'
            >
                Title must be alphanumer between 8-24 characters.
            </div>
            <input class='title-input' 
                placeholder="title"
                v-model='title'
                @input="setTitleNotice"
            />
            <img class='meme-img' 
                :src='imgSrc' 
            />
            <div id='img-input'>
                <input type="file" 
                    class='input-img' 
                    accept='.jpeg, .jpg, .png' 
                    @change='handleFileChange'
                />
            </div>
            Choose categories: (1-10)
            <div class="categories">
                <ul>
                    <li v-for='(category, i) in categories' :key='i'>
                        <input type='checkbox' 
                            :name='category.name' 
                            @input="handleCategoryCheck(category)"    
                        />
                        <label :for='category.name'>{{category.name}}</label>
                    </li>
                </ul>
            </div>
            <div class='btn post-submit'
                @click='addPost'>
                ADD NEW MEME
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios')
export default {
    name: 'AddPostView',
    props: ['createAlert', 'isUserLoggedIn'],
    data(){
        return {
            imgSrc: '',
            file: '',
            title: '',
            categories: [],
            isTitleNoticeVisible: false,
            isImgNoticeVisible: false,
            isCategoriesNoticeVisible: false
        }
    },
    methods: {
        handleFileChange(e) {
            this.imgSrc = URL.createObjectURL(e.target.files[0])
            this.file = e.target.files[0]
        },
        handleCategoryCheck(category){
            category.isChecked = !category.isChecked
        },
        setTitleNotice(){
            const pattern = /^([a-zA-Z0-9]){8,24}$/
            if (pattern.test(this.title) || this.title == '')
                this.isTitleNoticeVisible = false
            else 
                this.isTitleNoticeVisible = true
        },
        validateForms(){
            const checkedCategories = this.categories.filter(elem => elem.isChecked)
            const pattern = /^([a-zA-Z0-9]){8,24}$/

            if (checkedCategories.length > 10 || checkedCategories.length < 1 || !pattern.test(this.title) || this.file == ''){
                console.log(checkedCategories)
                return false
            }
                
            return true
        },
        addPost(){
            if (!this.validateForms())
                return null

            const accessToken = localStorage.getItem('accessToken')
            let formData = new FormData()
            let postCategories = this.categories.filter(elem => elem.isChecked === true);
            postCategories = postCategories.map(cat => cat._id)

            formData.append('img', this.file)
            formData.append('title', this.title)
            formData.append('categories', postCategories)

            axios.post('http://localhost:3000/posts/create_post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`
                },
            })
            .then((res) => {
                this.createAlert('success', 'Added new post.')
                this.$router.push({name: 'SinglePost', params:{id: res.data.id}})
            })
            .catch((err) => {
                if (err.response.status === 401){
                    this.createAlert('error', 'Session expired, log in again.')
                    return
                }
                this.createAlert('error', err)
            })
        }
    },
    mounted(){
        if (!this.isUserLoggedIn){
            this.$router.push({name: 'Home'})
            this.createAlert('error','You must be logged in to add a post')
            return
        }
        axios.get('http://localhost:3000/posts/categories')
            .then(res => {
                this.categories = res.data.categories
                for (let category of this.categories){
                    category.isChecked = false;
                }
            })
    }
}
</script>