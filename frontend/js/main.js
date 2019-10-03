
(function ($) {
    "use strict";


    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var to = $('.validate-input input[name="to"]');
    var amount = $('.validate-input input[name="amount"]');
    var email = $('.validate-input input[name="email"]');
    var message = $('.validate-input textarea[name="message"]');
    var now = new Date();


    $('.validate-form').on('submit',function(){
        var check = true;
        if(localStorage.getItem('hour')) {
            console.log('local', localStorage.getItem('hour'))
            var then = localStorage.getItem('hour');
            then = new Date(then);

            var diffDays = then.getDate() - now.getDate(); 
            if($(to).val().trim() == ''){
                showValidate(to);
                check=false;
                return check;
            }

            if(diffDays < 1){
                alert("try tomorrow")
                check=false;
                return check;
            }
            else if(diffDays >= 1) {
                localStorage.setItem('hour', now);
                window.location.reload();
             }
     
        }

        if($(to).val().trim() == ''){
            showValidate(to);
            check=false;
            return check;
        }

        else {
            localStorage.setItem('hour', now);
            window.location.reload();
         }



    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);