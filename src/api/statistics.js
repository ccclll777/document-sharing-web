import request from "@/utils/request";

export function getRecentFiles(page, size) {
    return request({
        url: '/statistics/recently',
        method: 'get',
        params: { page: page, size: size }
    })
}

export function getHotFiles() {
    return request({
        url: '/statistics/hot',
        method: 'get'
    })
}

export function getFileListByCategoryId(page, size,categoryId) {
    return request({
        url: '/statistics/filesByCategoryId',
        method: 'get',
        params: {pageNum :page,pageSize:size,categoryId:categoryId}
    })
}