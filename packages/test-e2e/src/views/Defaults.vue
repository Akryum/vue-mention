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
      popover-class="defaults-mention"
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

<style>
.defaults-mention .mention-selected {
  background: #aaffc7;
}
</style>
