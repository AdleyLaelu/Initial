$(function() { //Same as document.addEventListener("DOMContentLoaded") 
    //Same as document.querySelector("#navbarToggle").addEventListener("bl")
$("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
        $("#collapsable-nav").collapse('hide');
    }
});

});

(function(global) {
    var dc = {};

    

    var homeHtml = "snippets/home-snippet.html";
    var allCategoriesUrl = "http://davids-restaurant.herokuapp.com/categories.json";
    var categoriesTitleHtml = "snippets/categories-title-snippet.html";
    var categoryHtml = "snippets/category-snippet.html";

    // var menuItemsUrl = "http://davis-restaurant.herokuapp.com/menu_items.json?category=";
    // var menuItemsTitleHtml = "snippets/menu-items-title.html";
    // var menuItemHtml= "snippets/menu-items-title.html";
    // var menuItemHtml = "snippets/menu-item.html";
    //Convinience function for inserting innerHTML for 'select'
    var insertHtml = function (selector, html) { 
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };
    ///Show loading icon inside element idedntified by 'selector'
    var showLoading = function (selector) {
        var html1 = "<div class='text-center'>";
        html1 += "<img src ='Images/ajax-loader.gif' alt='image'></div>";
        insertHtml(selector, html1);
    };
 
    //Return substitute of '{{propName}}'
    //with propValue in given 'string'
    //Uses categories-title-snippet
    var insertProperty = function (string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        string = string.replace(new RegExp(propToReplace, "g"), propValue);
        return string;
        
    }
  
    //On page load (before images or CSS)
    document.addEventListener("DOMContentLoaded", function (event) {
        //On first load, show home view
        showLoading("#main-content"); 
        $ajaxUtils.sendGetRequest(homeHtml, function (ajaxResponse) { 
                document.querySelector("#main-content").innerHTML = ajaxResponse.response;
                // console.log(ajaxResponse)     
            },
            false);
        
    });

    //load the menu categories view
    dc.loadMenuCategories = function () {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML)
    };


    // //Load the menu items view
    // //'categoryShort' is a short_name for a category
    // dc.loadMenuItems = function (categoryShort) {
    //     showLoading("#main-content");
    //     $ajaxUtils.sendGetRequest(menuItemsUrl + categoryShort, buildAndShowMenuItemsHTML);
    // };

    //Builds HTML for the categories page based on the data
    //from the server
    function buildAndShowCategoriesHTML(categories) {
        //load title snippet of categories page
        $ajaxUtils.sendGetRequest(categoriesTitleHtml, function(categoriesTitleHtml) {
        //Retrieve single category snippet
        $ajaxUtils.sendGetRequest(categoryHtml, function (categoryHtml) {
        var categoriesViewHtml = buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml);
        insertHtml("#main-content", categoriesViewHtml);
        
            
        },
        false);
        },
        false);
        
    }

    //Using categories data and snippets html
    //build categories view HTML to be inserted into page
    function buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml) {
        var finalHtml = categoriesTitleHtml.response;
        finalHtml += "<section class='row'>";
        var newCategories = categories.responseText
        console.log(categories.responseText);
        //Loop over categories
        for (var i = 0; i < newCategories.length; i++) {
            //Insert category values
            var html = categoryHtml;
            var name = "" + newCategories[i].name;
            var short_name = newCategories[i].short_name;
            html = insertProperty(html, "name", name);
            html = insertProperty(html,"short_name", short_name);
            finalHtml += html; 
        }

        finalHtml += "</section>";
        return finalHtml;
    }

//     //Builds HTML for the single category page based on the data 
//     //from the server
//     function buildAndShowMenuItemsHTML(categoryMenuItems) {
//         //Load title snippet of menu items page
//         $ajaxUtils.sendGetRequest(
//             menuItemsTitleHtml,
//             function (menuItemHtml) {
//                 var menuItemsViewHtml = buildMenuItemsViewHtml(categoryMenuItems,
//                                                                menuItemsTitleHtml,
//                                                                menuItemHtml);
//     insertHtml("#main-content", menuItemsViewHtml);
// },
// false);
// },
// false);
// }

    global.$dc = dc;


})(window);













$(function() { //Same as document.addEventListener("DOMContentLoaded") 
    //Same as document.querySelector("#navbarToggle").addEventListener("bl")
$("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
        $("#collapsable-nav").collapse('hide');
    }
});

});

(function(global) {
    var dc = {};

    

    var homeHtml = "snippets/home-snippet.html";
    var allCategoriesUrl = "http://davids-restaurant.herokuapp.com/categories.json";
    var categoriesTitleHtml = "snippets/categories-title-snippet.html";
    var categoryHtml = "snippets/category-snippet.html";

    
    var menuItemsUrl = "http://davis-restaurant.herokuapp.com/menu_items.json?category=";
    var menuItemsTitleHtml = "snippets/menu-items-title.html";
    var menuItemHtml = "snippets/menu-item.html";

    //Convinience function for inserting innerHTML for 'select'
    var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };
    
    ///Show loading icon inside element idedntified by 'selector'
    // var showLoading = function (selector) {
    //     var html1 = '<div class="text-center">';
    //     html1 += '<img src="Images/ajax-loader.gif"></div>';
    //     // alert(html1);
    //     insertHtml(selector, html1);
    // };
    var showLoading = function (selector) {
        var html1 = "<div class='text-center'>";
        html1 += "<img src='Images/ajax-loader.gif'></div>";
        // alert(html1);
        insertHtml(selector, html1);
        console.log(html1);
    };
 
    //Return substitute of '{{propName}}'
    //with propValue in given 'string'
    //Uses categories-title-snippet
    // var insertProperty = function (ourHtml, propName, propValue) {
    //     var string = "{{" + propName + "}}";
    //     ourHtml.replace(new RegExp(propName, "g"), propValue);
    //     return ourHtml; 
    // }
    var insertProperty = function (ourHtml, propName, propValue) {
        var string = "{{" + propName + "}}";
        const temp = ourHtml.toString().replace(new RegExp(string, "g"), propValue);
        return temp; 
    }
  
    //On page load (before images or CSS)
    document.addEventListener("DOMContentLoaded", function (event) {
        //alert("Loading");
        //On first load, show home view
        showLoading("#main-content"); 
        $ajaxUtils.sendGetRequest(
            homeHtml, 
            function (ajaxResponse) {
                //console.log(ajaxResponse); 
                //alert(typeof ajaxResponse.response);
                document.querySelector("#main-content").innerHTML = ajaxResponse.responseText;
                // console.log(ajaxResponse)     
            },
            false);
        
    });  
    //Load the menu categories view
    dc.loadMenuCategories = function () {
        //alert("loading");
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML)
    };
    
    //load the menu categories view
    //'categoryShort' is a short_name for a category

    dc.loadMenuItems = function (categoryShort) {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(menuItemsUrl + categoryShort, 
                               buildAndShowMenuItemsHTML);
    };


    //Builds HTML for the categories page based on the data
    //from the server
    function buildAndShowCategoriesHTML(categories) {
        //load title snippet of categories page
        $ajaxUtils.sendGetRequest(
            categoriesTitleHtml, 
            function(categoriesTitleHtml) {
                //Retrieve single category snippet
                $ajaxUtils.sendGetRequest(
                    categoryHtml, 
                    function (categoryHtml) {
                        var categoriesViewHtml = buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml);
                        insertHtml("#main-content", categoriesViewHtml);
                    },
                    false
                );
            },
            false
        );
    }

    //Using categories data and snippets html
    //build categories view HTML to be inserted into page
    function buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml) {
        //alert(typeof categories.responseText);
        //console.log(categories.responseText);
        var finalHtml = categoriesTitleHtml.responseText;
        var categoriesdata = JSON.parse(categories.responseText);
        //console.log(JSON.parse(categories.responseText));
        // console.log(categoriesdata);
        // console.log(categoriesdata.length);
        finalHtml += "<section class='row'>";
        // var newCategories = categories.responseText
        // console.log(categories.responseText);
        //Loop over categories
        for (var i = 0; i < categoriesdata.length; i++) {
            rr = categoriesdata[i];
            // console.log(rr);
            //Insert category values
            var html = categoryHtml.responseText;
            // console.log(html);
            var name = rr.name;
            var short_name = rr.short_name;
            // console.log(name);
            html = insertProperty(html, "name", name);
            html = insertProperty(html, "short_name", short_name);
            finalHtml += html; 
        }

        finalHtml += "</section>";
        //alert("Finalhtml");
        //alert(finalHtml);
        return finalHtml;
    }


    global.$dc = dc;


})(window);