import * as tf from '@tensorflow/tfjs';

export default class CartoonGAN {
    constructor(){
        this.setModel()
    }

    async setModel(){   
        // console.log(MyModel)
        // const MODEL_URL = 'https://cdn.jsdelivr.net/gh/SP12893678/cartoon-gan-demo@master/src/assets/model/model.json'
        const MODEL_URL = 'https://cdn.jsdelivr.net/gh/SP12893678/cartoon-gan-demo@master/src/assets/model/20210106/model.json'
        // const MODEL_URL = 'https://raw.githubusercontent.com/leemengtaiwan/tfjs-models/master/cartoongan/tfjs_json_models/shinkai/model.json';
        // const MODEL_URL = 'https://raw.githubusercontent.com/leemengtaiwan/tfjs-models/master/cartoongan/tfjs_json_models/hayao/model.json';
        let generator = await tf.loadGraphModel(MODEL_URL);
        console.log('generator loaded.');
        console.log('warm up generator');
        generator.predict(tf.zeros([1, 1, 1, 3])).dispose();
        this.generator = generator;
    }

    predict(inputImgElement){
        console.log("before predicting: ", tf.memory());

        let inputImgTensor = tf.browser.fromPixels(inputImgElement);
        inputImgTensor = inputImgTensor.toFloat();
        let axis;
        inputImgTensor = inputImgTensor.reverse(axis=2);
        inputImgTensor = tf.expandDims(inputImgTensor, 0);
    
        const startTime = performance.now();
        console.log("Cartoonizing images...")
        let generatedImgTensor = this.generator.predict(inputImgTensor);
        generatedImgTensor = tf.squeeze(generatedImgTensor, 0);
        generatedImgTensor = generatedImgTensor.reverse(axis=2);
        generatedImgTensor = generatedImgTensor.mul(0.5).add(0.5);
        console.log(generatedImgTensor);
        generatedImgTensor = tf.clipByValue(generatedImgTensor, 0, 1);
        console.log(generatedImgTensor)
        // renderResult(generatedImgTensor);
        let canvas = document.createElement('canvas')
        const render = tf.browser.toPixels(generatedImgTensor, canvas)
        return render.then(res=>{
            let image = canvas.toDataURL("image/jpeg", 1.0);
            console.log(image)
            inputImgTensor.dispose();
        
            const totalTime = performance.now() - startTime;
            console.log(`Transformation done in ${Math.floor(totalTime)}ms`);
            console.log("after predicting: ", tf.memory())
            return image
        })
    }
}