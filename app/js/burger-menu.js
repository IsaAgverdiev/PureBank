let burgerMenuBtn = document.querySelector(".btn-burger");
let body = document.body;

burgerMenuBtn.addEventListener("mousedown", showRightMenu);

if (document.documentElement.clientWidth > 767) {
  // enableScroll();
}

function showRightMenu() {
  const headerMenu = document.querySelector(".header__menu");
  const headerList = document.querySelector(".header__list");
  const headerBtn = document.querySelector(".header__btn");
  // disableScroll();
  burgerMenuBtn.classList.toggle("btn-burger--close");
  if (burgerMenuBtn.classList.contains("btn-burger--close")) {
    headerMenu.classList.add("active");
    headerList.classList.add("active");
    headerBtn.classList.add("active");
  } else {
    headerMenu.classList.remove("active");
    headerList.classList.remove("active");
    headerBtn.classList.remove("active");
  }
  // overlayMenu.classList.toggle("hidden");
  // if (overlayMenu.classList.contains("hidden")) {
  //   enableScroll();
  // }
}

// function disableScroll() {
//   let paddingOffset = window.innerWidth - document.body.offsetWidth + "px";
//   console.log(document.body.offsetWidth);

//   let pagePosition = window.scrollY;
//   fixBlocks.forEach((el) => {
//     el.style.paddingRight = paddingOffset;
//   });
//   body.style.paddingRight = paddingOffset;
//   body.classList.add("disable-scroll");
//   body.dataset.position = pagePosition;
//   body.style.top = -pagePosition + "px";
// }

// function enableScroll() {
//   let pagePosition = parseInt(document.body.dataset.position, 10);
//   body.style.top = "auto";
//   body.classList.remove("disable-scroll");
//   fixBlocks.forEach((el) => {
//     el.style.paddingRight = "0px";
//   });
//   body.style.paddingRight = "0px";
//   window.scroll({ top: pagePosition, left: 0 });
//   body.removeAttribute("data-position");
// }
