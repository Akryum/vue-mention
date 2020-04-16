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

<style>
.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 12px;
  border-radius: 5px;
  box-shadow: 0 5px 12px rgba(0, 0, 0, .1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}
</style>
