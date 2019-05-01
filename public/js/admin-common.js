//-------------------------------- define letiables -------------------------------------------//

//-------------------------------- end define letiables ---------------------------------------//

//-------------------------------- setup buttons active state ---------------------------------//
$('.select-one').each(function (groupIndex) {
    let group = $(this).children('button');
    group.click(function () {
        group.each(function (index) {
            $(this).removeClass('btn-primary');
            $(this).addClass('btn-outline-primary');
        });

        $(this).removeClass('btn-outline-primary');
        $(this).addClass('btn-primary');
    });
});

$('.dropdown-menu').each(function (groupIndex) {
    let group = $(this).children('.dropdown-item');
    let labelBtn = $(this).prev();

    group.click(function (e) {
        e.preventDefault();
        group.each(function (index) {
            $(this).removeClass('active');
        });

        $(this).addClass('active');
        labelBtn.text($(this).text());
    });
});
//-------------------------------- end setup buttons active state ----------------------------//

//------------------------------ setup sections ------------------------------------------------//

//------------------------------ end setup sections --------------------------------------------//


//------------------------------- utility functions ----------------------------------------//

//------------------------------- end utility functions ------------------------------------//
