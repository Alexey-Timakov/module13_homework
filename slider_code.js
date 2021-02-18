let images = [{
    url: "https://s.auto.drom.ru/i24241/c/photos/fullsize/uaz/buhanka/uaz_buhanka_936466.jpg",
    title: "Бухантер. Ткани"
}, {
    url: "https://s.auto.drom.ru/i24241/c/photos/fullsize/uaz/buhanka/uaz_buhanka_936472.jpg",
    title: "Бухантер. Книга - лучший подарок"
}, {
    url: "https://s.auto.drom.ru/i24241/c/photos/fullsize/uaz/buhanka/uaz_buhanka_936465.jpg",
    title: "Бухантер. Доставка багажа"
}, {
    url: "https://s.auto.drom.ru/i24241/c/photos/fullsize/uaz/buhanka/uaz_buhanka_936467.jpg",
    title: "Бухантер. Промтовары"
}, {
    url: "https://s.auto.drom.ru/i24241/c/photos/fullsize/uaz/buhanka/uaz_buhanka_936473.jpg",
    title: "Бухантер. Санитарный автомобиль"
}];

function initSlider(options) {

    if (!images || !images.length) return;

    let sliderImages = document.querySelector(".slider__images");
    let sliderArrows = document.querySelector(".slider__arrows");
    let sliderDots = document.querySelector(".slider__dots");

    options = options || {
    dots: true,
    titles: false,
    cropTitlesLenght: 50,
    autoplay: false,
    autoplayInterval: 1000    
    }

    initImages();
    initArrows();

    if (options["dots"]) {
        initDots();
    }
    if (options["titles"]) {
        initTitles();
    }
    if (options.autoplay) {
        initAutoPlay();
    }

    function initImages() {
        images.forEach(function(item, index) {
            let imageDiv = `<div class="image n${index} ${index == 0 ? "active":""}"
            style="background-image: url(${images[index].url})"
            data-index="${index}"></div>`;
            sliderImages.innerHTML += imageDiv;
        })
    }
    
    function initArrows() {
        let arrows = sliderArrows.querySelectorAll(".slider__arrow");
        arrows.forEach(function(item) {
            item.addEventListener("click", function() {
                let curNumber = +sliderImages.querySelector(".active").dataset.index;
                let nextNumber;
                if (item.classList.contains("left")) {
                    nextNumber = (curNumber === 0) ? images.length - 1 : curNumber - 1;
                } else {
                    nextNumber = (curNumber === images.length - 1) ? 0 : curNumber + 1;
                }
                moveSlider(nextNumber);
                changeTitle(nextNumber);
            })
        })
    }

    function initDots() {
        images.forEach(function (item, index) {
            let dot = `<div class="slider__dots-item n${index} ${index == 0 ? "active":""}"
            data-index="${index}"></div>`;
            sliderDots.innerHTML += dot;
        })
    }

    function initTitles() {
        let titleText;
        if (images[0].title) {
            titleText = cropTitle(images[0].title, options.cropTitlesLenght) + "...";
        } else {
            titleText = "Без названия";
        }
        let titleDiv = `<div class="slider__images-title">${titleText}</div>`;
        sliderImages.innerHTML += titleDiv;
    }

    function changeTitle(number) {
        let sliderTitle = sliderImages.querySelector(".slider__images-title");
        if (!images[number].title) {
            sliderTitle.innerHTML = "Без названия";
        } else {
            sliderTitle.innerHTML = cropTitle(images[number].title, options.cropTitlesLenght);
        }
    }
    
    function cropTitle(title, length) {
        if (title.length <= length) {
            return title;
        } else {
            return title.substring(0, length + 1) + "...";
        }
    }

    function moveSlider(number) {
        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(".n" + number).classList.add("active");

        sliderDots.querySelector(".active").classList.remove("active");
        sliderDots.querySelector(".n" + number).classList.add("active");
    }

    function initAutoPlay () {
        setInterval(function() {
            let curNumber = +sliderImages.querySelector(".active").dataset.index;
            let nextNumber = (curNumber === images.length - 1) ? 0 : curNumber + 1;
            moveSlider (nextNumber);
        }, options.autoplayInterval)
    }
}

let options = {
    dots: true,
    titles: true,
    cropTitlesLenght: 25,
    autoplay: true,
    autoplayInterval: 2000
}

document.addEventListener("DOMContentLoaded", function () {
    initSlider(options)
});