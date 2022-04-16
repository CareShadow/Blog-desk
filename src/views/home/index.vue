<template>
 <div class="container-fluid">
        <div class="row header" style="background-image: url('/back.png');position: relative;">
            <h2 style="text-align: center;color: whitesmoke;font-family: 'SimSun';">星光不问赶路人，时光不负有心人</h2>
            <h3 style="position: absolute;left: 18px; top: 0px;">CareShadow Blog</h3>
            <h3 style="position: absolute;right: 240px; top: 0px;"><router-link to="/index">主页</router-link></h3>
            <h3 style="position: absolute;right: 154px; top: 0px;">友链</h3>
            <h3 style="position: absolute;right: 71px; top: 0px;"><router-link to="/home">后台</router-link></h3>
        </div>
        <div class="container">
            <el-row :gutter="20">
                <el-col :span="16" >
                    <div style="display: flex; flex-direction: column;border-bottom: solid thin;margin-bottom: 30px;" v-for="(item,index) in blogList" :key="index">
                        <div>
                           <el-avatar size="medium"  shape="circle" src="back.png">&nbsp;</el-avatar>
                            <span>careshadow</span>&nbsp;&nbsp;
                            <span style="opacity: .5;">in</span>&nbsp;
                            <a href="##"><span>{{item.category.categoryName}}</span></a>
                        </div>
                        <router-link :to="{
                          path:'/show',
                          query:{
                            blog_title:`${item.blogTitle}`
                          }
                        }">
                            <h3 style="margin-bottom:0px;">{{item.blogTitle}}</h3>
                        </router-link>
                        <router-link :to="{
                          path:'/show',
                          query:{
                            blog_title:`${item.blogTitle}`
                          }
                        }">
                            <h4 style="opacity: 0.7;">{{item.blogPreface}}</h4>
                        </router-link >
                    </div>
                     <el-pagination
                      v-show="total!==0"
                      style="margin-top: 20px; text-align: center"
                      background
                      layout="prev, pager, next"
                      :total="total"
                      :page-size="4"
                       @current-change="pageChange"
                      >
                     </el-pagination>
                     <h3  v-show="total==0">无数据</h3>
                </el-col>
               <el-col :span="8">
                    <!-- 搜索文章 -->
                    <div style="margin-bottom: 30px;">
                        <h3 style="border-bottom:solid 1px rgb(230, 227, 218);padding-bottom: 10px;margin-bottom: 20px;">搜索文章</h3>
                        <input style="width: 304px;height:34px;" v-model="params.search" type="text" placeholder="输入关键字查询">
                        <el-button  style="margin-left:5px" @click="Search" icon="el-icon-search" circle></el-button>
                    </div>
                    <!-- 热门标签 -->
                    <div style="margin-bottom: 30px;">
                        <h3 style="border-bottom:solid 1px rgb(230, 227, 218);padding-bottom: 10px;margin-bottom: 20px;">热门标签</h3>
                        <div style="display: flex; justify-content: flex-start;flex-wrap: wrap;">
                            <span style="border: solid 2px whitesmoke;padding: 5px; font-size: 15px; margin-bottom: 8px;margin-right: 20px" v-for="item in hotCategory" :key="item.categoryId">{{item.categoryName}}</span>
                        </div>
                    </div>
                    <!-- 最新发布 -->
                    <div style="margin-bottom: 30px;">
                        <h3 style="border-bottom:solid 1px rgb(230, 227, 218);padding-bottom: 10px;margin-bottom: 20px;">最新发布</h3>
                        <h5 v-for="item in newBlog" :key="item.blogTitle"> 
                           <router-link :to="{
                          path:'/show',
                          query:{
                            blog_title:`${item.blogTitle}`
                          }
                        }">{{item.blogTitle}}
                           </router-link>
                        </h5>
                    </div>
                    <!-- 点击最多 -->
                    <div style="margin-bottom: 30px;">
                        <h3  style="border-bottom:solid 1px rgb(230, 227, 218);padding-bottom: 10px;margin-bottom: 20px;">点击最多</h3>
                        <h5  v-for="item in hotBlog" :key="item.blogTitle" style="border-bottom:solid 1px rgb(230, 227, 218);padding-bottom: 10px;margin-bottom: 20px;">
                          <router-link :to="{
                          path:'/show',
                          query:{
                            blog_title:`${item.blogTitle}`
                          }
                        }">{{item.blogTitle}}
                           </router-link>
                        </h5>
                    </div>
               </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      params:{
        page:1,
        count:4,
        search:''
      },
      blogList:[],
      hotCategory:[],
      newBlog:[],
      hotBlog:[],
      total:0
    }
  },
    mounted(){
      this.getData();
    },
    methods:{
      async getData(){
        let result = await this.$API.blog.getIndexBlog(this.params);
        if(result.code==200){
          this.blogList = result.data.blogList;
          this.total = result.data.total
          this.hotCategory =  result.data.hotCategory
          this.newBlog =  result.data.newBlog
          this.hotBlog =  result.data.hotBlog
        }
      },
      pageChange(val) {
        this.params.page = val;
        this.getData();
      },
      Search(){
        this.params.page=1;
        this.getData();
      }
    }
}
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
        padding: 130px 0 130px;
    }
    h5{
        margin-bottom: 20px;
    }
    .header>h3{
        color: whitesmoke;
        font-family: 'SimSun';
    }
    .container{
      margin: auto;
      width: 70%;
    }
    .container-fluid{
      width: 100%;
    }
</style>