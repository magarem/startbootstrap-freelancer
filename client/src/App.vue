<template>
<div v-if=data_items.navbar.logo>

  <NavBar  
    :logo="data_items.navbar.logo.txt" 
    :menu="data_items.navbar.menu">
  </NavBar>
 
  <MainHeader 
    :avatar="data_items.mainheader.avatar" 
    :txt1="data_items.mainheader.txt1" 
    :txt2="data_items.mainheader.txt2" />
  
  <Portfolio 
    :title="data_items.portfolio.title" 
    :items="data_items.portfolio.items">
  </Portfolio>

  <About 
    :title="data_items.about.title"
    :txt1="data_items.about.txt1"
    :txt2="data_items.about.txt2"
  />
  <Contactme 
    v-if="data_items.contactme.fields"
    :title="data_items.contactme.title" 
    :fields="data_items.contactme.fields"
   />

   <Footer 
    v-if="data_items.footer.location"
    :location="data_items.footer.location"
    :midias="data_items.footer.midias"
    :resume="data_items.footer.resume" 
    :copyright="data_items.footer.copyright"/>

</div>
</template>

<script>
import { ref, onBeforeMount } from 'vue'

import NavBar from './components/Navbar.vue'
import MainHeader from './components/MainHeader.vue'
import Portfolio from './components/Portfolio.vue'
import About from './components/About.vue'
import Contactme from './components/Contactme.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    NavBar, MainHeader, Portfolio, About, Contactme, Footer
  },
  setup(){
    let site = window.location.href.split('/').pop()
    let data_items = ref({
      navbar: {},
      mainheader: {},
      portfolio: {},
      about: {},
      contactme: {},
      footer: {}
    })

    async function readData(site, id) {
      const response = await fetch(`/api/dataload/${site}/${id}`);
      return await response.json();
    }
    
    const getData = (site, id) => {
      readData(site, id).then(response => {
        console.log(response);
        data_items.value[id] = response;
        // response.forEach((element, i) => {
        //   portfolio_items.value.push({ order:i, img: response[i], title: response[i].split('.')[0], body: 'teste total!!-->'+i })
        // });
      })
    }

    // const getImgUrl = (pic) => {
    //   return require(pic)
    // }

    onBeforeMount(() => {
      getData(site, 'navbar')
      getData(site, 'mainheader')
      getData(site, 'portfolio')
      getData(site, 'about')
      getData(site, 'contactme')
      getData(site, 'footer')
    })
  
    return {
      data_items
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
