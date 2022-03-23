<template>
  <div class="layout">
    <div class="layout-item">
      <img
        src="https://media.istockphoto.com/photos/beautiful-young-asian-woman-carrying-backpack-and-wearing-headphones-picture-id1319723945?s=612x612"
        alt=""
        class="layout-img"
      />
    </div>
    <div class="layout-item">
      <img
        src="https://media.istockphoto.com/photos/beautiful-young-asian-woman-carrying-backpack-and-wearing-headphones-picture-id1319723945?s=612x612"
        alt=""
        class="layout-img"
      />
    </div>
    <div class="layout-item">
      <img
        src="https://media.istockphoto.com/photos/beautiful-young-asian-woman-carrying-backpack-and-wearing-headphones-picture-id1319723945?s=612x612"
        alt=""
        class="layout-img"
      />
    </div>
    <div class="layout-item">
      <img
        src="https://media.istockphoto.com/photos/beautiful-young-asian-woman-carrying-backpack-and-wearing-headphones-picture-id1319723945?s=612x612"
        alt=""
        class="layout-img"
      />
    </div>
    <div class="layout-item">
      <img
        src="https://media.istockphoto.com/photos/beautiful-young-asian-woman-carrying-backpack-and-wearing-headphones-picture-id1319723945?s=612x612"
        alt=""
        class="layout-img"
      />
    </div>
    <div class="layout-item">
      <img
        src="https://media.istockphoto.com/photos/beautiful-young-asian-woman-carrying-backpack-and-wearing-headphones-picture-id1319723945?s=612x612"
        alt=""
        class="layout-img"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Dashboard'
}
</script>
<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  grid-template-rows: 350px 100px 350px;
  grid-template-areas:
    "h1 h1 h2 h3"
    "h4 h5 h2 h3 "
    "h4 h5 h6 h6";
  &-item {
    border-radius: 10px;
    overflow: hidden;
    &:first-child {
      grid-area: h1;
    }
    &:nth-child(2) {
      grid-area: h2;
    }
      &:nth-child(3){
        grid-area: h3;
      }
        &:nth-child(4){
          grid-area: h4;
        }
        &:nth-child(5){
          grid-area: h5;
        }
        &:nth-child(6){
          grid-area: h6;
        }
    .layout-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
