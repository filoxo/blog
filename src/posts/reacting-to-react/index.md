---
title: Reacting to React
date: 2025-06-02
tags: [react, javascript]
---

i've been bothered by the direction the React framework has been trending, and i wanted0 to write down this reaction of mine.

<!-- excerpt-end -->

for context, i'm just a React developer whose been using React since 2017-ish. i really liked React's client-side rendering model, pioneering dom diffing, and "not a framework" stance that made it seem lean.

---

the gist of react's current trend today in 2025 is that it is becoming a server-side framework, compiler and all, with Next.js being the bastion of endeavor.

## OKAY but still why do i need React on the server to render HTML?

okay so here's still the crux of my issue: i still need convincing that i **have to have react** on the server. or even javascript for that matter!

there are many more frameworks that render html better. i'd still wonder how well Nextjs stacks up to Elixir or Ruby in practice (with major caveats, like whether or not deploying to Vercel should be pre-requisite). honestly, i'd fancy a setup with htmx + alpine or vanjs. these days i'm more interested in dabbling with web components for truly framework agnostic components.

## bUt iTs OpT iN!

except its not. unless 'opting out' means remaining on React 18 and... not ever updating. but i don't see any speak of "clientside react" or "react without server". almost all talks focus on this "you can server render React" approach which i'm still not on board with.

## nextjs is good, not great

i hesitate to take too much time to describe these issues because i'm not a heavy nextjs user. i've read up on issues like how difficult it is to upgrade between versions since features seem rushed/incomplete, [how difficult it is to deploy to non-Vercel environments](https://x.com/thdxr/status/1718308244383228124), and [how hard it seems to performance tune](https://www.reddit.com/r/nextjs/comments/1iuv3g1/big_rant_about_how_much_nextjs_sucks_at_any_type/).

so dear reader, i can only speak from my own experience now. if nextjs is how the majority of react apps will be built... i kinda want to just walk away now. its fine i guess - but its also not the best. i've not had great experiences with Page router, App router is slightly better for me to understand. ultimately it doesn't feel magical like other frameworks seem to.Remix did - and now its dead.

## react dev === fullstack dev

here's something else for you to consider... does your CTO of your company really grasp the paradigm transition from when you invest in server-side react? more importantly, does your average react dev??

your org now needs "full stack devs" to manage new the [Backend for Frontend](https://remix.run/docs/en/main/guides/bff) who are well versed in what Nodejs or edge runtimes that serve this part of the app.

it could require standing up a new server stack to manage OR integrating your infra with Vercels. your devs will have to understand how to make everything SSR-able (which i still find non-trivial) as well as how to triage perf bottlenecks and SSR incompatible libraries and re-hydration errors... only to have react re-render everything again 🙃
