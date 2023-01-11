import request from "@/utils/request";

export function getRecentFiles(page, size) {
    return request({
        url: '/statistics/recently',
        method: 'get',
        params: { page: page, size: size }
    })
}