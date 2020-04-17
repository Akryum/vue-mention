<script>
export default {
  data () {
    return {
      text: '',
      items: [],
    }
  },

  created () {
    for (let i = 0; i < 100; i++) {
      this.items.push({
        value: `item-${String(i).padStart(3, '0')}`,
      })
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
      :limit="10"
    >
      <textarea
        v-model="text"
        rows="6"
        class="input"
      />
    </Mentionable>

    <div class="preview">{{ text }}</div>
  </div>
</template>
