document.addEventListener('DOMContentLoaded', function () {
    const filterSort = document.querySelector('.catalog__filter-sort');
    const titleButton = filterSort.querySelector('.catalog__filter-sort--title');
    const content = filterSort.querySelector('.catalog__filter-sort--content');
    titleButton.addEventListener('click', function (e) {
        e.stopPropagation();
        filterSort.classList.toggle('active');
    });
    document.addEventListener('click', function (e) {
        if (!content.contains(e.target) && !titleButton.contains(e.target)) {
            filterSort.classList.remove('active');
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const catalogButtons = document.querySelectorAll('.catalog__filter-btn');
    const catalogContents = document.querySelectorAll('.catalog__filter-content');
    const filterResult = document.querySelector('.catalog__filter-result'); 

    catalogButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter-select--btn');
            const targetContent = document.querySelector(`.catalog__filter-content[data-filter-select="${filter}"]`);
            const isAlreadyActive = targetContent.classList.contains('active');
            catalogContents.forEach(content => content.classList.remove('active'));
            catalogButtons.forEach(btn => btn.classList.remove('active'));
            if (!isAlreadyActive) {
                targetContent.classList.add('active');
                this.classList.add('active');
                filterResult.classList.add('active');
            } else {
                const anyActive = Array.from(catalogContents).some(content => content.classList.contains('active'));
                if (!anyActive) {
                    filterResult.classList.remove('active');
                }
            }
        });
    });
});


const priceMinInput = document.getElementById('price-min-input');
const priceMaxInput = document.getElementById('price-max-input');
const rangeMin = document.getElementById('range-min');
const rangeMax = document.getElementById('range-max');
rangeMin.value = priceMinInput.value;
rangeMax.value = priceMaxInput.value;
const minPrice = parseInt(priceMinInput.min);
const maxPrice = parseInt(priceMaxInput.max);
const minGap = 100;
function updateRangeBackground() {
    const minVal = parseInt(rangeMin.value);
    const maxVal = parseInt(rangeMax.value);
    const percentageMin = ((minVal - minPrice) / (maxPrice - minPrice)) * 100;
    const percentageMax = ((maxVal - minPrice) / (maxPrice - minPrice)) * 100;
    const rangeElem = document.querySelector('.catalog__filter-rangeprice');
    rangeElem.style.setProperty('--start', percentageMin + '%');
    rangeElem.style.setProperty('--end', percentageMax + '%');
}

rangeMin.addEventListener('input', () => {
    let minVal = parseInt(rangeMin.value);
    let maxVal = parseInt(rangeMax.value);
    if (minVal > maxVal - minGap) {
        minVal = maxVal - minGap;
        rangeMin.value = minVal;
    }
    priceMinInput.value = minVal;
    updateRangeBackground();
});
rangeMax.addEventListener('input', () => {
    let minVal = parseInt(rangeMin.value);
    let maxVal = parseInt(rangeMax.value);
    if (maxVal < minVal + minGap) {
        maxVal = minVal + minGap;
        rangeMax.value = maxVal;
    }
    priceMaxInput.value = maxVal;
    updateRangeBackground();
});
priceMinInput.addEventListener('input', () => {
    let minVal = parseInt(priceMinInput.value);
    let maxVal = parseInt(priceMaxInput.value);

    if (isNaN(minVal) || minVal < minPrice) {
        minVal = minPrice;
    }
    if (minVal > maxVal - minGap) {
        minVal = maxVal - minGap;
    }
    priceMinInput.value = minVal;
    rangeMin.value = minVal;
    updateRangeBackground();
});
priceMaxInput.addEventListener('input', () => {
    let minVal = parseInt(priceMinInput.value);
    let maxVal = parseInt(priceMaxInput.value);

    if (isNaN(maxVal) || maxVal > maxPrice) {
        maxVal = maxPrice;
    }
    if (maxVal < minVal + minGap) {
        maxVal = minVal + minGap;
    }
    priceMaxInput.value = maxVal;
    rangeMax.value = maxVal;
    updateRangeBackground();
});
updateRangeBackground();

document.addEventListener("DOMContentLoaded", function() {
    const maysee = document.querySelector(".maysee");
    const mayseeMore = document.querySelector(".maysee__more");
    const mayseeContent = document.querySelector(".maysee__content");

    mayseeMore.addEventListener("click", function() {
        mayseeContent.classList.toggle("show-more");
        maysee.scrollIntoView({
            behavior: "auto",
            block: "nearest"
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
  const filterResult = document.querySelector(".catalog__filter-result");
  const filterButtons = document.querySelectorAll(".catalog__filter-btn");
  const filterContents = document.querySelectorAll(".catalog__filter-content");
  const originalOrder = Array.from(filterContents);
  function relocateFilters() {
    if (window.innerWidth < 768) {
      filterButtons.forEach((button) => {
        const key = button.getAttribute("data-filter-select--btn");
        const relatedContent = document.querySelector(`.catalog__filter-content[data-filter-select="${key}"]`);
        if (relatedContent && button.nextElementSibling !== relatedContent) {
          button.insertAdjacentElement("afterend", relatedContent);
        }
      });
    } else {
      originalOrder.forEach((content) => {
        if (content.parentElement !== filterResult) {
          filterResult.appendChild(content);
        }
      });
    }
  }
  relocateFilters();
  window.addEventListener("resize", relocateFilters);
});


document.addEventListener("DOMContentLoaded", function() {
    const filterOpen = document.querySelector(".filter-open");
    const filterCloseButtons = document.querySelectorAll(".catalog__filter-close");
    const filterLeft = document.querySelector(".catalog__filter-left");

    if (filterCloseButtons.length && filterLeft) {
        filterCloseButtons.forEach((btn) => {
        btn.addEventListener("click", function() {
            filterLeft.classList.remove("active");
        });
        });
    }

    

    if (filterOpen && filterLeft) {
        filterOpen.addEventListener("click", function() {
        filterLeft.classList.toggle("active");
        });
    }
});
