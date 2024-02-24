---
title: Vitest sessionStorage mock
date: 2024-02-23
tags: ["javascript", "testing"]
---

i needed to ensure what we were saving didn't contain sensitive credit card info so i had to write a mock. <!-- excerpt-end --> this mock implements the sessionStorage api using a simple js map.

```js
// mock sessionStorage to test react-hook-form-persist with vitest
vi.stubGlobal('sessionStorage', {
  __sessionStorage: new Map(),
  getItem: function mockedGetItem(key) {
    return this.__sessionStorage.get(key) || null
  },
  setItem: function mockedSetItem(key, val) {
    return this.__sessionStorage.set(key, val)
  },
  clear: function mockedClear() {
    return this.__sessionStorage.clear()
  },
})
```

simple and worked.