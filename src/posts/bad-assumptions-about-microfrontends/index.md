---
title: 'Bad Assumptions about Microfrontends'
date: 2019-08-09
tags: ['javascript']
---

There've been some surprisingly incorrect assumptions being made about "microfrontends" since it became a buzzword. Microservices in the browser (I prefer this term over microfrontends) are a totally new paradigm but these bad takes seem to have quite a bit of reach. I'll tackle some of these in this post.<!-- excerpt-end -->

## Multiple frameworks

> The idea really is that you might build a React app and I build a Vue app and we'll slap 'em together on the same page. I definitely come from an era where we laughed-then-winced when we found sites that used multiple versions of jQuery on the same page... We winced because that was a bucket full of JavaScript, mostly duplicated for no reason, causing bugs and slowing down the page. This doesn't seem all that much different.
>
> _Chris Coyier, https://css-tricks.com/micro-frontends/_

This is actually a **huge** mischaracterization. Think about this for backend services. Each app or service is independent so they _can_ use a different framework or language. One service _can be_ Ruby+Rails and another use Elixir+Phoenix. But in practice most companies should and will avoid this, it doesn't make sense to use any and every language or framework! No different here. Standardizing on few languages/frameworks makes total sense.

> Your [developers] were so preoccupied with whether or not they could, they didn’t stop to think if they should.

Just because it _can be done_, does not mean it _should or needs_ to be done. Most if not all of your apps should use a common set of frameworks and libraries. But realize that this possibility of using a different framework without high development costs and effort actually unlocks benefits, such as easy migration and experimentation. I find that to be super cool! Let me paint those scenarios.

### Migrate

At some point in every company's life, there comes a point where the decision to use Technology X that was made Y number of years ago no longer holds up. The maintainers do not see an easy way to move off of it, they're stuck. Being able to break free of and avoid [technological lock-in](https://en.wikipedia.org/wiki/Vendor_lock-in#Technology_lock-in) is yet another **major benefit** of microservices in the browser. Using a front-end microservices architecture, you can begin migrating parts of the application to newer technologies and frameworks as each team or product is ready and able (the performance implications will be discussed below).

### Experimentation

Maybe Technology X is not quite that old, but your developers see new trends on the horizon and want to get ahead of the curve. Or maybe a webapp has grown bloated and is a performance bottleneck and you would like to try out a newer, faster framework (something like [Svelte](https://github.com/sveltejs/svelte) maybe). This sort of experimentation could allow products, user experiences, and DX to improve as technologies evolve and advance. These upgrades shouldn't require months and years!

## Multiple React roots

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en">
  <p lang="und" dir="ltr">
    <a
      href="https://t.co/4VCG8cFxjc"
      aria-label="Meme: Multiple React roots on the page. Is this microfrontends?"
    >
      pic.twitter.com/4VCG8cFxjc
    </a>
  </p>
  &mdash; Dan Abramov (@dan_abramov) <a href="https://twitter.com/dan_abramov/status/1139157092420505600?ref_src=twsrc%5Etfw">June 13, 2019</a>
</blockquote>

The answer to Dan's question here is **yes**. This can be considered "microfrontends" as each root can be owned by a single team. Though Dan later points out that this all is still part of the same CD pipeline and so each team is at the mercy of that process. Significant effort and investment would need to be spent to optimize this build system. But like backend microservices, microservices in the browser can enable **independent deployments** for front-end applications. Each team can have control over this, scaling to however fast or slow that needs to be for them. I don't think you could achieve that with multiple React roots.

## 50MB of JavaScript

<blockquote class="twitter-tweet" data-lang="en">
  <p lang="en" dir="ltr">
    Someone let me perf. profile a site using &quot;microfrontends&quot;. <br />
    <br />
    Memebait related:{' '}
    <a
      href="https://t.co/LMldrx14Ui"
      aria-label="Meme: 50 MB of JavaScript. Is this microfrontends?"
    >
      pic.twitter.com/LMldrx14Ui
    </a>
  </p>
  &mdash; Sean Larkin (廖肖恩) (@TheLarkInn) <a href="https://twitter.com/TheLarkInn/status/1139281821810618369?ref_src=twsrc%5Etfw">June 13, 2019</a>
</blockquote>

I have to ask: _is application bloat a unique characteristic of microfrontends?_ I know of many frontend applications that are extremely heavy that are _not microfrontends_, which is mostly due to misconfiguration of tooling or extra package code. So is this criticism that implicitly claims that microservices are bloated by default, valid?

The underlying assumption here is that microfrontends disregard performance in favor of DX. Additionally, it's true that 2 is greater than 1; shipping multiple framework runtimes without prudence and care is going to be bad. But I'd argue though that that bad performance comes down to implementation, not architecture.

There are many solutions to the perf problem; none of them impossible with microservices in the browser. One interesting option is to leverage native ES modules (current spec) along with [import maps](https://github.com/WICG/import-maps) (proposed spec). This enables your JavaScript imports to be cleanly resolved _in the browser_. No longer bundle libraries into your build, load them once and cache in the browser. Share these dependencies across all of your apps. Performance does not have to be sacrificed for microfrontends' sake.

<aside>
  If these features appeal to you and your organization, check out{' '}
  <a href="https://single-spa.js.org/">Single-spa</a> and it's{' '}
  <a href="https://single-spa.js.org/docs/faq.html#is-there-a-recommended-setup">
    recommended setup
  </a>{' '}
  that leverages the aforementioned import-maps.{' '}
  <small style="margin-bottom: 0;">
    Disclaimer: I'm a contributor to Single-spa.
  </small>
</aside>

# Give it a little bit of time, and maybe a try

<blockquote class="twitter-tweet">
  <p lang="en" dir="ltr">
    Back end devs: Front end isn&#39;t real engineering.
    <br />
    <br />
    Front end devs: *Bring engineering principles to front end*
    <br />
    <br />
    Back end devs: Front end is too complicated.
  </p>
  &mdash; Mark Dalgleish (@markdalgleish) <a href="https://twitter.com/markdalgleish/status/1150488911744917505?ref_src=twsrc%5Etfw">
    July 14, 2019
  </a>
</blockquote>

Give an emerging pattern like microservices in the browser a chance. Don't buck against it just because it isn't the way you've done things, and let go of your bad assumptions.
