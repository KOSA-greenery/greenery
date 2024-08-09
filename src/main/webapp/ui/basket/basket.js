// 헤더, 푸터
$(document).ready(function (){
    $("#header").load("/header/header.html", function (){
        console.log("Header loaded successfully.");
    });
    $("#footer").load("/footer/footer.html", function (){
        console.log("Footer loaded successfully.");
    });
});


// 데이터 
$.ajax({
    url: '/content/products.json',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
        console.log(data);  //데이터 구조 확인하려고 로그 출력함
        // JSON 데이터 배열을 순회하면서 각 제품의 데이터를 HTML에 삽입
        if (Array.isArray(data.products)){
            data.products.forEach(product => {
                const productHtml = `
                    <div class="product">

                        <div class="product-body">
                            <input type="checkbox" class="product-checkbox">
                            <div class="img"><img src="${product.imageUrls[0]}" alt="${product.productName}"></div>
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
                                    <img src="/images/X버튼.png" alt="삭제 버튼" class="delete-icon" style="width: 30px; height: 30px;">
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
    error: function(err) {
        console.error('Error fetching product data:', err);
    }
});