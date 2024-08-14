document.addEventListener('DOMContentLoaded', () => {
    $("#header").load("../header/header.html");
    $("#footer").load("../footer/footer.html");
});

// 찜 추가
const wishlistButton = document.querySelector('.wishlist-button');

wishlistButton.addEventListener('click', function() {
    const productDiv = this.closest('.product-info');
    const productNameSpan = document.querySelector('.product-title');
    
    if (!productNameSpan) return;
    const productName = productNameSpan.innerText.trim();
    
    this.classList.toggle('active'); // active 클래스를 토글
    
    // 추가 기능: 위시리스트에 아이템 추가/제거 로직 구현 가능
    if (this.classList.contains('active')) {
        console.log("아이템이 위시리스트에 추가되었습니다.");
        saveToWishlist(productName);
    } else {
        console.log("아이템이 위시리스트에서 제거되었습니다.");
        removeFromWishlist(productName);
    }
});

function saveToWishlist(productName) {
    let wishlist = JSON.parse(localStorage.getItem('whislist')) || [];
    if (!wishlist.includes(productName)) {
        wishlist.push(productName);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    console.log(`위시리스트에 저장된 아이템: ${wishlist.join(', ')}`);
}

function removeFromWishlist(productName) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(item => item !== productName);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    console.log(`위시리스트에서 제거된 아이템: ${productName}`);
}

/* 이미지 스크롤 */
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    /* let captionText = document.getElementById("caption"); */
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    captionText.innerHTML = dots[slideIndex-1].alt;
}


//클릭시 상세페이지, 리뷰로 이동
    document.addEventListener("DOMContentLodaded", function() {
        document.getElementById("detailTab").click();            
    });

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i=0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    
    tabcontent = document.getElementsByClassName("tablinks");
    for (i=0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}	        	
    
    document.getElementById('reviewTab').addEventListener('click', function() {
        window.location.href = '../review/review.html';
    });



// 동적으로 이미지 크기 맞추기
const leftImage = document.querySelector('.slideshow-container');

function adjustImageSize() {
    const containerHeight = document.querySelector('.left').offsetHeight;
    leftImage.style.height = `${containerHeight}px`;
}

window.addEventListener('resize', adjustImageSize);
adjustImageSize(); // 초기 실행




            
/* 수량 조절 */
function increase(button) {
    const productDiv = button.closest('.product-info'); // 부모 요소 찾기
    if (!productDiv) return; // productDiv가 null인 경우 함수 종료

    const quantitySpan = productDiv.querySelector('.quantity-number');
    const priceSpan = productDiv.querySelector('.product-price');

    if (!quantitySpan || !priceSpan) return; // 요소가 없으면 함수 종료

    let quantity = parseInt(quantitySpan.innerText);
    quantity += 1;
    quantitySpan.innerText = quantity;

    /* 가격 업데이트 */ 
    const pricePerUnit = parseFloat(priceSpan.getAttribute('data-price'));
    const totalPrice = (pricePerUnit * quantity).toLocaleString() + '원';
    priceSpan.innerText = totalPrice; // 가격 업데이트

    // 해당 정보 로컬 스토리지에 저장
    saveToLocalStorage(productDiv);
    console.log("수량 증가");
}


// 마이페이지에서 위시리스트 불러오기
/*  function loadWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistContainer = document.querySelector('.wishlist-container');
    
    wishlist.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = item;
        wishlistContainer.appendChild(itemElement);
    });
} // 마이페이지 로드 시 호출
document.addEventListener('DOMContentLoaded', loadWishlist); */




function decrease(button) {
    const productDiv = button.closest('.product-info'); // 부모 요소 찾기
    if (!productDiv) return; // productDiv가 null인 경우 함수 종료

    const quantitySpan = productDiv.querySelector('.quantity-number');
    const priceSpan = productDiv.querySelector('.product-price');

    if (!quantitySpan || !priceSpan) return; // 요소가 없으면 함수 종료

    let quantity = parseInt(quantitySpan.innerText);
    quantity -= 1;
    if (quantity < 1) {
        quantity = 1;
    }
    quantitySpan.innerText = quantity;

    /* 가격 업데이트 */ 
    const pricePerUnit = parseFloat(priceSpan.getAttribute('data-price'));
    const totalPrice = (pricePerUnit * quantity).toLocaleString() + '원';
    priceSpan.innerText = totalPrice; // 가격 업데이트

    // 해당 정보 로컬 스토리지에 저장
    saveToLocalStorage(productDiv);
}

// 로컬 스토리지에 저장하는 함수
function saveToLocalStorage(productDiv) {
    const quantitySpan = document.querySelector('.quantity-number');
    const priceSpan = document.querySelector('.product-price');
    const productNameSpan = document.querySelector('.product-title');

    if (!quantitySpan || !priceSpan || !productNameSpan) return; // 요소가 없으면 함수 종료

    const productName = productNameSpan.innerText.trim(); // 상품명
    const quantity = parseInt(quantitySpan.innerText); // 수량
    const price = priceSpan.getAttribute('data-price'); // 가격 (숫자형)

    const productInfo = {
        name: productName,
        quantity: quantity,
        price: price
    };

    // 로컬 스토리지에 저장
    localStorage.setItem(productName, JSON.stringify(productInfo));

    console.log(`저장된 상품: ${productName}, 수량: ${quantity}, 가격: ${price}`);
}

// 결제 페이지로 이동 시 호출되는 함수
function checkout() {
    const cartItems = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const item = JSON.parse(localStorage.getItem(key));
        cartItems.push(item);
    }

    /* document.getElementById('add-to-cart').addEventListener('click', function() {
        window.location.href = '../payment/payment.html'; */
        sessionStorage.setItem('checkout', JSON.stringify(checkout));
    window.location.href = '../payment/payment.html'; // 결제 페이지로 이동 
}
    
    
function cart() {
    const cartItems = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const item = JSON.parse(localStorage.getItem(key));
        cartItems.push(item);
    }

sessionStorage.setItem('add-to-cart', JSON.stringify(cart));
window.location.href = '../basket/basket.html'; // 장바구니 페이지로 이동 
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}


