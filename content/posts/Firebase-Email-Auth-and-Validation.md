---
title: Firebase Email Auth and Validation
date: 2016-07-28
layout: Post
tags: firebase
---

If you use Firebase, you'd be inclined to use their authentication for you system because of how amazingly easy it is to get started. They offer a variety of methods: email & password, oAuth with Google/Twitter/Facebook/Github, or even custom auth.

A few days ago, a new Firebase user asked a very interesting help question in my school Slack channel:

> I am looking at Firebase's authentication set up with email and password and I can find no way to set any password rules. For example I could create the password "j". Is there a way to set at least a minimum password length?

Having only used oAuth myself, I figured you could simply create a [`.validate` rule](https://www.firebase.com/docs/security/api/rule/validate.html) and once in place, perform basic [string operations](https://www.firebase.com/docs/security/api/string/) to test whether it actually passes or not. Easy right? _Unfortunately, no._

You actually don't have access to any of the user data with the email & password option. Firebase manages the email and password. That's pretty much the point of that scheme.
That also means you're left at the mercy of the security rules enforced (or not!) by Firebase. So a user can create a password with _just one character_ and the developer is only left with client-side validation. If you want any sort of granular control in the authentication flow, you'll have go to with Custom Authentication.

### Help me Obi-Wan

The Firebase gurus on the [Firebase Slack channel](https://www.firebase.com/blog/2016-02-26-firebase-slack-community.html) offered an alternative for managing and verifying this data while still not owning the auth process.

- Add a security rule to the user profile in your database, something like `isVerified`
- Pass the username and password to a server API call
    - [Firebase Queue](https://github.com/firebase/firebase-queue) is an elegant alternative to a REST API
- Create a task that can invalidate bad passwords or add the `isVerified` field accordingly

Couple this with client-side validation and you'd be able to rest easier having implemented better security practices. I'm not 100% convinced that it is a _great_ solution, but it is still much better than leaving everything to be validated on the client.