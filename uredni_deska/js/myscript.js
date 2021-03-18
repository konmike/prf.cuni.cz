var enterEvent = "mousedown";
var leaveEvent = "mouseup";

var enterBigEvent = "mousedown";
var leaveBigEvent = "mouseup"; 

var speed = 2500;

if(!("ontouchstart" in window)){
    enterEvent = enterBigEvent = "mousedown";
    leaveEvent = leaveBigEvent = "mouseup";
}

jQuery(function ($) {



var firstfoc = $(".rghtitem").first().find('.hide').text(); 
$("#pdfcont embed").attr("src", firstfoc);

$(".view-uredni-deska-ven .views-row h3").each(function(){
     $(this).appendTo(".lftcontent");



  }); 

$('.lftcontent h3').each(function(index, element){
  $(this).addClass("index"+ index);
});

$('.rghtcontent .view-uredni-deska-ven>.view-content').children().each(function(index, element){
  $(this).addClass("index"+ index);
});




$('.lftcontent h3').click(function() {
  $('.lftcontent h3').removeClass("active");
  $(this).addClass("active");
  $('.rghtcontent .view-uredni-deska-ven>.view-content').children().hide();
  $('.rghtcontent .view-uredni-deska-ven>.view-content').children().eq($(this).index()).prev().show();
});

$(".rghtitem").click(function(){
  $(".rghtitem img").attr("src","/themes/custom/uredni_deska/images/ico-doc.png");
  $(this).find("img").attr("src","/themes/custom/uredni_deska/images/ico-doc-active.png");
  var changeurl = $(this).find('.hide').text();
  var changeurl_https = changeurl.replace("http://", "https://"); // 
  $("#pdfcont embed").attr("src", changeurl_https);
});
    

  

  $('.rghtitem img').each(function(){
     var isActive = $(this).hasClass('-active'); 
     if(isActive)
     {
        $(".rghtcontent").delay(500).animate({
          scrollTop: $(this).offset().top-250 
          }, 500);
     }  
  }); 
  
  $('.lftcontent li a').each(function(){
     var isActive = $(this).hasClass('active'); 
     if(isActive)
     {
        $(".lftcontent").delay(500).animate({
          scrollTop: $(this).offset().top-200 
          }, 500);
     }  
  });    
   
  //levý sloupec
  $("#firstLeftDown").on(enterEvent, function(e){ 
    console.log($('.lftcontent')[0].scrollHeight);
      $('.lftcontent').animate({
        scrollTop: ($('.lftcontent')[0].scrollHeight)        
      }, speed); 
  });
  $("#firstLeftDown").on(leaveEvent, function(e){
      $('.lftcontent').stop().animate();
  });
  $("#firstLeftUp").on(enterEvent, function(e){
      $('.lftcontent').stop().animate({
        scrollTop: 0
      }, speed);
  });
  $("#firstLeftUp").on(leaveEvent, function(e){
      $('.lftcontent').stop().animate();
  });
  
  //střed
  $("#firstMidleDown").on(enterEvent, function(e){
      $('.rghtcontent').stop().animate({
        scrollTop: $('.rghtcontent')[0].scrollHeight
      }, speed);
  });
  $("#firstMidleDown").on(leaveEvent, function(e){
      $('.rghtcontent').stop().animate();
  });
  $("#firstMidleUp").on(enterEvent, function(e){
      $('.rghtcontent').stop().animate({
        scrollTop: 0
      }, speed);
  });
  $("#firstMidleUp").on(leaveEvent, function(e){
      $('.rghtcontent').stop().animate();
  });

});  