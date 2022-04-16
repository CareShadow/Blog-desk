<template>
  <div>
  <el-form :inline="true" :model="formInline" ref="ruleform" :rules="rules" class="demo-form-inline">
  <el-form-item label="标题" prop="blogTitle">
    <el-input v-model="formInline.blogTitle" placeholder="请输入文章标题"></el-input>
  </el-form-item>
   <el-form-item label="预览" prop="blogPreface"> 
    <el-input v-model="formInline.blogPreface" placeholder="请输入文章介绍"></el-input>
  </el-form-item>
   <el-form-item label="是否发布">
    <el-switch v-model="formInline.blogStatus" :active-value="0" :inactive-value="1"></el-switch>
  </el-form-item>
  <el-form-item label="文章标签">
    <el-select v-model="formInline.blogCategoryId" placeholder="分类">
      <el-option v-for="item in categoryList" 
      :key="item.categoryId"
      :label="item.categoryName"
      :value="item.categoryId"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="handlerSave">保存</el-button>
  </el-form-item>
</el-form>
    <mavon-editor
      v-model="formInline.blogContent"
      @save="handlerSave"
      ref="md"
      @imgAdd="$imgAdd"
      @imgDel="$imgDel"
    />
  </div>
</template>

<script>
export default {
  mounted(){
      this.getCategory();
      this.getData();
  },
  data() {
    return {
      img_file: {},
      formInline: {
        blogCategoryId:1,
        blogContent:'开始编辑...',
        blogPreface:'',
        blogStatus:0,
        blogTitle:'',   
      },
      categoryList:[],
      rules: {
          blogTitle: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          blogPreface: [
            { required: true, message: '请输入文章介绍', trigger: 'blur' },
            { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
          ],
      }
    };
  },
  methods: {
    async getData(){
      let blogTitle = this.$route.query.blogTitle;
      if(blogTitle){
       let result = await this.$API.blog.viewBlog(blogTitle);
       if(result.code==200){
         this.formInline = result.data
       }
      }
    },
    async getCategory(){
      let result = await this.$API.blog.getCategoryStatus();
      if(result.code==200){
        this.categoryList = result.data;
      }
    },
    // 保存文章
     handlerSave() {
      this.$refs['ruleform'].validate(async (valid) => {
          if (valid) {
            let result = await this.$API.blog.saveBlog(this.formInline);
            if(result.code==200){
              this.$message({
              message:'保存成功',
              type:'success'
            });
            }else{
              this.$message({
                message:'保存失败',
                type:'error'
              })
            }
          }else {
            this.$message({
              message:'填写必要条件',
              type:'error'
            })
          }
        });
    },
    async $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", $file);
      this.img_file[pos] = $file;
      let result = await this.$API.blog.uploadImage(formdata);
      if (result.code == 200) {
        this.$refs.md.$img2Url(pos, result.data.url);
      }
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    },
  },
};
</script>

<style>
.demo-form-inline{
  margin-top: 15px;
}
</style>