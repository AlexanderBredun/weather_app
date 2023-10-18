import { shallowMount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { createApp } from 'vue'
import { defineComponent } from 'vue'
import { useMainStore } from '@/store/index.ts'
import { useStructureStore } from '@/store/structure.ts'
import TilesFlow from '~/components/layouts/TilesFlow.vue'


const app = createApp({})
beforeEach(() => {
  const pinia = createPinia()
  app.use(pinia)
  setActivePinia(pinia)
})

describe('TilesFlow', () => {
  it('renders a list of tiles when structure is provided', async () => {
    const structure = [
      { id: '1', name: 'MainInfoTile', displayName: 'Main Info', size: 'small' },
      { id: '2', name: 'HourlyWeatherTile', displayName: 'Hourly Weather', size: 'medium' },
      { id: '3', name: 'DailyWeatherTile', displayName: 'Daily Weather', size: 'medium' },
      { id: '4', name: 'SunriseTile', displayName: 'Sunrise', size: 'small' },
      { id: '5', name: 'WindTile', displayName: 'Wind', size: 'large' },
    ]
    const wrapper = shallowMount(TilesFlow, {
      props: {
        defaultView: false,
        posData: {},
        structure,
      },
      global: {
        plugins: [createTestingPinia()],
      },
    })
    expect(wrapper.find('.tiles-holder').exists()).toBe(true)
    expect(wrapper.findAll('.tiles-holder > *')).toHaveLength(5)
  })

  it('renders a message when structure is empty', async () => {
    const wrapper = shallowMount(TilesFlow, {
      props: {
        defaultView: false,
        posData: {},
        structure: [],
      },
    })
    expect(wrapper.find('.tiles-holder').exists()).toBe(false)
    expect(wrapper.find('h2').text()).toBe('Nothing there')
    expect(wrapper.find('p').text()).toBe('Add blocks with informations')
  })

  it('disables drag and drop when defaultView is true', async () => {
    const wrapper = shallowMount(TilesFlow, {
      props: {
        defaultView: true,
        posData: {},
        structure: [],
      },
    })
    expect(wrapper.find('.tiles-holder').attributes('disabled')).toBe('true')
  })

  it('sets the correct component name based on the tile name', async () => {
    const wrapper = shallowMount(TilesFlow, {
      props: {
        defaultView: false,
        posData: {},
        structure: [
          { id: '1', name: 'MainInfoTile', displayName: 'Main Info', size: 'small' },
        ],
      },
    })
    expect(wrapper.findComponent({ name: 'MainInfoTile' }).exists()).toBe(true)
  })
})
