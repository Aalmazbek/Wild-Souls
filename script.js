let $burgerMenu = document.querySelector('#burger-menu')
let $navbar = document.querySelector('.navbar')
let $cross = document.querySelector('.navbar img')
let $body = document.querySelector('body')

$burgerMenu.addEventListener('click', function(){
    $navbar.style.transform = 'translate(0)'
    $body.style.overflow = 'hidden'
})

$cross.addEventListener('click', function(){
    $navbar.style.transform = 'translate(-100%)'
    $body.style.overflow = 'auto'
})




















const $carouselSection = document.querySelector(".carousel-section")
const $carousel = document.querySelector(".carousel")
let isDown = false
let startX
let scrollLeft


let sliderLoopSetTimeout
let sliderEnterSetTimeout

let sliderLoopInterval = setInterval(function(){
    $carousel.scrollTo({
        top: 0,
        left: $carousel.scrollLeft += 1,
    })
}, 1)


let enterVelX = 2
$carousel.addEventListener('mouseenter', function(){
    // setTimeout(function(){
        clearInterval(sliderLoopInterval)
        // smoothStop()
    // }, 10)
})

let leaveVelX = 0.1
function smoothStop(){
    $carousel.scrollLeft += enterVelX;
    enterVelX *= 0.95;

    if (Math.abs(enterVelX) > 0.1){
        setTimeout(smoothStop,1)
    }
}

function smoothStart(){
    $carousel.scrollLeft += leaveVelX;   
    leaveVelX *= 1.01

    if (Math.abs(leaveVelX) < 2) {
        setTimeout(smoothStart,1)
    }
}





$carousel.addEventListener("mousedown", e => {
    isDown = true
    startX = e.pageX - $carousel.offsetLeft
    console.log(e.pageX);
    scrollLeft = $carousel.scrollLeft
    cancelMomentumTracking();
    
})


$carousel.addEventListener("mouseleave", () => {
    isDown = false


    sliderLoopInterval = setInterval(function(){
        $carousel.scrollTo({
            top: 0,
            left: $carousel.scrollLeft += 1,
        })
    }, 1)

    // smoothStart()
})

$carousel.addEventListener("mouseup", () => {
    isDown = false
    console.log(walk);
    console.log($carousel.scrollLeft);
    beginMomentumTracking();
})

let walk

$carousel.addEventListener("mousemove", e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - $carousel.offsetLeft;
    walk = (x - startX) * 1

    var prevScrollLeft = $carousel.scrollLeft;
    $carousel.scrollLeft = scrollLeft - walk;
    // console.log(walk);
    velX = $carousel.scrollLeft - prevScrollLeft;
})





var velX = 0;
var momentumID;

$carousel.addEventListener('wheel', (e) => {
    cancelMomentumTracking();
});  

function beginMomentumTracking(){
    cancelMomentumTracking();
    momentumID = requestAnimationFrame(momentumLoop);
}
function cancelMomentumTracking(){
    cancelAnimationFrame(momentumID);
}
function momentumLoop(){
    $carousel.scrollLeft += velX;
    velX *= 0.93;
    
    if (velX > 30) {
        velX = 30
    }
    if (Math.abs(velX) > 0.8){
        momentumID = requestAnimationFrame(momentumLoop);
    }
}




















let clones = []
let disableScroll = false
let clonesWidth
let sliderWidth
let scrollPos

let items = [...document.querySelectorAll('.carousel .card')]
console.log(items);

items.forEach(item => {
    let clone = item.cloneNode(true)
    clone.classList.add('clone')
    $carousel.appendChild(clone)
    clones.push(clone)
})


function getClonesWidth() {
    let width = 0
    clones.forEach(item => {
        width += item.offsetWidth
    })
    return width
}


function getScrollPos() {
    return $carousel.scrollLeft
}


function setScrollPos(pos) {
    $carousel.scrollTo({left: pos})
}


function scrollUpdate(pos) {
    scrollPos = getScrollPos()
    if (scrollPos + $carouselSection.offsetWidth + 1 >= sliderWidth) {
        $carousel.scrollTo({left: sliderWidth/2 - $carouselSection.offsetWidth })
    }   else if(scrollPos - 10 <= 0){
        $carousel.scrollTo({left: sliderWidth/2})
    }
    requestAnimationFrame(scrollUpdate)
}


function onLoad() {
    sliderWidth = $carousel.scrollWidth
    clonesWidth = getClonesWidth()
    scrollUpdate()
}


onLoad()



// let interval = setInterval(function(){
//     let toogle = false
// },1000)

// let sliderInterval = setInterval(function(){
//     if (!isDown) {
//         setTimeout(loop,3000)
//     }   else if(isDown){
        
//     }
// }, 10)



















let $productListDivs = document.querySelectorAll('.products-review .products .products-list > div')

$productListDivs.forEach(el => {
    el.addEventListener('mouseover', function(){
        el.style.color = "white"
        el.firstElementChild.style.transform = "translate(10%)"
        el.lastElementChild.style.width = "100%"
        el.lastElementChild.style.alignSelf = "flex-start"
        // console.log(el.firstChild);
    })
    el.addEventListener('mouseout', function(){
        el.style.color = "black"
        el.firstElementChild.style.transform = "translate(0)"
        el.lastElementChild.style.width = "0"
        el.lastElementChild.style.alignSelf = "flex-end"
    })
})





let $sliderSlides = document.querySelectorAll('.slider > div')
let $sliderButtons = document.querySelectorAll('.slider > .dots > div')


let switcherNum = 1
function switcher(){
    if (switcherNum == 1) {
        $sliderSlides[0].style.opacity = '0'
        $sliderButtons[0].classList.remove('checked')
    
        $sliderSlides[1].style.opacity = '1'
        $sliderButtons[1].classList.add('checked')

        switcherNum = 2
        return
    }
    if (switcherNum == 2) {
        $sliderSlides[0].style.opacity = '1'
        $sliderButtons[0].classList.add('checked')
        
        $sliderSlides[1].style.opacity = '0'
        $sliderButtons[1].classList.remove('checked')
        
        switcherNum = 1
    }
}

let interval = setInterval(switcher,5000)


$sliderButtons.forEach((el, index) => {
    el.addEventListener('click', function(){
        if (el.classList == 'checked') {
            clearInterval(interval)
            interval = setInterval(switcher, 5000)
        }   else{
            clearInterval(interval)
            $sliderSlides[index].style.opacity = '1'
            $sliderButtons[index].classList.add('checked')
        
            $sliderSlides[index == 0 ? 1 : 0].style.opacity = '0'
            $sliderButtons[index == 0 ? 1 : 0].classList.remove('checked')
            interval = setInterval(switcher, 5000)
        }
    })
})




















let $recipesViewport = document.querySelector('.recipes-viewport')
let $recipesSlider = document.querySelector('.recipes-slider')
let recipeStyles = window.getComputedStyle($recipesSlider)
let clones2 = []
let disableScroll2 = false
let clonesWidth2
let sliderWidth2
let scrollPos2

let items2 = [...document.querySelectorAll('.recipes-slider .card')]
console.log(items2);

items2.forEach(item => {
    let clone = item.cloneNode(true)
    clone.classList.add('clone')
    $recipesSlider.appendChild(clone)
    clones2.push(clone)
})










let isDown2 = false
let recipeStartX
let translateX

let timer
let interval2


// $recipesViewport.addEventListener('mouseenter', function(){
//     let startX = recipeStyles.transform.substring(19)
//     startX = startX.split('')
//     startX.splice(-4)
//     recipeStartX = startX.join('')*100/$recipesSlider.offsetWidth
    
//     clearTimeout(timer)

//     timer = setTimeout(function(){
//         console.log("NO");
//         let switcher = 0
//         animationSwitch(switcher)
//     },1)
    
// })


// $recipesViewport.addEventListener('mouseover', function(){

//     let startX = recipeStyles.transform.substring(19)
//     startX = startX.split('')
//     startX.splice(-4)
//     recipeStartX = startX.join('')*100/$recipesSlider.offsetWidth

//     // console.log(translate.join(''));
//     console.log(recipeStartX);

// })

// $recipesViewport.addEventListener('mouseleave', function(){

//     clearTimeout(timer)

//     timer = setTimeout(function(){
//         console.log("YES");
//         let switcher = 1
//         animationSwitch(switcher)
//     },1)

//     console.log('leave');
// })


// function animationSwitch(switcher  ){
//     if (switcher) {
//         $recipesSlider.style.transition = '1s cubic-bezier(.58,-0.01,.5,.5)'
//         $recipesSlider.style.transform = `translateX(${recipeStartX-10}%)`
//         recipeStartX-=5
//         runAnimation()
//     }   else{
//         clearInterval(interval2)
//         $recipesSlider.style.transition = '1s cubic-bezier(.29,.5,.49,1)'
//         $recipesSlider.style.transform = `translateX(${recipeStartX-10}%)`
//     }
// }

// function runAnimation() {
//     $recipesSlider.style.transition = '1s linear'
//     interval2 = setInterval(function(){
//         $recipesSlider.style.transform = `translateX(${recipeStartX-0.5}%)`
//         recipeStartX-=0.5
//         console.log(recipeStartX);
//         if (recipeStartX<=-179.5) {
//             clearInterval(interval2)
//             recipeStartX = 0
//             function refresh(){
//                 $recipesSlider.style.transition = '0s linear'
//                 $recipesSlider.style.transform = `translateX(${recipeStartX}%)`
//             }
//             refresh()
//             setTimeout(runAnimation, 15)
//         }
//     }, 50)
// }







// $recipesSlider.addEventListener('mousedown', function(){
//     let startX = recipeStyles.transform.substring(19)
//     startX = startX.split('')
//     startX.splice(-4)
//     recipeStartX = startX.join('')
//     console.log(recipeStartX);
// })















// let $links = document.querySelectorAll('.footer .content .links > div > div a')

// $links.forEach(el => {
//     el.addEventListener('mouseover', function(){
//         el.after.style.width = "100%"
//     })
// })