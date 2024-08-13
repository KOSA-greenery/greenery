
let inputId = document.querySelector('#inputId');
inputId.addEventListener('input', inputIdCheck);

function inputIdCheck() {
    let inputIdMessage = document.querySelector('#inputIdMessage');

    let regExp = RegExp(/^[A-Za-z\d@$!%*?&]{1,16}$/);
    if (regExp.test(inputId.value) || inputId.value === '') {
        inputIdMessage.innerHTML =  ''; 
    } else {
        inputIdMessage.innerHTML = 
        "<span style='color:#F03F40; font-size:12px;'>아이디를 16자 이하로 입력해주세요</span>";
    }
}

let inputPassword1 = document.querySelector('#inputPassword1');
inputPassword1.addEventListener('input', inputPasswordCheck);

function inputPasswordCheck() {
    let inputPasswordMessage1 = document.querySelector('#inputPasswordMessage1');

    let regExp = RegExp(/^[\s\S]{1,20}$/);
    if (regExp.test(inputPassword1.value) || inputPassword1.value === '') {
        inputPasswordMessage1.innerHTML =  ''; 
    } else {
        inputPasswordMessage1.innerHTML = 
        "<span style='color:#F03F40; font-size:12px;'>비밀번호를 20자 이하로 입력해주세요</span>";
    }
}

document.querySelector('#boxSignup').addEventListener('click', function() {
    window.location.href = '../signup/signup.html'; // 이동할 URL을 입력하세요
});

