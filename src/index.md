---
title: 'Latest posts'
layout: 'base.njk'
pagination:
  data: collections.posts
  size: 7
  reverse: true
  alias: posts
---

<div class="space-y-16 mb-12">
  {%- for post in posts -%}
  <section>
    <h1 class="mb-4 text-2xl text-red-600">
      <a class="text-balance" href="{{ post.url }}">{{ post.data.title }}</a>
    </h1>
    <div class="text-red-600 mb-4">{{ post.date | date }}</div>
    <div class="prose dark:prose-invert">
      <p>
        {{- post.data.page.excerpt or post.data.excerpt | striptags }}
        <a class="text-red-600" href="{{ post.url }}">Read&nbsp;more</a>
      </p>
    </div>
  </section>
  {%- endfor -%}
</div>

{% if pagination.href.previous or pagination.href.next %}

<nav class="flex justify-between mt-8 mb-12">
  <div>
    {% if pagination.href.previous %}
      <a href="{{ pagination.href.previous }}" class="text-red-600 hover:underline">&larr; Newer posts</a>
    {% endif %}
  </div>
  <div>
    {% if pagination.href.next %}
      <a href="{{ pagination.href.next }}" class="text-red-600 hover:underline">Older posts &rarr;</a>
    {% endif %}
  </div>
</nav>
{% endif %}
