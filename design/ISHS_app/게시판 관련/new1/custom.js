const postInner = document.querySelectorAll('.post-inner');
const title = document.querySelectorAll('.title');
const hot = document.querySelectorAll(".hot");


let arr = Array.from({length:title.length}, ()=>0);

for (let i = 0; i < title.length; i++) {
    title[i].addEventListener("click", () => {
        if (arr[i] === 0) {
            postInner[i].setAttribute("id", "hot-post");
            arr[i]++;
        }
        else if (arr[i] === 1) {
            postInner[i].setAttribute("id", "post");
            arr[i]--;
        }
    })
}




const freedom = document.querySelector(".freedom");
const quastion = document.querySelector(".quastion");
const freedomPosts = document.querySelector(".freedom-posts");
const quastionPosts = document.querySelector(".quastion-posts");

freedom.addEventListener("click", () => {
    freedom.setAttribute("id", "w-active");
    quastion.setAttribute("id", "w-inactive");
    freedomPosts.style.cssText = "display: block";
    quastionPosts.style.cssText = "display: none";
})
quastion.addEventListener("click", () => {
    freedom.setAttribute("id", "w-inactive");
    quastion.setAttribute("id", "w-active");
    freedomPosts.style.cssText = "display: none";
    quastionPosts.style.cssText = "display: block";
})
