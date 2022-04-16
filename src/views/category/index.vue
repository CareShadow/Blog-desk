<template>
  <div>
    <el-table :data="category" border style="width: 100%">
      <el-table-column prop="categoryName" label="分类名称" width="180">
      </el-table-column>
      <el-table-column  label="发布状态">
       <template slot-scope="scope">
         <el-switch v-model="scope.row.categoryStatus" 
         active-color="#ff4949" 
         inactive-color="#13ce66" 
         active-text="未发布" 
         inactive-text="发布"
         :active-value="1"
         :inactive-value="0"
         @change="changeStatus($event,scope.row.categoryId)"
         >
        </el-switch>
       </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
       <el-table-column>
        <template slot="header" >
            <el-button 
            @click="dialogFormVisible = true"
            size="medium"
            type="primary"
            >新增</el-button>
        </template>   
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            :disabled="scope.row.categoryStatus==0"
            @click="handleDelete(scope.row.categoryId)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" modal width="40%">
  <el-form :model="form">
    <el-form-item label="分类名称" label-width="100px">
      <el-input v-model="form.categoryName" autocomplete="off" style="width:60%"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="handlerInsert">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
export default {
    data() {
        return {
            category:[],
            dialogFormVisible:false,
            form:{
                categoryName:'',
            }
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        async getData(){
            let result = await this.$API.blog.categoryList();
            if(result.code==200){
                this.category = result.data;
            }
        },
        async changeStatus(category_status,category_id){
          let result = await this.$API.blog.alterCategory(category_id,category_status);
          if(result.code==200){
            this.$message({
              type:'success',
              message:result.data,
            })
          }
        },
        async handleDelete(category_id){
            let result = await this.$API.blog.deleteCategory(category_id);
            if(result.code==200){
              this.getData();
              this.$message({
                type:'success',
                message:result.data,
              })
            }
        },
        async handlerInsert(){
          this.dialogFormVisible = false;
          let result = await this.$API.blog.insertCategory(this.form);
          if(result.code==200){
             this.$message({
                type:'success',
                message:result.data,
              })
              this.getData();
          } 
        }
    }
}
</script>

<style>

</style>