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

    onEnter () {
      console.log('Enter pressed')
    },
  },
}
</script>

<template>
  <div
    class="demo"
    @keyup.enter="onEnter"
  >
    <Mentionable
      :keys="['@', '#']"
      :items="items"
      offset="6"
      insert-space
      @open="onOpen"
    >
      <textarea
        v-model="text"
        rows="6"
        class="input"
        placeholder="Enter text and then type @ or # to trigger the mention"
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

.user,
.issue {
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;
}

.mention-selected .user {
  background: rgb(192, 250, 153);
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
