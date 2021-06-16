<template>
  <div class="container" id="tab-scroll-container">
    <div class="tab-container" id="tab-container">
      <span v-for="(tab, index) of tabs" :key="index" :class="['tab', {'active-tab' : activeTabIndex === index}]" @click="tabClick(tab, index)" :id="tab.name + tab.id">{{tab.name}}</span>
    </div>
    <div class="tab-slot-content" id="tab-slot" @scroll="!disableYScroll ? handleSlotScroll() : null">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { PropType } from 'vue'
import { Tab } from './types'
import { scrollEnd } from '../utils/scrollEnd'

@Options({
  props: {
    tabs: {
      type: Array as PropType<Array<Tab>>,
      requird: true,
      default: []
    }
  }
})

export default class TabScroll extends Vue {
  tabs = []
  activeTab: Tab | null = null
  activeTabIndex = 0
  tabParentEl: HTMLElement | null = null
  tabContainerEl: HTMLElement | null = null
  slotEl: HTMLElement | null = null
  disableYScroll = false

  mounted (): void {
    this.slotEl = document.getElementById('tab-slot')
    this.tabParentEl = document.getElementById('tab-scroll-container')
    this.tabContainerEl = document.getElementById('tab-container')
    if (this.tabParentEl && this.tabContainerEl && this.slotEl) {
      const { clientHeight: parentElHeight } = this.tabParentEl
      const { offsetHeight: containerElHeight } = this.tabContainerEl
      this.slotEl.style.maxHeight = parentElHeight - containerElHeight + 'px'
      if (this.tabs.length) {
        this.activeTab = this.tabs[0]
      }
    }
  }

  tabClick (tab: Tab, index: number): void {
    this.activeTabIndex = index
    this.activeTab = tab
    this.handleHorizontalScroll(tab, true)
  }

  handleVerticalScroll (tab: Tab, tabContainerEl: HTMLElement, slotEl: HTMLElement): void {
    scrollEnd(tabContainerEl, () => {
      this.scrollVertical(tab, slotEl)
    })
  }

  scrollTabContainer (tab: Tab, parentEl: HTMLElement, offset: number): void {
    parentEl.scrollBy({
      left: offset,
      behavior: 'smooth'
    })
  }

  scrollVertical (tab: Tab, slotEl: HTMLElement): void {
    const contentEL = document.getElementById(tab.id)
    if (contentEL) {
      contentEL.scrollIntoView({
        behavior: 'smooth'
      })
      scrollEnd(slotEl, () => {
        this.disableYScroll = false
      })
    }
  }

  async handleSlotScroll (): Promise<void> {
    let activeTab: Tab | null = null
    let activeEl : HTMLElement | null = null
    let activeTabIndex: number = this.activeTabIndex
    for (let i = 0; i < this.tabs.length; i++) {
      const tab: Tab = this.tabs[i]
      if (this.slotEl && tab.id) {
        const el: HTMLElement | null = document.getElementById(tab.id)
        if (el) {
          const { top: elTop, height: elHeight } = el.getBoundingClientRect()
          const { top: slotElTop } = this.slotEl.getBoundingClientRect()
          if (elTop + elHeight >= slotElTop + 8) {
            activeTab = tab
            activeTabIndex = i
            break
          }
        }
      }
    }
    if (this.activeTab && activeTab && activeTab.id !== this.activeTab.id) {
      activeEl = document.getElementById(activeTab.name + activeTab.id)
      if (activeEl) {
        this.activeTab = activeTab
        this.activeTabIndex = activeTabIndex
        this.handleHorizontalScroll(activeTab)
      }
    }
  }

  handleHorizontalScroll (tab: Tab, yScroll = false): void {
    const el: HTMLElement | null = document.getElementById(tab.name + tab.id)
    if (el && this.tabContainerEl && this.slotEl) {
      if (yScroll) this.disableYScroll = true
      const { left: elLeft, width: elWidth } = el.getBoundingClientRect()
      const { left: parentElLeft, width: parentElWidth } = this.tabContainerEl.getBoundingClientRect()
      const elLeftOffset = elLeft + elWidth
      const parentElLeftOffset = parentElLeft + parentElWidth
      if (elLeftOffset > parentElLeftOffset) {
        this.scrollTabContainer(tab, this.tabContainerEl, elLeftOffset - parentElLeftOffset + 12)
        if (yScroll) this.handleVerticalScroll(tab, this.tabContainerEl, this.slotEl)
      } else if (elLeft < parentElLeft) {
        this.scrollTabContainer(tab, this.tabContainerEl, elLeft - parentElLeft - 12)
        if (yScroll) this.handleVerticalScroll(tab, this.tabContainerEl, this.slotEl)
      } else if (yScroll) {
        this.scrollVertical(tab, this.slotEl)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  margin: auto;
  overflow: scroll;
  .tab-container {
    display: flex;
    display: -webkit-flex;
    padding: 8px 12px;
    overflow: scroll;
    border-bottom: 1px solid #EDEDED;
    .tab {
      padding: 4px 18px;
      border-radius: 25px;
      color: #606060;
      font-weight: bold;
    }
    .active-tab {
      background-color: #FFB900;
      color: white;
    }
  }
  .tab-container::-webkit-scrollbar {
    display: none;
  }
  .tab-slot-content {
    overflow: scroll;
    display: flex;
    flex-direction: column;
    padding: 8px 12px;
  }
}
</style>
