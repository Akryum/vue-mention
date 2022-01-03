<script>
import getCaretPosition from 'textarea-caret'
import { Dropdown, options } from 'v-tooltip'
import { computed, onMounted, onUnmounted, onUpdated, ref, watch, nextTick } from 'vue'

options.themes.mentionable = {
  $extend: 'dropdown',
  placement: 'top-start',
  modifiers: [
    { name: 'arrow', options: { padding: 6 } },
  ],
}

export default {
  components: {
    VDropdown: Dropdown,
  },

  inheritAttrs: false,

  props: {
    keys: {
      type: Array,
      required: true,
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

    theme: {
      type: String,
      default: 'mentionable',
    },
  },

  emits: ['search', 'open', 'close', 'apply'],

  setup (props, { emit, slots }) {
    const currentKey = ref(null)
    let currentKeyIndex
    const oldKey = ref(null)

    // Items

    const searchText = ref(null)

    watch(searchText, (value, oldValue) => {
      if (value) {
        emit('search', value, oldValue)
      }
    })

    const filteredItems = computed(() => {
      if (!searchText.value || props.filteringDisabled) {
        return props.items
      }

      const finalSearchText = searchText.value.toLowerCase()

      return props.items.filter(item => {
        /** @type {string} */
        let text
        if (item.searchText) {
          text = item.searchText
        } else if (item.label) {
          text = item.label
        } else {
          text = ''
          for (const key in item) {
            text += item[key]
          }
        }
        return text.toLowerCase().includes(finalSearchText)
      })
    })

    const displayedItems = computed(() => filteredItems.value.slice(0, props.limit))

    // Selection

    const selectedIndex = ref(0)

    watch(displayedItems, () => {
      selectedIndex.value = 0
    }, {
      deep: true,
    })

    // Input element management

    let input
    const el = ref(null)

    function getInput () {
      return el.value.querySelector('input') ?? el.value.querySelector('textarea') ?? el.value.querySelector('[contenteditable="true"]')
    }

    onMounted(() => {
      input = getInput()
      attach()
    })

    onUpdated(() => {
      const newInput = getInput()
      if (newInput !== input) {
        detach()
        input = newInput
        attach()
      }
    })

    onUnmounted(() => {
      detach()
    })

    // Events

    function attach () {
      if (input) {
        input.addEventListener('input', onInput)
        input.addEventListener('keydown', onKeyDown)
        input.addEventListener('keyup', onKeyUp)
        input.addEventListener('scroll', onScroll)
        input.addEventListener('blur', onBlur)
      }
    }

    function detach () {
      if (input) {
        input.removeEventListener('input', onInput)
        input.removeEventListener('keydown', onKeyDown)
        input.removeEventListener('keyup', onKeyUp)
        input.removeEventListener('scroll', onScroll)
        input.removeEventListener('blur', onBlur)
      }
    }

    function onInput () {
      checkKey()
    }

    function onBlur () {
      closeMenu()
    }

    function onKeyDown (e) {
      if (currentKey.value) {
        if (e.key === 'ArrowDown') {
          selectedIndex.value++
          if (selectedIndex.value >= displayedItems.value.length) {
            selectedIndex.value = 0
          }
          cancelEvent(e)
        }
        if (e.key === 'ArrowUp') {
          selectedIndex.value--
          if (selectedIndex.value < 0) {
            selectedIndex.value = displayedItems.value.length - 1
          }
          cancelEvent(e)
        }
        if ((e.key === 'Enter' || e.key === 'Tab') &&
          displayedItems.value.length > 0) {
          applyMention(selectedIndex.value)
          cancelEvent(e)
        }
        if (e.key === 'Escape') {
          closeMenu()
          cancelEvent(e)
        }
      }
    }

    let cancelKeyUp = null

    function onKeyUp (e) {
      if (cancelKeyUp && e.key === cancelKeyUp) {
        cancelEvent(e)
      }
      cancelKeyUp = null
    }

    function cancelEvent (e) {
      e.preventDefault()
      e.stopPropagation()
      cancelKeyUp = e.key
    }

    function onScroll () {
      updateCaretPosition()
    }

    function getSelectionStart () {
      return input.isContentEditable ? window.getSelection().anchorOffset : input.selectionStart
    }

    function setCaretPosition (index) {
      nextTick(() => {
        input.selectionEnd = index
      })
    }

    function getValue () {
      return input.isContentEditable ? window.getSelection().anchorNode.textContent : input.value
    }

    function setValue (value) {
      input.value = value
      emitInputEvent('input')
    }

    function emitInputEvent (type) {
      input.dispatchEvent(new Event(type))
    }

    let lastSearchText = null

    function checkKey () {
      const index = getSelectionStart()
      if (index >= 0) {
        const { key, keyIndex } = getLastKeyBeforeCaret(index)
        const text = lastSearchText = getLastSearchText(index, keyIndex)
        if (!(keyIndex < 1 || /\s/.test(getValue()[keyIndex - 1]))) {
          return false
        }
        if (text != null) {
          openMenu(key, keyIndex)
          searchText.value = text
          return true
        }
      }
      closeMenu()
      return false
    }

    function getLastKeyBeforeCaret (caretIndex) {
      const [keyData] = props.keys.map(key => ({
        key,
        keyIndex: getValue().lastIndexOf(key, caretIndex - 1),
      })).sort((a, b) => b.keyIndex - a.keyIndex)
      return keyData
    }

    function getLastSearchText (caretIndex, keyIndex) {
      if (keyIndex !== -1) {
        const text = getValue().substring(keyIndex + 1, caretIndex)
        // If there is a space we close the menu
        if (!/\s/.test(text)) {
          return text
        }
      }
      return null
    }

    // Position of the popper

    const caretPosition = ref(null)

    function updateCaretPosition () {
      if (currentKey.value) {
        if (input.isContentEditable) {
          const rect = window.getSelection().getRangeAt(0).getBoundingClientRect()
          const inputRect = input.getBoundingClientRect()
          caretPosition.value = {
            left: rect.left - inputRect.left,
            top: rect.top - inputRect.top,
            height: rect.height,
          }
        } else {
          caretPosition.value = getCaretPosition(input, currentKeyIndex)
        }
        caretPosition.value.top -= input.scrollTop
        if (isNaN(caretPosition.value.height)) {
          caretPosition.value.height = 10
        }
      }
    }

    // Open/close

    function openMenu (key, keyIndex) {
      if (currentKey.value !== key) {
        currentKey.value = key
        currentKeyIndex = keyIndex
        updateCaretPosition()
        selectedIndex.value = 0
        emit('open', currentKey.value)
      }
    }

    function closeMenu () {
      if (currentKey.value != null) {
        oldKey.value = currentKey.value
        currentKey.value = null
        emit('close', oldKey.value)
      }
    }

    // Apply

    function applyMention (itemIndex) {
      const item = displayedItems.value[itemIndex]
      const value = (props.omitKey ? '' : currentKey.value) + String(props.mapInsert ? props.mapInsert(item, currentKey.value) : item.value) + (props.insertSpace ? ' ' : '')
      if (input.isContentEditable) {
        const range = window.getSelection().getRangeAt(0)
        range.setStart(range.startContainer, range.startOffset - currentKey.value.length - (lastSearchText ? lastSearchText.length : 0))
        range.deleteContents()
        range.insertNode(document.createTextNode(value))
        range.setStart(range.endContainer, range.endOffset)
        emitInputEvent('input')
      } else {
        setValue(replaceText(getValue(), searchText.value, value, currentKeyIndex))
        setCaretPosition(currentKeyIndex + value.length)
      }
      emit('apply', item, currentKey.value, value)
      closeMenu()
    }

    function replaceText (text, searchString, newText, index) {
      return text.slice(0, index) + newText + text.slice(index + searchString.length + 1, text.length)
    }

    return {
      el,
      currentKey,
      oldKey,
      caretPosition,
      displayedItems,
      selectedIndex,
      applyMention,
    }
  },
}
</script>

<template>
  <div
    ref="el"
    class="mentionable"
    style="position:relative;"
  >
    <slot />

    <VDropdown
      ref="popper"
      v-bind="{ ...$attrs, class: undefined }"
      :shown="!!currentKey"
      :triggers="[]"
      :auto-hide="false"
      :theme="theme"
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

      <template #popper>
        <div :class="$attrs.class">
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
                :name="`item-${currentKey || oldKey}`"
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
        </div>
      </template>
    </VDropdown>
  </div>
</template>
