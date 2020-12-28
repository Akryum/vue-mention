<script>
export default {
  data () {
    return {
      text: '<i>Edit <b>me</b></i>',
      items: [
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
      ],
    }
  },

  watch: {
    text: 'updateText',
  },

  mounted () {
    this.updateText()
  },

  methods: {
    updateText () {
      const el = this.$refs.input
      if (el.innerHTML !== this.text) {
        el.innerHTML = this.text
      }
    },
  },
}
</script>

<template>
  <div
    class="demo"
  >
    <h1>Content editable</h1>

    <Mentionable
      :keys="['@']"
      :items="items"
      placement="bottom-start"
    >
      <div
        ref="input"
        class="input"
        contenteditable="true"
        @input="text = $event.currentTarget.innerHTML"
      />
    </Mentionable>

    <pre class="preview">{{ text }}</pre>
  </div>
</template>

<style lang="postcss" scoped>
.demo {
  margin: 100px;
}
</style>
