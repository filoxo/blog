---
title: i'm in love with astro
date: 2025-08-06
tags: ['javascript']
---

i've challenged myself to try learning something new, and this time around i'm learning [astro](https://astro.build). however, i don't have a current project to build with it so i'm learning first by reading the documentation thoroughly. and... i gotta, i'm already in love. here's a bit about what i'm reading that has be convinced.

<!-- excerpt-end -->

> **Server-first:** Websites run faster when they render HTML on the server.

this is a truth that many a React dev doesn't seem to remember. i primarily work with React for my job and so i keep up with the current trends. one thing that i've still not understood is [why javascript/react is a good choice for rendering on the server](https://filoxo.github.io/posts/reacting-to-react/#why-do-i-need-react-on-the-server-to-render-html%3F). i'm not convinced it is, and i truly think that many orgs would be better off if the responsibility of rendering on the server was in the hands of a more-capable framework.

> Astro is only a successful project if people love using it

stemming from when i used to maintain an open-source library, i believe that developer experience is something that many frameworks don't focus on enough. right now the react ecosystem feels like a ride i don't want to be on, and a large part of that is because of my own dissatisfaction with react's features that don't give me the promised benefits (suspense, compiler, hydration/ssr)... at least not without significant investment. i wish react was easier to "get right."

> An island always runs in isolation from other islands on the page, and multiple islands can exist on a page. ...
> Because they are independent, you can even mix several frameworks on each page.

i used to use and maintain [single-spa](https://single-spa.js.org/), a microfrontends library that helped people accomplish an architecture which is a composition of smaller SPAs, while Astro takes a Multi Page App approach. while it doesn't share the same focus on ssr, single-spa pioneered an approach with a concept of a [root config](https://single-spa.js.org/docs/getting-started-overview/#create-a-root-config) (could also be called an App Shell) which, to borrow Astro terms, basically server-renders an island placeholder for each microfrontend to know where and when it should mount on the page. this allowed us to make [client islands](https://docs.astro.build/en/concepts/islands/#client-islands) out of individual SPAs, each being independently developed and deployed. i feel like Astro is a continuation and maturation of this concept - which makes this also feel familiar.
