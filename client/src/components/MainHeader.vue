<template>
    <header class="masthead bg-primary text-white text-center">
      <div class="container d-flex align-items-center flex-column">
          <!-- Masthead Avatar Image-->
          <!-- <div class="round"> -->
            <img v-if=avatar class="masthead-avatar mb-5" style="border-radius: 50%" :src="require(`../assets/${site}/img/${avatar}`)" alt="" />
          <!-- </div> -->
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
    return {
      site
    }
  }
}
</script>
<style scoped>
  .round{
    width:10%;
    padding-top:10%;
    overflow:hidden;
    position:relative;
    border-radius:50%;
  }
  /* img{
    position:absolute;
    top:50%;
    left:50%;
    min-width:100%;
    height:100%;
    transform:translate(-50%,-50%);
    transition: 1s ease;
  }
  img:hover{
    height:110%;
  } */
</style>
