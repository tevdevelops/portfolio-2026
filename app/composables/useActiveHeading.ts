import type { TocLink } from '@nuxt/content'

/** The id of the Chapter heading that most recently crossed into the top third of the viewport. */
export function useActiveHeading(links: MaybeRefOrGetter<TocLink[]>) {
  const active = ref(toValue(links)[0]?.id)

  onMounted(() => {
    const headings = toValue(links)
      .map(l => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el)
    useIntersectionObserver(headings, (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) active.value = e.target.id
      }
    }, { rootMargin: '0px 0px -66% 0px' })
  })

  return active
}
