import { mount } from '@vue/test-utils'
import YourComponent from '@/components/HelloWorld.vue'
describe('YourComponent', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(YourComponent)
    expect(wrapper.vm).toBeTruthy()
  })
})