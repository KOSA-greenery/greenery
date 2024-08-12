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

function getContent(url) {
    $.ajax({
        url: url + ".html",
        method: "GET",
        dataType: "html",
        success: function (data) {
			$(".mypage-content").append(data);
        },
        error: function (err) {
            console.error("Error fetching product data:", err);
        },
    });
	if (url === "likedProducts") {
		getData();
	}
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
    loadHTML("../header/header.html", "header");
    loadScript("../header/header.js");
    loadHTML("../footer/footer.html", "footer");
	$(".mypage-menu").click(function() {
		$(".mypage-content").empty();
		getContent($(this).data("url"));
	})
});

