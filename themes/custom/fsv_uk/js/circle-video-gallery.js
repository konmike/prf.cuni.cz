window.addEventListener("load", function () {
  let videos = document.getElementsByClassName("item");
  let gallery = document.getElementById("circle-video-gallery");
  let label = document.getElementById("video-label");
  let headline = document.getElementById("title");
  let last_active = "";
  let circle = document.getElementById("circle");

  circle.classList.remove("shadow");

  gallery.classList.add(`v${videos.length}`);

  for (let video of videos) {
    video.addEventListener("mouseover", function (e) {
      let curr = e.target.closest(".item");
      let d = curr.children[0].innerText;

      circle.classList.add("darker");
      headline.classList.add("move-up");
      last_active = label.innerText;
      label.innerText = d;
      label.classList.add("move-up");
    });
    video.addEventListener("mouseout", function () {
      let activeItem = getActiveItem();
      if (activeItem === "") {
        headline.classList.remove("move-up");
        label.classList.remove("move-up");
        circle.classList.remove("darker");
      }
      label.innerText = last_active;
    });

    video.addEventListener("click", function (e) {
      let curr = e.target.closest(".item");
      let link = e.target.closest(".item").children[1].src;
      let view = document.getElementById("view");
      let iframe = document.getElementById("view").children[0];
      let activeItem = getActiveItem();
      let d = curr.children[0].innerText;

      if (activeItem != "") {
        activeItem.classList.remove("active");
      }

      curr.classList.add("active");
      last_active = d;
      label.innerText = d;
      iframe.setAttribute("src", link);
      view.classList.add("show");
      gallery.classList.add("view-open");
      view.scrollIntoView({ behavior: "smooth" });
    });
  }
});

function getActiveItem() {
  let items = document.getElementsByClassName("item");
  for (let item of items) {
    if (item.classList.contains("active")) return item;
  }
  return "";
}
