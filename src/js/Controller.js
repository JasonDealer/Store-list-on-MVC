/* eslint-disable prettier/prettier */
/* eslint-disable max-nested-callbacks */
/* eslint-disable quotes */
import View from "./View.js";
import Model from "./Model.js";

/**
 * Controller class. Orchestrates the model and view objects. A "glue" between them.
 *
 * @param {View} view view instance.
 * @param {Model} model model instance.
 *
 * @constructor
 */
function Controller(view, model) {
    let urlStores = "http://localhost:3000/api/Stores";
    let urlProducts = "http://localhost:3000/api/Products";
    let storeProducts = [];
    let storeId;
    let counterOk,
        counterStorage,
        counterOut = 0;
    /**
	 * Initialize controller.
	 *
	 * @public
	 */
    this.init = function() {
        let storeList = view.getStoreList();
        let leftStoreList = view.getLeftList();
        let rollBtnStores = view.getRollBtnStores();
        let pinBtnStores = view.getPinStoresBtn();
        let productList = view.getRigthList();
        let rollBtnProducts = view.getrollBtnProducts();
        let searchBtn = view.getSearchBtn();
        let clearSearchBtn = view.getDelBtn();
        let storeSearchInput = document.querySelector("#search-input");
        let refreshSearchBtn = document.querySelector("#storeRefreshBtn");
        let btnStatusOk = view.getBtnStatusOk();
        let btnStatusStorage = view.getBtnStatusStorage();
        let btnStatusOut = view.getBtnStatusOut();
        let btnAllProducts = view.getBtnAllProducts();
        let btnCreateStore = view.getBtnCreationStore();
        let btnCancel = view.getBtnCreationCancel();
        let btnCreate = view.getBtnCreationCreate();
        let createProductBtn = view.getCreateProductBtn();
        let createProductModalBtn = view.getCreateProductModalBtn();
        let cancelProductModalBtn = view.getCancelProductModalBtn();
        let deleteStoreBtn = view.getDeleteStoreBtn();
        let confirmDeleteBtn = view.getConfirmDeleteBtn();
        let editProductModalBtn = view.getEditProductModalBtn();
        let hideBtn = view.getHideBtn();
        let sortByNameBtn = view.getSortByNameBtn();
        let sortByPriceBtn = view.getSortByPriceBtn();
        let sortBySpecsBtn = view.getSortBySpecsBtn();
        let sortBySupBtn = view.getSortBySupBtn();
        let sortByCountryBtn = view.getSortByCountryBtn();
        let sortByCompBtn = view.getSortByCompBtn();

        this.createStoreList();

        storeList.addEventListener("click", this.storeChoice);
        leftStoreList.addEventListener("scroll", () => {
            setInterval(this.changeStoreDividerDirection(rollBtnStores), 500);
        });
        rollBtnStores.addEventListener("click", view.scrollBack);
        pinBtnStores.addEventListener("click", view.pinSearch);
        productList.addEventListener("scroll", () => {
            setInterval(this.changeProductDividerDirection(rollBtnProducts), 500);
        });
        searchBtn.addEventListener("click", this.storeSearch);
        clearSearchBtn.addEventListener("click", this.searchClear);
        storeSearchInput.addEventListener("focus", () => {
            setInterval(() => {
                this.triggerClearBtn();
            }, 500);
        });
        refreshSearchBtn.addEventListener("click", this.refreshStoreList);
        storeList.addEventListener("click", this.count);
        btnStatusOk.addEventListener("click", () => {
            this.showOkCounter(btnStatusOk);
        });
        btnStatusStorage.addEventListener("click", () => {
            this.showStorageCounter(btnStatusStorage);
        });
        btnStatusOut.addEventListener("click", () => {
            this.showOutCounter(btnStatusOut);
        });
        btnAllProducts.addEventListener("click", () => {
            this.showAllProducts(btnAllProducts);
        });
        btnCreateStore.addEventListener("click", view.openModalStore);
        btnCancel.addEventListener("click", view.closeModalStore);
        btnCreate.addEventListener("click", this.createStore);
        createProductBtn.addEventListener("click", view.openModalProduct);
        createProductModalBtn.addEventListener("click", this.createProduct);
        cancelProductModalBtn.addEventListener("click", view.closeModalProduct);
        deleteStoreBtn.addEventListener("click", view.showConfirmation);
        confirmDeleteBtn.addEventListener("click", this.storeChoiceDelete);
        productList.addEventListener("click", this.findProduct);
        productList.addEventListener("click", view.openModalEdit);
        editProductModalBtn.addEventListener("click", this.editProduct);
        hideBtn.addEventListener("click", view.hideSideBar);
        sortByNameBtn.addEventListener("click", () => {
            view.tableSort(sortByNameBtn, 0);
        });
        sortByPriceBtn.addEventListener("click", () => {
            view.tableSort(sortByPriceBtn, 1);
        });
        sortBySpecsBtn.addEventListener("click", () => {
            view.tableSort(sortBySpecsBtn, 2);
        });
        sortBySupBtn.addEventListener("click", () => {
            view.tableSort(sortBySupBtn, 3);
        });
        sortByCountryBtn.addEventListener("click", () => {
            view.tableSort(sortByCountryBtn, 4);
        });
        sortByCompBtn.addEventListener("click", () => {
            view.tableSort(sortByCompBtn, 5);
        });
    };

    /**
	 * Fill the stores list with store-cards.
     *
	 * @public
	 */
    this.createStoreList = function() {
        model.fetchData(urlStores).then(function(res) {
            view.renderStoreList(res, view.createStoreCard);
        });
    };

    /**
	 * Changes the direction of the product-list button.
     *
     * @param {HTMLDivElement} btn product-list button that changes the direction with scrolling.
     *
     * @listens scroll
	 *
	 * @public
	 */
    this.changeStoreDividerDirection = function(btn) {
        let leftStoreList = view.getLeftList();
        if (leftStoreList.scrollTop >= 65) {
            view.renderDividerIconToTop(btn);
        } else {
            view.renderDividerIconToLow(btn);
        }
    };

    /**
	 * Changes the direction of the stores-list button.
     *
     * @param {HTMLDivElement} btn store-list button that changes the direction with scrolling.
     *
     * @listens scroll
	 *
	 * @public
	 */
    this.changeProductDividerDirection = function(btn) {
        let rightProductsList = view.getRigthList();
        if (rightProductsList.scrollTop >= 200) {
            view.renderDividerIconToTop(btn);
        } else {
            view.renderDividerIconToLow(btn);
        }
    };

    /**
	 * Search store click event handler.
	 *
	 * @listens click
	 *
	 * @public
	 */
    this.storeSearch = function() {
        let storesArray = [];
        let storeCards = view.getStoresArray();
        storeCards.forEach(card => {
            card.parentNode.removeChild(card);
        });
        model.fetchData(urlStores).then(function(res) {
            res.forEach(store => {
                var searchInput = view.getStoreSearchInput(),
                    inputValue = searchInput.value.toString(10).toUpperCase();
                if (
                    ~store.Name.toUpperCase().indexOf(inputValue) ||
                    ~store.Address.toUpperCase().indexOf(inputValue) ||
                    ~store.FloorArea.toString(10)
                        .toUpperCase()
                        .indexOf(inputValue)
                ) {
                    storesArray.push(store);
                    view.createStoreCard(store);
                }
            });
        });
    };

    /**
	 * Filter products by status OK event handler.
     *
	 * @param {HTMLDivElement} btn button with product status OK counter.
     *
	 * @listens click
	 *
	 * @public
	 */
    this.showOkCounter = function(btn) {
        counterOk = 0;
        let resultArr = storeProducts;
        let newArr = resultArr.filter(elem => elem.Status == "OK");
        counterOk = newArr.length;
        view.setOkNumber(counterOk);
        view.clearProductList();
        newArr.forEach(product => {
            view.renderProductList(product);
        });
        view.removeSelectionCount();
        view.setSelectionCount(btn);
    };

    /**
	 * Filter products by status Storage event handler.
     *
	 * @param {HTMLDivElement} btn button with product status STORAGE counter.
     *
	 * @listens click
	 *
	 * @public
	 */
    this.showStorageCounter = function(btn) {
        counterStorage = 0;
        let resultArr = storeProducts;
        let newArr = resultArr.filter(elem => elem.Status == "STORAGE");
        counterStorage = newArr.length;
        view.setStorageNumber(counterStorage);
        view.clearProductList();
        newArr.forEach(product => {
            view.renderProductList(product);
        });
        view.removeSelectionCount();
        view.setSelectionCount(btn);
    };

    /**
	 * Filter products by status OUT_OF_STOCK event handler.
     *
	 * @param {HTMLDivElement} btn button with product status OUT_OF_STOCK counter.
     *
	 * @listens click
	 *
	 * @public
	 */
    this.showOutCounter = function(btn) {
        counterOut = 0;
        let resultArr = storeProducts;
        let newArr = resultArr.filter(elem => elem.Status == "OUT_OF_STOCK");
        counterOut = newArr.length;
        view.setOutNumber(counterOut);
        view.clearProductList();
        newArr.forEach(product => {
            view.renderProductList(product);
        });
        view.removeSelectionCount();
        view.setSelectionCount(btn);
    };

    /**
	 * Disable status filter event handler and show all products.
     *
	 * @param {HTMLDivElement} btn button with product counter.
     *
	 * @listens click
	 *
	 * @public
	 */
    this.showAllProducts = function(btn) {
        let prodArray = storeProducts;
        prodArray.forEach(product => {
            view.renderProductList(product);
        });
        view.removeSelectionCount();
        view.setSelectionCount(btn);
    };

    /**
	 * Refresh store-list event handler.
     *
	 * @listens click
	 *
	 * @public
	 */
    this.refreshStoreList = function() {
        view.triggerRefreshAnimation();
        let storeCards = view.getStoresArray();
        storeCards.forEach(card => {
            card.parentNode.removeChild(card);
        });
        model.fetchData(urlStores).then(function(res) {
            view.renderStoreList(res, view.createStoreCard);
        });
        view.clearSearchInput();
    };

    /**
	 * Clearing search input event handler.
     *
	 * @listens click
	 *
	 * @public
	 */
    this.searchClear = function() {
        let storeCards = view.getStoresArray();
        storeCards.forEach(card => {
            card.parentNode.removeChild(card);
        });
        model.fetchData(urlStores).then(function(res) {
            view.renderStoreList(res, view.createStoreCard);
        });
        view.clearSearchInput();
    };

    /**
	 * Changes the button refresh to clear input.
     *
	 * @listens scroll
	 *
	 * @public
	 */
    this.triggerClearBtn = function() {
        let storeSearchInput = view.getSearchInput();

        if (storeSearchInput.value != "") {
            view.showClearBtn();
        } else {
            view.hideClearBtn();
        }
    };

    /**
	 * Choosing store event handler. Mark the choosen store and display information about it. Also create it's product list and count items by status.
     *
	 * @param {Event} event event of click.
     *
	 * @listens click
	 *
	 * @public
	 */
    this.storeChoice = function(event) {
        view.setOkNumber(0);
        view.setStorageNumber(0);
        view.setOutNumber(0);
        let storeCard = view.getStoresArray();
        view.showContent();
        view.sortReset();
        storeCard.forEach(function(entry) {
            if (entry.contains(event.target)) {
                storeId = view.getChoosenStoreId(entry);
                model.fetchData(urlStores).then(function(res) {
                    let resultStoreArray = res.filter(
                        elem => elem.id == storeId
                    );
                    resultStoreArray.forEach(store => {
                        if (storeId.replace(/\s/g, "") == store.id) {
                            let date = store.Established;
                            date = date.split("T")[0];
                            view.clearStoreChoice(storeCard);
                            view.renderStoreInfo(store, date);
                            view.setStoreChoice(entry);
                        }
                    });
                });
                model
                    .fetchData(
                        `http://localhost:3000/api/Products?filter={%22where%22:{%22StoreId%22:${storeId.replace(
                            /\s/g,
                            ""
                        )}}}`
                    )
                    .then(function(res) {
                        view.clearProductList();
                        storeProducts = res;
                        res.forEach(product => {
                            view.clearStoreChoice(storeCard);
                            view.setStoreChoice(entry);
                            view.renderProductList(product);
                        });
                    })
                    .then(function() {
                        let aRates = view.getRatingValue();
                        let nValueRate;
                        aRates.forEach(function(el) {
                            let rate = +view.getRatingRate(el);
                            nValueRate = Math.floor(rate);
                            view.renderRatingStars(el, nValueRate);
                        });
                    })
                    .then(function() {
                        if (storeProducts == []) {
                            counterOk = 0;
                            counterStorage = 0;
                            counterOut = 0;
                        }
                        view.countProducts();
                        storeProducts.forEach(product => {
                            if (product.Status == "OK") {
                                let newArr = storeProducts.filter(
                                    elem => elem.Status == "OK"
                                );
                                counterOk = newArr.length;
                                view.setOkNumber(counterOk);
                            } else if (product.Status == "STORAGE") {
                                let newArr = storeProducts.filter(
                                    elem => elem.Status == "STORAGE"
                                );
                                counterStorage = newArr.length;
                                view.setStorageNumber(counterStorage);
                            } else if (product.Status == "OUT_OF_STOCK") {
                                let newArr = storeProducts.filter(
                                    elem => elem.Status == "OUT_OF_STOCK"
                                );
                                counterOut = newArr.length;
                                view.setOutNumber(counterOut);
                            }
                        });
                    });
            }
        });
    };

    /**
	 * New store creation event handler.
     *
	 * @listens click
	 *
	 * @public
	 */
    this.createStore = function() {
        let name = view.getCreateStoreName(),
            email = view.getCreateStoreEmail(),
            phone = view.getCreateStorePhone(),
            address = view.getCreateStoreAddress(),
            estDate = view.getCreateStoreEstDate(),
            area = view.getCreateStoreArea();
        if (
            name == "" ||
            email == "" ||
            phone == "" ||
            address == "" ||
            estDate == "" ||
            area == ""
        ) {
            view.showStoreCreationWarnMessage();
        } else if (isNaN(area)) {
            view.showValidError();
        } else {
            let data = {
                "Name": `${name}`,
                "Email": `${email}`,
                "PhoneNumber": `${phone}`,
                "Address": `${address}`,
                "Established": `${estDate}`,
                "FloorArea": area
            };
            model.fetchDataPost(urlStores, data);
            view.closeModalStore();
            view.showToastStoreConfirm();
            setTimeout(() => {
                view.triggerRefreshAnimation();
                let storeCards = view.getStoresArray();
                storeCards.forEach(card => {
                    card.parentNode.removeChild(card);
                });
                model.fetchData(urlStores).then(function(res) {
                    view.renderStoreList(res, view.createStoreCard);
                });
                view.clearSearchInput();
            }, 500);
        }
    };

    /**
	 * New product creation event handler.
     *
	 * @listens click
	 *
	 * @public
	 */
    this.createProduct = function() {
        let name = view.getCreateProductName(),
            price = view.getCreateProductPrice(),
            specs = view.getCreateProductSpecs(),
            rating = view.getCreateProductRating(),
            supplier = view.getCreateProductSupplier(),
            country = view.getCreateProductCountry(),
            manufacturer = view.getCreateProductManufacturer(),
            status = view.getCreateProductStatus();

        if (
            name == "" ||
            price == "" ||
            specs == "" ||
            rating == "" ||
            supplier == "" ||
            country == "" ||
            manufacturer == "" ||
            status == ""
        ) {
            view.showStoreCreationWarnMessage();
        } else if (isNaN(rating) || rating < 1 || rating > 5) {
            view.showValidErrorProductRating();
        } else if (isNaN(price)) {
            view.showValidErrorProductPrice();
        } else {
            let data = {
                "Name": `${name}`,
                "Price": price,
                "Photo": "string",
                "Specs": `${specs}`,
                "Rating": rating,
                "SupplierInfo": `${supplier}`,
                "MadeIn": `${country}`,
                "ProductionCompanyName": `${manufacturer}`,
                "Status": `${status}`,
                "StoreId": storeId
            };
            model.fetchDataPost(urlProducts, data).then(function() {
                model
                    .fetchData(
                        `${urlProducts}?filter={%22where%22:{%22StoreId%22:${storeId.replace(
                            /\s/g,
                            ""
                        )}}}`
                    )
                    .then(function(res) {
                        view.clearProductList();
                        res.forEach(product => {
                            view.renderProductList(product);
                            let aRates = view.getRatingValue();
                            let nValueRate;
                            aRates.forEach(function(el) {
                                let rate = +view.getRatingRate(el);
                                nValueRate = Math.floor(rate);
                                view.renderRatingStars(el, nValueRate);
                            });
                        });
                    });
            });
            view.closeModalProduct();
            view.showToastProductConfirm();
        }
    };

    /**
	 * Choosen store delete event handler. Delete the choosen store
     *
	 * @listens click
	 *
	 * @public
	 */
    this.storeChoiceDelete = function() {
        let url = `${urlStores}/${storeId.replace(/\s/g, "")}`;
        model.fetchDataDelete(url);
        setTimeout(() => {
            view.triggerRefreshAnimation();
            let storeCards = view.getStoresArray();
            storeCards.forEach(card => {
                card.parentNode.removeChild(card);
            });
            model.fetchData(urlStores).then(function(res) {
                view.renderStoreList(res, view.createStoreCard);
            });
            view.clearSearchInput();
        }, 700);
        view.showMockAfterDelete();
    };

    /**
	 * Product delete event handler. Finds choosen product and delete it.
     *
     * @param {Event} event event of click.
     *
	 * @listens click
	 *
	 * @public
	 */
    this.findProduct = function(event) {
        let delBtns = view.getDelProductBtn();
        delBtns.forEach(function(entry) {
            view.removeChooseClassItem(entry);
            if (entry.contains(event.target)) {
                let productId = view.getChoosenItem(entry);
                let url = `${urlProducts}/${productId.replace(/\s/g, "")}`;
                model.fetchDataDelete(url).then(function() {
                    model
                        .fetchData(
                            `${urlProducts}?filter={%22where%22:{%22StoreId%22:${storeId.replace(
                                /\s/g,
                                ""
                            )}}}`
                        )
                        .then(function(res) {
                            view.clearProductList();
                            res.forEach(product => {
                                view.renderProductList(product);
                                let aRates = view.getRatingValue();
                                let nValueRate;
                                aRates.forEach(function(el) {
                                    let rate = +view.getRatingRate(el);
                                    nValueRate = Math.floor(rate);
                                    view.renderRatingStars(el, nValueRate);
                                });
                            });
                        });
                });
            }
        });
    };

    /**
	 * Product editing event handler. Finds choosen product open the editing modal window and put edited product to the DB.
     *
	 * @listens click
	 *
	 * @public
	 */
    this.editProduct = function() {
        let productId = view.getEditingId();
        let name = view.getCreateProductName(),
            price = view.getCreateProductPrice(),
            specs = view.getCreateProductSpecs(),
            rating = view.getCreateProductRating(),
            supplier = view.getCreateProductSupplier(),
            country = view.getCreateProductCountry(),
            manufacturer = view.getCreateProductManufacturer(),
            status = view.getCreateProductStatus();
        if (
            name == "" ||
            price == "" ||
            specs == "" ||
            rating == "" ||
            supplier == "" ||
            country == "" ||
            manufacturer == "" ||
            status == ""
        ) {
            view.showStoreCreationWarnMessage();
        } else if (isNaN(rating) || rating < 1 || rating > 5) {
            view.showValidErrorProductRating();
        } else if (isNaN(price)) {
            view.showValidErrorProductPrice();
        } else {
            let data = {
                "Name": `${name}`,
                "Price": price,
                "Photo": "string",
                "Specs": `${specs}`,
                "Rating": rating,
                "SupplierInfo": `${supplier}`,
                "MadeIn": `${country}`,
                "ProductionCompanyName": `${manufacturer}`,
                "Status": `${status}`,
                "StoreId": +storeId.replace(/\s/g, ""),
                "id": +productId
            };
            model.fetchDataPut(urlProducts, data).then(function() {
                model
                    .fetchData(
                        `${urlProducts}?filter={%22where%22:{%22StoreId%22:${storeId.replace(
                            /\s/g,
                            ""
                        )}}}`
                    )
                    .then(function(res) {
                        view.clearProductList();
                        res.forEach(product => {
                            view.renderProductList(product);
                        });
                    });
            });
            view.closeModalProduct();
        }
    };
}

new Controller(new View(), new Model()).init();
