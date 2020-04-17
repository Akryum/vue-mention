<script>
import { Mentionable } from 'vue-mention'

export default {
  components: {
    Mentionable,
  },

  data () {
    return {
      text: '',
      items: [
        {
          value: 'cat',
          label: 'Mr Cat',
        },
        {
          value: 'dog',
          label: 'Mr Dog',
        },
      ],
    }
  },
}
</script>

<template>
  <div
    class="demo"
  >
    <Mentionable
      :keys="['@']"
      :items="items"
      offset="6"
    >
      <textarea
        v-model="text"
        rows="6"
        class="input"
        placeholder="Enter text and then type @ to trigger the mention"
      />

      <template #item="{ item }">
        <div class="item">
          {{ item.label }}
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

.item {
  padding: 4px 10px;
  border-radius: 4px;
}

.mention-selected .item {
  background: rgb(192, 250, 153);
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
