function categoryOpen(x) {
    x.classList.toggle("open");
}

let i = 0;
function searchTypeText() {
    const placeholderText = "✨딥클렌징으로 모공 속 피지, 싹- 제거!✨";
    if (i < placeholderText.length) {
        $(".header-search-input").attr("placeholder", placeholderText.substring(0, i + 1));
        i++;
        setTimeout(searchTypeText, 100);
    } else {
        // 타이핑이 끝난 후 다시 시작
        setTimeout(function() {
            i = 0;
            $(".header-search-input").attr("placeholder", "");
            searchTypeText();
        }, 3000);
    }
}

$().ready(() => {
    searchTypeText();
})

