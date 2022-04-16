<template>
<div class="container-fluid">
        <div class="row header" style="background-image: url('/back.png');position: relative;">
            <!-- <h2 style="text-align: center;color: whitesmoke;font-family: 'SimSun';">星光不问赶路人，时光不负有心人</h2> -->
            <div style="position:absolute;left:500px;">
              <h1 style="color: whitesmoke;font-family: 'SimSun';">{{blogTitle}}</h1>
              <h3 style="color: whitesmoke;font-family: 'SimSun';font-style:italic">{{createTime}}&nbsp;&nbsp;{{blogViews}}浏览</h3>
              <span style="color: whitesmoke;font-family: 'SimSun';border: solid 1px whitesmoke;padding: 7px;">默认标签</span>
            </div>
            <h3 style="position: absolute;left: 18px; top: 0px;">CareShadow Blog</h3>
            <h3 style="position: absolute;right: 240px; top: 0px;"><router-link to="/index">主页</router-link></h3>
            <h3 style="position: absolute;right: 154px; top: 0px;">友链</h3>
            <h3 style="display:inline-block;position: absolute;right: 71px; top: 0px;"><router-link to="/home">后台</router-link></h3>
        </div>
  <div v-html="blogContent" style="width: 70%; margin:auto">
   
  </div>
  </div>
</template>

<script>
import marked from "marked"; // 引入marked
import hljs from "highlight.js"; // 引入 highlight.js
import "highlight.js/styles/vs2015.css"
export default {
  mounted() {
   var rendererMD = new marked.Renderer();
    marked.setOptions({
      renderer: rendererMD,
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });
    this.getData();
  },
  data() {
    return {
      blogContent: "<h3>加载中</h3>",
      blogTitle:'',
      createTime:'',
      blogViews:'',
    };
  },
  methods: {
    async getData() {
      let blog_title = this.$route.query.blog_title;
      let result = await this.$API.blog.viewIndexBlog(blog_title);
      if (result.code == 200) {
        // 代码块背景问题
        this.blogContent = marked(result.data.blogContent).replace(/<pre>/g, "<pre class='hljs'>");
        this.blogTitle = result.data.blogTitle;
        this.createTime = result.data.createTime;
        this.blogViews =result.data.blogViews;
      }
    },
  },
};
</script>

<style scoped>
 .header {
        background: no-repeat center center;
        background-color: #808080;
        background-attachment: scroll;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        background-size: cover;
        -o-background-size: cover;
        margin-bottom: 30px;
        padding: 130px 0 180px;
    }
  .container-fluid{
    width: 100%;
  }
 .header>h3{
        color: whitesmoke;
        font-family: 'SimSun';
    }
</style>