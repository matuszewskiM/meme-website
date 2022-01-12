import { createRouter, createWebHistory } from "vue-router"
import PostsView from "../views/PostsView"
import AddPostView from "../views/AddPostView"
import SinglePostView from "../views/SinglePostView"
import PostsByCategory from "../views/PostsByCategory"

const routes = [
  {
    path: "/posts/1",
    name: "Home",
    component: PostsView,
    alias: "/"
  },
  {
    path: "/posts/:page",
    name: "Posts",
    component: PostsView
  },
  {
    path: "/add",
    name: "AddPost",
    component: AddPostView
  },
  {
    path: "/post/category/:category",
    name: "PostsByCategory",
    component: PostsByCategory,
    alias: '/post/category/:category/1'
  },
  {
    path: "/post/category/:category/:page",
    name: "PostsByCategoryPage",
    component: PostsByCategory
  },
  {
    path: "/post/:id",
    name: "SinglePost",
    component: SinglePostView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
