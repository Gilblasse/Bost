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
        // console.log('hide');
        
        }
    };

    const hamburgerToggler = function(e) {
            let toggleState = $('#menuItems').attr('data-hidden');

            const showMenu = function(){
                $('#menuItems').removeClass('hide').addClass('show');
                $('#menuItems').attr('data-hidden','false');
                anchorScroll();
                // console.log('toggle state show');
            }
            const hideMenu = function(){
                $('#menuItems').removeClass('show').addClass('hide'); 
                $('#menuItems').attr('data-hidden','true');
                // console.log('toggle state hidemenu');
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
   
    const imgBox = $('<div class="img-box"></div>');
    const imgContainer = $('<div class="lightbox-container"></div>');
    const nextImgBtn = $('<button id="nextImg"><i class="fas fa-chevron-right"></i></button>').css(btnStyles);
    const prevImgBtn = $('<button id="prevImg"><i class="fas fa-chevron-left"></i></button>').css(btnStyles);
    let imgHtml = '';
    let imgId = null;

   const imgArry = $('.grid-wrapper > .image');


    for(let i=0; i < imgArry.length; i++) {

        // OPEN LIGHTBOX
        imgArry.eq(i).on('click', function (e) { // Gallery Imaged Clicked .active-img
            e.stopPropagation();
            imgArry.eq(i).addClass('active-img');

            let imgUrl = imgArry.eq(i).css('background').split(' ')[4];

            let imgSrcArry = imgUrl.split('/')[5].split('');
            let imgSrc = imgSrcArry.splice(0,imgSrcArry.length - 2).join('');

            imgHtml = $(`<img src="imgs/${imgSrc}" alt="image slide" id="imageTag" class="img-thumbnail">`);

            imgBox.prependTo('body');
            imgBox.prepend(imgContainer);
            imgContainer.prepend(imgHtml);
            $('.lightbox-container').after(nextImgBtn);
            $('.lightbox-container').before(prevImgBtn);
            // $('html').css('overflowY','hidden');
            // console.log('gallery section');

                imgId = i;
                console.log('imgId '+imgId);
                

                $('#imageTag').on('click',function(e){
                    e.stopPropagation();
                    // console.log('ImageTag');
                });

                // NEXT BTN
                $('#nextImg').on('click',function(e){
                    e.stopPropagation();
                    let nextUrl = imgArry.eq(imgId += 1);
                   
                    if(imgArry.length !== imgId){
                      let nextBkgArry =  nextUrl.css('background').split(' ')[4];
                      let nextSrcArry = nextBkgArry.split('/')[5].split('');
                      let nextsrc = 'imgs/' + nextSrcArry.splice(0,nextSrcArry.length - 2).join('');

                        
                      $('#imageTag').fadeOut(500,'linear',function(){
                        for(let i=0; i < imgArry.length; i++) {
                            imgArry.eq(i).removeClass('active-img');
                            }
                            nextUrl.addClass('active-img');
                        $(this).attr('src',nextsrc).fadeIn(1000,'linear');
                      })

                    }else{
                        let nextReset = imgArry.eq(imgId-=imgArry.length);
                        imgId-=imgArry.length;
                        let nextfunc = imgArry.eq(imgId += 0);
                        let nBkgArry =  nextfunc.css('background').split(' ')[4];
                        let nSrcArry = nBkgArry.split('/')[5].split('');
                        let nextsrc = 'imgs/' + nSrcArry.splice(0,nSrcArry.length - 2).join('');
                        
                        // console.log('NEWID# '+imgId + ' ' +nextsrc);
                        $('#imageTag').fadeOut(500,'linear',function(){
                            for(let i=0; i < imgArry.length; i++) {
                                imgArry.eq(i).removeClass('active-img');
                                }
                                nextReset.addClass('active-img');
                            $(this).attr('src',nextsrc).fadeIn(1000,'linear');
                          })


                    }
                    
                });

                // PREVIOUS BTN
                $('#prevImg').on('click',function(e){
                    e.stopPropagation();
                    let prevUrl = imgArry.eq(imgId -= 1);
                //    console.log(imgArry.length + ' ' +imgId);
                    if(-1 < imgId){
                      let prevBkgArry =  prevUrl.css('background').split(' ')[4];
                      let prevSrcArry = prevBkgArry.split('/')[5].split('');
                      let prevsrc = 'imgs/' + prevSrcArry.splice(0,prevSrcArry.length - 2).join('');

                    //   console.log('image ID# '+imgId);
                    $('#imageTag').fadeOut(500,'linear',function(){
                        for(let i=0; i < imgArry.length; i++) {
                            imgArry.eq(i).removeClass('active-img');
                            }
                            prevUrl.addClass('active-img');
                        $(this).attr('src',prevsrc).fadeIn(1000,'linear');
                      })

                    }else{
                        let prevReset = imgArry.eq(imgId = imgArry.length-1);
                        imgId = imgArry.length-1;
                        
                        let preUrl = imgArry.eq(imgId -= 0);
                        let preBkgArry =  preUrl.css('background').split(' ')[4];
                        let preSrcArry = preBkgArry.split('/')[5].split('');
                        let prvsrc = 'imgs/' + preSrcArry.splice(0,preSrcArry.length - 2).join('');

                        // console.log('NEWID# '+imgId);
                        $('#imageTag').fadeOut(500,'linear',function(){
                            for(let i=0; i < imgArry.length; i++) {
                                imgArry.eq(i).removeClass('active-img');
                                }
                                prevUrl.addClass('active-img');
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
        // $('html').css('overflowY','scroll');
        $('.lightbox-container').empty().remove();
        $('.img-box').empty().remove();
        
    });

};

// function logo(){
//     $(window).on('scroll',function(){
//        let scrollHeight = Math.floor($(window).scrollTop());

//         if(scrollHeight >= 50){
//             $('.logo').css({
//                 'width':'calc(var(--log-width) * 1.2)',
//                 'transition':'width 1s ease-in-out',
//             });
//             // $('#menu-toggler').css({
//             //     'fontSize':'calc(var(--log-width) / 5.5)',
//             //     'transition':'all 1s ease-in-out',
//             // });
//             $('#navBar').css({
//                 'padding':'calc(var(--log-width) / 3) 0',
//                 'transition':'all 1s ease-in-out',
//             });
//             $('.show').css({        
//                 'transform':'translateY(8rem)',
//                 'transition':'all 1s ease-in-out',
//             });
            
//         }else{
//             $('.logo').css({
//                 'width':'var(--log-width)',
//                 'transition':'width 1s ease-in-out',
//             });
//             $('.show').css({        
//                 'transform':'translateY(5rem)',
//                 'transition':'all 1s ease-in-out',
//             });
//             $('#navBar').css({
//                 'padding':'0 0 0 0',
//                 'transition':'all 1s ease-in-out',
//             });
//         }
//     })
// }

function anchorScroll(){
    $('a[href^="#"]').on('click',function(e){
        e.preventDefault();
        console.log('function Ran');
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
    
    initFn = {
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