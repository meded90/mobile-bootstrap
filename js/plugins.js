jQuery(function ($) {


    $('.videowrapper a').click(function () {
        var $this = $(this);
        var url = $this.attr('href');
        $this.parent().append($('<iframe>').attr({
            src: url+'?autoplay=1&rel=0&showinfo=0&border=0&iv_load_policy=3&modestbranding=1',
            frameborder: "0",
            allowfullscreen: null
        }));
        $this.remove()
        return false
    });

    // возвращает cookie если есть или undefined
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ))
        return matches ? decodeURIComponent(matches[1]) : undefined
    }

    // уcтанавливает cookie
    function setCookie(name, value, props) {
        props = props || {}
        var exp = props.expires
        if (typeof exp == "number" && exp) {
            var d = new Date()
            d.setTime(d.getTime() + exp * 1000);
            exp = props.expires = d
        }
        if (exp && exp.toUTCString) {
            props.expires = exp.toUTCString()
        }

        value = encodeURIComponent(value);
        var updatedCookie = name + "=" + value;
        for (var propName in props) {
            updatedCookie += "; " + propName;
            var propValue = props[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue
            }
        }
        document.cookie = updatedCookie

    }


    // form save
    (function () {
        var cashForm;
        cashForm = JSON.parse(getCookie('form') || '{}') || {};
        for (var name in cashForm) {
            $('input[name=' + name + ']').val(cashForm[name]);
            $('textarea[name=' + name + ']').html(cashForm[name]);
        }
        $('input[type=radio]').change(function () {
            var $this = $(this);
            var val = $this.val();
            var name = $this.attr('name');
            debugger;
            cashForm[name] = val;
            setCookie('form', JSON.stringify(cashForm), {expires: 100000})
        });
        $('input,textarea').keyup(function () {
            var $this = $(this);
            var val = $this.val();
            var name = $this.attr('name');
            cashForm[name] = val;
            setCookie('form', JSON.stringify(cashForm), {expires: 100000})
        });

        for (var name in cashForm) {
            console.log(name);
            console.log(cashForm[name]);
            $('[data-form=' + name + ']').html(cashForm[name])
        }
    })();

});
