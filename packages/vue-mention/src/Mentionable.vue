<script>
import getCaretPosition from 'textarea-caret'
import { VPopover } from 'v-tooltip'

export default {
  components: {
    VPopover,
  },

  inheritAttrs: false,

  props: {
    keys: {
      type: Array,
      required: true,
    },

    placement: {
      type: String,
      default: 'top-start',
    },

    items: {
      type: Array,
      default: () => [],
    },

    omitKey: {
      type: Boolean,
      default: false,
    },

    filteringDisabled: {
      type: Boolean,
      default: false,
    },

    insertSpace: {
      type: Boolean,
      default: false,
    },

    mapInsert: {
      type: Function,
      default: null,
    },

    limit: {
      type: Number,
      default: 8,
    },
  },

  data () {
    return {
      key: null,
      oldKey: null,
      searchText: null,
      caretPosition: null,
      selectedIndex: 0,
    }
  },

  computed: {
    filteredItems () {
      if (!this.searchText || this.filteringDisabled) {
        return this.items
      }

      const reg = new RegExp(this.searchText, 'i')
      return this.items.filter(item => {
        if (item.searchText) {
          return reg.test(item.searchText)
        }
        if (item.label) {
          return reg.test(item.label)
        }
        let text = ''
        for (const key in item) {
          text += item[key]
        }
        return reg.test(text)
      })
    },

    displayedItems () {
      return this.filteredItems.slice(0, this.limit)
    },
  },

  watch: {
    displayedItems () {
      this.selectedIndex = 0
    },

    searchText (value, oldValue) {
      if (value) {
        this.$emit('search', value, oldValue)
      }
    },
  },

  mounted () {
    this.input = this.getInput()
    this.attach()
  },

  updated () {
    const input = this.getInput()
    if (input !== this.input) {
      this.detach()
      this.input = input
      this.attach()
    }
  },

  beforeDestroy () {
    this.detach()
  },

  methods: {
    getInput () {
      const [vnode] = this.$scopedSlots.default()
      if (vnode) {
        return vnode.elm
      }
      return null
    },

    attach () {
      if (this.input) {
        this.input.addEventListener('input', this.onInput)
        this.input.addEventListener('keydown', this.onKeyDown)
        this.input.addEventListener('scroll', this.onScroll)
        this.input.addEventListener('blur', this.onBlur)
      }
    },

    detach () {
      if (this.input) {
        this.input.removeEventListener('input', this.onInput)
        this.input.removeEventListener('keydown', this.onKeyDown)
        this.input.removeEventListener('scroll', this.onScroll)
        this.input.removeEventListener('blur', this.onBlur)
      }
    },

    onInput () {
      this.checkKey()
    },

    onBlur () {
      this.closeMenu()
    },

    onKeyDown (e) {
      if (this.key) {
        if (e.key === 'ArrowDown') {
          this.selectedIndex++
          if (this.selectedIndex >= this.displayedItems.length) {
            this.selectedIndex = 0
          }
          e.preventDefault()
        }
        if (e.key === 'ArrowUp') {
          this.selectedIndex--
          if (this.selectedIndex < 0) {
            this.selectedIndex = this.displayedItems.length - 1
          }
          e.preventDefault()
        }
        if ((e.key === 'Enter' || e.key === 'Tab') && this.displayedItems.length > 0) {
          this.applyMention(this.selectedIndex)
          e.preventDefault()
        }
        if (e.key === 'Escape') {
          this.closeMenu()
          e.preventDefault()
        }
      }
    },

    onScroll () {
      this.updateCaretPosition()
    },

    getSelectionStart () {
      return this.input.selectionStart
    },

    setCaretPosition (index) {
      this.$nextTick(() => {
        this.input.selectionEnd = index
      })
    },

    getValue () {
      return this.input.value
    },

    setValue (value) {
      this.input.value = value
      this.emitInputEvent('input')
    },

    emitInputEvent (type) {
      const event = new Event(type)
      this.input.dispatchEvent(event)
    },

    checkKey () {
      const index = this.getSelectionStart()
      if (index >= 0) {
        const { key, keyIndex } = this.getLastKeyBeforeCaret(index)
        const searchText = this.getLastSearchText(index, keyIndex)
        if (searchText != null) {
          this.openMenu(key, keyIndex)
          this.searchText = searchText
          return true
        }
      }
      this.closeMenu()
      return false
    },

    getLastKeyBeforeCaret (caretIndex) {
      const [keyData] = this.keys.map(key => ({
        key,
        keyIndex: this.getValue().lastIndexOf(key, caretIndex - 1),
      })).sort((a, b) => b.keyIndex - a.keyIndex)
      return keyData
    },

    getLastSearchText (caretIndex, keyIndex) {
      if (keyIndex !== -1) {
        const searchText = this.getValue().substring(keyIndex + 1, caretIndex)
        // If there is a space we close the menu
        if (!/\s/.test(searchText)) {
          return searchText
        }
      }
      return null
    },

    openMenu (key, keyIndex) {
      if (this.key !== key) {
        this.key = key
        this.keyIndex = keyIndex
        this.updateCaretPosition()
        this.selectedIndex = 0
        this.$emit('open', key)
      }
    },

    closeMenu () {
      this.oldKey = this.key
      this.key = null
    },

    updateCaretPosition () {
      if (this.key) {
        this.caretPosition = getCaretPosition(this.input, this.keyIndex)
        this.caretPosition.top -= this.input.scrollTop
        if (this.$refs.popper && this.$refs.popper.popperInstance) {
          this.$refs.popper.popperInstance.scheduleUpdate()
        }
      }
    },

    applyMention (itemIndex) {
      const item = this.displayedItems[itemIndex]
      const value = (this.omitKey ? '' : this.key) + String(this.mapInsert ? this.mapInsert(item, this.key) : item.value) + (this.insertSpace ? ' ' : '')
      this.setValue(this.replaceText(this.getValue(), this.searchText, value, this.keyIndex))
      this.setCaretPosition(this.keyIndex + value.length)
      this.closeMenu()
    },

    replaceText (text, searchText, newText, index) {
      return text.slice(0, index) + newText + text.slice(index + searchText.length + 1, text.length)
    },
  },
}
</script>

<template>
  <div
    class="mentionable"
    style="position:relative;"
  >
    <slot />

    <VPopover
      ref="popper"
      v-bind="$attrs"
      :placement="placement"
      :open="!!key"
      trigger="manual"
      :auto-hide="false"
      class="popper"
      style="position:absolute;"
      :style="caretPosition ? {
        top: `${caretPosition.top}px`,
        left: `${caretPosition.left}px`,
      } : {}"
    >
      <div
        :style="caretPosition ? {
          height: `${caretPosition.height}px`,
        } : {}"
      />

      <template #popover>
        <div v-if="!displayedItems.length">
          <slot name="no-result">
            No result
          </slot>
        </div>

        <template v-else>
          <div
            v-for="(item, index) of displayedItems"
            :key="index"
            class="mention-item"
            :class="{
              'mention-selected': selectedIndex === index,
            }"
            @mouseover="selectedIndex = index"
            @mousedown="applyMention(index)"
          >
            <slot
              :name="`item-${key || oldKey}`"
              :item="item"
              :index="index"
            >
              <slot
                name="item"
                :item="item"
                :index="index"
              >
                {{ item.label || item.value }}
              </slot>
            </slot>
          </div>
        </template>
      </template>
    </VPopover>
  </div>
</template>
