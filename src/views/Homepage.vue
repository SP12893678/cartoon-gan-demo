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

      <div class="mx-4 h-full gallery">
        <vue-scroll>
        <div class="my-4">
            <h6 class="text-xs text-gray-400 font-semibold tracking-widest uppercase">
              - Default
                </h6>

                <div class="my-4 flex flex-wrap gap-3">
                    <div style="flex:0 0 88px;" v-for="(image,i) in defaultImages" :key="i">
                        <img @click="selectImage('default',image)" class="aspect-square rounded-md hover:border-4 border-gray-700 duration-200" :src="image" alt="" srcset="">
                    </div>
                </div>
        </div>

        <div class="mt-8 mb-4">
                <h6 class="text-xs text-gray-400 font-semibold tracking-widest uppercase">
                    - Local
                </h6>
                
                <button @click="$refs.imageUploader.click()" class="my-4 bg-blue-500 w-full h-8 rounded font-semibold blue-box-shadow">Upload Images</button>
                <input type="file" name="" ref="imageUploader" @change="imageUploadEvent" multiple hidden/>
                <div>
                    
                        <div class="flex flex-wrap gap-3" >
                            <div style="flex:0 0 88px;" v-for="(image,i) in localImages" :key="i">
                                <img @click="selectImage('default',image)" class="aspect-square rounded-md hover:border-4 border-gray-700 duration-200" :src="image" alt="" srcset="">
                            </div>
                        </div>
                  
                </div>
        </div>
          </vue-scroll>
      </div>

      <div class="px-4 py-2.5 border-t-2 border-gray-700 group">
        <a class="flex items-center gap-2 " href="https://github.com/SP12893678" target="_blank">
          <h5 class="text-sm uppercase font-semibold tracking-widest text-gray-500 group-hover:text-gray-200 duration-300">@SP12893678</h5>
          <svg class="fill-slate-400 group-hover:fill-slate-100 duration-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <div class="mt-1 text-xs text-gray-500">CartoonGAN made by <a class="hover:text-blue-300" href="https://github.com/mnicnc404/CartoonGan-tensorflow">CartoonGAN</a></div>
      </div>
  </div>

    <div class="flex flex-col pl-80 w-full relative h-screen overflow-x-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-400 opacity-75" style="z-index:-1;"></div>
      <div class="mx-4 mt-4 mb-2 flex-1 w-full overflow-x-hidden">
        <div class="flex h-full gap-4">
          <div class="px-4 py-4 flex-1 border-2 border-gray-400 border-dashed rounded-2xl flex gap-3 justify-around items-center">
            <div style="flex:0 1 300px; height:100%;">
              <h6 class="mb-4 text-xs text-gray-400 font-semibold tracking-widest uppercase">
                    - Real Image
              </h6>
              <img class="rounded-xl object-cover max-h-[90%]" :src="selected.default" alt="" srcset="">
            </div>
            <div style="flex:0 1 300px; height:100%;">
              <h6 class="mb-4 text-xs text-gray-400 font-semibold tracking-widest uppercase">
                    - Cartoonizing Image
              </h6>
              <div class=" rounded-2xl flex justify-center items-center">
                <img v-if="!selected.cartoon" class="rounded-xl grayscale object-cover max-h-[70%]" src="../assets/images/comic-book.png" alt="" srcset="">
                <img v-else class="rounded-xl object-cover max-h-full" :src="selected.cartoon" alt="" srcset="">
              </div>
            </div>
            <!-- <img class="rounded-xl aspect-square object-cover" style="max-height:100%;" :src="defaultImages[6]" alt="" srcset=""> -->
          </div>
          <div class="mr-8 px-4 py-4 border-2 border-gray-400 border-dashed rounded-2xl flex flex-col w-full" style="flex:0 1 400px;">
            
            <div class="w-full flex-1">
              <h6 class="text-xs text-gray-400 font-semibold tracking-widest uppercase">
                    - Config
              </h6>
              <div class="mx-4 my-6">
                <h6 class="text-xs text-gray-500 font-semibold tracking-widest uppercase">
                  Width
                </h6>
                <vue-slider v-model="selected.width" :min="Number(100)" :max="Number(1920)" />
              </div>

              <div class="mx-4 my-6">
                <h6 class="text-xs text-gray-500 font-semibold tracking-widest uppercase">
                  Height
                </h6>
                <vue-slider v-model="selected.height" :min="Number(100)" :max="Number(1920)" />
              </div>

              <div class="mx-4 my-6">
                <select v-model="model">
                  <option selected>20210103</option>
                  <option>20210106</option>
                  <option>20210107</option>
                </select>
              </div>
            </div>

            <div class="w-full">
              <button @click="cartoonizing" :class="(running)?'bg-gray-500':'bg-blue-500 blue-box-shadow'" class=" w-full h-8 rounded font-semibold text-white">
                Cartoonizing!
              </button>
            </div>
        
          </div>
        </div>
      </div>
      <div class="mx-4 my-2 px-4 py-4 border-2 border-gray-400 border-dashed rounded-2xl black-box-shadow" style="flex:0 0 220px;" >
          <h6 class="text-xs text-gray-400 font-semibold tracking-widest uppercase">
            - Output
          </h6>
          <div class="my-4">
            <vue-scroll>
                <div class="flex flex-wrap gap-3" style="height:180px;">
                    <div style="flex:0 0 88px;" v-for="(item,i) in outputImg" :key="i">
                      <img @click="selectImage('output',item)" class="aspect-square rounded-md hover:border-4 border-gray-700 duration-200" :src="item.cartoon" alt="" srcset="">
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
            localImages: [],
            value: 0,
            running: false,
            selected: {
              default: Image001,
              cartoon: null,
              width: 300,
              height: 300,
            },
            outputImg:[

            ],
            model: '20210107'
        }
    },
    mounted(){
        this.cartoonGAN = new CartoonGAN()
       
    },
    methods:{
        cartoonizing(){
          if(this.running) return
          this.running = true
          let InputImgElemnt = document.createElement('img')
          let selected = JSON.parse(JSON.stringify(this.selected))
          InputImgElemnt.src = selected.default
          InputImgElemnt.width = selected.width
          InputImgElemnt.height = selected.height

          const model_url = `https://cdn.jsdelivr.net/gh/SP12893678/cartoon-gan-demo@master/src/assets/model/${this.model}/model.json`
          this.cartoonGAN.setModel(model_url)
          this.cartoonGAN.predict(InputImgElemnt).then(res=>{
            // this.selected.cartoon = res
            this.running = false

            selected.cartoon = res
            console.log(selected)
            this.outputImg.push(selected)

          })
          .catch(res=>{
            this.running = false
            this.$store.commit('snackBar', { show: true, message: res }, { root: true })
          })
        },
        selectImage(type,item){
          if(type=='output') {
            this.selected = item
          }
          else this.selected = {
              default: item,
              cartoon: null,
              width: 300,
              height: 300,
          }
        },
        imageUploadEvent(event){
          console.log(event.target.files)
          Array.from(event.target.files).forEach((file) => {
                const reader = new FileReader()
                reader.onload = (e)=> {
                    const image_type = ['image/jpeg', 'image/png']
                    if (image_type.indexOf(file.type) == -1) return
                    else this.localImages.push(e.target.result)
                }
                reader.readAsDataURL(file)
          })

          this.$store.commit('snackBar', { show: true, message: 'Upload Image Successed.' }, { root: true })
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

.gallery{
  max-height: calc(100vh - 76px - 60px);
}  
</style>