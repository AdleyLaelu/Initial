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

    //Convinience function for inserting innerHTML for 'select'
    var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };
    var showLoading = function (selector) {
        var html1 = "<div class='text-center'>";
        html1 += "<img src='Images/ajax-loader.gif'></div>";
        insertHtml(selector, html1);
        console.log(html1);
    };
 
    var insertProperty = function (ourHtml, propName, propValue) {
        var string = "{{" + propName + "}}";
        const temp = ourHtml.toString().replace(new RegExp(string, "g"), propValue);
        return temp; 
    }
  
    //On page load (before images or CSS)
    document.addEventListener("DOMContentLoaded", function (event) {
        //On first load, show home view
        showLoading("#main-content"); 
        $ajaxUtils.sendGetRequest(
            homeHtml, 
            function (ajaxResponse) {
                document.querySelector("#main-content").innerHTML = ajaxResponse.responseText;     
            },
            false);
        
    });  
    //Load the menu categories view
    dc.loadMenuCategories = function () {
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
       
        finalHtml += "<section class='row'>";
        for (var i = 0; i < categoriesdata.length; i++) {
            rr = categoriesdata[i];
            var html = categoryHtml.responseText;
            var name = rr.name;
            var short_name = rr.short_name;
            html = insertProperty(html, "name", name);
            html = insertProperty(html, "short_name", short_name);
            finalHtml += html; 
        }

        finalHtml += "</section>";
        return finalHtml;
    }
global.$dc = dc;
})(window);