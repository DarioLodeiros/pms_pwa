odoo.define("pms_pwa.sidebar", function () {
    "use strict";
    // Var session = require("pms.session");

    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("body").toggleClass("toggled");
    });
    $("#menu-toggle2").click(function (e) {
        e.preventDefault();
        $("body").toggleClass("toggled");
    });
    const date_options = {year: "numeric", month: "2-digit", day: "2-digit"};
    // TOAST
    $(document).on("click", ".o_pms_pwa_toast-close", function (event) {
        // Console.log("close toast");
        event.stopPropagation();
        event.stopImmediatePropagation();
        $(".toast").toast("hide");
    });

    // Preload
    $(document).ready(function () {
        $("#status").fadeOut();
        $("#preloader").delay(10).fadeOut(100);
        $("body").delay(10).css({overflow: "visible"});
    });
    $("li.o_pms_pwa_nav_item a").click(function () {
        $("#status").toggle();
        $("#preloader").toggle();
        // $("#preloader").fadeOut(150);
    });
    $(".o_pms_pwa_preloader").click(function () {
        $("#status").toggle();
        $("#preloader").toggle();
        // $("#preloader").fadeOut(150);
    });

    // DATE RANGE MODAL
    $(function () {
        if (document.documentElement.lang === "es-ES") {
            $(".o_pms_pwa_daterangepicker").daterangepicker(
                {
                    locale: {
                        direction: "ltr",
                        format: "DD/MM/YYYY",
                        applyLabel: "Aplicar",
                        cancelLabel: "Cancelar",
                    },
                    singleDatePicker: true,
                    showDropdowns: true,
                    autoUpdateInput: false,
                    minYear: 1901,
                    maxYear: parseInt(moment().format("YYYY"), 10),
                },
                function (start) {
                    console.log(start);
                    const start_date = new Date(start);
                    var select_date = start_date.toLocaleDateString(
                        document.documentElement.lang,
                        date_options
                    );
                    this.element.val(select_date);
                }
            );

            $('input[name="range_check_date_modal_reservation"]').daterangepicker(
                {
                    locale: {
                        direction: "ltr",
                        format: "DD/MM/YYYY",
                        separator: " - ",
                        applyLabel: "Aplicar",
                        cancelLabel: "Cancelar",
                    },
                    opens: "left",
                    showCustomRangeLabel: false,
                },
                function (start, end, label) {
                    console.log(label);
                    const start_date = new Date(start);
                    var checkin_date = start_date.toLocaleDateString(
                        document.documentElement.lang,
                        date_options
                    );
                    const end_date = new Date(end);
                    var checkout_date = end_date.toLocaleDateString(
                        document.documentElement.lang,
                        date_options
                    );
                    $('input[name="checkin"]').val(checkin_date);
                    $('input[name="checkout"]').val(checkout_date);

                    let nights = 1;
                    // Hours*minutes*seconds*milliseconds
                    const oneDay = 24 * 60 * 60 * 1000;
                    const firstDate = new Date(start);
                    const secondDate = new Date(end);
                    const diffDays = Math.round(
                        Math.abs((firstDate - secondDate) / oneDay)
                    );
                    nights = diffDays - 1;
                    $('input[name="nights"]').val(nights);
                    // $("form#reservation_detail").submit();
                }
            );
        } else {
            $(".o_pms_pwa_daterangepicker").daterangepicker(
                {
                    locale: {
                        direction: "ltr",
                        format: "MM/DD/YYYY",
                    },
                    singleDatePicker: true,
                    showDropdowns: true,
                    autoUpdateInput: false,
                    minYear: 1901,
                    maxYear: parseInt(moment().format("YYYY"), 10),
                },
                function (start) {
                    console.log(start);
                    const start_date = new Date(start);
                    var select_date = start_date.toLocaleDateString(
                        document.documentElement.lang,
                        date_options
                    );
                    this.element.val(select_date);
                }
            );

            $('input[name="range_check_date_modal_reservation"]').daterangepicker(
                {
                    locale: {
                        direction: "ltr",
                        format: "MM/DD/YYYY",
                        separator: " - ",
                    },
                    opens: "left",
                    showCustomRangeLabel: false,
                },
                function (start, end, label) {
                    console.log(label);
                    const start_date = new Date(start);
                    var checkin_date = start_date.toLocaleDateString(
                        document.documentElement.lang,
                        date_options
                    );
                    const end_date = new Date(end);
                    var checkout_date = end_date.toLocaleDateString(
                        document.documentElement.lang,
                        date_options
                    );
                    $('input[name="checkin"]').val(checkin_date);
                    $('input[name="checkout"]').val(checkout_date);
                    let nights = 1;
                    // Hours*minutes*seconds*milliseconds
                    const oneDay = 24 * 60 * 60 * 1000;
                    const firstDate = new Date(start);
                    const secondDate = new Date(end);
                    const diffDays = Math.round(
                        Math.abs((firstDate - secondDate) / oneDay)
                    );
                    nights = diffDays - 1;
                    $('input[name="nights"]').val(nights);
                    // $("form#reservation_detail").submit();
                }
            );
        }
    });
});
