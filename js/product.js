let productSwiper = null;
let engravingSwiper = null;

function initOrDestroySwipers() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1000) {
        if (!productSwiper) {
            productSwiper = new Swiper(".product__slider", {
                loop: true,
                spaceBetween: 10,
                slidesPerView: 1,
                pagination: {
                    el: ".product__slider-pagination",
                    clickable: true,
                },
            });
        }
    } else {
        if (productSwiper) {
            productSwiper.destroy(true, true);
            productSwiper = null;
        }
    }

    if (screenWidth < 1000) {
        if (!engravingSwiper) {
            engravingSwiper = new Swiper(".engraving__slider", {
                loop: true,
                spaceBetween: 10,
                slidesPerView: 1,
                pagination: {
                    el: ".engraving__slider-pagination",
                    clickable: true,
                },
            });
        }
    } else {
        if (engravingSwiper) {
            engravingSwiper.destroy(true, true);
            engravingSwiper = null;
        }
    }
}
window.addEventListener("load", initOrDestroySwipers);
window.addEventListener("resize", initOrDestroySwipers);


const productImages = document.querySelectorAll('.product__slide img');
const slides = Array.from(productImages).map(img => ({
    src: img.src,
    type: 'image',
    caption: img.alt
}));
productImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        Fancybox.show(slides, {
            startIndex: index,
            Thumbs: {
                autoStart: true
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const productFormSelects = document.querySelectorAll('.product__form-select');
    productFormSelects.forEach(select => {
        const title = select.querySelector('.product__form-select--title');
        const content = select.querySelector('.product__form-select--content');
        title.addEventListener('click', (e) => {
            e.stopPropagation();
            productFormSelects.forEach(s => {
                if (s !== select) s.classList.remove('active');
            });
            select.classList.toggle('active');
        });
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
    document.addEventListener('click', () => {
        productFormSelects.forEach(select => {
            select.classList.remove('active');
        });
    });

    const selectTitles = document.querySelectorAll('.product__select-title');
    selectTitles.forEach(title => {
        title.addEventListener('click', () => {
            const parentItem = title.closest('.product__select-item');
            if (parentItem.classList.contains('active')) {
                parentItem.classList.remove('active');
            } else {
                document.querySelectorAll('.product__select-item').forEach(item => {
                    item.classList.remove('active');
                });
                parentItem.classList.add('active');
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const almaPopupButtons = document.querySelectorAll('.almaPopup__btn');
    const almaResultItems = document.querySelectorAll('.almaPopup__result-item');

    almaPopupButtons.forEach(button => {
        button.addEventListener('click', () => {
            almaPopupButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const count = parseInt(button.getAttribute('data-almaPopup-btn'), 10);
            almaResultItems.forEach(item => item.classList.remove('active'));
            almaResultItems.forEach((item, index) => {
                if (index < count) {
                    item.classList.add('active');
                }
            });
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const almaProductBlock = document.querySelector('.product__alma');
    if (almaProductBlock) {
        const almaButtons = almaProductBlock.querySelectorAll('.product__alma-btn');
        const almaDescriptions = almaProductBlock.querySelectorAll('.product__alma-descr');
        const setActiveState = (buttonIndex) => {
            almaButtons.forEach((btn, index) => {
                if (index + 1 === buttonIndex) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            almaDescriptions.forEach((descr, index) => {
                if (index + 1 === buttonIndex) {
                    descr.classList.add('active');
                } else {
                    descr.classList.remove('active');
                }
            });
        };
        almaButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                const buttonIndex = parseInt(button.dataset.almaBtn);
                setActiveState(buttonIndex);
            });

            button.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        });
    }


    const almaPopup = document.querySelector('.almaPopup');
    if (almaPopup) {
        const almaPopupCloseBtn = document.querySelector('.almaPopup__close');
        const almaPopupInner = document.querySelector('.almaPopup__inner');
        almaProductBlock.addEventListener('click', (event) => {
            if (!event.target.closest('.product__alma-btn')) {
                if (almaPopup) {
                    almaPopup.classList.add('active');
                }
            }
        });
        if (almaPopup) {
            almaPopup.addEventListener('click', (event) => {
                if (almaPopupInner && !almaPopupInner.contains(event.target)) {
                    almaPopup.classList.remove('active');
                }
            });
        }

        if (almaPopupCloseBtn) {
            almaPopupCloseBtn.addEventListener('click', () => {
                if (almaPopup) {
                    almaPopup.classList.remove('active');
                }
            });
        }
    }


});