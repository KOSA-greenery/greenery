let textIndex = 0;

function categoryOpen(x) {
    x.classList.toggle("open");
}

function searchTypeText() {
    const placeholderText = "✨딥클렌징으로 모공 속 피지, 싹- 제거!✨";
    if (textIndex < placeholderText.length) {
        $(".header-search-input").attr(
            "placeholder",
            placeholderText.substring(0, textIndex + 1)
        );
        textIndex++;
        setTimeout(searchTypeText, 100);
    } else {
        // 타이핑이 끝난 후 다시 시작
        setTimeout(function () {
            textIndex = 0;
            $(".header-search-input").attr("placeholder", "");
            searchTypeText();
        }, 3000);
    }
}

function toSearchPage() {
    const searchQuery = $(".header-search-input").val().trim();
    if (searchQuery) {
        // 검색 페이지 이동시 검색어를 파라미터로 전달
        window.location.href = `../search/search.html?query=${encodeURIComponent(
            searchQuery
        )}`;
    }
}

$(document).ready(() => {
    searchTypeText();
    $(".header-search-icon").on("click", toSearchPage);
    $(".header-search-input").on("keyup", function (e) {
        if (e.key === "Enter") {
            toSearchPage();
        }
    });
});
