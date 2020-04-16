---
home: true
heroImage: /vue-mention.svg
heroText: vue-mention
tagline: Easy mentions for Vue.js
actionText: Get Started →
actionLink: /guide/
features:
- title: Simple & Minimalist
  details: Easy to get started, minimal weight
- title: Flexible
  details: Flexible enough for your use case
- title: Vue-Powered
  details: Use the full power of Vue with props, events and slots
footer: MIT Licensed | Copyright © 2020-present Guillaume Chau
---


## Demo

<Demo />

```vue
<script>
import { Mentionable } from 'vue-mention'

const users = [
  {
    value: 'akryum',
    firstName: 'Guillaume',
  },
  {
    value: 'posva',
    firstName: 'Eduardo',
  },
  {
    value: 'atinux',
    firstName: 'Sébastien',
  },
]

const issues = [
  {
    value: 123,
    label: 'Error with foo bar',
    searchText: 'foo bar'
  },
  {
    value: 42,
    label: 'Cannot read line',
    searchText: 'foo bar line'
  },
  {
    value: 77,
    label: 'I have a feature suggestion',
    searchText: 'feature'
  }
]

export default {
  components: {
    Mentionable,
  },

  data () {
    return {
      text: '',
      items: [],
    }
  },

  methods: {
    onOpen (key) {
      this.items = key === '@' ? users : issues
    },
  },
}
</script>

<template>
  <Mentionable
    :keys="['@', '#']"
    :items="items"
    offset="6"
    insert-space
    @open="onOpen"
  >
    <textarea
      v-model="text"
    />

    <template #no-result>
      <div class="dim">
        No result
      </div>
    </template>

    <template #item-@="{ item }">
      <div class="user">
        {{ item.value }}
        <span class="dim">
          ({{ item.firstName }})
        </span>
      </div>
    </template>

    <template #item-#="{ item }">
      <div class="issue">
        <span class="number">
          #{{ item.value }}
        </span>
        <span class="dim">
          {{ item.label }}
        </span>
      </div>
    </template>
  </Mentionable>
</template>
```
