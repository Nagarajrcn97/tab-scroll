<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <TabScroll class="custom-tab" :tabs="tabs">
    <template v-for="(tab, index) of tabs" :key="tab.id + index">
      <div class="tab-category" :id="tab.id" :style="{minHeight: tab.height}">
        {{tab.name}}
      </div>
    </template>
  </TabScroll>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import TabScroll from './components/TabScroll.vue'

@Options({
  components: {
    TabScroll
  }
})
export default class App extends Vue {
  tabs = [
    {
      name: 'Tab1',
      id: 'tab1',
      height: '100px'
    },
    {
      name: 'Tab2',
      id: 'tab2',
      height: '100px'
    },
    {
      name: 'Tab3',
      id: 'tab3',
      height: '100px'
    },
    {
      name: 'Tab4',
      id: 'tab4',
      height: '200px'
    },
    {
      name: 'Tab5',
      id: 'tab5',
      height: '300px'
    },
    {
      name: 'Tab6',
      id: 'tab6',
      height: '300px'
    },
    {
      name: 'Tab7',
      id: 'tab7',
      height: '300px'
    },
    {
      name: 'Tab8',
      id: 'tab8',
      height: '300px'
    }
  ]
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.custom-tab {
  border: 1px solid #EDEDED;
  max-width: 400px;
  max-height: 400px;
  .tab-category {
    border-bottom: 1px solid #606060;
    color: #606060;
    font-weight: bold;
  }
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
</style>
