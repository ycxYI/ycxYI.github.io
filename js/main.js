$(function(){

    $("#menu li").click(function() {

        $(this).siblings('li').removeClass('current_page_item');  // 删除其他兄弟元素的样式

        $(this).addClass('current_page_item');                     // 添加当前元素的样式

    });



}); 

