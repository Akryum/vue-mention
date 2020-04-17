<script>
export default {
  data () {
    return {
      text: '',
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
}
</script>

<template>
  <div
    class="demo"
  >
    <Mentionable
      :keys="['@']"
      :items="items"
      insert-space
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
