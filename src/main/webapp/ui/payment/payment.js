$(document).ready(function () {
	$("#header").load("../header/header.html");
	$("#footer").load("../footer/footer.html");

    $.getJSON("../../content/products.json", function (data) {
        dataToHtml(data.products);
    }).fail(function () {
        console.error("JSON 파일을 불러오는 데 실패함");
    });
});
        
        /* 체크 박스 부분 */
       /* var allchk = document.getElementById("allchk");
        var productList = document.querySelectorAll(".check");

        allchk.onclick = () => {
        	productList.forEach(item => {
                item.checked = allchk.checked;
            });
        };

        function deleteSelected() {
        	productList.forEach(item => {
                if (item.checked) {
                    item.parentElement.remove(); // 체크된 제품 삭제
                }
            });
        }*/
        
       
        
        /* 수량 조절 */
        function increase(button) {
        	console.log("버튼 눌림");
            const productDiv = button.closest('.product-info'); // 부모 요소 찾기
            if (!productDiv) return; // productDiv가 null인 경우 함수 종료

            const quantitySpan = productDiv.querySelector('.quantity-number');
            
            const priceSpan = document.querySelector('.product-price'); // 외부 가격 요소 찾기
			console.log(quantitySpan);
			console.log(priceSpan);
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
        
        function decrease(button) {
            const productDiv = button.closest('.product-info'); // 부모 요소 찾기
            if (!productDiv) return; // productDiv가 null인 경우 함수 종료

            const quantitySpan = productDiv.querySelector('.quantity-number');
            const priceSpan = document.querySelector('.product-price'); // 외부 가격 요소 찾기

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
            const quantitySpan = productDiv.querySelector('.quantity-number');
            const priceSpan = productDiv.querySelector('.product-price');
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
        
        
		$(document).ready(function(){
		            $('#order-button').on('click',function(){
		             window.location.href = '../order/order.html';
		             }); 
		         });
        

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
		
		
		// 데이터 
		$.ajax({
		    url: '../../content/products.json',
		    method: 'GET',
		    dataType: 'json',
		    success: function (data) {
		        console.log(data);  //데이터 구조 확인하려고 로그 출력함
		        // JSON 데이터 배열을 순회하면서 각 제품의 데이터를 HTML에 삽입
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
		                                <button onclick="decreaseQuantity()">-</button>
		                                <span class="quantity-number" id="quantity-${product.productId}">1</span>
		                                <button onclick="increaseQuantity()">+</button>
		                            </div>

		                            <div class="product-price"><p><strong>${product.price.toLocaleString()}원</strong></p></div>
									
		                            <div class="basket-delete">
		                                <a href="#" class="abutton">
		                                    <img src="../../res/images/X-icon.png" alt="삭제 버튼" class="delete-icon" style="width: 30px; height: 30px;">
		                                </a>
		                            </div>
		                      </div>
		                        </div>
		                   
		                `;
		                // 생성한 HTML을 productList에 추가
		                $('#productList').append(productHtml);
		            });
		        }

		    },
		    error: function (err) {
		        console.error('Error fetching product data:', err);
		    }
		});
		
		
		
        
        /* 쿠폰 적용 */
        /* document.getElementById('apply-coupon').addEventListener('click', function() {
            const couponCode = document.getElementById('coupon-code').value;
            let discount = 0;

            // 예시: 쿠폰 코드에 따라 할인 금액 설정
            if (couponCode === 'DISCOUNT10') {
                discount = 5000; // 5,000원 할인
            } else {
                alert('유효하지 않은 쿠폰 코드입니다.');
                return; // 유효하지 않은 경우 함수를 종료
            }

            // 할인 금액 업데이트
            document.getElementById('discount').innerText = discount + '원';

            // 총 결제 금액 계산
            const totalAmount = 50000; // 총 상품 금액
            const shippingFee = 2500; // 배송비
            const finalTotal = totalAmount + shippingFee - discount;

            document.getElementById('totalPrice-num').innerText = finalTotal + '원';
        }); */