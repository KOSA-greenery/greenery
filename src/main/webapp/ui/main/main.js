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

let slideIndex = 1;

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
    Array.from(categoryBtns).forEach(categoryBtn => categoryBtn.classList.remove("active-category"));
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
    localStorage.setItem(name, date)
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
    $(".alert-coupon").addClass('show');
    setTimeout(() => {
        $(".alert-coupon").removeClass('show')
    }, 2000)
}

document.addEventListener("DOMContentLoaded", () => {
    loadHTML("../Header/header.html", "header");
    loadScript("../header/header.js");
    loadHTML("../Footer/footer.html", "footer");
    autoSlides();
    scrollToTop();
    isOverExp("TodayCloseTime");
    $(".close").click(() => {$(".modal-container").hide()});
    $(".today-close").click(() => {setTime("TodayCloseTime", 1)}); 
    $(".modal-image").click(() => {showAlertCoupon()});
    $(".toolbar-category-btn").click(function() {clickCategoryBtn($(this))});
});