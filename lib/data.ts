import siteData from '@/data/site.json'

export type SiteData = typeof siteData

export const getSiteData = (): SiteData => {
  return siteData
}

export const getHeroData = () => siteData.hero
export const getAboutData = () => siteData.about
export const getServicesData = () => siteData.services
export const getAdvantagesData = () => siteData.advantages
export const getTrustData = () => siteData.trust
export const getGalleryData = () => siteData.gallery
export const getCTAData = () => siteData.cta
export const getContactsData = () => siteData.contacts
export const getFooterData = () => siteData.footer
export const getMetaData = () => siteData.meta

