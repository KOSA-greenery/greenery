let slideIndex = 1;
let products = [];

function loadScript(url) {
    const script = document.createElement("script");
    script.src = url;
    script.type = "text/javascript";
    document.head.appendChild(script);
}

function loadHTML(file, elementId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error(error));
}

function autoSlides() {
    showSlides(slideIndex);

    // 자동 슬라이드
    setInterval(() => {
        plusSlides(1);
    }, 7000); // 7초마다 슬라이드 변경
}

function plusSlides(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    let slides = document.getElementsByClassName("banner_slides");
    let dots = document.getElementsByClassName("banner-indicator-btn");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    Array.from(slides).forEach(slide => (slide.style.display = "none"));
    Array.from(dots).forEach(dot => dot.classList.remove("active"));
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function clickCategoryBtn(target) {
    let categoryBtns = $(".toolbar-category").children("button");
    Array.from(categoryBtns).forEach(categoryBtn =>
        categoryBtn.classList.remove("active-category")
    );
    target.addClass("active-category");
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

// 로컬 스토리지에 현재 시간 + 1일을 ms 단위로 저장
function setTime(name, exp) {
    let date = new Date();
    date = date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000); // 일 단위를 ms 단위로 변환하여 더하기
    localStorage.setItem(name, date);
    $(".modal-container").css("display", "none");
}

// 하루를 넘겼는지 여부 확인
function isOverExp(name) {
    const status = parseInt(localStorage.getItem(name)) > new Date().getTime();
    const modal = $(".modal-container");
    if (!status) {
        localStorage.removeItem(name);
        modal.css("display", "block"); // 하루가 지난 상태 => 보임
    }
}

function showAlertCoupon() {
    $(".modal-container").hide();
    $(".alert-coupon").addClass("show");
    setTimeout(() => {
        $(".alert-coupon").removeClass("show");
    }, 2000);
}

function dataToHtml(products) {
    if (Array.isArray(products)) {
        products.forEach(product => {
            const productHtml = `
            <div class="product-item">
                <div class="product-image-container">
                    <img src="${product.imageUrls[0]}" alt="${
                product.productName
            }" class="product-image">
                    <div class="product-icons">
                        <span class="icon like-icon">
                            <img src="../../res/images/heart.png" alt="찜하기 아이콘">
                        </span>
                        <span class="icon cart-icon">
                            <img src="../../res/images/cart_icon2.png" alt="장바구니 아이콘">
                        </span>
                        <span class="icon buy-icon">
                            <img src="../../res/images/dollar.png" alt="구매하기 아이콘">
                        </span>
                    </div>
                </div>
                <div class="product-details">
                    <p class="product-name">${product.productName}</p>
                    <p class="product-description">${
                        product.mainDescription
                    }</p>
                    <p class="product-price"><span class="price-amount">${product.price.toLocaleString()}</span>원</p>
                </div>
            </div>`;

            // 생성한 HTML을 product-container에 추가
            $(".product-container").append(productHtml);
        });
    }
}

function sortProducts(products, sortOption) {
    switch (sortOption) {
        case "price-asc":
            return products.slice().sort((a, b) => a.price - b.price);
        case "price-desc":
            return products.slice().sort((a, b) => b.price - a.price);
        default:
            return products;
    }
}

function filteredProducts(category) {
    const sortOption = $(".toolbar-sort-select").val();
    let categoryProducts = products;

    if (category) {
        categoryProducts = products.filter(
            product => product.category === category
        );
    }

    $(".product-container").empty();
    dataToHtml(sortProducts(categoryProducts, sortOption));
}

function getData() {
    $.ajax({
        url: "../../content/products.json",
        method: "GET",
        dataType: "json",
        success: function (data) {
            products = data.products;
            filteredProducts();
        },
        error: function (err) {
            console.error("Error fetching product data:", err);
        },
    });
}

$(document).ready(function () {
    loadHTML("../Header/header.html", "header");
    loadScript("../header/header.js");
    loadHTML("../Footer/footer.html", "footer");
    autoSlides();
    getData(); // 초기 데이터 로드 (전체)
    scrollToTop();
    isOverExp("TodayCloseTime");
    $(".close").click(() => {
        $(".modal-container").hide();
    });
    $(".today-close").click(() => {
        setTime("TodayCloseTime", 1);
    });
    $(".modal-image").click(() => {
        showAlertCoupon();
    });
    $(".toolbar-category-btn").click(function () {
        clickCategoryBtn($(this));
        $(".toolbar-sort-select").val("default"); // 카테고리 변경시 정렬 옵션 기본으로 되돌아가기
        filteredProducts($(this).data("category"));
    });
    $(".toolbar-sort-select").change(function () {
        filteredProducts(
            $(".toolbar-category .active-category").data("category")
        );
    });
});
