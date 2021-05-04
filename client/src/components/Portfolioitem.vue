<template>
  <!-- Portfolio Item -->
  <div class="col-md-6 col-lg-4 mb-5">
    <div class="portfolio-item mx-auto" data-toggle="modal" :data-target="'#portfolioModal' + order">
      <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
        <div class="portfolio-item-caption-content text-center text-white"><i class="fas fa-plus fa-3x"></i></div>
      </div>
      <div class="with-bg-size img-fluid_" :style="{'background-image': 'url(' + require(`../assets/${site}/img/portfolio/${img}`)}"></div>
    </div>
  </div>
  <!-- Portfolio Modal -->
  <div class="portfolio-modal modal fade" :id="'portfolioModal' + order" tabindex="-1" role="dialog" aria-labelledby="portfolioModal1Label" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"><i class="fas fa-times"></i></span>
        </button>
        <div class="modal-body text-center">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-8">
                <!-- Portfolio Modal - Title-->
                <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0" id="portfolioModal1Label">{{title}}</h2>
                <!-- Icon Divider-->
                <div class="divider-custom">
                  <div class="divider-custom-line"></div>
                  <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                  <div class="divider-custom-line"></div>
                </div>
                <!-- Portfolio Modal - Image-->
                <img v-if="img" class="img-fluid rounded mb-5" :src="require(`../assets/${site}/img/portfolio/${img}`)" alt="" />
                <!-- Portfolio Modal - Text-->
                <p class="mb-5">{{body}}</p>
                <button class="btn btn-primary" data-dismiss="modal">
                  <i class="fas fa-times fa-fw"></i>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PortfolioItem',
  props: {
    order: Number,
    img: String,
    title: String,
    body: String
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .crop {
      width: 311px;
      height: 225px;
      overflow: hidden;
  }

  .crop img {
      width: 500px;
      height: 300px;
      margin: -75px 0 0 -100px;
  }
  .with-bg-size {
  background-image: url('https://i.stack.imgur.com/wPh0S.jpg');
  width: 332px;
  height: 225px;
  background-position: center;
  /* Make the background image cover the area of the <div>, and clip the excess */
  background-size: cover;
}
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
