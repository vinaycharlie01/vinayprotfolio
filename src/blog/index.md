---
title: Blog
description: Engineering notes and Go write-ups from Vinaykumar V A.
editLink: false
aside: false
outline: false
---

<script setup>
import { data as posts } from '../../.vitepress/blog.data';
</script>

# Blog

Engineering notes and Go write-ups — mostly Kubernetes operators, CLI
automation, and the tooling I build at work.

<div class="post-list">
  <article v-for="post in posts" :key="post.url" class="post-card">
    <h2><a :href="post.url">{{ post.title }}</a></h2>
    <p class="post-meta">
      {{ post.date.string }}<template v-if="post.tags.length"> · {{ post.tags.join(', ') }}</template>
    </p>
    <p v-if="post.description" class="post-description">{{ post.description }}</p>
  </article>
</div>

<style scoped>
.post-list {
  display: grid;
  gap: 1rem;
}
.post-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem 1.25rem;
}
.post-card h2 {
  margin: 0 0 0.25rem;
}
.post-meta {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin: 0 0 0.5rem;
}
.post-description {
  margin: 0;
}
</style>
