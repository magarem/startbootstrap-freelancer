<template>
  <!-- About Section-->
  <section class="page-section bg-primary text-white mb-0" id="about">
      <div class="container">
          <!-- About Section Heading-->
          <h2 class="page-section-heading text-center text-uppercase text-white">{{title}}</h2>
          <!-- Icon Divider-->
          <div class="divider-custom divider-light">
              <div class="divider-custom-line"></div>
              <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
              <div class="divider-custom-line"></div>
          </div>
          <!-- About Section Content-->
          <div class="row">
              <div class="col-lg-4 ml-auto"><p class="lead">{{txt1}}</p></div>
              <div class="col-lg-4 mr-auto"><p class="lead">{{txt2}}</p></div>
          </div>
          <!-- About Section Button-->
          <!-- <div class="text-center mt-4">
              <a class="btn btn-xl btn-outline-light" href="https://startbootstrap.com/theme/freelancer/">
                  <i class="fas fa-download mr-2"></i>
                  Free Download!
              </a>
          </div> -->
      </div>
  </section>
</template>

<script>

export default {
  name: 'About',
  props: {
    title: String,
    txt1: String,
    txt2: String
  }
}
</script>
