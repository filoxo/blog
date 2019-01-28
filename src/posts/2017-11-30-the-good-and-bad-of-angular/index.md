---
title: "The 👍 and 👎 parts of Angular"
date: 2017-11-30
tags: ['angular']
---

I've yet to reach the point in my career where I'm attached to a single framework. I've used Angular 2+ heavily for the last year at work, have recently rewritten an Angular 1 app in React, and have chosen to use Vue for my personal projects for now. These are some of my thoughts on what I found to be some good and bad parts of Angular.

### The Good

- As a full framework, you'll experience less decision fatigue and won't have lib fragmentation (eg. team A uses Axios, team B uses Superagent).
- ‎TypeScript makes JavaScript feel familiar to backend/full-stack devs.
- RxJS/‎Observables are so awesome! This reactive data flow also helps you keep your components UI-focused.
- ‎The Angular CLI is fantastic! Its so good, in fact, that it hardly makes sense to use anything else.
- ‎Predictable and periodic framework updates set a great rhythm. Of course, this is personal preference. I've read some other peoples' struggles with having gotten too far behind... but the cadence with which Angular releases feels just right.
- The animations API is good when it works. React's TransitionGroup is the equivalent, but most React beginners don't know about it or how to find it to solve animations with components mounting/unmounting. The Angular animations work well for this same usage, but there have been quite a few bugs with it between versions. I had to revert to CSS animations. Hopefully they've been fixed and that has stablized.

### The Bad

- With TypeScript it is easy to bloat your code & forget to push business logic down to the server.
- ‎Modules+routes are the only option for creating code split boundaries. So far, there hasn't been a community-built solution for code splitting elsewhere.
- Using Services to manage state is hard. It almost doesn't make sense to have Services and I'm about 90% sure this syntax was carried over for those who have a hard time migrating from Angular 1. Because of this there is little to no standardization on how services should work or be used. We ended up using Services to only hold Observables...
- ‎Good luck trying to get any native js modules to work. Maybe that lib doesn't have types. Or requires a browser global. Or can't be statically analyzed by the TS compiler... The list goes on.
- Testing is just BAD. Testing requires 30+ lines of boilerplate, and requires a lot of ceremony. I have not written a test that actually works with Angular that hasn't felt extremely frail. From configuring the TestBed to updating selectors, testing is a huge burden compared to how easy it is with React and Vue.
- Angular errors are convoluted and imprecise. Welcome to debugging hell. 👿
- Having a wrapping host element is bad for styling. This is mainly because we have a legacy style framework. One such problem was with a widget that uses immediate child selectors, and the host element prevents this from working correctly. If you could get total buy-in to encapsulated styles, you shouldn't face this issue.
- RxJS takes effort and time to master, and the docs could use a lot of work. We've had to learn about Observables,BehaviorSujects, Subscriptions, and a plethora of operators with difficult names (switchMap, flatMap, zip, idk how many more).
- ‎There's no equivalent of React's stateless functional component and that is sad. Sometimes it would be much easier if a component didn't need state and accept only Inputs (props for you React users).
- The `<router-outlet>` prevents you from being able flow data down to Components. This is a HUGE issue and I hate it with a passion.
- Development Tooling with Angular is severely lacking. Augury was an attempt at dev tools for Angular but is a total failure. Unable to view your Angular component tree or intereact with your data stores makes for a poor DX.

## Conclusion

I've written approximately twice as many "bads" as "goods" for this article, but that doesn't mean I hate Angular. It is definitely a viable option, and still has the backing of Google despite some misteps with branding and architecture. I just hope these issues are something you might analyze before using, or can use your voice and vote to help improve Angular.