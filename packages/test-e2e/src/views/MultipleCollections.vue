<script>
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
    searchText: 'foo bar',
  },
  {
    value: 42,
    label: 'Cannot read line',
    searchText: 'foo bar line',
  },
  {
    value: 77,
    label: 'I have a feature suggestion',
    searchText: 'feature',
  },
]

export default {
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
  <div
    class="demo"
  >
    <Mentionable
      :keys="['@', '#']"
      :items="items"
      @open="onOpen"
    >
      <textarea
        v-model="text"
        rows="6"
        class="input"
      />

      <template #no-result>
        <div class="dim custom-no-result">
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
</style>
