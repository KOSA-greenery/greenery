$(document).ready(function () {
    // 글자 수 업데이트
    $('#reviewTextarea').on('input', function () {
        var currentLength = $(this).val().length;

        // 한글과 영어 구분하여 처리
        var maxLength = 1000;
        if (currentLength > maxLength) {
            $(this).val($(this).val().substring(0, maxLength)); // 최대 길이 초과 시 자르기
            currentLength = maxLength; // 현재 길이 업데이트
        }

        $('#charCount').text(currentLength + " / " + maxLength);
    });
});


$(document).ready(function () {
    $('.star_rating > .star').click(function () {
        $(this).siblings().removeClass('on');       // 모든 형제 요소에서 'on' 클래스 제거
        $(this).addClass('on').prevAll('.star').addClass('on');     // 클릭한 요소 및 이전 요소에 'on' 클래스 추가
    });
});

/* 사진 업로드 */
function previewImage(event) {
    const file = event.target.files[0]; // 선택된 파일
    const imagePreview = document.getElementById('image-preview');

    if (file) {
        const reader = new FileReader(); // 파일 리더
        reader.onload = function (e) {
            // 이미지 미리보기
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="이미지 미리보기" />`;
        };
        reader.readAsDataURL(file); // 파일을 데이터 URL로 읽기
    } else {
        // 파일이 없을 경우 기본 상태로 복원
        imagePreview.innerHTML = `<span>+</span>`;
    }
}