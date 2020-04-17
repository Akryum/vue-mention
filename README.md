<img src="./packages/docs/src/.vuepress/public/vue-mention.svg" alt="logo" width="128">

# vue-mention

Mention popper for input and textarea

[Documentation](https://vue-mention.netlify.app/)

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
