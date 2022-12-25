import request from "@/utils/request";



export function getCategoryCount() {
    return request({
        url: '/category/count',
        method: 'get'
    })
}

export function getCategoryList(page, size) {
    return request({
        url: '/category/all',
        method: 'get',
        params: { pageNum: page, pageSize: size }
    })
}

export function addCategory(data) {
    return request({
        url: '/category/insert',
        method: 'post',
        data
    })
}

export function deleteCategory(categoryId) {
    return request({
        url: '/category/delete/' + categoryId,
        method: 'delete'
    })
}

export function deleteCategoryList(categoryIds) {
    return request({
        url: '/category/deleteList/' + categoryIds,
        method: 'delete',
    })
}

export function updateCategory(id, data) {
    return request({
        url: '/category/update',
        method: 'post',
        data
    })
}