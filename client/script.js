$(function() {


    /*first i  get data from the  server but the free api  was end 
   // i have exceeded the rate limit per second for free plan, BASIC, by the API provider
    $.get("http://localhost:3000/products", function(data, status) {
        let items = JSON.parse(data);
        let limit = items.results.length >= 3 ? 3 : items.results.length;
*/



    // initial local products
    let products = [{
            "asin": "B087623TMW",
            "thumbnail": "https://m.media-amazon.com/images/I/810DvHOZ9nL.ACUL320.jpg",
            "title": "New Apple iPhone SE (64GB, (Product) RED) [Locked]"
        },
        {
            "asin": "B07XSQT4Q3",
            "thumbnail": "https://m.media-amazon.com/images/I/71xn9bCRfhL.ACUY218.jpg",
            "title": "Apple iPhone 11 (64GB, Purple) [Locked] "
        },
        {
            "asin": "B01N2K14U7",
            "thumbnail": "https://m.media-amazon.com/images/I/61+fbdrjtCL.ACUY218.jpg",
            "title": "Simple Mobile Prepaid - Apple iPhone 7 (32GB)"
        }
    ];


    for (let i = 0; i < products.length; i++) {

        let div = $("<div>");
        div.addClass("product-card");
        let img = $("<img>");
        img.attr("src", products[i].thumbnail);
        div.append(img);
        let h2 = $("<h2>");
        h2.html(products[i].title);
        div.append(h2);
        let button = $("<button>");
        button.html('Details');
        button.attr("onClick", "showDescription('" + products[i].asin + "')");

        div.append(button);

        $(".products").append(div);


    }


});

const showDescription = function(asin) {

    var modal = $("#myModal");
    $.get("http://localhost:3000/products/" + asin, function(data, status) {
        modal.show();
        $("#description").html(data.description);
    });

};

const closeDescription = function() {
    var modal = $("#myModal");
    modal.hide();
    $("#description").html("");

};