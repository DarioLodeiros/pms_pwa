odoo.define("pms_pwa.partner_search", function () {
    "use strict";

    $(function () {
        $(".o_pms_pwa_search_partner").autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: "/partner/search",
                    method: "GET",
                    dataType: "json",
                    data: {keywords: request.term, category: false},
                    success: function (data) {
                        response(
                            $.map(data, function (item) {
                                return {
                                    label:
                                        (item.type === "c" ? "Category: " : "") +
                                        item.name,
                                    value: item.name,
                                    id: item.id,
                                };
                            })
                        );
                    },
                    error: function (error) {
                        console.error(error);
                    },
                });
            },
            select: function (suggestion, term, item) {
                console.log("suggestion", suggestion, term, item);
                if (term && term.item) {
                    $(suggestion.target.parentElement)
                        .find('input[name="partner_id"]')
                        .val(term.item.id);
                    setTimeout(function () {
                        $(suggestion.target.parentElement)
                            .find('input[name="partner_id"]')
                            .trigger("change");
                    }, 100);
                }
            },
            minLength: 1,
        });
    });
});
