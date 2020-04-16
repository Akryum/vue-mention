# Getting Started

## Installation

vue-mention requires [v-tooltip](https://github.com/Akryum/v-tooltip).

Install the `vue-mention` package:

```sh
npm i vue-mention
```

Or

```sh
yarn add vue-mention
```

## Quick start

Import the `Mentionable` component from `vue-mention`:

```vue{2,6}
<script>
import { Mentionable } from 'vue-mention'

export default {
  components: {
    Mentionable,
  },

  data () {
    return {
      text: '',
    }
  },
}
</script>
```

Add some items for the suggestions:

```vue{12-21}
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
```

The `value` properties will be used as the text replacement.

Wrap your `<textarea>` element with the `Mentionable` component:

```vue
<template>
  <Mentionable
    :keys="['@']"
    :items="items"
    offset="6"
  >
    <textarea v-model="text"/>
  </Mentionable>
</template>
```

The `keys` prop defines which characters will trigger the mention.

Add some styling for the mention items:

```vue
<style>
.mention-item {
  padding: 4px 10px;
  border-radius: 4px;
}

.mention-selected {
  background: rgb(192, 250, 153);
}
</style>
```

That's it!

Here is the result:

<GettingStartedDemo />
