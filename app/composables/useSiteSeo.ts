interface SiteSeo {
  /** Page title without the site suffix; omit for the home page. */
  title?: string
  description: string
  /** Site-relative image path; falls back to the default card. */
  image?: string
  type?: 'website' | 'article'
}

/**
 * Title, description, canonical URL and Open Graph / Twitter tags for a page.
 * Link previews (LinkedIn, Slack, iMessage) need absolute URLs, so paths are resolved against siteUrl.
 */
export function useSiteSeo({ title, description, image, type = 'website' }: SiteSeo) {
  const { siteUrl } = useRuntimeConfig().public
  const route = useRoute()
  const url = `${siteUrl}${route.path === '/' ? '' : route.path}`
  const fullTitle = title ? `${title} | Tevin Rivera` : 'Tevin Rivera | Senior Frontend Engineer'
  const imageUrl = `${siteUrl}${image ?? '/og-default.png'}`
  // Case Studies and Posts read well on their own; other pages keep the site name.
  const shareTitle = type === 'article' && title ? title : fullTitle

  useHead({ link: [{ rel: 'canonical', href: url }] })
  useSeoMeta({
    title: fullTitle,
    description,
    ogTitle: shareTitle,
    ogDescription: description,
    ogType: type,
    ogUrl: url,
    ogSiteName: 'Tevin Rivera',
    ogImage: imageUrl,
    ogImageAlt: shareTitle,
    twitterCard: 'summary_large_image',
    twitterTitle: shareTitle,
    twitterDescription: description,
    twitterImage: imageUrl,
  })
}
