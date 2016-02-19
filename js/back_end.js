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

var globals = (function (ns) {
    ns.FILESDIR = "http://shieldhardware.hol.es";
    return ns;
}({}));

function sanitize(data) {
    return data ? data : " ";
}

function getNewProducts(callback) {
    var request = new XMLHttpRequest(),
        timeoutSearch,
        id = sanitize($id("input_search").value),
        url = globals.FILESDIR + "/buscar.php";
    request.open('GET', url);
    generateLoad();
    timeoutSearch = setTimeout(function () {
        request.abort();
        generateError(ns.ERROR_TIMEOUT, ns.ERROR_IMAGE);
    }, 10000);
    request.onreadystatechange = function () {
        if(request.readyState === 4 && request.status === 200) {
            clearTimeout(timeoutSearch);
            callback.call(callback, request);
        }
        return undefined;
    };
    request.send(null);
}


function getSearch(callback) {
    var request = new XMLHttpRequest(),
        timeoutSearch,
        id = sanitize($id("input_search").value),
        url = globals.FILESDIR + "/buscar/" + id + "/product";
    request.open('GET', url);
    generateLoad();
    timeoutSearch = setTimeout(function () {
        request.abort();
        generateError(ns.ERROR_TIMEOUT, ns.ERROR_IMAGE);
    }, 10000);
    request.onreadystatechange = function () {
        if(request.readyState === 4 && request.status === 200) {
            clearTimeout(timeoutSearch);
            callback.call(callback, request);
        }
        return undefined;
    };
    request.send(null);
}

function getClue(callback) {
    var request = new XMLHttpRequest(),
        timeoutClue,
        input = sanitize($id("input_search").value),
        url = globals.FILESDIR + "/dataset/" + input + "/product";
    request.open('GET', url);
    timeoutClue = setTimeout(function () {
        request.abort();
    }, 5000);
    request.onreadystatechange = function () {
        if(request.readyState === 4 && request.status === 200) {
            clearTimeout(timeoutClue);
            callback.call(callback, request);
        }
        return undefined;
    };
    request.send(null);
}

function getDescription(callback) {
    var request = new XMLHttpRequest(),
        timeoutDescription,
        id = this.dataset.id,
        url = globals.FILESDIR + "/description/" + id;
    request.open('GET', url);
    generateLoad();
    timeoutDescription = setTimeout(function () {
        request.abort();
        generateError(ns.ERROR_TIMEOUT, ns.ERROR_IMAGE);
    }, 10000);
    request.onreadystatechange = function () {
        if(request.readyState === 4 && request.status === 200) {
            clearTimeout(timeoutDescription);
            callback.call(callback, request);
        }
        return undefined;
    };
    request.send(null);
}


function showDescription(request) {
    var json = JSON.parse(request.responseText);
        createDescription(json);
}
function showClueSearch(request) {
    var json = JSON.parse(request.responseText);
        createClueSearch(json);
}

window.addEventListener("load", function () {
    var resource = "http://shieldhardware.hol.es",
        doRequestCallback = getSearch.bind(this, showJson),
        doNewProducts = getNewProducts.bind(this, showJson),
        doShowDescription, 
        products = document.querySelectorAll("#escaparate .producto"),
        doRequestClue = getClue.bind(this, showClueSearch);
    Array.prototype.forEach.call(products, function (x) {
        doShowDescription = getDescription.bind(x, showDescription),
        x.addEventListener("click", doShowDescription, false);
    });
    $id("btn_search").addEventListener("click", doRequestCallback, false);
    $id("input_search").addEventListener("keyup", doRequestClue, false);
    $id("newproducts").addEventListener("click", doNewProducts, false);
}, false);