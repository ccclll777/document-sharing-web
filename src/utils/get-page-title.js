import defaultSettings from '@/settings'

const title = defaultSettings.title || 'All-Docs'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
