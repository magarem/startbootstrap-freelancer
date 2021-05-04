<template>
    <header class="masthead bg-primary text-white text-center">
      <div class="container d-flex align-items-center flex-column">
          <!-- Masthead Avatar Image-->
          <img v-if=avatar class="masthead-avatar mb-5" :src="require(`../assets/${site}/img/${avatar}`)" alt="" />
          <!-- Masthead Heading-->
          <!-- <img alt="Vue logo" src="../assets/logo.png"> -->

          <h1 class="masthead-heading text-uppercase mb-0">{{txt1}}</h1>
          <!-- Icon Divider-->
          <div class="divider-custom divider-light">
              <div class="divider-custom-line"></div>
              <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
              <div class="divider-custom-line"></div>
          </div>
          <!-- Masthead Subheading-->
          <p class="masthead-subheading font-weight-light mb-0">{{txt2}}</p>
      </div>
    </header>
</template>

<script>
export default {
  name: 'MainHeader',
  props: {
    avatar: String,
    txt1: String,
    txt2: String
  },
  setup(){
     let site = window.location.href.split('/').pop()
  //   const getImgUrl = (pic) => {
  //     return require(pic)
  //   }
  
    return {
      site
    }
  }
}
</script>
