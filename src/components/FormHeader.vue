<template>
  <header class="card-header level">
    <p class="card-header-title level-left">
      <span v-if="modification" data-testid="entete-modification"
        >{{ libelleModification }} : {{ libelleEnTete }}</span
      >
      <span v-else data-testid="entete-creation">{{ libelleCreation }}</span>
    </p>
  </header>
</template>

<script>
export default {
  name: 'FormHeader',
  props: {
    modification: {
      type: Boolean,
      required: true
    },
    libelleCreation: {
      type: String,
      required: true
    },
    libelleModification: {
      type: String,
      required: true
    },
    libelleEnTete: {
      type: String,
      required: true
    }
  }
}
</script>
