

function closeCart(e,el){
    e.preventDefault();
    $("body").removeClass("cartShown");
}

$(document).on("click",".overlay",function(e) {
    $("body").removeClass("cartShown");
});



$( ".single-product__atc").on("click", function (e) {
    e.preventDefault();
    $.ajax({
          type: 'POST', 
          url: '/cart/add.js',
          dataType: 'json', 
          data: $('.single-product-form').serialize(),
          success: function(data) {
             get_cart_details();
            $('body').addClass('cartShown');
          },
          error: 'addToCartFail'
      });
      
  });


  function get_cart_details(){
    fetch("?section_id=cart-drawer")
      .then((response) => response.text())
      .then((cartData) => {
        var cart_html = $(cartData);
        var cart_items = $(".cart-wrap", cart_html);
        $(".cart-wrap").replaceWith(cart_items);

      });
  
      fetch("?section_id=header")
      .then((response) => response.text())
      .then((cartData) => {
        var cart_html = $(cartData);

        var cart_count = $(".cart-icon dfn", cart_html);
        $(".cart-icon dfn").replaceWith(cart_count);

      });
      
  
  };


  function change_qty($input){
    var variant_id= $($input).attr("data-id");
    var quantity= $($input).val();          
    var data = { updates: {} };
    data.updates[variant_id] = quantity;
    jQuery.ajax({
      type: 'POST',
      url: '/cart/update.js',
      data: data,
      dataType: 'json',
      success: function(res) {               
        get_cart_details();
      }
    });
  };


  function increaseItem(e, el) {
    var $input = el.previousElementSibling;
    var value = parseInt($input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    $input.value = ('0' + value).slice(-2);            
    change_qty($input);
  }
  
  function decreaseItem(e, el) {
    var $input = el.nextElementSibling;
    var value = parseInt($input.value, 10);
    if (value > 1) {
        value = isNaN(value) ? 0 : value;
        value--;
        $input.value = ('0' + value).slice(-2);         
        change_qty($input);
    }
  }


//   Product Page Inccrease Button
function increaseCount1(e, el) {
    var $input = el.previousElementSibling;
    var value = parseInt($input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    $input.value = ('0' + value).slice(-2);            
}

function decreaseCount1(e, el) {
    var $input = el.nextElementSibling;
    var value = parseInt($input.value, 10);
    if (value > 1) {
        value = isNaN(value) ? 0 : value;
        value--;
        $input.value = ('0' + value).slice(-2);         
    }
}

//   Remove
function itemRemove(e , el){
        e.preventDefault();
        var variant_id = $(el).attr('data-id');
        console.log(variant_id);
        var data = { updates: {} };
        data.updates[variant_id] = '0';
        jQuery.ajax({
          type: 'POST',
          url: '/cart/update.js',
          data: data,
          dataType: 'json',
          success: function(res) {
            get_cart_details();
          }
        });
            //  $(el).parent().parent().remove();
}


