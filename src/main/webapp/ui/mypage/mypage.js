function getContent(url) {
    $.ajax({
        url: url + ".html",
        method: "GET",
        dataType: "html",
        success: function (data) {
			$(".mypage-content").append(data);
			if (url === "likedProducts") {
				getData();
			}
        },
        error: function (err) {
            console.error("Error fetching product data:", err);
        },
    });
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
                        <span class="icon like-icon active">
                            <img src="../../res/images/fill_heart.png" alt="찜하기 아이콘">
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

function getData() {
    $.ajax({
        url: "../../content/products.json",
        method: "GET",
        dataType: "json",
        success: function (data) {
            dataToHtml(data.products);
        },
        error: function (err) {
            console.error("Error fetching product data:", err);
        },
    });
}


$(document).ready(function () {
    $("#header").load("../header/header.html");
    $("#footer").load("../footer/footer.html");
    $.getScript("../header/header.js");
	getContent("likedProducts");
	$(".mypage-menu").click(function() {
		$(".mypage-content").empty();
		getContent($(this).data("url"));
	})
    // 동적으로 생성된 like 아이콘에 대한 이벤트 처리
    $(document).on('click', '.icon.like-icon', function() {
        $(this).toggleClass("active");
        let heartIcon = $(this).find("img");
        if ($(this).hasClass("active")) {
            heartIcon.attr("src", "../../res/images/fill_heart.png");
        } else {
            heartIcon.attr("src", "../../res/images/heart.png")
        }
    });
});

