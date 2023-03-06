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




















let $langBtn = document.querySelector('#lang-btn')

$langBtn.addEventListener('mouseenter', showLangButtons)

function showLangButtons(){
    $langBtn.firstElementChild.style.color = 'gray'
    $langBtn.firstElementChild.style.backgroundColor = 'black'

    
    $langBtn.lastElementChild.style.display = 'flex'
    $langBtn.lastElementChild.style.backgroundColor = 'black'
    $langBtn.lastElementChild.style.color = 'white'
    setTimeout(function(){
        $langBtn.lastElementChild.style.opacity = '1'
    }, 50)
}


$langBtn.addEventListener('mouseleave', hideLangButtons)

function hideLangButtons(){
    $langBtn.firstElementChild.style.color = 'black'
    $langBtn.firstElementChild.style.background = 'none'

    
    $langBtn.lastElementChild.style.opacity = '0'
    setTimeout(function(){
        $langBtn.lastElementChild.style.display = 'none'
    }, 50)
}




















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
    // console.log(e.pageX);
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






























///// ЛОГИН / LOGIN

let $closeLoginButton = document.querySelector("#close-login-modal-button")
let $loginButton = document.querySelector(".login-button")
let $loginModal = document.querySelector(".login-modal")

$loginButton.addEventListener('click', showLoginModal)

let isLoginModalUp = 0

function showLoginModal() {
    $loginModal.style.transform = 'translateY(0%)'
    $body.style.overflowY = 'hidden'

    setTimeout(function(){
        isLoginModalUp = 1
    }, 500)
}

$closeLoginButton.addEventListener('click', hideLoginModal)

document.addEventListener('click', function(e){
    const withinBoundaries = e.composedPath().includes($loginModal);
    if (isLoginModalUp && !withinBoundaries) {
        hideLoginModal()
    }
})

function hideLoginModal() {
    $loginModal.style.transform = 'translateY(-200%)'
    $body.style.overflowY = 'auto'

    isLoginModalUp = 0
}






























//// КОРЗИНА / CART

let $buyBtn = document.querySelectorAll('.buy-button')
let $cartCounter = document.querySelector('#counter')
let $cartList = document.querySelector('.cart-list')
let counter = 0
let cart = []
let productIndex

let productsArray = [
    {
        img: "https://static.wildsouls.gr/app/uploads/2020/10/fistikovoutiro-1-800x880.png",
        name: "The Wild Peanut Butter",
        price: "4.90"
    },
    {
        img: "https://static.wildsouls.gr/app/uploads/2020/10/taxini_kakoa_meli-800x880.png",
        name: "Tahini with Cocoa & Honey",
        price: "5.90"
    },
    {
        img: "https://static.wildsouls.gr/app/uploads/2020/10/fountoukovoutiro-800x880.png",
        name: "Hazelnut Butter",
        price: "6.90"
    },
    {
        img: "https://static.wildsouls.gr/app/uploads/2020/10/taxini_sisami-800x880.png",
        name: "Tahini",
        price: "4.90"
    },
    {
        img: "https://static.wildsouls.gr/app/uploads/2020/10/kasious-800x880.png",
        name: "Cashew Butter",
        price: "6.90"
    },
    {
        img: "https://static.wildsouls.gr/app/uploads/2020/10/taxini_meli-800x880.png",
        name: "Tahini with Honey",
        price: "5.90"
    },
    {
        img: "https://static.wildsouls.gr/app/uploads/2020/10/taxini_futikes-ines-800x880.png",
        name: "High Fiber Tahini",
        price: "5.90"
    },
    {
        img: "https://static.wildsouls.gr/app/uploads/2020/10/amigdalovoutiro-800x880.png",
        name: "Almond Butter",
        price: "7.20"
    },
    {
        img: "https://static.wildsouls.gr/app/uploads/2020/10/taxini_protein-800x880.png",
        name: "High Protein Tahini",
        price: "6.40"
    },
    {
        img: "https://static.wildsouls.gr/app/uploads/2020/10/taxini_chia-800x880.png",
        name: "Tahini with Chia Seeds",
        price: "5.90"
    },
]






$buyBtn.forEach((elem, index) => {
    let elemCounter = 1
    elem.addEventListener('click', function addInCart(){
        // console.log(elemCounter);

        $cartCounter.innerHTML = `(${counter})`
        
        productIndex = index < 10 ? index : index - 10
        console.log(productsArray[productIndex].name)


        // if (productsArrayForHTML.length > 0) {
        //     productsArrayForHTML.forEach(elem => {
        //         if (elem.name != productsArray[productIndex].name) {
        //             console.log("YES");
        //             productsArrayForHTML.push({
        //                 amount: elemCounter,
        //                 img: productsArray[productIndex].img,
        //                 name: productsArray[productIndex].name,
        //                 price: productsArray[productIndex].price,
        //             })
        //         }   else{            
        //             let elemIndexInProductsArrayForHTML = productsArrayForHTML.findIndex(item => item.name == productsArray[productIndex].name)
        //             console.log(elemIndexInProductsArrayForHTML);
        //             productsArrayForHTML[elemIndexInProductsArrayForHTML].amount += 1
        //         }
        //     })
        // }   else{
            // productsArrayForHTML.push({
            //     amount: elemCounter,
            //     img: productsArray[productIndex].img,
            //     name: productsArray[productIndex].name,
            //     price: productsArray[productIndex].price,
            // })
        // }



        productsArrayForHTML.push({
            amount: elemCounter,
            img: productsArray[productIndex].img,
            name: productsArray[productIndex].name,
            price: productsArray[productIndex].price,
        })


        let dublicates = productsArrayForHTML.filter((elem, index, arr) => arr.findIndex(item => item.name == elem.name) !== index)        
        let originals = productsArrayForHTML.filter((elem, index, arr) => arr.findIndex(item => item.name == elem.name) === index)        

        // console.log(dublicates);
        // console.log(originals);

        originals.forEach((elem1, index1, arr1) => {
            dublicates.forEach((elem2,index2,arr2) => {
                if(elem1.name == elem2.name){
                    elem1.amount += 1
                }
            })
        })





        localStorage.setItem('cartItems', JSON.stringify(originals))


        refreshCartList()
        refreshCartCounter()
        refreshTotalPrice()
        setTimeout(showCartModal, 500)
    
        // if (elemCounter = 0) {
            // $cartList.insertAdjacentHTML('afterbegin', `
            //     <div class="cart-product">
            //         <div>
            //             <p>${elemCounter}</p>
            //             <h1>${productsArray[productIndex].name}</h1>
            //             <h2>${productsArray[productIndex].price}</h2>
            //         </div>
        
            //         <img src="${productsArray[productIndex].img}">
        
            //         <button id="delete-cart-product">
            //             <img src="./img/cross.svg">
            //         </button>
            //     </div>
            // `)
        // }
    })
})



let productsArrayForHTML

function refreshCartList(){
    if (JSON.parse(localStorage.getItem('cartItems')) != undefined) {
        productsArrayForHTML = JSON.parse(localStorage.getItem('cartItems'))
    }   else{
        productsArrayForHTML = []
    }
    
    $cartList.innerHTML = ""
    productsArrayForHTML.forEach(elem => {
        $cartList.insertAdjacentHTML('afterbegin', `
                <div class="cart-item">
                    <div>
                        <div>
                            <p>${elem.amount}X</p>
                            <h1>${elem.name}</h1>
                            <h2>${elem.price}</h2>
                        </div>
                        <img src="${elem.img}">
                    </div>
        
        
                    <button class="delete-cart-item">
                        <img src="./img/cross.svg">
                    </button>
                </div>
            `)
    })

    addEventListenerToCartItems()

    
}

refreshCartList()





function addEventListenerToCartItems() {
    let $cartItem = document.querySelectorAll('.cart-item')
    let $deleteCartItemButton = document.querySelectorAll('.delete-cart-item')

    $cartItem.forEach((elem, index) => {
        elem.addEventListener('click', e => {
            console.log(index);
            if (e.target == $deleteCartItemButton[index] || e.target == $deleteCartItemButton[index].firstElementChild) {
                // console.log("YES1");
                elem.style.transition = "0.5s"
                elem.style.opacity = "0"
                elem.style.transform = "translateX(-150%)"
                // let index = productsArrayForHTML.findIndex(item => item.name == elem.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.textContent)
                // console.log(productsArrayForHTML.length);
                deleteCartItem(Math.abs(index - (productsArrayForHTML.length - 1)))
            }
        })

        elem.firstElementChild.style.transition = "0.3s"

        elem.firstElementChild.addEventListener('mouseenter', function(){
            elem.firstElementChild.style.color = 'white'
        })

        elem.firstElementChild.addEventListener('mouseleave', function(){
            elem.firstElementChild.style.color = 'black'
        })
    })

    $deleteCartItemButton.forEach(elem => {
        elem.style.transition = "0.3s"
        elem.addEventListener('mouseenter', function(){
            elem.style.filter = 'brightness(0) invert(1)'
        })

        elem.addEventListener('mouseleave', function(){
            elem.style.filter = 'brightness(0) invert(0)'
        })
    })
}

addEventListenerToCartItems()


function deleteCartItem(index){
    productsArrayForHTML.splice(index, 1)
    localStorage.setItem('cartItems', JSON.stringify(productsArrayForHTML))
    console.log(productsArrayForHTML.length);
    console.log("YES2");
    setTimeout(function(){
        refreshCartList()
        refreshCartCounter()
        refreshTotalPrice()
    }, 500)
}



function refreshCartCounter(){
    counter = 0

    if (productsArrayForHTML.length > 0) {
        productsArrayForHTML.forEach(elem => {
            counter += elem.amount
        })
    }   else{
        counter = 0
    }

    $cartCounter.innerHTML = `(${counter})`
    
    // productIndex = index < 10 ? index : index - 10
    // console.log(productsArray[productIndex].name)

    // $cartList.insertAdjacentHTML('afterbegin', `
    //     <div class="cart-product">
    //         <div>
    //             <h1>${productsArray[productIndex].name}</h1>
    //         </div>

    //         <img src="${productsArray[productIndex].img}">

    //         <img src="./img/cross.svg">
    //     </div>
    // `)
}

refreshCartCounter()


//// Модальное окно корзины / Cart modal window

let $closeCartButton = document.querySelector("#close-cart-modal-button")
let $cartButton = document.querySelector(".cart-button")
let $cartModal = document.querySelector(".cart-modal")

$cartButton.addEventListener('click', showCartModal)

function showCartModal() {
    $cartModal.style.transform = 'translate(0%)'
    $body.style.overflowY = 'hidden'
}

$closeCartButton.addEventListener('click', hideCartModal)
$cartModal.addEventListener('mouseleave', hideCartModal)

function hideCartModal() {
    $cartModal.style.transform = 'translate(100%)'
    $body.style.overflowY = 'auto'
}










let $totalPrice = document.querySelector('#total-price')

function refreshTotalPrice() {
    let num = 0

    productsArrayForHTML.forEach(elem => {
        num += elem.price*elem.amount
    })

    $totalPrice.innerHTML = num.toFixed(2)
}

refreshTotalPrice()





























//// HOVER ЭФФЕКТЫ / HOVER EFFECTS
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



let $headerLinks = document.querySelectorAll('.header-link')

$headerLinks.forEach(elem => {
    elem.addEventListener('mouseover', function(){
        console.log("YES");
        elem.lastElementChild.style.width = "100%"
        elem.lastElementChild.style.alignSelf = "flex-start"
        // console.log(el.firstChild);
    })
    elem.addEventListener('mouseout', function(){
        elem.lastElementChild.style.width = "0"
        elem.lastElementChild.style.alignSelf = "flex-end"
    })
})


let $carouselCards = document.querySelectorAll('.carousel .card')
let $backgroundCircle = document.querySelectorAll('.background-circle')

$carouselCards.forEach((elem, index) => {
    elem.addEventListener('mouseenter', function(){
        $backgroundCircle[index].lastElementChild.style.opacity = '1'
        $buyBtn[index].firstElementChild.style.WebkitAnimationName = 'running-string'
    })
    
    elem.addEventListener('mouseleave', function(){
        $backgroundCircle[index].lastElementChild.style.opacity = '0'
        $buyBtn[index].firstElementChild.style.WebkitAnimationName = 'none'
    })
})


