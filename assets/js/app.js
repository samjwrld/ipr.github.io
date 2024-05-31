// Template Name: Law Firm
// Template URL: https://techpedia.co.uk/template/law-firm
// Description: Law Firm
// Version: 1.0.0
(function(window, document, $, undefined) {
    "use strict";
    var Init = {
        i: function(e) {
            Init.s();
            Init.methods();
        },
        s: function(e) {
            (this._window = $(window)),
            (this._document = $(document)),
            (this._body = $("body")),
            (this._html = $("html"));
        },
        methods: function(e) {
            Init.w();
            Init.BackToTop();
            Init.preloader();
            Init.formValidation();
            Init.contactForm();
        },
        w: function(e) {
            this._window.on("load", Init.l).on("scroll", Init.res);
        },
        BackToTop: function() {
            var btn = $("#backto-top");
            $(window).on("scroll", function() {
                if ($(window).scrollTop() > 300) {
                    btn.addClass("show");
                } else {
                    btn.removeClass("show");
                }
            });
            btn.on("click", function(e) {
                e.preventDefault();
                $("html, body").animate({
                        scrollTop: 0,
                    },
                    "300"
                );
            });
        },
        preloader: function() {
            setTimeout(function() {
                $('#preloader').hide('slow')
            }, 2000);
        },

        formValidation: function() {
            if ($(".contact-form").length) {
                $(".contact-form").validate();
            }
        },
        contactForm: function() {
            $(".contact-form").on("submit", function(e) {
                e.preventDefault();
                if ($(".contact-form").valid()) {
                    var _self = $(this);
                    _self
                        .closest("div")
                        .find('button[type="submit"]')
                        .attr("disabled", "disabled");
                    var data = $(this).serialize();
                    $.ajax({
                        url: "./assets/mail/contact.php",
                        type: "post",
                        dataType: "json",
                        data: data,
                        success: function(data) {
                            $(".contact-form").trigger("reset");
                            _self.find('button[type="submit"]').removeAttr("disabled");
                            if (data.success) {
                                document.getElementById("message").innerHTML =
                                    "<h3 class='bg-primary text-white p-3 mt-3'>Email Sent Successfully</h3>";
                            } else {
                                document.getElementById("message").innerHTML =
                                    "<h3 class='bg-primary text-white p-3 mt-3'>There is an error</h3>";
                            }
                            $("#message").show("slow");
                            $("#message").slideDown("slow");
                            setTimeout(function() {
                                $("#message").slideUp("hide");
                                $("#message").hide("slow");
                            }, 3000);
                        },
                    });
                } else {
                    return false;
                }
            });
        },
    }
    Init.i();
})(window, document, jQuery);