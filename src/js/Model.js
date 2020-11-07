/* eslint-disable prettier/prettier */
/* eslint-disable max-nested-callbacks */
/* eslint-disable quotes */

/**
 * Model class. Knows everything about API endpoint and data structure. Can format/map data to any structure.
 *
 * @constructor
 */
function Model() {
    /**
     * Common method which "promisifies" the XHR calls.
     *
     * @param {string} url the URL address to fetch.
     *
     * @return {Promise} the promise object will be resolved once XHR gets loaded/failed.
     *
     * @public
     */
    this.fetchData = function(url) {
        return new Promise(function(resolve, reject) {
            let req = new XMLHttpRequest();

            req.open("GET", url, true);

            // listen to load event
            req.addEventListener("load", function() {
                if (req.status < 400) {
                    resolve(JSON.parse(req.response));
                } else {
                    reject(new Error("Request failed: " + req.statusText));
                }
            });

            // listen to error event
            req.addEventListener("error", function() {
                reject(new Error("Network error"));
            });

            req.send(null);
        });
    };

    /**
     * Common method which "promisifies" the XHR calls.
     *
     * @param {string} url the URL address to fetch.
     *
     * @param {object} data the object to post on the db.
     *
     * @return {Promise} the promise object will be resolved once XHR gets loaded/failed.
     *
     * @public
     */
    this.fetchDataPost = function(url, data) {
        return new Promise(function(resolve, reject) {
            let req = new XMLHttpRequest();

            req.open("POST", url, true);
            req.setRequestHeader("Content-Type", "application/json");
            // listen to load event
            req.addEventListener("load", function() {
                if (req.status < 400) {
                    resolve(req.responseText);
                } else {
                    reject(new Error("Request failed: " + req.statusText));
                }
            });

            // listen to error event
            req.addEventListener("error", function() {
                reject(new Error("Network error"));
            });

            let postData = JSON.stringify(data);
            req.send(postData);
        });
    };

    /**
     * Common method which "promisifies" the XHR calls.
     *
     * @param {string} url the URL address to fetch.
     *
     * @return {Promise} the promise object will be resolved once XHR gets loaded/failed.
     *
     * @public
     */
    this.fetchDataDelete = function(url) {
        return new Promise(function(resolve, reject) {
            let req = new XMLHttpRequest();

            req.open("DELETE", url, true);
            req.setRequestHeader("Content-Type", "application/json");
            // listen to load event
            req.addEventListener("load", function() {
                if (req.status < 400) {
                    resolve(req.responseText);
                } else {
                    reject(new Error("Request failed: " + req.statusText));
                }
            });

            // listen to error event
            req.addEventListener("error", function() {
                reject(new Error("Network error"));
            });

            req.send(null);
        });
    };

    /**
     * Common method which "promisifies" the XHR calls.
     *
     * @param {string} url the URL address to fetch.
     *
     * @param {object} data the object to PUT on the db.
     *
     * @return {Promise} the promise object will be resolved once XHR gets loaded/failed.
     *
     * @public
     */
    this.fetchDataPut = function(url, data) {
        return new Promise(function(resolve, reject) {
            let req = new XMLHttpRequest();

            req.open("PUT", url, true);
            req.setRequestHeader("Content-Type", "application/json");
            // listen to load event
            req.addEventListener("load", function() {
                if (req.status < 400) {
                    resolve(JSON.parse(req.response));
                } else {
                    reject(new Error("Request failed: " + req.statusText));
                }
            });

            // listen to error event
            req.addEventListener("error", function() {
                reject(new Error("Network error"));
            });

            let postData = JSON.stringify(data);
            req.send(postData);
        });
    };
}

export default Model;