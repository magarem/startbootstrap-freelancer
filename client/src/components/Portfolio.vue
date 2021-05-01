<template>
  <section class="page-section portfolio" id="portfolio">
      <div class="container">
          <!-- Portfolio Section Heading-->
          <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">{{title}}</h2>
          <!-- Icon Divider-->
          <div class="divider-custom">
              <div class="divider-custom-line"></div>
              <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
              <div class="divider-custom-line"></div>
          </div>
          <!-- Portfolio Grid Items-->
          <div class="row justify-content-center">
            <!-- <button @click="getData">Read</button> -->
            <PortfolioItem v-for="item in items" :key="item.order" :order=item.order :img=item.img :title=item.title :body=item.body />
            <!-- <PortfolioItem order=2 img="cake.png" title="foto2" body="texto2" />
            <PortfolioItem order=3 img="circus.png" title="foto3" body="texto3" />
            <PortfolioItem order=4 img="cabin.png" title="foto4" body="texto4" />
            <PortfolioItem order=5 img="cake.png"  title="foto5" body="texto5" />
            <PortfolioItem order=6 img="circus.png" title="foto6" body="texto6" /> -->
          </div>
      </div>
  </section>
</template>

<script>
import PortfolioItem from './Portfolioitem.vue'

export default {
  name: 'Portfolioitem',
  props: {
    title: String,
    mainImage: String,
    items: Array
  },
  components: {
    PortfolioItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
