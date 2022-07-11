function filterFunction(that, event) {
    let container, input, filter, li, input_val;
    container = $(that).closest(".searchable");
    input_val = container.find("input").val().toUpperCase();
    li = container.find("ul li");
    li.each(function(i, obj) {
        if ($(this).text().toUpperCase().indexOf(input_val) > -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });

    container.find("ul li").removeClass("selected");
    setTimeout(function() {
        container.find("ul li:visible").first().addClass("selected");
    }, 100)
}

$(".searchable input").focus(function() {
    $(this).closest(".searchable").find("ul").show();
    $(this).closest(".searchable").find("ul li").show();
    $(".bx-chevron-down").toggleClass("active");
});

$(".searchable input").blur(function() {
    let that = this;
    setTimeout(function() {
        $(that).closest(".searchable").find("ul").hide();
    }, 300);
    $(".bx-chevron-down").removeClass("active");
});

$(document).on('click', '.searchable ul li', function() {
    $(this).closest(".searchable").find("input").val($(this).text()).blur();
});

$(".searchable ul li").hover(function() {
    $(this).closest(".searchable").find("ul li.selected").removeClass("selected");
    $(this).addClass("selected");
});

// sort by alphabetical order

function Ascending_sort(a, b) {
    return ($(b).text().toUpperCase()) <
        ($(a).text().toUpperCase()) ? 1 : -1;
}
$(".searchable ul li").sort(Ascending_sort).appendTo('.searchable ul');