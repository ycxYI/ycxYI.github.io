 

 $(function() {
     $("#btn").click(function(){
     $(document).load("http://ycxm.coding.me/jquery/version.txt",
      function(responseText,textStatus){
          versionText=responseText;
          alert(responseText);
          });  
       });
   });