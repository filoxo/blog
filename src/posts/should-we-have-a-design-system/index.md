---
title: Should we have a design system?
date: 2024-05-06
tags: [javascript, architecture]
---

before leaving for the weekend, my coworker Luca posed an excellent question that i think is worth sharing and expanding on. shout out to [Luca](https://github.com/lucafrederice/) for this inspired question! 

<!-- excerpt-end -->

> Do you think [our current company's name] should have a design system at its current maturity level?

my response:

> No, it should have a **design gallery** - a baseline set of high quality components that are composible, and serve the business needs. Both of these are objectives that most open source design systems don't share

expanding on those points

## "design gallery"?

to put it simply, this is a PR tactic. "design system" has no consistent definition across the realms of design, product, and engineering... and yet some how also generally share that it'd be a lot to build from the ground up. and pretty much the same if you say "component library", very enterprise-y. [this article does a good job mapping the breadth of a "mature design system"](https://bigmedium.com/ideas/design-system-ecosystem.html). still, seems like a lot of that overhead could be avoided if spun as a 'gallery of ready-made components for us to use'. at least when you're a smaller stage organization. what do you think?

## define "high quality components"

"design gallery" also helps lend a perception that what you're making is more bespoke and tailor-made. and i really believe that to be very wise approach to take. be thoughtful of how your components are going to be used. **curate** it to the strengths and weaknesses of your business [someday graduate that into _pacelayering_](https://bigmedium.com/ideas/design-system-ecosystem.html). also, [no crap](https://bradfrost.com/blog/post/dont-put-crap-in-the-design-system/) goes in. my personal philosophy when it comes to components is that they should have sensible defaults, with escape hatches as needed.

in practice, this means that we've placed bets on Tailwind, React & Remix, and an emphasis on web basics and standards. i already see an roi on the current wave of tools to look at for inspiration. shout out to tailwindui, shadcn/ui, ark-ui, and v0.dev. 

## serve the needs

here's where relying on an open source design system seems to break down at startups, in my experience. there just isn't a consistent-enough language to speak end-user/business requirements to design/UX and output engineering requirement. open source design systems simply can't serve these hyper-specific needs... but your frontend devs do, everyday.

some examples of this are:

- ensuring that the designs meet SEO and a11y requirements
- building patterns that aren't readily available elsewhere
- basically anything that can preceeds [writing a ux case study](https://bootcamp.uxdesign.cc/how-to-write-a-ux-case-study-6c5190554d0d)

ultimately, what i'm getting at is that your org should strive to build something that is _for themselves & their needs_ to deliver something good.