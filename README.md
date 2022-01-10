<p align="center">
  <a href="https://vue-mention.netlify.app/" target="_blank">
    <img src="./packages/docs/src/.vuepress/public/vue-mention.svg" alt="logo" width="128">
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-mention">
    <img src="https://img.shields.io/npm/v/vue-mention.svg" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/vue-mention">
    <img src="https://img.shields.io/npm/dm/vue-mention.svg" alt="Downloads">
  </a>
</p>

# vue-mention

Mention popper for input and textarea

[Documentation](https://vue-mention.netlify.app/)

## Vue 3 support

Install the v2 for Vue 3 support:

```
pnpm i vue-mention@next
```

You also need to install `v-tooltip` v4:

```
pnpm i v-tooltip@vue3
```

And add the default `v-tooltip` styles:

```js
import 'v-tooltip/dist/v-tooltip.css'
```

## v-tooltip 3 (Vue 2)

Install the v2 for Vue 3 support:

```
pnpm i vue-mention@1.0.0-vtooltip3.0
```

**:warning: Use the exact version range `1.0.0-vtooltip3.0` otherwise you'll install `v1.1.0` which is for v-tooltip 2.**

You also need to install `v-tooltip` v3:

```
pnpm i v-tooltip@next
```

And add the default `v-tooltip` styles:

```js
import 'v-tooltip/dist/v-tooltip.css'
```

## Sponsors

[![sponsors logos](https://guillaume-chau.info/sponsors.png)](https://guillaume-chau.info/sponsors)

## Quick start

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
