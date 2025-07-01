document.addEventListener("DOMContentLoaded", function() {
    if (typeof Swiper !== "undefined") {
        let swiper = new Swiper(".imagesBlock__slider", {
            loop: false,
            spaceBetween: 16,
            slidesPerView: 1.4,
            pagination: {
                el: ".imagesBlock__slider-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".imagesBlock__slider-next",
                prevEl: ".imagesBlock__slider-prev",
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                },
            },
        });

        const selectionSections = document.querySelectorAll('.selection');

        selectionSections.forEach(section => {
            const slider = section.querySelector('.selection__slider');
            if (!slider) return;

            let swiper = null;

            function initSwiper() {
                let defaultSlides = 4;

                if (window.innerWidth < 1280) {
                    defaultSlides = 3;
                }
                if (section.classList.contains('selection-two')) {
                    defaultSlides = 2;
                } else if (section.classList.contains('selection-three')) {
                    if (window.innerWidth < 768) {
                        defaultSlides = 2;
                    } else {
                        defaultSlides = 3;
                    }
                }

                swiper = new Swiper(slider, {
                    loop: true,
                    spaceBetween: 8,
                    slidesPerView: 2,
                    nested: true,
                    pagination: {
                        el: section.querySelector('.selection__slider-pagination'),
                        clickable: true,
                    },
                    navigation: {
                        nextEl: section.querySelector('.selection__slider-next'),
                        prevEl: section.querySelector('.selection__slider-prev'),
                    },
                    breakpoints: {
                        1000: {
                            spaceBetween: 20,
                            slidesPerView: defaultSlides,
                        },
                        1280: {
                            spaceBetween: 28,
                            slidesPerView: defaultSlides,
                        },
                    },
                });
            }
            initSwiper();
            window.addEventListener('resize', () => {
                if (swiper) {
                    swiper.destroy(true, true);
                }
                initSwiper();
            });
        });



        document.querySelectorAll('.product__item-slider').forEach((sliderEl) => {
            const isInsideSelectionSlider = sliderEl.closest('.selection-slider');
            const swiperConfig = {
                loop: true,
                nested: true,
                slidesPerView: 1,
                pagination: {
                    el: sliderEl.closest('.product__item-slider-content').querySelector('.product__item-slider--pagination'),
                    clickable: true,
                },
            };
            if (isInsideSelectionSlider) {
                swiperConfig.autoplay = {
                    delay: 1500,
                    disableOnInteraction: false,
                };
            }
            const nestedSwiper = new Swiper(sliderEl, swiperConfig);
            if (isInsideSelectionSlider) {
                nestedSwiper.autoplay.stop();
                const parentSlide = sliderEl.closest('.selection__slide');
                if (parentSlide) {
                    parentSlide.addEventListener('mouseenter', () => {
                        nestedSwiper.autoplay.start();
                    });
                    parentSlide.addEventListener('mouseleave', () => {
                        nestedSwiper.autoplay.stop();
                    });
                }
            }
        });

        const newsSwiper = new Swiper('.news__slider', {
            loop: false,
            spaceBetween: 15,
            slidesPerView: 1.1,
            centeredSlides: true,
            breakpoints: {
                768: {
                    centeredSlides: false,
                    spaceBetween: 15,
                    slidesPerView: 3,
                },
                1000: {
                    centeredSlides: false,
                    spaceBetween: 40,
                    slidesPerView: 3,
                },
            },
        });



    }
});

function toggleHeaderClass() {
    const header = document.querySelector('.header');
    const scrollTrigger = window.innerWidth < 1000 ? 69 : 88;

    if (window.scrollY >= scrollTrigger) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
}

toggleHeaderClass();
window.addEventListener('resize', toggleHeaderClass);
window.addEventListener('scroll', toggleHeaderClass);

resizeHeight()

function resizeHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', () => {
    resizeHeight()
});

const header = document.querySelector('.header');
const searchBtn = document.querySelector('.header__search');
const searchClose = document.querySelector('.header__search-close');
const searchForm = document.querySelector('.header__search-form');
const searchFormInner = document.querySelector('.header__search-form--inner');
const searchInput = document.querySelector('.header__search-input');
const searchReset = document.querySelector('.header__search-reset');
searchBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    header.classList.add('header-search-open');
});
searchClose.addEventListener('click', () => {
    header.classList.remove('header-search-open');
});
document.addEventListener('click', (e) => {
    if (
        header.classList.contains('header-search-open') &&
        !searchFormInner.contains(e.target) &&
        !searchBtn.contains(e.target)
    ) {
        header.classList.remove('header-search-open');
    }
});
searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() !== '') {
        searchReset.classList.add('active');
    } else {
        searchReset.classList.remove('active');
    }
});
searchForm.addEventListener('reset', () => {
    setTimeout(() => {
        searchReset.classList.remove('active');
    }, 0);
});



function moveSearchForm() {
    const searchForm = document.querySelector('.header__search-form--inner');
    const usersBlock = document.querySelector('.header__users');
    const header = document.querySelector('.header');
    const bottomContainer = document.querySelector('.header__bottom .container');
    const headerInner = document.querySelector('.header__inner');
    if (!searchForm || !usersBlock || !header || !bottomContainer || !headerInner) return;
    const isSearchMoved = searchForm.dataset.moved === 'true';
    const isUsersMoved = usersBlock.dataset.moved === 'true';
    if (window.innerWidth < 768 && !isSearchMoved) {
        bottomContainer.appendChild(searchForm);
        searchForm.dataset.moved = 'true';
    } else if (window.innerWidth >= 768 && isSearchMoved) {
        header.appendChild(searchForm);
        searchForm.dataset.moved = 'false';
    }
    if (window.innerWidth < 768 && !isUsersMoved) {
        bottomContainer.appendChild(usersBlock);
        usersBlock.dataset.moved = 'true';
    } else if (window.innerWidth >= 768 && isUsersMoved) {
        headerInner.appendChild(usersBlock);
        usersBlock.dataset.moved = 'false';
    }
}

moveSearchForm();
window.addEventListener('resize', moveSearchForm);


document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.header__menu-link > a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth < 768) {
                e.preventDefault();
                const parent = this.closest('.header__menu-link');

                document.querySelectorAll('.header__menu-link.active').forEach(item => {
                    if (item !== parent) item.classList.remove('active');
                });

                parent.classList.toggle('active');
            }
        });
    });
    const backButtons = document.querySelectorAll('.header__menu-box--back');
    backButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (window.innerWidth < 768) {
                e.preventDefault();
                const parent = this.closest('.header__menu-link');
                if (parent) {
                    parent.classList.remove('active');
                    parent.querySelectorAll('.header__menu-block.active').forEach(block => {
                        block.classList.remove('active');
                    });
                }
            }
        });
    });
    const titles = document.querySelectorAll('.header__menu-title');
    titles.forEach(title => {
        title.addEventListener('click', function(e) {
            if (window.innerWidth < 768) {
                e.preventDefault();

                const block = this.closest('.header__menu-block');
                if (!block) return;

                const menuLink = this.closest('.header__menu-link');
                if (!menuLink) return;

                menuLink.querySelectorAll('.header__menu-block.active').forEach(other => {
                    if (other !== block) other.classList.remove('active');
                });

                block.classList.toggle('active');
            }
        });
    });
});




document.querySelectorAll('.header__menu-box--back').forEach(backBtn => {
    backBtn.addEventListener('click', function(e) {
        const parent = this.closest('.header__menu-link');
        if (parent) {
            parent.classList.remove('active');
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.querySelector('.header__btn');
    const closeBtn = document.querySelector('.header__bottom-close');
    const bottomBlock = document.querySelector('.header__bottom');
    if (openBtn && bottomBlock) {
        openBtn.addEventListener('click', function(e) {
            e.preventDefault();
            bottomBlock.classList.add('active');
        });
    }
    if (closeBtn && bottomBlock) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            bottomBlock.classList.remove('active');
        });
    }
});


resizeHeight()

function resizeHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', resizeHeight);


if (typeof gsap !== "undefined" && gsap && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    const imagesBlockItems = document.querySelectorAll(".imagesBlock__item");
    if (imagesBlockItems.length) {
        imagesBlockItems.forEach((item) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    toggleActions: "play reverse play reverse",
                },
                y: 50,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    }
    const animateItems = document.querySelectorAll(".animate-item");
    animateItems.forEach((item) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play reverse play reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        });
    });
    const infoBlock = document.querySelector(".infoBlock__content");
    if (infoBlock) {
        const tlInfo = gsap.timeline({
            scrollTrigger: {
                trigger: infoBlock,
                start: "top 80%",
                toggleActions: "play reverse play reverse"
            }
        });
        tlInfo
            .from(".infoBlock__title", {
                y: 50,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            })
            .from(".infoBlock__descr", {
                y: 50,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.4")
            .from(".infoBlock__buttons", {
                y: 50,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
                stagger: 0.2
            }, "-=0.4");
    }
    const advantagesItems = document.querySelectorAll(".advantages__item");
    if (advantagesItems.length) {
        const tlAdvantages = gsap.timeline({
            scrollTrigger: {
                trigger: ".advantages__block",
                start: "top 80%",
                toggleActions: "play reverse play reverse"
            }
        });
        advantagesItems.forEach((item, index) => {
            tlAdvantages.from(item, {
                y: 50,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            }, index * 0.2);
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const couponTitle = document.querySelector('.mycart__coupon-name');
    const couponContainer = document.querySelector('.mycart__right-coupon');
    if (couponTitle && couponContainer) {
        couponTitle.addEventListener('click', () => {
            couponContainer.classList.toggle('active');
        });
    }

    const allPaginationContainers = document.querySelectorAll('.selection__slider-pagination, .imagesBlock__slider-pagination');
    if (allPaginationContainers.length === 0) {
        return;
    }
    allPaginationContainers.forEach(bulletsContainer => {
        const bullets = Array.from(bulletsContainer.querySelectorAll('.swiper-pagination-bullet'));
        if (bullets.length === 0) {
            return;
        }
        const moveDistance = 8;
        const individualDelay = 1000;
        const cycleDelay = 1000;

        function animateBulletsForThisContainer() {
            let delayLeft = 0;
            bullets.forEach((bullet) => {
                setTimeout(() => {
                    bullet.style.transform = `translateX(-${moveDistance}px)`;
                }, delayLeft);
                delayLeft += individualDelay;
            });

            setTimeout(() => {
                let delayRight = 0;
                for (let i = bullets.length - 1; i >= 0; i--) {
                    const bullet = bullets[i];
                    setTimeout(() => {
                        bullet.style.transform = `translateX(0px)`;
                    }, delayRight);
                    delayRight += individualDelay;
                }

                setTimeout(() => {
                    animateBulletsForThisContainer();
                }, delayRight + cycleDelay);
            }, delayLeft + cycleDelay);
        }
        animateBulletsForThisContainer();
    });
});


const headerCarts = document.querySelectorAll('.header__cart');
const cart = document.querySelector('.cart');
const cartInner = document.querySelector('.cart__inner');
const cartClose = document.querySelector('.cart__close');
const cartEmptyBtn = document.querySelector('.cart__empty-btn');
const cartBottomClose = document.querySelector('.cart__bottom-close');
if (headerCarts.length && cart) {
    headerCarts.forEach(headerCart => {
        headerCart.addEventListener('click', (e) => {
            cart.classList.add('active');
        });
    });
    [cartClose, cartEmptyBtn, cartBottomClose].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                cart.classList.remove('active');
            });
        }
    });
    document.addEventListener('click', (e) => {
        const isClickInsideCart = cart.contains(e.target);
        const isClickInsideInner = cartInner && cartInner.contains(e.target);
        const isClickOnHeaderCart = Array.from(headerCarts).some(btn => btn.contains(e.target));
        if (!isClickInsideInner && !isClickOnHeaderCart && isClickInsideCart) {
            cart.classList.remove('active');
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const tellyou = document.querySelector('.tellyou');
    if(tellyou){
        const tellyouInner = document.querySelector('.tellyou__inner');
        const closeBtn = document.querySelector('.tellyou__close');
        setTimeout(() => {
            tellyou.classList.add('active');
        }, 1000);
        closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
            tellyou.classList.remove('active');
        });
        document.addEventListener('click', function(e) {
            if (
            tellyou.classList.contains('active') &&
            !tellyouInner.contains(e.target)
            ) {
            tellyou.classList.remove('active');
            }
        });
    }  

    const engraving = document.querySelector(".engraving");
    if(engraving){
        const engravingInner = document.querySelector(".engraving__inner");
        const openBtn = document.querySelector(".engraving-open");
        const closeBtn = document.querySelector(".engraving__close");
        if (openBtn && engraving) {
            openBtn.addEventListener("click", function () {
                engraving.classList.add("active");
            });
        }
        if (closeBtn && engraving) {
            closeBtn.addEventListener("click", function () {
                engraving.classList.remove("active");
            });
        }
        document.addEventListener("click", function (e) {
            if (
                engraving.classList.contains("active") &&
                !engravingInner.contains(e.target) &&
                !openBtn.contains(e.target)
            ) {
                engraving.classList.remove("active");
            }
        });
    }
});
