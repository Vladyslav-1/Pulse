// Этот скрипт для карусели. Здесь задаем основу, далее стилизуем в CSS. 
$(document).ready(function(){
    $('.carousel__inner').slick({ 
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/page_3/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/page_3/right.svg"></button>',
        responsive: [
            {
                breakpoint: 1140,
                settings: {
                    dots: false,
                    arrows: false
                }
            }
        ]
      });
// Этим скрптом мы активируем табы. 
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
// Этим скриптом мы переворачиваем карточку
    //   $('.catalog-item__link').each(function(i) {
    //     $(this).on('click', function(e) {
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    //   })
// Этим скриптом переворачиваем назад. Надо только указывать актуальные классы на кнопку.  
    //   $('.catalog-item__back').each(function(i) {
    //     $(this).on('click', function(e) {
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    //   });

// Оптимизированный скрипт. 
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };
    toggleSlide ('.catalog-item__link');
    toggleSlide ('.catalog-item__back');

    // Modal windows
    $('[data-modal=consult]').on('click',function() {
        $('.overlay, #consult').fadeIn('slow');
    });
    $('.modal-wind__close').on('click',function() {
        $('.overlay, #consult, #thanks, #order').fadeOut('slow');
    });
    // $('.button_mini').on('click',function() {
    //     $('.overlay, #order').fadeIn('slow');
    // });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal-wind__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    // $('#consultation').validate();
    // $("#consult form").validate({
    //     rules: {
    //         name: "required",
    //         phone: "required",
    //         email: {
    //             required: true,
    //             email: true
    //         }
    //     },
    //     messages: {
    //         name: "Пожалуйста, введите свое имя",
    //         phone: 'Пожалуйста, введите номер телефона',
    //         email: {
    //             required: "Пожалуйста, введите свой email",
    //             email: "Неправильно введен адрес"
    //         }
    //     }
    // });
    // $('#order form').validate();

    // Оптимизированный скрипт для форм
    function valideForms(form){
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: 'Пожалуйста, введите номер телефона',
                email: {
                    required: "Пожалуйста, введите свой email",
                    email: "Неправильно введен адрес"
                }
            }
        });
    };
    valideForms('#consultation-form');
    valideForms('#consult form');
    valideForms('#order form');

    $('input[name=phone]').mask("+3 (999) 999-99-99");

    // Код для отправки формы с сайта на сервер
    $('form').submit(function(e) {
        e.preventDefault();

        if(!$(this).valid()) {
            return;
        }

        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize()
        }).done(function() {
            $(this).find('input').val('');
            $('#consult, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

// Появление и исчезания иконки ап и плавный скрол. 
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1500) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
// Плавный скролл
    $("a [href=#up]").click(function() {
        const _href = $(this).attr('href');
        $('html, body').animate({scrollTop: $(_href).offset().top+'px'});
        return false;
    });

    new WOW().init();

});