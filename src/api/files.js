
import request, {getBaseUrl} from "@/utils/request";
export function getUploadUrl() {
    // console.log("BASE_URL",getBaseUrl())
    return getBaseUrl() + "/files/upload"
}

// 获取文档数量
export function getFileCount() {
    return request({
        url: '/files/count',
        method: 'get',
    })
}

export function getFileList(page, size) {
    return request({
        url: '/files/all',
        method: 'get',
        params: { pageNum: page, pageSize: size }
    })
}

export function deleteFileCompletely(id) {
    return request({
        url: '/files/deleteCompletely/' + id,
        method: 'delete'
    })
}

export function deleteFile(id) {
    return request({
        url: '/files/delete/' + id,
        method: 'delete'
    })
}

// 获取文档数量
export function getUserFileCount() {
    return request({
        url: '/files/userFileCount',
        method: 'get',
    })
}

export function getUserFileList(page, size) {
    return request({
        url: '/files/userFileList',
        method: 'get',
        params: { pageNum: page, pageSize: size }
    })
}

// 搜索
export function searchFileList(word) {
    return request({
        url: '/files/search',
        method: 'get',
        params: { keyWord: word }
    })
}

export function searchFileHint(word) {
    return request({
        url: '/files/hint',
        method: 'get',
        params: { keyWord: word }
    })
}