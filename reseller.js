var reseller_list =  (countrycode) => {
     
    $.ajax({
        type: "post",
        url: "//nextbase-d2c-apps.herokuapp.com/get_retailer_api",
        data: {"country_code":countrycode},
        cache: false,
        dataType: "json",
        success: function(data){
            console.log(data)
            console.log('currency success')
           if(data)
                {
             $('.howtobuyrow').replaceWith(`<div class="row howtobuylis" style="margin-top:20px"></div>`)
            data.forEach( main => {
                console.log(main)
                console.log('retailer_name',main.retailer_name)
                str = main.retailer_name.replace(/\s+/g, '-');
                var button_name = "Buy Now"
                if(main.button_name)
                    {
                        button_name = main.button_name
                    }
                $('.howtobuylis').append(`
          <div class="col-xs-6 col-sm-3 col-md-2">
          <div class="col-xs-1 col-sm-2 col-md-2"></div>
          <div class="col-xs-10 col-sm-8 col-md-8">
              <div class="listcontent text-center">
                      <img src="${main.Image_link}" style="width:75px;height: 75px;object-fit: contain;">
              </div>
              <div class="howtobuybutton" style="margin-top: 20px; padding-bottom: 20px;   display: grid;">
              <a data-link="/retailer?country=${countrycode}&retailer=${str}&product=${pid}" class="addtocart_zeno">${button_name}</a>
              </div>
              </div>
          <div class="col-xs-1 col-sm-2 col-md-2"></div>
          </div>
          `)
                
            })
                }
        },
      error: function (jqXHR, exception) {
          console.log('currency error')

          },
      });
}


// fetch graphql 
var reseller_graph =  (token,pid) => {

      //geting product data from graph ql
      var data1 = fetch('/graphql', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`},
        body: JSON.stringify({
            query: `
            query productById{
   site {
    product(entityId: ${pid}) {
      id
      sku
      entityId
      name
       defaultImage {
        url(width: 320)
     }
    }
  }
}

`
      }),
      })
      .then(res => res.json())
      .then(data1 => {
          
          var image  = data1.data.site.product.defaultImage.url;
          var sku  = data1.data.site.product.sku;
           $(".product-class-popup").children().hide();
          $(".product-class-popup").html(`<div class="zn-element zn-lg"><div class="zn-image"><img class="zn-nodrag" src="${image}" alt="" draggable="false" data-element-animation="" style="width: 144px;" data-scroll-animation=""></div></div> `)
          $('.add-to-cart-btn-popup').attr('data-product-main', sku);
          console.log('image',image)
          console.log('sku',sku)
//          $(".zn-product-image").html(`<div class="zn-element zn-lg"><div class="zn-image"><img class="zn-nodrag" src="${image}" alt="" draggable="false" data-element-animation="" data-scroll-animation=""></div></div>`)
      });
}
