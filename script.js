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
let startX2
let scrollLeft
let scrollLeft2


let sliderLoopSetTimeout
let sliderEnterSetTimeout

let sliderLoopInterval = setInterval(function(){
    $carousel.scrollTo({
        top: 0,
        left: $carousel.scrollLeft += 1,
    })
}, 1)


// let enterVelX = 2
$carousel.addEventListener('mouseenter', function(){
    // setTimeout(function(){
        clearInterval(sliderLoopInterval)
        // smoothStop()
    // }, 10)
})

// let leaveVelX = 0.1
// function smoothStop(){
//     $carousel.scrollLeft += enterVelX;
//     enterVelX *= 0.95;

//     if (Math.abs(enterVelX) > 0.1){
//         setTimeout(smoothStop,1)
//     }
// }

// function smoothStart(){
//     $carousel.scrollLeft += leaveVelX;   
//     leaveVelX *= 1.01

//     if (Math.abs(leaveVelX) < 2) {
//         setTimeout(smoothStart,1)
//     }
// }





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
    if (scrollPos + $carouselSection.offsetWidth + 5 >= sliderWidth) {
        $carousel.scrollTo({left: sliderWidth/2 - $carouselSection.offsetWidth })
    }   else if(scrollPos - 1 <= 0){
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


function getClonesWidth2() {
    let width = 0
    clones2.forEach(item => {
        width += item.offsetWidth
    })
    return width
}


function getScrollPos2() {
    // console.log($recipesSlider.scrollLeft);
    return $recipesSlider.scrollLeft
}


function setScrollPos2(pos) {
    $recipesSlider.scrollTo({left: pos})
}


function scrollUpdate2(pos) {
    scrollPos2 = getScrollPos2()
    if (Math.ceil(scrollPos2) + $recipesSlider.offsetWidth + 2 >= sliderWidth2) {
        $recipesSlider.scrollTo({left: sliderWidth2/2 - $recipesSlider.offsetWidth })
    }   else if(scrollPos2 - 10 <= 0){
        $recipesSlider.scrollTo({left: sliderWidth2/2})
    }
    requestAnimationFrame(scrollUpdate2)
}


function onLoad2() {
    sliderWidth2 = $recipesSlider.scrollWidth
    // console.log(sliderWidth);
    // console.log($recipesSlider.offsetWidth);
    clonesWidth2 = getClonesWidth2()
    scrollUpdate2()
}


onLoad2()








let sliderLoopInterval2 = setInterval(function(){

    $recipesSlider.scrollTo({
        top: 0,
        left: $recipesSlider.scrollLeft += 1,
    })
}, 1)



$recipesSlider.addEventListener('mouseenter', function(){
    // setTimeout(function(){
        clearInterval(sliderLoopInterval2)
        // smoothStop()
    // }, 10)
})



$recipesSlider.addEventListener("mousedown", e => {
    isDown = true
    startX2 = e.pageX - $recipesSlider.offsetLeft
    console.log(e.pageX);
    scrollLeft2 = $recipesSlider.scrollLeft
    cancelMomentumTracking2();
})



$recipesSlider.addEventListener("mouseleave", () => {
    isDown = false


    sliderLoopInterval2 = setInterval(function(){

        $recipesSlider.scrollTo({
            top: 0,
            left: $recipesSlider.scrollLeft += 1,
        })
    }, 1)

    // smoothStart()
})

$recipesSlider.addEventListener("mouseup", () => {
    isDown = false
    console.log(walk2);
    console.log($recipesSlider.scrollLeft);

    if (velX2 > 30) {
        velX2 = 30
    }
    beginMomentumTracking2();
})

let walk2

$recipesSlider.addEventListener("mousemove", e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - $recipesSlider.offsetLeft;

    walk2 = (x - startX2) * 1


    var prevScrollLeft = $recipesSlider.scrollLeft;
    $recipesSlider.scrollLeft = scrollLeft2 - walk2;
    velX2 = $recipesSlider.scrollLeft - prevScrollLeft;
})





var velX2 = 0;
var momentumID2;

$recipesSlider.addEventListener('wheel', (e) => {
    cancelMomentumTracking2();
});  

function beginMomentumTracking2(){
    cancelMomentumTracking2();
    momentumID2 = requestAnimationFrame(momentumLoop2);
}
function cancelMomentumTracking2(){
    cancelAnimationFrame(momentumID2);
}
function momentumLoop2(){
    $recipesSlider.scrollLeft += velX2;
    velX2 *= 0.93;
    
    // if (velX2 > 30) {
    //     velX2 = 30
    // }
   

    if (Math.abs(velX2) > 0.8){
        momentumID2 = requestAnimationFrame(momentumLoop2);
    }
    
}