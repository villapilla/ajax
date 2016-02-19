/*jslint
    browser:true,
    node:true,
*/
/*globals
    XMLHttpRequest,
    document
*/

'use strict';

function $id(id) {
    return document.getElementById(id);
}


var ns = (function (ns) {
    ns.PRODUCT_BOX = "";
    ns.LOAD_IMAGE = "img/load.gif";
    ns.ERROR_IMAGE = "img/sad.png";
    ns.ERROR_TIMEOUT = "Se ha producido un error disculpe las molestias";
    ns.ERROR_NO_RESULT = "No encontramos resultados a su consulta";
    return ns;
}({}));

function generateBox(parent, tag, classValue) {
    var element = document.createElement(tag);
    element.className = classValue;
    return parent.appendChild(element);
}

function generateTextElement(tag, text, classValue) {
    var element = document.createElement(tag),
        lineText = document.createTextNode(text);
    element.appendChild(lineText);
    element.setAttribute("class", classValue);
    return element;
}

function createProduct(product) {
    var container = document.createElement("li"),
        article = generateBox(container, "article", ""),
        figure = generateBox(article, "figure", ""),
        img = generateBox(figure, "img", ""),
        dorequest = getDescription.bind(container, showDescription);
    container.dataset.id = product.id;
    container.className = "producto col-md-4 col-sm-6 col-xs-12 col-lg-3";
    container.addEventListener("click", dorequest, false);
    figure.appendChild(generateTextElement("span", product.name, ""));
    article.appendChild(generateTextElement("var", product.price, ""));
    img.src = product.image;
    return container;
}

function createContent(ArrayObject) {
    var contentProduct = $id("escaparate").cloneNode(false);
    ArrayObject.forEach(function (x) {
        contentProduct.appendChild(createProduct(x));
    });
    $id("descripcion").replaceChild(contentProduct, $id("escaparate"));
}


function createDescription(product) {
    var contentProduct = $id("escaparate").cloneNode(false),
        container = document.createElement("li"),
        description = document.createElement("div"),
        article = generateBox(container, "article", ""),
        figure = generateBox(article, "figure", ""),
        img = generateBox(figure, "img", "");
    container.dataset.id = product.id;
    container.className = "producto col-md-4 col-sm-6 col-xs-12 col-lg-4";
    description.className = "col-md-8 col-lg-8 col-sm-6 col-xs-12";
    description.appendChild(generateTextElement("h1" ,product.name, ""));
    description.appendChild(generateTextElement("p", product.description, ""));
    description.appendChild(generateTextElement("var",
        product.price + "€ | Comprar", "btn btn-warning"));
    img.src = product.image;
    contentProduct.appendChild(container);
    contentProduct.appendChild(description);
    $id("descripcion").replaceChild(contentProduct, $id("escaparate"));
}

function generateLoad() {
    var contentProduct = $id("escaparate").cloneNode(false),
        figure = generateBox(contentProduct, "figure", "flipper"),
        img = generateBox(figure, "img", "front");
    figure.className = "row";
    img.className = "col-xs-2 col-xs-offset-5";
    img.src = ns.LOAD_IMAGE;
    $id("descripcion").replaceChild(contentProduct, $id("escaparate"));
}

function generateError(error, errorImg) {
    var contentProduct = $id("escaparate").cloneNode(false),
        figure = generateBox(contentProduct, "figure", "row"),
        message = generateTextElement("h1", error, "col-xs-5"),
        img = generateBox(figure, "img", "col-xs-2 col-xs-offset-3");
    figure.appendChild(message);
    img.src = errorImg;
    $id("descripcion").replaceChild(contentProduct, $id("escaparate"));
}

function createClueSearch(json) {
    var contentReferences = $id("option").cloneNode(false);
    json.forEach(function (x) {
        contentReferences.appendChild(createClue(x));
    });
    $id("search2").children[0].replaceChild(contentReferences, $id("option"));
    if($id("input_search").value !== "" && json.length) {
        contentReferences.className = "";
    } else {
        contentReferences.className = "no_display";
    }
}

function createClue(product) {
    var container = document.createElement("li"),
        span = generateTextElement("span", product.name, ""),
        img = generateBox(container, "img", ""),
        dorequest = getDescription.bind(container, showDescription);
    img.src = product.image;
    container.appendChild(span);
    container.dataset.id = product.id;
    container.addEventListener("click", dorequest, false);
    return container;
}