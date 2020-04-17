# Async items

To load the items asynchronously, listen for the `open` event then fetch the suggestion items:

```vue{11-13,22}
<script>
export default {
  data () {
    return {
      text: '',
      items: [],
    }
  },

  methods: {
    async loadIssues () {
      this.items = await fetchIssues()
    }
  },
}
</script>

<template>
  <Mentionable
    :keys="['#']"
    :items="items"
    @open="loadIssues()"
  >
    <textarea
      v-model="text"
    />
  </Mentionable>
</template>
```

## Loading state

Store your loading state in a data property:

```js{6,12,14}
export default {
  data () {
    return {
      text: '',
      items: [],
      loading: false,
    }
  },

  methods: {
    async loadIssues () {
      this.loading = true
      this.items = await fetchIssues()
      this.loading = false
    }
  },
}
```

Then display a different content for the loading state in the `no-result` slot:

```vue{11-13}
<template>
  <Mentionable
    :keys="['#']"
    :items="items"
    @open="loadIssues()"
  >
    <textarea
      v-model="text"
    />

    <template #no-result>
      {{ loading ? 'Loading...' : 'No result' }}
    </template>
  </Mentionable>
</template>
```

## Handle search

Listen for the `search` event to fetch the issues again with an additional `searchText` parameter:

```vue{12,14,26}
<script>
export default {
  data () {
    return {
      text: '',
      items: [],
      loading: false,
    }
  },

  methods: {
    async loadIssues (searchText = null) {
      this.loading = true
      this.items = await fetchIssues(searchText)
      this.loading = false
    }
  },
}
</script>

<template>
  <Mentionable
    :keys="['#']"
    :items="items"
    @open="loadIssues()"
    @search="loadIssues($event)"
  >
    <textarea
      v-model="text"
    />

    <template #no-result>
      {{ loading ? 'Loading...' : 'No result' }}
    </template>
  </Mentionable>
</template>
```

The first payload of the `search` event is the text entered by the user after the key. In the code above we access it with `$event`.

`Mentionable` has a builtin filtering feature that we need to disable since the server will take care of it:

```vue{5}
<template>
  <Mentionable
    :keys="['#']"
    :items="items"
    filtering-disabled
    @open="loadIssues()"
    @search="loadIssues($event)"
  >
    <textarea
      v-model="text"
    />

    <template #no-result>
      {{ loading ? 'Loading...' : 'No result' }}
    </template>
  </Mentionable>
</template>
```

## Final demo

This demo fakes the loading of issues with a one second delay:

<AsyncItemsDemo />

```vue
<script>
import { Mentionable } from 'vue-mention'

const issues = [
  {
    value: 123,
    label: 'Error with foo bar'
  },
  {
    value: 42,
    label: 'Cannot read line'
  },
  {
    value: 77,
    label: 'I have a feature suggestion'
  }
]

function fetchIssues (searchText = null) {
  return new Promise(resolve => {
    setTimeout(() => {
      if (!searchText) {
        resolve(issues)
      } else {
        const reg = new RegExp(searchText, 'i')
        resolve(issues.filter(issue => reg.test(issue.label)))
      }
    }, 1000)
  })
}

export default {
  components: {
    Mentionable,
  },

  data () {
    return {
      text: '',
      items: [],
      loading: false,
    }
  },

  methods: {
    async loadIssues (searchText = null) {
      this.loading = true
      this.items = await fetchIssues(searchText)
      this.loading = false
    }
  },
}
</script>

<template>
  <div
    class="demo"
  >
    <Mentionable
      :keys="['#']"
      :items="items"
      offset="6"
      filtering-disabled
      @open="loadIssues()"
      @search="loadIssues($event)"
    >
      <textarea
        v-model="text"
        rows="6"
        class="input"
        placeholder="Enter text and then type # to trigger the mention"
      />

      <template #no-result>
        <div class="dim">
          {{ loading ? 'Loading...' : 'No result' }}
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

    <div class="preview">{{ text }}</div>
  </div>
</template>

<style scoped>
.demo {
  margin: 24px 0;
}

.input {
  width: 100%;
  border: #ccc 1px solid;
  border-radius: 6px;
  resize: vertical;
  min-height: 42px;
  padding: 12px;
  box-sizing: border-box;
  line-height: 1.2em;
  font-size: inherit;
}

.issue {
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;
}

.mention-selected .issue {
  background: rgb(139, 212, 255);
}

.issue .number {
  font-family: monospace;
}

.dim {
  color: #666;
}

.preview {
  font-family: monospace;
  white-space: pre-wrap;
  margin-top: 12px;
  padding: 12px;
  background: #f8f8f8;
  border-radius: 6px;
}
</style>
```
