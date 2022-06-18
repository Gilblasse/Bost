function serviceImgHover() {
    $('.service-img-size').hover(function () {
        $(this).css({
            'backgroundSize': 'calc(var(--service-imgs-w)*1.4) calc(var(--service-imgs-h)*1.4)',
            "transition": "background-size 500ms ease-in-out"
        })
        .children().toggle();

    }, function () {
        $(this).css({
            'backgroundSize': 'var(--service-imgs-w) var(--service-imgs-h)',
            "transition": "background-size 500ms ease-in-out"
        })
        .children().toggle();
    })

}

function buildMenu() {
    let items = ['About','Services','Gallery'];
    let navItems = "";

    for (let item of items){
        let nav = `
            <li>
                <a href="#${item}">
                    ${item}
                </a>
            </li>
        ,`;
        navItems += nav;
    }

    let splitItemsArry = navItems.split(',');
    let fixArry = splitItemsArry.splice(0,splitItemsArry.length-1);

    for(let items of fixArry){
        $('#menuItems').append(items);
    };
}

function toggleMenu () {
   const initMenu = {
    closeMenu: function(){
        $('#menuItems').removeClass('show').addClass('hide');
        $('#menuItems').attr('data-hidden','true');
        }
    };

    const hamburgerToggler = function(e) {
            let toggleState = $('#menuItems').attr('data-hidden');

            const showMenu = function(){
                $('#menuItems').removeClass('hide').addClass('show');
                $('#menuItems').attr('data-hidden','false');
                anchorScroll();
            }
            const hideMenu = function(){
                $('#menuItems').removeClass('show').addClass('hide');
                $('#menuItems').attr('data-hidden','true');
            }
            e.stopPropagation();

            toggleState == 'true' ? showMenu() : hideMenu();

    }

    $( "#menu-toggler" ).click((e) => hamburgerToggler(e));
     $( "body" ).click(() => initMenu.closeMenu());
}

function lightBox() {
    const btnStyles = {
        'position': 'relative',
        'padding':'.8rem',
        'backgroundColor':'var(--secondary-color)',
        'color':'#fff',
        'border':'none',
        'width':'3rem',
        'height':'3rem',
        'borderRadius':'50%',
        'fontSize':'calc(var(--main-font-size) * 2)',
        'textAlign':'center',
        'alignSelf': 'center',
        'justifySelf': 'center',
        'margin':'0 50px',
        'transition': 'all 400ms ease-in-out'
    }

    const additionalImages = ['banquet.JPG','events2luv-team.jpg','banquet_menu.JPG','banquet_table.JPG','events2luv-favors.JPG','banquet_table3.JPG']
    const imgBox = $('<div class="img-box"></div>');
    const imgContainer = $('<div class="lightbox-container"></div>');
    const nextImgBtn = $('<button id="nextImg"><i class="fas fa-chevron-right"></i></button>').css(btnStyles);
    const prevImgBtn = $('<button id="prevImg"><i class="fas fa-chevron-left"></i></button>').css(btnStyles);
    let imgHtml = '';
    let imgId = null;

   let imgArry = $('.grid-wrapper > .image')

    for(let i=0; i < imgArry.length; i++) {

        // OPEN LIGHTBOX
        imgArry.eq(i).on('click', function (e) { // Gallery Imaged Clicked .active-img
            e.stopPropagation();
            let imgSrc = imgArry[0]

            if(typeof imgArry[0] === 'object') {
                imgArry.eq(i).addClass('active-img');
                const imgUrl = imgArry.eq(i).css('background').split(' ')[4];
                const imgSrcArry = imgUrl.split('/')[4].split('');
                imgSrc = imgSrcArry.splice(0,imgSrcArry.length - 2).join('');
            }

            imgHtml = $(`<img src="imgs/${imgSrc}" alt="image slide" id="imageTag" class="img-thumbnail">`);
            imgArry = $($.unique([...imgArry, ...additionalImages]))

            imgBox.prependTo('body');
            imgBox.prepend(imgContainer);
            imgContainer.prepend(imgHtml);
            $('.lightbox-container').after(nextImgBtn);
            $('.lightbox-container').before(prevImgBtn);
                imgId = i;
                $('#imageTag').on('click',function(e){
                    e.stopPropagation();
                });

                // NEXT BTN
                $('#nextImg').on('click',function(e){
                    e.stopPropagation();
                    imgId += 1
                    let nextUrl = imgArry.eq(imgId);

                    if(imgArry.length !== imgId){
                        let nextImgSrc = nextUrl[0]
                        if(typeof nextUrl[0] === 'object') {
                            const nextBkgArry =  nextUrl.css('background').split(' ')[4];
                            const nextSrcArry = nextBkgArry.split('/')[4].split('');
                            nextImgSrc = nextSrcArry.splice(0,nextSrcArry.length - 2).join('')
                        }
                      let nextsrc = 'imgs/' + nextImgSrc;


                      $('#imageTag').fadeOut(500,'linear',function(){
                        for(let i=0; i < imgArry.length; i++) {
                            imgArry.eq(i).removeClass('active-img');
                            }
                            typeof nextUrl[0] === 'object' && nextUrl.addClass('active-img');
                        $(this).attr('src',nextsrc).fadeIn(1000,'linear');
                      })

                    }else{
                        imgId=0
                        // let nextReset = imgArry.eq(imgId);
                        let nextfunc = imgArry.eq(imgId);
                        let nImgSrc = nextfunc[0]
                        if(typeof nextfunc[0] === 'object') {
                            let nBkgArry =  nextfunc.css('background').split(' ')[4];
                            let nSrcArry = nBkgArry.split('/')[4].split('');
                            nImgSrc =  nSrcArry.splice(0,nSrcArry.length - 2).join('');
                        }
                        let nextsrc = 'imgs/' + nImgSrc;

                        $('#imageTag').fadeOut(500,'linear',function(){
                            for(let i=0; i < imgArry.length; i++) {
                                typeof imgArry.eq(i)[0] === 'object' && imgArry.eq(i).removeClass('active-img');
                                }
                                typeof nextfunc[0] === 'object' && nextfunc.addClass('active-img');
                            $(this).attr('src',nextsrc).fadeIn(1000,'linear');
                          })


                    }
                });

                // PREVIOUS BTN
                $('#prevImg').on('click',function(e){
                    e.stopPropagation();
                    imgId -= 1
                    let prevUrl = imgArry.eq(imgId);
                    if(-1 < imgId){
                        let prvSrc = prevUrl[0]
                        if(typeof prevUrl[0] === 'object') {
                            let prevBkgArry =  prevUrl.css('background').split(' ')[4];
                            let prevSrcArry = prevBkgArry.split('/')[4].split('');
                            prvSrc = prevSrcArry.splice(0,prevSrcArry.length - 2).join('');
                        }
                      let prevsrc = 'imgs/' + prvSrc;

                    $('#imageTag').fadeOut(500,'linear',function(){
                        for(let i=0; i < imgArry.length; i++) {
                            typeof imgArry.eq(i)[0] === 'object' && imgArry.eq(i).removeClass('active-img');
                            }
                            typeof prevUrl[0] === 'object' && prevUrl.addClass('active-img');
                        $(this).attr('src',prevsrc).fadeIn(1000,'linear');
                      })

                    }else{
                        imgId = imgArry.length-1;
                        let preUrl = imgArry.eq(imgId);
                        let presrc = preUrl[0]
                        if(typeof preUrl[0] === 'object') {
                            let preBkgArry =  preUrl.css('background').split(' ')[4];
                            let preSrcArry = preBkgArry.split('/')[4].split('');
                            presrc = preSrcArry.splice(0,preSrcArry.length - 2).join('');
                        }
                        let prvsrc = 'imgs/' + presrc;

                        $('#imageTag').fadeOut(500,'linear',function(){
                            for(let i=0; i < imgArry.length; i++) {
                                typeof imgArry.eq(i)[0] === 'object' && imgArry.eq(i).removeClass('active-img');
                                }
                                typeof preUrl[0] === 'object' && preUrl.addClass('active-img');
                            $(this).attr('src',prvsrc).fadeIn(1000,'linear');
                          })
                    }

                });
        });
    }


    $('body').on('click', function () {
        for(let i=0; i < imgArry.length; i++) {
        imgArry.eq(i).removeClass('active-img');
        }
        $('.lightbox-container').empty().remove();
        $('.img-box').empty().remove();

    });

};


function anchorScroll(){
    $('a[href^="#"]').on('click',function(e){
        e.preventDefault();
        let target = this.hash;
        let $target = $(target);

        $('html, body').animate({
            'scrollTop': $target.offset().top
        }, 1000, 'swing',function(){
            window.location.hash = target;
        });
    });
}

// Initializes functions when DOM is ready.
$(document).ready(function(){

    const initFn = {
        scroll:anchorScroll(),
        lightBox:lightBox(),
        imgHover:serviceImgHover(),
        toggle: toggleMenu(),
        menu: buildMenu()
    }

    new WOW().init();
    initFn.scroll
    initFn.lightBox
    initFn.imgHover
    initFn.toggle
    initFn.menu
});