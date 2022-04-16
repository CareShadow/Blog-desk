<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="blogTitle" label="标题" width="180">
      </el-table-column>
      <el-table-column prop="blogPreface" label="预览" width="180">
      </el-table-column>
      <el-table-column  label="发布状态">
       <template slot-scope="scope">
         <el-switch v-model="scope.row.blogStatus" 
         active-color="#ff4949" 
         inactive-color="#13ce66" 
         active-text="未发布" 
         inactive-text="发布"
         :active-value="1"
         :inactive-value="0"
         @change="changeStatus($event,scope.row.blogTitle)"
         >
        </el-switch>
       </template>
      </el-table-column>
      <el-table-column prop="category.categoryName" label="分类"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column prop="updateTime" label="更新时间"> </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button :disabled="scope.row.blogStatus==1" size="mini" @click="handleEdit(scope.row.blogTitle)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            :disabled="scope.row.blogStatus==0"
            @click="handleDelete(scope.row.blogTitle)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px; text-align: center"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="pageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getData();
  },
  data() {
    return {
      searchParam: {
        page: 1,
        count: 10,
        search: "",
      },
      tableData: [],
      total: 0,
    };
  },
  methods: {
    async getData() {
      let result = await this.$API.blog.getAllBlog(this.searchParam);
      if (result.code == 200) {
        this.tableData = result.data.blogList;
        this.total = result.data.total;
      }
    },
    pageChange(val) {
      this.searchParam.page = val;
      this.getData();
    },
    async changeStatus($event,blogTitle){
      let blog_status = $event?1:0
      console.log(blog_status);
      let result = await this.$API.blog.alterBlogStatus(blogTitle,blog_status);
      if(result.code==200){
         this.getData();
      }
    },
    async handleDelete(blogTitle){
      let result = await this.$API.blog.deleteBlog(blogTitle);
      if(result.code==200){
        this.$message({
          message:result.msg,
          type:'success'
        })
        this.getData();
      }
    },
    handleEdit(blogTitle){
        // 路由跳转
        this.$router.push({
           name:'Manage',
           query:{
             blogTitle:blogTitle
           }
        })  
    }
  },
};
</script>

<style>
</style>