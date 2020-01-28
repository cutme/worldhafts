import Glide from '@glidejs/glide';
import css from '../../node_modules/@glidejs/glide/src/assets/sass/glide.core.scss';

document.addEventListener('DOMContentLoaded',function() {

window.carousels = function() {
    const bestsellers = document.getElementsByClassName('js-bestsellers'),
          home = document.getElementById('homeCarousel'),
          recommended = document.getElementById('recommendedCarousel'),
          recommendedProduct = document.getElementById('recommendedProductCarousel'),
          sales = document.getElementById('salesCarousel');


    const bestsellersCarousel = function(arg) {

        const glide = new Glide(arg, {
            animationDuration: 1000,
            autoplay: false,
            gap: 20,
            perView: 3,
            rewind: false
        })
        
        setTimeout(function() {
            glide.mount();
        }, 1)
    };
    
    const salesCarousel = function() {

        const glide = new Glide(sales, {
            animationDuration: 1000,
            autoplay: false,
            gap: 0,
            perView: 1,
            rewind: false
        })
        
        setTimeout(function() {
            glide.mount();
        }, 1)
    };

    const homeCarousel = function() {

        const glide = new Glide(home, {
            type: 'carousel',
            animationDuration: 1000,
            autoplay: false,
            hoverpause: false,
            gap: 0
        })
        
        //setTimeout(function() {
            glide.mount();
        //}, 1)
    };
    
    const recommendedCarousel = function() {

        const glide = new Glide(recommended, {
            animationDuration: 1000,
            autoplay: false,
            gap: 20,
            perView: 5,
            rewind: false,
            peek: {
                before: 0,
                after: 90
            }
        })
        
        setTimeout(function() {
            glide.mount();
        }, 1)
    };
    
    const recommendedProductCarousel = function() {

        const glide = new Glide(recommendedProduct, {
            animationDuration: 1000,
            autoplay: false,
            gap: 20,
            perView: 4,
            rewind: false,
        })
        
        setTimeout(function() {
            glide.mount();
        }, 1)
    };
    
    home ? homeCarousel() : false;
    recommended ? recommendedCarousel() : false;
    recommendedProduct ? recommendedProductCarousel() : false;
    sales ? salesCarousel() : false;
    
    if (bestsellers.length > 0) {
        
        for (let i = 0; i < bestsellers.length; i++) {
            bestsellersCarousel(bestsellers[i]);
        }
    }
}
    
    
    

}, false);
