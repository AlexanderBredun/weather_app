import AppButton from './AppButton.vue';
import Tile from '~/components/layouts/Tile.vue';
import Loader from '../Loader.vue'
import TileSettings from '@/components/features/tiles/ui/TileSettings.vue'
import WeatherImage from '@/components/shared/ui/WeatherImage.vue'
import TileResponsive from '@/components/layouts/TileResponsive.vue'
import { shallowMount, RouterLinkStub  } from '@vue/test-utils'

const factory = (elem, values = {})=> {
    return shallowMount(elem, {
        ...values,
        stubs: {
            NuxtLink: true,
            // Any other component that you want stubbed
          },
    });
}

describe('AppButton', ()=> {
    it('renders without crashing', ()=> {
        const wrapper = factory(AppButton)
       
        expect( wrapper.exists() ).toBe(true)
    })
    it('should create button', ()=> {
        const wrapper = factory(AppButton)
        expect( wrapper.find('button').exists() ).toBeTruthy()
    })
    it('should create nuxt-link', ()=> {
        const wrapper = factory(AppButton, {
            attrs: {
                to: '/'
              }
        })
        expect( wrapper.find('nuxt-link').exists() ).toBeTruthy()
    })
    it('should create simple link', ()=> {
        const wrapper = factory(AppButton, {
            attrs: {
                href: '/'
              }
        })
        expect( wrapper.find('a').exists() ).toBeTruthy()
    })
})


describe('Tile', ()=> {
    it('renders without crashing', ()=> {
        const wrapper = factory(Tile)
       
        expect( wrapper.exists() ).toBe(true)
    })
    it('should show loading indicator', ()=> {
        const wrapper = factory(Tile, {
            props: {
                loading: true
              }
        })
        expect(wrapper.findComponent(Loader).exists()).toBeTruthy()
    })
    it('should show error', ()=> {
        const wrapper = factory(Tile, {
            props: {
                error: true
              }
        })
        expect(wrapper.text()).toContain('Something went wrong')
    })
    it('should show tile', ()=> {
        const wrapper = factory(Tile, {
            slots: {
                default: TileResponsive
            }
        })
    
        expect(wrapper.findComponent(TileResponsive).exists()).toBeTruthy()
    })
    it('should not show settings for tile', ()=> {
        const wrapper = factory(Tile, {
            props: {
                noSettings: true
            }
        })
        expect(wrapper.findComponent(TileSettings).exists()).toBe(false)
    })
    it('should change tag of parent', ()=> {
        const wrapper = factory(Tile, {
            props: {
                tag: 'section'
            }
        })
        expect(wrapper.find('section').exists()).toBe(true)
    })
})

describe('WeatherImage', ()=> {
    it('renders without crashing', ()=> {
        const wrapper = factory(WeatherImage, {
            props: {
                status: 0
            }
        })

        expect(wrapper.exists()).toBe(true)
    })
    it('show image by code', ()=> {
        const imgCode = 0;
        const wrapper = factory(WeatherImage, {
            props: {
                status: imgCode
            }
        })
       
        expect(wrapper.find('img').wrapperElement.src).toContain(`${imgCode}.svg`)
    })
    it('show image for night', ()=> {
        const imgCode = 0;
        const wrapper = factory(WeatherImage, {
            props: {
                status: imgCode,
                time: 24
            }
        })
       
        expect(wrapper.find('img').wrapperElement.src).toContain(`${imgCode}_night.svg`)
    })
})