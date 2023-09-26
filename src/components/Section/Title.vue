<template>
  <h2 class="section__title spacing">
    <slot />
  </h2>
</template>

<style lang="scss">
.section__title {
  font-size: 48px;
  text-transform: uppercase;
  margin-bottom: 40px;
}

@media screen and (max-width: 700px) {
  .section__title {
    font-size: 40px;
    line-height: 1.2;
    padding: 0 2.5vw;
    margin-bottom: 20px;
  }
}
</style>
