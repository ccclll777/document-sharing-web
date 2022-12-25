import request from "@/utils/request";



export function getTagCount() {
    return request({
        url: '/tag/count',
        method: 'get'
    })
}

export function getTagList(page, size) {
    return request({
        url: '/tag/all',
        method: 'get',
        params: { pageNum: page, pageSize: size }
    })
}

export function addTag(data) {
    return request({
        url: '/tag/insert',
        method: 'post',
        data
    })
}

export function deleteTag(tagId) {
    return request({
        url: '/tag/delete/' + tagId,
        method: 'delete'
    })
}

export function deleteTagList(tagIds) {
    return request({
        url: '/tag/deleteList/' + tagIds,
        method: 'delete',
    })
}
