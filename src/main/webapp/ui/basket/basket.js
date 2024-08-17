// 헤더, 푸터 파일 로드
$(document).ready(function () {
	$("#header").load("../header/header.html");
	$("#footer").load("../footer/footer.html");

    $.getJSON("../../content/products.json", function (data) {
        dataToHtml(data.products);
    }).fail(function () {
        console.error("JSON 파일을 불러오는 데 실패함");
    });
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

function orderPrice() {
    const checkedBoxes = document.querySelectorAll('.product-checkbox:checked');
    let finalPrice = 0;

    checkedBoxes.forEach(checkedBox => {
        const productElement = checkedBox.closest('.product');
        const priceElement = productElement.querySelector('.product-price');
        const price = parseFloat(priceElement.getAttribute('data-price'));
        const quantity = parseInt(productElement.querySelector('.quantity-number').innerText);
        finalPrice += price * quantity;
    });

    document.querySelector('#sumPrice').innerText = finalPrice.toLocaleString() + '원';
}


/* 총 가격 계산 */
function totalPriceCalculation() {
    const checkedBoxes = document.querySelectorAll('.product-checkbox:checked');
    let finalPrice = 0;

    // 선택된 제품들의 총 가격 계산
    checkedBoxes.forEach(checkedBox => {
        const priceElement = checkedBox.closest('.product').querySelector('.product-price');
        const price = parseFloat(priceElement.getAttribute('data-price'));
        const quantity = parseInt(checkedBox.closest('.product').querySelector('.quantity-number').innerText);
        finalPrice += price * quantity;
    });

    // 배송비와 할인 금액 계산
    const deliveryPrice = parseFloat(document.querySelector('#deliveryPrice').innerText.replace(/[^0-9]/g, '')) || 0;
    const sumPrice = finalPrice + deliveryPrice;

    // 총 결제 금액을 화면에 표시
    document.querySelector('#totalPrice-num').innerText = sumPrice.toLocaleString();
}

/* 수량 조절 */
function changeQuantity(button, action) {
    const productDiv = button.closest('.product'); // 부모 요소 찾기
    if (!productDiv) return; // productDiv가 null인 경우 함수 종료

    const quantitySpan = productDiv.querySelector('.quantity-number');
    const priceSpan = productDiv.querySelector('.product-price'); // 제품 내 가격 요소 찾기
    if (!quantitySpan || !priceSpan) return; // 요소가 없으면 함수 종료

    let quantity = parseInt(quantitySpan.innerText);

    if (action === 'increase') {
        quantity += 1;
    } else if (action === 'decrease') {
        quantity -= 1;
        if (quantity < 1) quantity = 1;
    }
    quantitySpan.innerText = quantity;

    // 가격 업데이트
    const pricePerUnit = parseFloat(priceSpan.getAttribute('data-price'));
    const totalPrice = (pricePerUnit * quantity).toLocaleString() + '원';
    priceSpan.innerHTML = `<strong>${totalPrice}</strong>`; // 가격 업데이트

    // 해당 정보 로컬 스토리지에 저장
    saveToLocalStorage(productDiv);
    orderPrice();
    totalPriceCalculation(); // 총 가격 계산 업데이트
}

function deleteSelected() {
    document.querySelectorAll('.product-checkbox:checked').forEach(checkbox => {
        checkbox.closest('.product').remove();
    });
    totalPriceCalculation();
    orderPrice();
}

/* 로컬 스토리지에 저장하는 함수 */
function saveToLocalStorage(productDiv) {
    const quantitySpan = productDiv.querySelector('.quantity-number');
    const priceSpan = productDiv.querySelector('.product-price');
    const productNameSpan = productDiv.querySelector('.product-name span strong');

    if (!quantitySpan || !priceSpan || !productNameSpan) {
        console.error("로컬 오류");
        return;
    }

    const productName = productNameSpan.innerText.trim(); // 상품명
    const quantity = parseInt(quantitySpan.innerText); // 수량
    const price = priceSpan.getAttribute('data-price'); // 가격 (숫자형)

    const productInfo = {
        name: productName,
        quantity: quantity,
        price: price
    };

    // 로컬 스토리지에 저장
    console.log("로컬저장:", productInfo);
    localStorage.setItem(productName, JSON.stringify(productInfo));
    console.log("저장된 데이터:", localStorage.getItem(productName));
}

/* 체크 박스 전체 선택 */
document.addEventListener('DOMContentLoaded', function() {
    const allchk = document.querySelector('#allchk');
    const productCheckboxes = document.querySelectorAll('.product-checkbox');

    allchk.addEventListener('click', function() {
        const isChecked = allchk.checked;

        productCheckboxes.forEach(checkBox => {
            checkBox.checked = isChecked;
        });
        orderPrice();
        totalPriceCalculation(); // 전체 선택 시 총 가격 계산 업데이트
    });

    productCheckboxes.forEach(chk => {
        chk.addEventListener('click', function() {
            orderPrice();
            totalPriceCalculation(); // 체크 박스 클릭 시 총 가격 계산 업데이트
        });
    });
});

/* 제품 삭제 */
function removeProduct(link) {
    link.closest('.product').remove();
    orderPrice();
    totalPriceCalculation(); // 제품 삭제 후 총 가격 계산 업데이트
}

// 데이터
$.ajax({
    url: '../../content/products.json',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        console.log(data);  // 데이터 구조 확인 로그 출력
        if (Array.isArray(data.products)) {
            data.products.forEach(product => {
                const productHtml = `
                    <div class="product">
                        <div class="product-body">
                            <div class="product-picture">
                                <input type="checkbox" class="product-checkbox">
                                <div class="img"><img src="${product.imageUrls[0]}" alt="${product.productName}" class="picture"></div>
                            </div>
                            <div class="product-label">
                                <div class="product-name"><span><strong>${product.productName}</strong></span></div>
                                <div class="product-description"><span>${product.summaryDescription}</span></div>
                            </div>
                            <div class="product-quantity">
                                <button onclick="changeQuantity(this, 'decrease')">-</button>
                                <span class="quantity-number" id="quantity-${product.productId}">1</span>
                                <button onclick="changeQuantity(this, 'increase')">+</button>
                            </div>
                            <div class="product-price" data-price="${product.price}"><p><strong>${product.price.toLocaleString()}원</strong></p></div>
                            <div class="basket-delete">
                                <a href="#" class="abutton" onclick="removeProduct(this); return false;">
                                    <img src="../../res/images/X-icon.png" alt="삭제 버튼" class="delete-icon" style="width: 30px; height: 30px;">
                                </a>
                            </div>
                        </div>
                    </div>
                `;
                $('#productList').append(productHtml);
            });
        }
    },
    error: function (err) {
        console.error('Error fetching product data:', err);
    }
});
$(document).ready(function(){
   $('#order-button').on('click',function(){
    window.location.href = '../payment/payment.html';
    }); 
});
