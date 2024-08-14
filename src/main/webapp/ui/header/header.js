let textIndex = 0;

function categoryOpen(x) {
    x.classList.toggle("open");
}

function searchTypeText() {
    const placeholderText = "✨딥클렌징으로 모공 속 피지, 싹- 제거!✨";
    if (textIndex < placeholderText.length) {
        $(".header-search-input").attr("placeholder", placeholderText.substring(0, textIndex + 1));
        textIndex++;
        setTimeout(searchTypeText, 100);
    } else {
        // 타이핑이 끝난 후 다시 시작
        setTimeout(function() {
            textIndex = 0;
            $(".header-search-input").attr("placeholder", "");
            searchTypeText();
        }, 3000);
    }
}

$(document).ready(() => {
    searchTypeText();
});

