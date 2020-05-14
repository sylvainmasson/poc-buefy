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
      Boolean,
      required: true
    },
    libelleCreation: {
      String,
      required: true
    },
    libelleModification: {
      String,
      required: true
    },
    libelleEnTete: {
      String,
      required: true
    }
  }
}
</script>
