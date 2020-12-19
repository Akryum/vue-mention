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
      searchText: null,
      openKey: null,
      closeKey: null,
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
      @search="searchText = $event"
      @open="openKey = $event"
      @close="closeKey = $event"
    >
      <textarea
        v-model="text"
        rows="6"
        class="input"
      />
    </Mentionable>

    <div class="search">{{ searchText }}</div>
    <div class="open">{{ openKey }}</div>
    <div class="close">{{ closeKey }}</div>
  </div>
</template>
