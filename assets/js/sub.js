// 카테고리 메뉴 스크롤 이벤트
const headerH = $('#header .bottom').height();
const buttonH = $('.category-item').height();

$(window).scroll(function(){
    $('.category-item').each(function(i,el){
        if ($(window).scrollTop() >= ($('.category .sub-menu').eq(i).offset().top-Number(headerH+buttonH*i))) {
            $('.category .category-menu .line').css('top',buttonH*i+'px');
        }
    })
});

$('.category .category-item .title').click(function(){
    idx = $(this).parent().index();
    moveOffset = $('.category .sub-menu').eq(idx).offset().top-Number(headerH+buttonH*idx)
    window.scrollTo({top:moveOffset,behavior:"smooth"})
});