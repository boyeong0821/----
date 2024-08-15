// 비주얼 슬라이드
fetch('./assets/data/banner.json')
.then(res=>res.json())
.then(json=>{
    console.log(json);
    data = json.item_list;

    let html=``;
    data.forEach(element => {
        html+=`<div class="swiper-slide">
                    <a href="">
                        <div class="thumb">
                                <img src="${element.image_url}" alt>
                                <p class="text">
                                    <em class="title">${element.main_title_first}</em>
                                    <em class="title">${element.main_title_second}</em>
                                    <span class="subtitle">${element.sub_title}</span>
                                </p>
                        </div>
                    </a>
                </div>`
    });

    $('#bannerList').html(html);

    const visualSlide = new Swiper('.sc-visual .swiper',{
        autoplay: {
            delay: 3000
        },
    
        loop: true,
    
        spaceBetween: 20,
    
        on:{
            "init": function(){
                total = this.slides.length;
    
                $('.total').text(total);
            },
            "slideChange":function(){
                idx = this.realIndex + 1;
    
                $('.curr').text(idx);
            }
        }
    });
});

// 상품 슬라이드
fetch('./assets/data/firstSale.json')
.then(res=>res.json())
.then(json=>{
    console.log(json);
    data = json.item_list;

    let html=``;
    data.forEach(element => {
        html+=`<div class="swiper-slide">
                    <div class="thumb">
                        <img src="${element.image_url}" alt>
                        <span class="mark"><img src="./assets/images/mark.png" alt="직진"></span>
                        <button class="btn-pick"><img src="./assets/images/pick.png" alt="찜"></button>
                    </div>
                    <div class="text-wrap">
                        <span class="shop">${element.shop_name}</span>
                        <p class="title ellipsis">${element.title}</p>
                        <span class="price"><em class="point">${element.discount_rate}%</em> ${element.price.toLocaleString()}</span>
                        <span class="tag">
                            <img src="./assets/images/tag1.png" alt="첫구매가">
                            <img src="./assets/images/tag2.png" alt="무료배송">
                        </span>
                        <span class="rating">
                            ${element.review_score}(${element.display_review_count})<span class="blind">평점(후기)</span>
                        </span>
                    </div>
                    <a href="" class="link"></a>
                </div>`
    });

    $('#firstSaleList').html(html);

    const productSlide = new Swiper('.sc-product .swiper',{
        slidesPerView: 3,
        spaceBetween: 2,
        freeMode : true
    });
});

// 상품 데이터, 클릭이벤트
let data = [];
let currentIndex = 0;
const itemsPerPage = 6;

fetch('./assets/data/prd.json')
.then(res => res.json())
.then(json => {
    console.log(json);
    data = json.item_list;
    loadMoreItems();
});

function loadMoreItems() {
    const fragment = document.createDocumentFragment();
    const nextIndex = currentIndex + itemsPerPage;

    for (let i = currentIndex; i < nextIndex && i < data.length; i++) {
        const element = data[i];
        const li = document.createElement('li');
        li.className = 'product-item';
        li.innerHTML = `<div class="thumb">
                            <img src="${element.image_url}" alt>
                            <button class="btn-pick"><img src="./assets/images/pick.png" alt="찜"></button>
                        </div>
                        <div class="text-wrap">
                            <span class="shop">${element.shop_name}</span>
                            <p class="title ellipsis">${element.title}</p>
                            <span class="price"><em class="point">${element.discount_rate}%</em> ${element.price.toLocaleString()}</span>
                            <span class="tag">
                                <img src="./assets/images/tag1.png" alt="첫구매가">
                                <img src="./assets/images/tag2.png" alt="무료배송">
                            </span>
                            <span class="rating">
                                ${element.review_score}(${element.display_review_count})<span class="blind">평점(후기)</span>
                            </span>
                        </div>
                        <a href="" class="link"></a>`
        fragment.appendChild(li);
    }

    currentIndex = nextIndex;
    document.getElementById('prdList').appendChild(fragment);

    if (currentIndex >= data.length) {
        document.getElementById('btn-more').style.display = 'none';
    }
}

document.getElementById('btn-more').addEventListener('click', loadMoreItems);