---
title: 'Thoughts on Angular: Ng-Content'
date: 2017-04-05
layout: Post
hero: '/assets/bldg-angle.jpg'
---

I recently came across some interesting behavior with Angular's `ng-content` that I wanted to jot down so I can search for some answers. NgContent isn't well documented. 

### Why isn't `ng-content` self-closing?

`ng-content` is to be used like any other element. This is great, especially for rendering in default content. For example, a component that can transclude some content but if for some reason nothing is nested into it, it will show a default state.

```
<profile-card>
    <ng-content>
        <img src="/defaultProfile.jpg"/>
        <p>Unknown</p>
    </ng-content>
</profile-card>
```

But what if you don't need anything within the opening and closing tags? You'd think that just `<ng-content />` would be a nice and simple way to signal where to place the included content, but attempting to do so generates the following error:

```
Template parse errors: Only void and foreign elements can be self closed "ng-content"
[ERROR ->]<ng-content />
```

Seems weird to me. This may be by design. 

### Select is only able to find immediate children?

One of the features of `ng-content` is that you can use the `select` attribute on it to pull transcluded content into a specific location. 

```
<!-- my-component.html -->
<div>
    <ng-content select=".title"></ng-content>
    <ng-content select=".subtitle"></ng-content>
</div>
```

This is great for enforcing layout in a specific way. Except... it has a __major__ caveat, at least in my opinion. This select only seems to match _immediate children only_, nothing else.

So using the above `my-component`, this belwo works while placing the `title` above the `subtitle`:

```
<my-component>
    <p class="subtitle">world</p>
    <h2 class="title">Hello</h2>
</my-component>
```

but then this doesn't! Nothing is rendered. 

```
<my-component>
    <div>
        <h2 class="title">Hello</h2>
        <p class="subtitle">world</p>
    </div>
</my-component>
```

It can't find these same elements  because they're wrapped in an extra div? I would have thought that it would match those elements as well, just like `querySelector` or CSS selectors would. If I only wanted immediate children I would have used something like `select="> .title"`. My assumption that it used standard selectors is wrong? ¯\\_(ツ)_/¯ That sucks.