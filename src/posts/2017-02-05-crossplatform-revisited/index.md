---
title: 'Cross-platform Revisited'
date: 2017-02-05
tags: ['programming', 'javascript']
---

!["Crossplatform"](./crossplatform.jpg)

Time has passed, technology has improved, and my preferences have also changed. In this post I'll revisit my choice of tooling.

### Password manager

Having put a password manager in place to store, generate, and access my passphrases has been one of the most beneficial tools I've been able to use in my day-to-day. KeePass has long been the standard for accomplishing this but the clients built around it have not kept up—at least not very well.

#### KeeWeb

[KeeWeb](https://keeweb.info/) is built with Electron and gives the KeePass standard a decent interface on Windows, MacOS, Linux, and even as a [web app](https://app.keeweb.info/). It can sync with Google Drive, generate new passwords, and uses the same keyboard shortcuts as KeePassX and then some.

The only problem with this app is maybe a bug: it's browser autofill feature seems to populate the browser URL bar with the site and password, rather than navigating to the site before pasting in the credentials. This means that my browser history could potentially have a password in plain text. Because this is such a huge no-no I never use this feature anymore.

#### LastPass

I've also recently started using LastPass to store my work credentials as a way of keeping business and personal life separate. So far, LastPass has the most refined UI for managing user credentials. The website is further enhanced by adding a Chrome extension (thus meaning it can be used on all of the desktop platforms) as well as native mobile apps. I can't speak for iOS but on Android this app is a God-send. It taps into Android's accessibility features to allow it to monitor for password input fields. It injects the matching credentials very quickly and easily.

The mobile app can use your device's fingerprint sensor to unlock your database. You can even store other things, like product licenses, ssh keys, and file attachements. Novemeber of 2016 LastPass also made it free to use its mobile client so its now easier to use it anyway.

If you aren't using a password manager, I would recommend starting right now with LastPass.

### Mobile interoperability

Nothing has changed on this front for me personally. While I'm still in envy about the iOS ecosystem and it's native interoperability, PushBullet still does the job for me. I use Mac anc Linux computers as well as Android and iOS mobile devices regularly.

I did sign up for the T-Mobile DIGITS beta, but... that's a bit far from polished for my liking.

### Terminal

I was unexpectedly pleased when I decided to try out [Hyper terminal](https://github.com/zeit/hyper). Also built on Electron, this terminal wrapper has gained a lot of popularity which in turns means its plugin ecosystem is thriving. For example, you can enable mouse scrolling to get through long documents using `hyperterm-alternatescroll`; or make links clickable by holding down a key with `hyperlinks-iterm`. Because all of this is stored in a config file I pulled over my settings and preferences to my work computer with a simple copy/paste.

### IDE

I have long since been a fan of the JetBrains suite of IDEs. They do a great job of pulling together many tools into one application. But I've found that for small side projects & demos it is very heavy and a little distracting. SublimeText and Atom are great simple solutions but VS Code has taken their place for me. VS Code provides a balance between simplicity and functionality, so its not overly simplistic right out of the box. Built in Git tools, console window, and debugger are *really* useful for getting hacking quickly. And of course, because its also an Electron app, its plugin ecosystem has whatever you might ask for. Here are the ones I use:

- Angular 2 TypeScript snippets
- Auto-open Markdown Preview
- Debugger for Chrome
- EditorConfig for VS Code
- Git History
- JavaScript (ES6) code snippets
- JSX

## Fin

My objective here is just to give another perspective and voice to tools you might not have thought to try. Have any questions? Feel free to reach out.