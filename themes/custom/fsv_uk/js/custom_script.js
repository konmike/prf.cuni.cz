(function ($) {

 $('.nav__megamenu__featured__item a[href*="/node"]').each(function() {
        $(this).parent().hide();
    });

        if($('#fullmenu').length){
  $(".layout-aside").addClass("fullwidth")
  $("h1").hide();
  $("#jq_side-nav-toggle").addClass("side-nav__mobile-toggle working").css("display","block");
  $("#block-mainnavigation-2").css("display","block");
  
}
 



 // $('.nav__item > a[href*="/node"]').each(function() {
 //        $(this).parent().hide();
 //        $(this).parent().prev('.nav__separator').hide();
 //    });

$(".input.form-radio").on('click', function(){
     $(this).parent().toggleClass("checked");
});

$("#jq_side-nav-toggle").click(function(){
    $("#jq_side-nav-toggle").addClass("working")}
);

 // var is_opera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
 //    var is_Edge = navigator.userAgent.indexOf("Edge") > -1;
 //    var is_chrome = !!window.chrome && !is_opera && !is_Edge;
 //    var is_explorer= typeof document !== 'undefined' && !!document.documentMode && !is_Edge;
 //    var is_firefox = typeof window.InstallTrigger !== 'undefined';
 //    var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

 //    if (is_safari) alert('Safari');

// $("div#edit-abc .form-item label").on('click', function(){
//      $(this).toggleClass("exposed-checked");
// });

var selected = $("div#edit-abc .form-item input:checked");
    $(selected).next('label').addClass('exposed-checked');

 var selectedli = $("#views-exposed-form-news-page-block-homepage-news-feed input:checked");
    $(selectedli).parent().addClass('checked-white'); 

     var selectedlicourses = $(".form-item-field-taxonomy-general-tags-target-id input:checked");
    $(selectedlicourses).parent().addClass('checked-white'); 

$( document ).ajaxComplete(function() {
  var selectedli = $("#views-exposed-form-news-page-block-homepage-news-feed input:checked");
    $(selectedli).parent().addClass('checked-white'); 
    var selectedlicourses = $(".form-item-field-taxonomy-general-tags-target-id input:checked");
    $(selectedlicourses).parent().addClass('checked-white'); 
});



   

$("#edit-cat-102").addClass("makrela");

})(jQuery);



