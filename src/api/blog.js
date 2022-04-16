import request from '@/utils/request'

// 请求文章列表接口
export const getAllBlog = (params)=>{
    return request({
        url:`/blog/list`,
        method:'post',
        params:params
    })
}
// 文章上传图片接口
export const uploadImage = (params)=>{
    return request({
        url:'/image/blog/upload',
        method:'post',
        data:params,
        headers: { "Content-Type": "multipart/form-data" },
    })
}
// 文章保存接口
export const saveBlog = (params) =>{
    return request({
        url:'/blog/addBlog',
        method:'post',
        data:params,
    })
}
// 修改文件状态接口
export const alterBlogStatus = (blog_title,blog_status)=>{
    return request({
        url:`/blog/alter/${blog_title}/${blog_status}`,
        method:'get'
    })
}
// 删除文章接口
export const deleteBlog = (blog_title)=>{
    return request({
        url:`/blog/delete/${blog_title}`,
        method:'get'
    })
}
// 编辑文章接口
export const viewBlog = (blog_title)=>{
    return request({
        url:`/blog/view/${blog_title}`,
        method:'get'
    })
}
// 文章分类接口
export const categoryList = ()=>{
    return request({
        url:'/category/list',
        method:'get'
    })
}
// 修改文章分类状态
export const alterCategory = (category_id,category_status)=>{
    return request({
        url:`/category/alter/${category_id}/${category_status}`,
        method:'get'
    })
}
// 删除文章分类接口
export const deleteCategory = (category_id)=>{
    return request({
        url:`/category/delete/${category_id}`,
        method:'get'
    })
}
// 新增文章分类接口
export const insertCategory = (categoryName)=>{
    return request({
        url:'/category/insert',
        method:'post',
        params:categoryName
        
    })
}
// 获取文章已发布接口
export const getCategoryStatus = ()=>{
    return request({
        url:'/category/list/status',
        methods:'get',
    })
}
// 展示博客主页接口
export const getIndexBlog = (params)=>{
    return request({
        url:`/index/list`,
        method:'post',
        params:params
    })
}
// 展示热门分类
export const getHotCategory = ()=>{
    return request({
        url:`/index/category/list`,
        method:'get',
    })
}
// 展示热门文章
export const getHotBlog = ()=>{
    return request({
        url:'/index/host/list',
        method:'get'
    })
}
// 展示最新文章
export const getNewBlog = ()=>{
    return request({
        url:'/index/new/list',
        method:'get'
    })
}

export const viewIndexBlog = (blog_title)=>{
    return request({
        url:`/index/view/${blog_title}`,
        method:'get'
    })
}
