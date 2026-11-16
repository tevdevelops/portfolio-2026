---
title: Aurora Anguilla, built in two months
summary: Sole developer on a headless Nuxt + WordPress site for a Caribbean resort, from style guide to launch, with content served through Elasticsearch.
org: King & Partners
role: Web Developer (sole developer)
period: Agency project
stack: [Nuxt, Vue, WordPress, Elasticsearch]
status: published
outcomes:
  - Full site shipped in two phases over two months
  - First end-to-end build on the agency's headless Nuxt stack
  - Editors kept WordPress; visitors got a static, fast front end
cover: /media/work/aurora-anguilla/cover.jpg
liveUrl: https://www.auroraanguilla.com/
order: 2
featured: true
---

<!-- DRAFT: rewritten from the 2022 portfolio copy; to be tightened in Step 5. -->

## The brief

Aurora Anguilla, a resort client of King & Partners, needed a new site that matched an ambitious hospitality design while still letting their team edit everything in WordPress.

## My role

I was the only developer on the project. I worked directly with the designer to settle the site structure, global elements, style guide and component set, then built the whole site in two phases.

## Approach

I started from the agency's Nuxt base template, which came with WordPress, Vue and Nuxt already configured. Content was modeled as ACF fields defined in JSON. An in-house plugin serialized them into Elasticsearch, and that data flowed straight into the props of Nuxt layout templates. That let me spend most of my time on the front end.

Growing CMS data is a known problem for static site generators: several editors change pages at once, sometimes during a production deploy. The agency's incremental-build system rebuilt one page at a time, which kept uptime high while editors worked.

## Outcome

::site-video{src="/media/work/aurora-anguilla/site-scroll.mp4" poster="/media/work/aurora-anguilla/cover.jpg" caption="A scroll through the finished homepage."}
::

The whole site went from design hand-off to launch in two months. It was my first project on the stack from start to finish, and it made me a lasting Vue and Nuxt advocate.
