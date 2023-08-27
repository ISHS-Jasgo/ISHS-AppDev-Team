const askButton = document.querySelector(".ask-btn");
const answerButton = document.querySelector(".answer-btn");
const askDiv = document.querySelector(".ask-div");
const answerDiv = document.querySelector(".answer-div");

askButton.addEventListener("click", () => {
    askButton.classList.add("active");
    answerButton.classList.remove("active");
    askDiv.classList.add("active");
    answerDiv.classList.remove("active");
    postDetail.classList.remove("active");
})
answerButton.addEventListener("click", () => {
    askButton.classList.remove("active");
    answerButton.classList.add("active");
    askDiv.classList.remove("active");
    answerDiv.classList.add("active");
    postDetail.classList.remove("active");
})


const title = document.querySelectorAll(".post");
const postDetail = document.querySelector(".post-detail");

for (let i = 0; i < title.length; i++) {
    title[i].addEventListener("click", () => {
        askDiv.classList.remove("active");
        answerDiv.classList.remove("active");
        postDetail.classList.add("active");
    })
}


const askRegistBtn = document.querySelector(".ask-regist-btn");
const answerListBtn = document.querySelector(".answer-list-btn");
const answerRegistBtn = document.querySelector(".answer-regist-btn");

askRegistBtn.addEventListener("click", () => {
    alert("현재는 이용하실수 없습니다");
})
answerListBtn.addEventListener("click", () => {
    askDiv.classList.remove("active");
    answerDiv.classList.add("active");
    postDetail.classList.remove("active");
})
answerRegistBtn.addEventListener("click", () => {
    alert("현재는 이용하실수 없습니다");
})