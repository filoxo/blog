---
path: '/practical-thoughts-on-react-and-angular'
title: 'Practical thoughts on React and Angular'
date: 2017-05-31
---
!['Oil in water'](./oil-in-water.jpg)

I sometimes see developers ask "Should I use React, or Angular, or Vue.js, or _\[insert new framework here\]_?" and every time, I see fanatics immediately jump to recommending one without any real justification. Now, I'm no expert but I do have experience with both Angular and React. This post lists some of the differences between the actual usage of Angular (2+) and React. I hope to just shed some light on the practical differences between them to help you understand the decision a bit better.

### Complexity

Frameworks are abstractions to help reduce the complexity of building an application. Frameworks in turn introduce their own complexity. First, let's establish that each framework falls somewhere on a complexity spectrum.[&sup1;](#vuejsTalk)

![Framework Complexity Spectrum](/assets/framework-spectrum.jpg)

This is the first problem: **React and Angular are at different points of the complexity spectrum**. They're solving problems in different ways, and will never be equal to each other in scope. Using another analogy, they're different tools for different and various jobs; some of those jobs overlap, others don't.

For the most part, choosing between them based on this alone is **moot**. Why? Because React is "unopinionated" so you bring your own solution to solve problem X. Inversely, Angular provides many tools together into one framework. It is not an apples-to-apples comparison.

#### Complexity: React

Let's start with React here. React is not a complete framework, you are required to bring in dependencies on your own. This is can be great but also daunting. Not all developers who work on the web know about the very latest libs, are proficient with `npm` or `yarn`, or can set up an ES6 project to transpile down to ES5.

In an enterprise setting, choosing a library might need more consideration than "just because". Does the lib's license allow enterprise use? What if an engineering manager needs to know the difference between various libs? Which library contains enough features to support future projects/requirements?

A personal experience of this I had is choosing an HTTP library. There are so many great choices! Some of the ones I've looked at to use with React are:

- [Axios](https://github.com/mzabriskie/axios)
- [Superagent](https://github.com/visionmedia/superagent)
- [Bluebird](https://github.com/petkaantonov/bluebird)
- [Fetch](https://github.com/github/fetch)
- [Unfetch](https://github.com/developit/unfetch)

The company I work for is slowly coming around to adopting React but what's there to stop each team from choosing a different lib from of the above? Allowing this sort of fragmentation makes it that much harder to share code and contribute to other teams. Furthermore, making a decision to standardize one requires intimate knowledge of the features, benefits, and disadvantages of each.

Now, *this evaluation process isn't bad*! It would GREAT to make a thorough and informed decision but not every developer or team is equipped to make this kind of analysis for every dependency. If this isn't something that you or your team can or want to do, then consider a full framework like Angular. Conversely, if developers are passionate about jumping in and learning each lib quickly then this isn't a problem.

#### Complexity: Angular

With Angular you're getting many of libraries together from a single source, compatible and tested. Angular is an abstraction built on top of a component model, TypeScript, RxJS, Webpack, to name a few. The advantages I see here are:

<ul>
    <li>Documentation exists showing how to use each lib within context of the framework</li>
    <li>Each standard lib will be compatible and integrates better than external libs might</li>
    <li>a solution is already "chosen" for you by the time you encounter a problem to be solved</li>
    <li>Angular's implementation of semver means that most updates will follow a compatible rhythm</li>
</ul>

There are some disadvantages:

<ul>
    <li>You're getting a whole lot of framework to have to learn together, the learning curve here can be steep and overwhelming</li>
    <li>Angular's documentation is not the very best</li>
    <li>there's no sensibility in trying to replace one part of the framework for another lib</li>
    <li>Full-frameworks can add in a lot of code that you don't use<sup>*</sup></li>
    <li>Re-using the Angular namespace means that there's a lot of conflation between AngularJS (version 1) and Angular (2+)</li>
</ul>

<sup>*</sup>Both frameworks, if configured properly, discards unused dependencies from a production build (a process known as tree-shaking).

### Framework

React's model of a single component drives to you really want to keep your components tiny, and import the rest. On average, my React components stay at less than 50 lines. Keeping components tiny really helps with composability.
Angular uses a similar component model, but requires at least 10+ lines just to declare, along 2 accompanying files&mdash;a template file and a style file. Keeping the template separate has had an unforeseen consequence: templates get *huge* and end up more bloated than needed. Because of this, I feel like there's a desire to add more logic to the class than a single component actually needs. Its all to easy to bloat a single component instead of breaking it out into smaller pieces.

### Tools

React has [create-react-app](https://github.com/facebookincubator/create-react-app), a very small commandline tool to generate a React project. It's purposefully pretty bare bones and new features are only added with much consideration and discussion. In my subjective experience, I've found that a sizable number of people chose to eject so that they have more control over their build config. This usually happens when they seek to include a feature/build step that CRA can't/won't include.

Angular has the [angular-cli](https://github.com/angular/angular-cli), a very functional commandline tool that pulls together a great number of useful features:

- Generator (like Yeoman)
- Dev server with live reload (using webpack-dev-server)
- Preconfigured css preprocessing (Sass, Less, or Stylus)
- Preconfigured linting (tslint)
- Preconfigured testing (Karma)
- Build configuration for dev & production

The Angular CLI has become much more robust and helps many devs quickly achieve things that might take much more manual configuration and experience. I've very much enjoyed using the Angular CLI. The biggest issue I've had with it are bad configurations: retroactive upgrades, version mismatches, or borked upgrades.

#### Ecosystem: React

React, backed by Facebook, has been favored by many developers and companies, like Microsoft and Samsung. React is the **#1** most-loved and 3rd most wanted framework[&sup2;](#StackOverflowDeveloperSurvey2017) according to StackOverflow's 2017 Developer Survey. There are tons of React-based projects (this blog uses [Phenomic](https://phenomic.io/)! 🤘 ) as well as React components. React's single-responsibility model has led to development of other great community-driven libraries that can enhance your app's functionality. Projects like [React Router](https://github.com/ReactTraining/react-router), [Redux](http://redux.js.org/)/[MobX](https://github.com/mobxjs/mobx), and React Native have all sprouted and thrived under [the big React tent](https://twitter.com/ryanflorence/status/869732167814848512).

Even more interesting, [Preact](https://preactjs.com/) and [Inferno](https://infernojs.org/) are _"almost drop-in"_ alternatives that have same/similar API; I find that many developers using React have literally never heard of either 🤔 yet these can offer even better performance for many apps.

React's ecosystem is as prolyfic as one could hope for.

#### Ecosystem: Angular

Angular on the other hand feels very much like "corporate" or enterprise softare. The API very much feels like _This is how we solved this problem, and you get to use it that way_. Regardless, adoption of Angular 2 has not lagged behind at all.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">1.3 million people use Angular 1.<br>480k already use Angular 2.</p>&mdash; David East (@_davideast) <a href="https://twitter.com/_davideast/status/776244105261133824">September 15, 2016</a></blockquote>
<script defer src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

And this quote is somewhat old; these numbers have most likely increased. Angular ranks very high as a popular framework: 6th most loved, 4th most dreaded, and 2nd most wanted[&sup2;](#StackOverflowDeveloperSurvey2017) [&sup3;](#footnote2)</sup>.

The Angular ecosystem is not quite as expansive, but has Google's weight behind the rest of their products to push out additional libraries that align with Angular. What that means is companion projects like [Angular Material](https://github.com/angular/material2), [AngularFire2](https://github.com/angular/angularfire2), and [Angular Universal](https://github.com/angular/universal) are kept up to date with the Angular core. Aside from these projects there aren't as many thriving projects built for Angular as I'd like to see. Many of these have gotten out of date very fast.

TypeScript has seen some great progress and adoption in the JS community as a whole; its the 3rd most loved and 6th most wanted language of 2017[&sup2;](#StackOverflowDeveloperSurvey2017)! Furthermore, a success with TypeScript that I've experienced is that it makes backend developers a more comfortable writing JavaScript. It enables bringing in some concepts that can help make a webapp more robust, in addition to being an ES6 transpiler. Learning TypeScript's features and syntax was not difficult.

The most difficult part of using TypeScript is finding the correct type definitions (typings) to go along with your dependent libs. Most are available via npm under the `@types` namespace but if that isn't the case, you lose the main benefit of TypeScript in the first place: type safety. At the same time, that's no reason not to use Angular! It would make the developer all that better by taking the initiative to contribute the types. Yay for open source software! But this is a challege that you may face with Angular.

### Conclusion

This long-winded explanation is really just to say: Don't choose between React and Angular just because you're a fan of one. **Choose the one that fits your project's requirements; the one whose risks and challenges you're willing to accept; the one that is the sane investment considering the needs of the developer, team, and business.** Ultimately, both frameworks are backed by major companies. Both have great developers that lead them, and communities surrounding them. Both solve complex problems and can be used to build great web apps.

If you can, don't lock yourself into one. Always keep learning about what else can solve the problem at hand. ✌️

---

<small>
Footnotes:

- <a name="vuejsTalk" href="https://www.youtube.com/watch?v=pBBSp_iIiVM" target="_blank">1: "Vue.js: the Progressive Framework"</a>
- <a name="StackOverflowDeveloperSurvey2017" href="https://insights.stackoverflow.com/survey/2017" target="_blank">2: StackOverflow Developer Survey 2017</a>
- <a name="footnote2">3: </a> I don't think the survey properly distinguishes between AngularJS (version 1) and Angular (2+). It would be interesting to see the stats with these two versions divided.

</small>
