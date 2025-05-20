---
title: Reacting to React
date: 2025-04-14
tags: [react, javascript]
---

i've been bothered by the direction the React framework has been trending, and i wanted to write down this reaction.

<!-- excerpt-end -->

for context, i'm just a React developer whose been using React since 2017-ish. i really liked React's client-side rendering model, pioneering dom diffing, and lean aspect.

---

the gist of the current trend today in 2025 is that react is becoming a server-side framework. React Server Components

## bUt iTs OpT iN!

## OKAY but still why do i need React on the server to render HTML?

okay so here's still the crux of my issue: i still need convincing that i have to have react on the server.

there are many more frameworks that render html better. i'd still wonder how well Nextjs stacks up to Elixir or Ruby in practice (with major caveats, like whether or not deploying to Vercel should be pre-requisite).

## your org now needs "full stack devs" to manage new the Backend for Frontend

does your CTO really grasp the paradigm transition when you invest in server-side react? more importantly, does your average react dev??

it will require standing up a new server stack to manage OR integrating your infra with Vercels. your devs will have to understand how to make everything SSR-able (which i still find non-trivial) as well as how to triage perf bottlenecks and SSR incompatible libraries and re-hydration errors... only to have react re-render everything again :upside-down-smile:
