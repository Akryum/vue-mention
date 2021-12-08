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
      applyEvent: null,
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
      @apply="(item, key, replacedWith) => applyEvent = { item, key, replacedWith }"
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
    <div class="apply">
      value: {{ applyEvent ? applyEvent.item.value : null }}
      key: {{ applyEvent ? applyEvent.key : null }}
      replacedWith: {{ applyEvent ? applyEvent.replacedWith : null }}
    </div>
  </div>
</template>
