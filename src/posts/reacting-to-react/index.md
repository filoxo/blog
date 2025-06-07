---
title: Reacting to React
date: 2025-06-02
tags: [react, javascript]
---

i've been bothered by the direction the React framework has been trending, and i wanted to write down this reaction of mine.

<!-- excerpt-end -->

for context, i'm just a React developer whose been using React since ~2017. i really liked React's client-side rendering model, pioneering dom diffing, and its "not a framework" stance that made it seem lean.

---

the gist of react's current trend today in 2025 is that it is becoming a server-side framework, compiler and all, with Next.js being the bastion of this endeavor.

## why do i need React on the server to render HTML?

okay so here's the crux of my issue: i still need convincing that i **have to have react** on the server. or even javascript for that matter!

there are many more frameworks that render html better. i still wonder how well Nextjs stacks up to Elixir or Ruby in practice (with major caveats, like whether or not deploying to Vercel should be pre-requisite). honestly, i'd fancy a setup with htmx + alpine or vanjs. these days i'm more interested in dabbling with web components for truly framework agnostic components.

## bUt iTs OpT iN!

except... its not. unless 'opting out' means remaining on React 18 and never updating. but i don't see any speak of "clientside react" or "react without server". almost all the content now focus on the server-rendering path—which I’m still not on board with.

## nextjs is good, not great

i hesitate to go deep into this section since i'm not a heavy nextjs user. but i've read up on some popular issues, like how painful it is to upgrade between versions since features seem rushed/incomplete, [how difficult it is to deploy outside of Vercel](https://x.com/thdxr/status/1718308244383228124), and [how frustrating performance tuning can be](https://www.reddit.com/r/nextjs/comments/1iuv3g1/big_rant_about_how_much_nextjs_sucks_at_any_type/).

so dear reader, i can only speak from my own experience now. if nextjs is how the majority of react apps will be built... i kinda want to just walk away now. its fine i guess. i've not had great experiences with Page router, App router is slightly better for me to understand. ultimately it doesn't feel magical like other frameworks seem to. Remix did - and now its dead.

## react dev === fullstack dev

here's something else for you to consider... does the CTO of your company really grasp the paradigm shift required when investing in server-side react? more importantly, does your average react dev??

your org now needs "full stack devs" to manage new the [Backend for Frontend](https://remix.run/docs/en/main/guides/bff) who are well versed in what Nodejs or edge runtimes that serve this part of the app.

it could require standing up a new server stack to manage OR integrating your infra with Vercel's. your devs will have to understand how to make everything SSR-able (which i still find non-trivial) as well as how to triage perf bottlenecks and SSR incompatible libraries and re-hydration errors... only to have react re-render everything again 🙃

---

maybe i'm just not the target audience for modern react anymore, but i foresee still being a react user for the next years. i am curious how others are adapting and what they're choosing if they are also no longer on board with the current headwinds of modern react.