<script>
export default {
  components: {
    WrappedTextarea: {
      render (h) {
        return <div>
          <textarea class="input"/>
        </div>
      },
    },

    WrappedInput: {
      render (h) {
        return <div>
          <input class="input"/>
        </div>
      },
    },
  },

  data () {
    return {
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
      useTextarea: true,
    }
  },
}
</script>

<template>
  <div
    class="demo"
  >
    <label class="toggle">
      <input type="checkbox" v-model="useTextarea">
      Use textarea
    </label>

    <Mentionable
      :keys="['@']"
      :items="items"
    >
      <WrappedTextarea v-if="useTextarea" />

      <WrappedInput v-else />
    </Mentionable>
  </div>
</template>
