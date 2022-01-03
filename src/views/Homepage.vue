<template>
  <!-- <div>
      <div>Test</div>
      <img id="testImg" class="w-[300px] h-[300px]" src='../assets/images/test.jpg' alt="" srcset="">
      <button @click="cartoonizing">cartoonizing</button>
      <canvas id="canvas" width="800" height="800"></canvas>
  </div> -->
  <div class="md:flex flex-col md:flex-row md:min-h-screen w-full">
    <div
      class=" h-screen fixed z-50 flex flex-col w-full md:w-80 text-gray-300 bg-gray-800 dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0"
      x-data="{ open: false }"
    >
      <div class="bg-gray-900 flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
        <h3
          class="text-lg font-semibold tracking-widest text-gray-300 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
        >
          CartoonGAN
          <div class="text-xs lowercase">real image cartoonizing</div>
          
        </h3>
      </div>

        <div class="mx-4">
            <div class="my-4">
                <h6 class="text-xs text-gray-400 font-semibold tracking-widest uppercase">
                    - Default
                </h6>

                <div class="my-4 flex flex-wrap gap-3">
                    <div style="flex:0 0 88px;" v-for="(image,i) in defaultImages" :key="i">
                        <img class="aspect-square rounded-md hover:border-4 border-gray-700 duration-200" :src="image" alt="" srcset="">
                    </div>
                </div>
            </div>

            <div class="mt-8 mb-4">
                <h6 class="text-xs text-gray-400 font-semibold tracking-widest uppercase">
                    - Local
                </h6>
                
                <button class="my-4 bg-blue-500 w-full h-8 rounded font-semibold blue-box-shadow">Upload Images</button>

                <div>
                    <vue-scroll>
                        <div class="flex flex-wrap gap-3" style="max-height:400px;">
                            <!-- <div style="flex:0 0 88px;" v-for="(image,i) in [...defaultImages,...defaultImages]" :key="i">
                                <img class="aspect-square rounded-md hover:border-4 border-gray-700 duration-200" :src="image" alt="" srcset="">
                            </div> -->
                        </div>
                    </vue-scroll>
                </div>
            </div>
        </div>
    </div>

    <div class="flex flex-col pl-80 w-full relative h-screen overflow-x-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-400 opacity-75" style="z-index:-1;"></div>
      <div class="mx-4 mt-4 mb-2 flex-1 w-full overflow-x-hidden">
        <div class="flex h-full gap-4">
          <div class="px-4 py-4 flex-1 border-2 border-gray-400 border-dashed rounded-2xl flex gap-3 justify-center items-center">
            <img class="rounded-xl aspect-square object-cover" style="max-height:100%;" :src="defaultImages[6]" alt="" srcset="">
            <img class="rounded-xl aspect-square object-cover" style="max-height:100%;" :src="defaultImages[6]" alt="" srcset="">
          </div>
          <div class="mr-8 px-4 py-4 border-2 border-gray-400 border-dashed rounded-2xl flex flex-col w-full" style="flex:0 0 400px;">
            
            <div class="w-full flex-1">
              <div class="mx-4 my-6">
                <h6 class="text-xs text-gray-500 font-semibold tracking-widest uppercase">
                  Width
                </h6>
                <vue-slider v-model="value" />
              </div>

              <div class="mx-4 my-6">
                <h6 class="text-xs text-gray-500 font-semibold tracking-widest uppercase">
                  Height
                </h6>
                <vue-slider v-model="value" />
              </div>

              <div class="mx-3 my-6">

              <label class="flex justify-start items-start">
                <div class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                  <input type="checkbox" class="opacity-0 absolute">
                    <svg class="fill-current hidden w-4 h-4 text-blue-500 pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                  </div>
                <div class="select-none font-semibold tracking-widest text-gray-700">Keep ratio</div>
              </label>
              </div>

            </div>

            <div class="w-full">
              <button class="bg-blue-500 w-full h-8 rounded font-semibold blue-box-shadow text-white">Cartoonizing!</button>
            </div>
        
          </div>
        </div>
      </div>
      <div class="mx-4 my-2 px-4 py-4 border-2 border-gray-400 border-dashed rounded-2xl black-box-shadow" style="flex:0 0 300px;" >
          <h6 class="text-xs text-gray-400 font-semibold tracking-widest uppercase">
            - Output
          </h6>
          <div class="my-4">
            <vue-scroll>
                <div class="flex flex-wrap gap-3" style="height:250px;">
                    <div style="flex:0 0 100px;" v-for="(image,i) in [...defaultImages]" :key="i">
                      <img class="aspect-square rounded-md hover:border-4 border-gray-700 duration-200" :src="image" alt="" srcset="">
                    </div>
                </div>
            </vue-scroll>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

import CartoonGAN from '../cartoongan'

import Image001 from '../assets/images/001.jpg'
import Image002 from '../assets/images/002.jpg'
import Image003 from '../assets/images/003.jpg'
import Image004 from '../assets/images/004.jpg'
import Image005 from '../assets/images/005.jpg'
import Image006 from '../assets/images/006.jpg'
import Image007 from '../assets/images/007.jpg'
import Image008 from '../assets/images/008.jpg'
import Image009 from '../assets/images/009.jpg'

export default {
    components: {
      VueSlider
    },
    data(){
        return{
            cartoonGAN: null,
            cartoonizingImg: null,
            defaultImages: [Image001,Image002,Image003,Image004,Image005,Image006,Image007,Image008,Image009],
            value: 0
        }
    },
    mounted(){
        this.cartoonGAN = new CartoonGAN()
       
    },
    methods:{
        cartoonizing(){
            let textImgElemnt = document.getElementById('testImg')
            this.cartoonizingImg = this.cartoonGAN.predict(textImgElemnt)
        }
    }
}
</script>

<style>
.blue-box-shadow{
  box-shadow: 5px 4px 12px 0px rgb(40 126 255 / 20%);
  transition: .5s;
}
.blue-box-shadow:hover{
  box-shadow: 5px 4px 12px 0px rgb(40 126 255 / 60%);
}
.black-box-shadow{
  box-shadow: 5px 4px 12px 0px rgb(40 40 40 / 20%);
  transition: .5s;
}
  input:checked + svg {
  	display: block;
  }
</style>