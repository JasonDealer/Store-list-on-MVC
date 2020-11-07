/* eslint-disable prettier/prettier */
/* eslint-disable max-nested-callbacks */
/* eslint-disable quotes */


/**
 * View class. Knows everything about dom & manipulation and a little bit about data structure, which should be
 * filled into UI element.
 *
 * @constructor
 */
function View() {
    /**
     * DOM elements.
     * @constant
     * @type {}
     */
    const storeList = document.querySelector(".store-list"),
        productList = document.querySelector(".product-table"),
        pinBtnStores = document.querySelector("#pinBtnStores"),
        refreshBtn = document.querySelector("#storeRefreshBtn"),
        deleteBtn = document.querySelector("#storeDeleteBtn"),
        storeSearchInput = document.querySelector("#search-input"),
        btnStatusOk = document.querySelector(".switch-ok"),
        btnStatusStorage = document.querySelector(".switch-storage"),
        btnStatusOut = document.querySelector(".switch-out"),
        btnAllProducts = document.querySelector(".item-count-icon"),
        editProductModalBtn = document.querySelector(".edit-product-modal-btn"),
        createProductModalBtn = document.querySelector(
            ".create-product-modal-btn"
        ),
        hideBtn = document.querySelector(".menu-btn");

    /**
     * Fill the store-card with store-info.
     *
     * @param {Object} store the store data object.
     *
     * @public
     */
    this.createStoreCard = function(store) {
        storeList.innerHTML += `
            <div class="item-card">
                <div class="item-name">
                    ${store.Name}
                </div>
                <div class="item-description">
                    ${store.Address}
                </div>
                <div class="measure">
                    ${store.FloorArea}
                    <div class="units">
                        sq.m
                    </div>
                </div>
                <div class="store-id" style="display:none;">
                    ${store.id}
                </div>
            </div>
        `;
    };

    /**
     * Fill the data into store-list.
     *
     * @param {Array} array array of store-cards.
     *
     * @param {function} func a function that render store-card.
     *
     * @public
     */
    this.renderStoreList = function(array, func) {
        array.forEach(store => {
            func(store);
        });
    };

    /**
     * Hide the mock and shows store info.
     *
     * @public
     */
    this.showContent = function() {
        let mock = document.querySelector(".store-mock");
        let rightList = document.querySelector(".right-list");
        mock.classList.add("hide");
        rightList.classList.remove("hide");
    };

    /**
     * Clears product list.
     *
     * @public
     */
    this.clearProductList = function() {
        productList.innerHTML = "";
    };

    /**
     * Add class choosen to the store-card.
     *
     * @param {HTMLDivElement} entry store card.
     *
     * @public
     */
    this.setStoreChoice = function(entry) {
        entry.classList.add("chosen");
    };

    /**
     * Remove class choosen from all store-cards.
     *
     * @param {Array} storeCardArray array of store-cards.
     *
     * @public
     */
    this.clearStoreChoice = function(storeCardArray) {
        storeCardArray.forEach(e => {
            e.classList.remove("chosen");
        });
    };

    /**
     * Show store details.
     *
     * @param {object} store array of store-cards.
     *
     * @param {date} date array of store-cards.
     *
     * @public
     */
    this.renderStoreInfo = function(store, date) {
        let storeInfo = document.querySelector(".right-list-info");
        storeInfo.innerHTML = `
            <div class="details">
                <span class="contact">Email:</span> ${store.Email}</br>
                <span class="contact">Phone Number:</span> ${store.PhoneNumber}</br>
                <span class="contact">Address:</span> ${store.Address}</br>
                <span class="contact">Established Date:</span> ${date}</br>
                <span class="contact">Floor Area:</span> ${store.FloorArea}</br>
            </div>
        `;
    };

    /**
     * Fill the product list with data.
     *
     * @param {object} product array of store-cards.
     *
     * @public
     */
    this.renderProductList = function(product) {
        productList.innerHTML += `
            <tr class="product-cards">
                <td class="name">
                    <div class="name-item">${product.Name}</div>
                    <div class="item-id">${product.id}</div>
                </td>
                <td class="price price-item">
                    ${product.Price}
                    <span>USD</span>
                </td>
                <td class="specs specs-item" title="${product.Specs}">
                    ${product.Specs}
                </td>
                <td class="supplier supplier-item" title="${product.SupplierInfo}">
                    ${product.SupplierInfo}
                </td>
                <td class="country country-item" title="${product.MadeIn}">
                    ${product.MadeIn}
                </td>
                <td class="company company-item" title="${product.ProductionCompanyName}">
                    ${product.ProductionCompanyName}
                </td>
                <td class="rating">
                    <div title="" class="stat-item"><span class="title"></span><span class="hide value">${product.Rating}</span></div>
                </td>
                <td class="btns">                     
                    <span class="edit-prod"><i class="fa fa-pencil" aria-hidden="true"></i></i></span>
                    <span class="del-prod"><i class="fa fa-times-circle-o" aria-hidden="true"></i></span>
                </td>
            </tr>
        `;
    };

    /**
     * Show rating via five stars.
     *
     * @param {HTMLDivElement} el array of store-cards.
     *
     * @param {number} nValueRate array of store-cards.
     *
     * @public
     */
    this.renderRatingStars = function(el, nValueRate) {
        el.firstElementChild.innerHTML =
            "&#9733;".repeat(nValueRate) + "&#9734;".repeat(5 - nValueRate);
    };

    /**
     * Reset sort buttons.
     *
     * @public
     */
    this.sortReset = function() {
        let sortBtn = document.querySelectorAll(".sort-btn");
        sortBtn.forEach(item => {
            // eslint-disable-next-line quotes
            item.innerHTML = `<i class="fa fa-caret-down" aria-hidden="true"></i>`;
        });
    };

    /**
     * Changes the devider direction.
     *
     * @param {HTMLDivElement} btn array of store-cards.
     *
     * @public
     */
    this.renderDividerIconToTop = function(btn) {
        btn.innerHTML = "";
        btn.innerHTML += `
        <i class="fa fa-angle-down" aria-hidden="true"></i>
        `;
    };

    /**
     * Changes the devider direction.
     *
     * @param {HTMLDivElement} btn array of store-cards.
     *
     * @public
     */
    this.renderDividerIconToLow = function(btn) {
        btn.innerHTML = "";
        btn.innerHTML += `
        <i class="up-icon fa fa-angle-up" aria-hidden="true"></i>
        `;
    };

    /**
     * Pin search panel.
     *
     * @public
     */
    this.pinSearch = function() {
        let searchPanel = document.querySelector(".search-panel");
        let storeDivider = document.querySelector("#storeDivider");
        searchPanel.classList.toggle("pinned-store-search");
        storeDivider.classList.toggle("divider-with-search");
        pinBtnStores.classList.toggle("btn-pressed");
    };

    /**
     * Scrolling to the begining of the list.
     *
     * @public
     */
    this.scrollBack = function() {
        let leftStoreList = document.querySelector(".left-scrollable");
        leftStoreList.scrollTop = 0;
    };

    /**
     * Hiding or showing store-list, depend on the resolution.
     *
     * @public
     */
    this.hideSideBar = function() {
        let leftMenu = document.querySelector(".left-scrollable"),
            menuWidth = leftMenu.offsetWidth;

        hideBtn.classList.toggle("opened");
        if (hideBtn.classList.contains("opened")) {
            leftMenu.classList.add("list-hidden");
            hideBtn.innerHTML = "";
            hideBtn.innerHTML += `
            <i class="fa fa-angle-double-left" aria-hidden="true"></i>
            `;
            hideBtn.style.left = menuWidth + "px";
            hideBtn.style.transition = "all 0.6s linear";
        } else {
            leftMenu.classList.remove("list-hidden");
            hideBtn.innerHTML = "";
            hideBtn.innerHTML += `
            <i class="fa fa-angle-double-right" aria-hidden="true"></i>
            `;
            hideBtn.style.left = 0;
        }
    };

    /**
     * Replace the refresh btn by the clear btn.
     *
     * @public
     */
    this.showClearBtn = function() {
        refreshBtn.classList.add("hide");
        deleteBtn.classList.remove("hide");
    };

    /**
     * Replace the clear btn by the refresh btn.
     *
     * @public
     */
    this.hideClearBtn = function() {
        refreshBtn.classList.remove("hide");
        deleteBtn.classList.add("hide");
    };

    /**
     * Show refresh animation.
     *
     * @public
     */
    this.triggerRefreshAnimation = function() {
        refreshBtn.classList.add("refresh-rotate");
        setTimeout(() => {
            refreshBtn.classList.remove("refresh-rotate");
        }, 1000);
    };

    /**
     * Clears search input.
     *
     * @public
     */
    this.clearSearchInput = function() {
        storeSearchInput.value = "";
    };

    /**
     * Count number of items with status OK.
     *
     * @param {number} count number of items.
     *
     * @public
     */
    this.setOkNumber = function(count) {
        let productStatusOk = document.querySelector(".ok");
        productStatusOk.innerHTML = `${count}`;
    };

    /**
     * Count number of items with status STORAGE.
     *
     * @param {number} count number of items.
     *
     * @public
     */
    this.setStorageNumber = function(count) {
        let productStatusStorage = document.querySelector(".storage");
        productStatusStorage.innerHTML = `${count}`;
    };

    /**
     * Count number of items with status OUT_OF_STOCK.
     *
     * @param {number} count number of items.
     *
     * @public
     */
    this.setOutNumber = function(count) {
        let productStatusOut = document.querySelector(".out");
        productStatusOut.innerHTML = `${count}`;
    };

    /**
     * Clears search input.
     *
     * @public
     */
    this.countProducts = function() {
        let productCounter = document.querySelector(".counter");
        let productCount = productList.children.length;
        productCounter.innerHTML = productCount;
    };

    /**
     * Count all products.
     *
     * @public
     */
    this.renderAllProducts = function() {
        let statusBtns = document.querySelectorAll(".icon");
        statusBtns.forEach(item => {
            item.classList.remove("status-sort");
        });
        btnAllProducts.classList.add("status-sort");
        productList.innerHTML = "";
    };

    /**
     * Remove the selection class of the status btn.
     *
     * @public
     */
    this.removeSelectionCount = function() {
        let statusBtns = document.querySelectorAll(".icon");
        statusBtns.forEach(item => {
            item.classList.remove("status-sort");
        });
    };

    /**
     * Add the selection class of the status btn.
     *
     * @param {string} name number of items.
     *
     * @public
     */
    this.setSelectionCount = function(name) {
        name.classList.add("status-sort");
    };

    /**
     * Show toast messege with the confirmation of the store creation.
     *
     * @public
     */
    this.showToastStoreConfirm = function() {
        let overlay = document.querySelector(".overlay");
        let storeCreateConfirmation = document.querySelector(
            ".toast-store-created"
        );
        overlay.classList.remove("hide");
        storeCreateConfirmation.classList.remove("hide");
        setTimeout(() => {
            storeCreateConfirmation.classList.add("hide");
            overlay.classList.add("hide");
        }, 1500);
    };

    /**
     * Show toast messege with the confirmation of the product creation.
     *
     * @public
     */
    this.showToastProductConfirm = function() {
        let overlay = document.querySelector(".overlay");
        let productCreateConfirmation = document.querySelector(
            ".toast-product-created"
        );
        overlay.classList.remove("hide");
        productCreateConfirmation.classList.remove("hide");
        setTimeout(() => {
            productCreateConfirmation.classList.add("hide");
            overlay.classList.add("hide");
        }, 1500);
    };

    /**
     * Show modal window of the store creation.
     *
     * @public
     */
    this.openModalStore = function() {
        let overlay = document.querySelector(".overlay");
        let modalStore = document.querySelector(".modal-window-store");
        overlay.classList.remove("hide");
        modalStore.classList.remove("hide");
        document.querySelector(".warn").classList.add("hide");
        document.querySelector("#input_6").style.border = "1px solid black";
    };

    /**
     * Show modal window of the product creation.
     *
     * @public
     */
    this.openModalProduct = function() {
        let overlay = document.querySelector(".overlay");
        let modalProduct = document.querySelector(".modal-window-product");
        createProductModalBtn.classList.remove("hide");
        editProductModalBtn.classList.add("hide");
        overlay.classList.remove("hide");
        modalProduct.classList.remove("hide");
        document.querySelector(".warn-price").classList.add("hide");
        document.querySelector(".warn-rating").classList.add("hide");
        document.querySelector("#input_product_2").style.border =
            "1px solid black";
        document.querySelector("#input_product_4").style.border =
            "1px solid black";
    };

    /**
     * Close modal window of the store creation.
     *
     * @public
     */
    this.closeModalStore = function() {
        let overlay = document.querySelector(".overlay");
        let modalStore = document.querySelector(".modal-window-store");
        let formStoreInputs = document.querySelectorAll(".modal-input");
        createProductModalBtn.classList.remove("hide");
        editProductModalBtn.classList.add("hide");
        overlay.classList.add("hide");
        modalStore.classList.add("hide");
        formStoreInputs.forEach(item => {
            item.value = "";
        });
    };

    /**
     * Close modal window of the product creation.
     *
     * @public
     */
    this.closeModalProduct = function() {
        let overlay = document.querySelector(".overlay");
        let modalProduct = document.querySelector(".modal-window-product");
        let formProductInputs = document.querySelectorAll(".input-prod");
        overlay.classList.add("hide");
        modalProduct.classList.add("hide");
        formProductInputs.forEach(item => {
            item.value = "";
        });
        if (document.querySelector(".editing").classList.contains("editing")) {
            document.querySelector(".editing").classList.remove("editing");
        }
    };

    /**
     * Show warn message.
     *
     * @public
     */
    this.showStoreCreationWarnMessage = function() {
        let warnMessage = document.querySelector(".wrong-input-warning");
        warnMessage.classList.remove("hide");
        setTimeout(() => {
            warnMessage.classList.add("hide");
        }, 1500);
    };

    /**
     * Show invalid inputs warning.
     *
     * @public
     */
    this.showValidError = function() {
        document.querySelector(".warn").classList.remove("hide");
        document.querySelector("#input_6").style.border = "1px solid red";
    };

    /**
     * Show invalid inputs warning.
     *
     * @public
     */
    this.showValidErrorProductPrice = function() {
        document.querySelector(".warn-price").classList.remove("hide");
        document.querySelector("#input_product_2").style.border =
            "1px solid red";
        setTimeout(() => {
            document.querySelector(".warn-price").classList.add("hide");
            document.querySelector("#input_product_2").style.border =
                "1px solid black";
        }, 2000);
    };

    /**
     * Show invalid inputs warning.
     *
     * @public
     */
    this.showValidErrorProductRating = function() {
        document.querySelector(".warn-rating").classList.remove("hide");
        document.querySelector("#input_product_4").style.border =
            "1px solid red";
        setTimeout(() => {
            document.querySelector(".warn-rating").classList.add("hide");
            document.querySelector("#input_product_4").style.border =
                "1px solid black";
        }, 2000);
    };

    /**
     * Show mock after deleting store.
     *
     * @public
     */
    this.showMockAfterDelete = function() {
        let mock = document.querySelector(".store-mock");
        let rightList = document.querySelector(".right-list");
        let overlay = document.querySelector(".overlay");
        let modalConfirmation = document.querySelector(
            ".modal-confirmation-delete"
        );

        modalConfirmation.classList.add("hide");
        overlay.classList.add("hide");
        rightList.classList.add("hide");
        mock.classList.remove("hide");
    };

    /**
     * Show confirmation of the store delete.
     *
     * @public
     */
    this.showConfirmation = function() {
        let overlay = document.querySelector(".overlay");
        let modalConfirmation = document.querySelector(
            ".modal-confirmation-delete"
        );

        overlay.classList.remove("hide");
        modalConfirmation.classList.remove("hide");
    };

    /**
     * Remove class choosen from the element.
     *
     * @param {event} e choosen element.
     *
     * @public
     */
    this.removeChooseClassItem = function(e) {
        e.parentElement.parentElement.classList.remove("chosen");
    };

    /**
     * Replace "create" button with "edit".
     *
     * @public
     */
    this.btnChange = function() {
        createProductModalBtn.classList.add("hide");
        editProductModalBtn.classList.remove("hide");
    };

    /**
     *Show modal window of product edit.
     *
     * @param {event} event click;
     *
     * @public
     */
    this.openModalEdit = function(event) {
        var editProductBtn = document.querySelectorAll(".edit-prod");
        editProductBtn.forEach(entry => {
            entry.parentElement.parentElement.classList.remove("editing");
            if (entry.contains(event.target)) {
                entry.parentElement.parentElement.classList.add("editing");
                document.querySelector(
                    "#input_product_1"
                ).value = entry.parentElement.parentElement.querySelector(
                    ".name-item"
                ).textContent;
                document.querySelector(
                    "#input_product_2"
                ).value = entry.parentElement.parentElement
                    .querySelector(".price-item")
                    .textContent.replace(/\s/g, "")
                    .replace(/[^+\d]/g, "");
                document.querySelector(
                    "#input_product_3"
                ).value = entry.parentElement.parentElement
                    .querySelector(".specs-item")
                    .textContent.replace(/\s/g, "");
                document.querySelector(
                    "#input_product_4"
                ).value = entry.parentElement.parentElement
                    .querySelector(".value")
                    .textContent.replace(/\s/g, "");
                document.querySelector(
                    "#input_product_5"
                ).value = entry.parentElement.parentElement
                    .querySelector(".supplier-item")
                    .textContent.replace(/\s/g, "");
                document.querySelector(
                    "#input_product_6"
                ).value = entry.parentElement.parentElement
                    .querySelector(".country-item")
                    .textContent.replace(/\s/g, "");
                document.querySelector(
                    "#input_product_7"
                ).value = entry.parentElement.parentElement
                    .querySelector(".company-item")
                    .textContent.replace(/\s/g, "");
                createProductModalBtn.classList.remove("hide");
                editProductModalBtn.classList.add("hide");
                const overlay = document.querySelector(".overlay"),
                    modalProduct = document.querySelector(
                        ".modal-window-product"
                    );
                overlay.classList.remove("hide");
                modalProduct.classList.remove("hide");
                document.querySelector(".warn-price").classList.add("hide");
                document.querySelector(".warn-rating").classList.add("hide");
                document.querySelector("#input_product_2").style.border =
                    "1px solid black";
                document.querySelector("#input_product_4").style.border =
                    "1px solid black";
                createProductModalBtn.classList.add("hide");
                editProductModalBtn.classList.remove("hide");
            }
        });
    };

    /**
     *Sorting direction table by the column.
     *
     * @param {event} e click;
     *
     * @public
     */
    this.sortTableToLow = function(e) {
        var table = document.querySelector(".product-table");
        let sortedRows = Array.from(table.rows)
            .slice(0)
            .sort((rowA, rowB) =>
                rowA.cells[e].innerHTML > rowB.cells[e].innerHTML ? 1 : -1
            );
        table.tBodies[0].append(...sortedRows);
    };

    /**
     *Sorting direction table by the column.
     *
     * @param {event} e click;
     *
     * @public
     */
    this.sortTableToHigh = function(e) {
        var table = document.querySelector(".product-table");
        let sortedRows = Array.from(table.rows)
            .slice(0)
            .sort((rowA, rowB) =>
                rowA.cells[e].innerHTML > rowB.cells[e].innerHTML ? -1 : 1
            );
        table.tBodies[0].append(...sortedRows);
    };

    /**
     * Sorting table by the column.
     *
     * @param {HTMLDivElement} btn pressed btn;
     *
     * @param {index} index btn index;
     *
     * @public
     */
    this.tableSort = function(btn, index) {
        let sortBtn = document.querySelectorAll(".sort-btn");
        if (btn.classList.contains("sorted")) {
            this.sortTableToHigh(index);
            btn.classList.remove("sorted");
            sortBtn[
                index
            ].innerHTML = `<i class="fa fa-caret-down" aria-hidden="true"></i>`;
        } else {
            this.sortTableToLow(index);
            btn.classList.add("sorted");
            sortBtn[
                index
            ].innerHTML = `<i class="fa fa-caret-up" aria-hidden="true"></i>`;
        }
    };

    /**
     * Returns the store list.
     *
     * @returns {HTMLDivElement} the button element.
     *
     * @public
     */
    this.getStoreList = function() {
        return document.querySelector(".store-list");
    };

    /**
     * Returns arra of stores.
     *
     * @returns {Array} the button element.
     *
     * @public
     */
    this.getStoresArray = function() {
        return document.querySelectorAll(".item-card");
    };

    /**
     * Returns the id of shoosen element.
     *
     * @param {HTMLDivElement} entry pressed block.
     *
     * @returns {id} id of the element.
     *
     * @public
     */
    this.getChoosenStoreId = function(entry) {
        return entry.querySelector(".store-id").textContent;
    };

    /**
     * Returns the array of rating values.
     *
     * @returns {Array} array of ratings.
     *
     * @public
     */
    this.getRatingValue = function() {
        return document.querySelectorAll("td.rating > div:first-child");
    };

    /**
     * Returns the value of rating.
     *
     * @param {HTMLDivElement} el choosen element.
     *
     * @returns {string} rating value.
     *
     * @public
     */
    this.getRatingRate = function(el) {
        return el.lastElementChild.innerText;
    };

    /**
     * Returns the left list.
     *
     * @returns {HTMLDivElement}.
     *
     * @public
     */
    this.getLeftList = function() {
        return document.querySelector(".left-scrollable");
    };

    /**
     * Returns button.
     *
     * @returns {HTMLDivElement} the div element.
     *
     * @public
     */
    this.getRollBtnStores = function() {
        return document.querySelector("#rollBtnStores");
    };

    /**
     * Returns pin store button.
     *
     * @returns {HTMLDivElement} the div element.
     *
     * @public
     */
    this.getPinStoresBtn = function() {
        return document.querySelector("#pinBtnStores");
    };

    /**
     * Returns right list   .
     *
     * @returns {HTMLDivElement} the div element.
     *
     * @public
     */
    this.getRigthList = function() {
        return document.querySelector(".right-list");
    };

    /**
     * Returns button.
     *
     * @returns {HTMLDivElement} the div element.
     *
     * @public
     */
    this.getrollBtnProducts = function() {
        return document.querySelector("#rollBtnProducts");
    };

    /**
     * Returns search input.
     *
     * @returns {HTMLDivElement} the input element.
     *
     * @public
     */
    this.getStoreSearchInput = function() {
        return storeSearchInput;
    };

    /**
     * Returns button store search.
     *
     * @returns {HTMLDivElement} the div element.
     *
     * @public
     */
    this.getSearchBtn = function() {
        return document.querySelector("#storeSearchBtn");
    };

    /**
     * Returns search input.
     *
     * @returns {HTMLDivElement} the input element.
     *
     * @public
     */
    this.getSearchInput = function() {
        return document.querySelector("#search-input");
    };

    /**
     * Returns button of store delete.
     *
     * @returns {HTMLDivElement} the div element.
     *
     * @public
     */
    this.getDelBtn = function() {
        return document.querySelector("#storeDeleteBtn");
    };

    /**
     * Returns button status OK.
     *
     * @returns {HTMLDivElement} the div element.
     *
     * @public
     */
    this.getBtnStatusOk = function() {
        return btnStatusOk;
    };

    /**
     * Returns button status STORAGE.
     *
     * @returns {HTMLDivElement} the div element.
     *
     * @public
     */
    this.getBtnStatusStorage = function() {
        return btnStatusStorage;
    };

    /**
     * Returns button status OUT_OF_STOCK.
     *
     * @returns {HTMLDivElement} the div element.
     *
     * @public
     */
    this.getBtnStatusOut = function() {
        return btnStatusOut;
    };

    /**
     * Returns button status ALL.
     *
     * @returns {HTMLDivElement} the div element.
     *
     * @public
     */
    this.getBtnAllProducts = function() {
        return btnAllProducts;
    };

    /**
     * Returns input value store name.
     *
     * @returns {string}.
     *
     * @public
     */
    this.getCreateStoreName = function() {
        return document.querySelector("#input_1").value;
    };

    /**
     * Returns input value store email.
     *
     * @returns {string}.
     *
     * @public
     */
    this.getCreateStoreEmail = function() {
        return document.querySelector("#input_2").value;
    };

    /**
     * Returns input value store phone.
     *
     * @returns {string}.
     *
     * @public
     */
    this.getCreateStorePhone = function() {
        return document.querySelector("#input_3").value;
    };

    /**
     * Returns input value store address.
     *
     * @returns {string}.
     *
     * @public
     */
    this.getCreateStoreAddress = function() {
        return document.querySelector("#input_4").value;
    };

    /**
     * Returns input value store est date.
     *
     * @returns {date}.
     *
     * @public
     */
    this.getCreateStoreEstDate = function() {
        return document.querySelector("#input_5").value;
    };

    /**
     * Returns input value store area.
     *
     * @returns {string}.
     *
     * @public
     */
    this.getCreateStoreArea = function() {
        return document.querySelector("#input_6").value;
    };

    /**
     * Returns button of store creation.
     *
     * @returns {HTMLDivElement}.
     *
     * @public
     */
    this.getBtnCreationStore = function() {
        return document.querySelector(".create-btn");
    };

    /**
     * Returns button of cancel creation.
     *
     * @returns {HTMLDivElement}.
     *
     * @public
     */
    this.getBtnCreationCancel = function() {
        return document.querySelector(".modal-cancel");
    };

    /**
     * Returns button create store.
     *
     * @returns {HTMLDivElement}.
     *
     * @public
     */
    this.getBtnCreationCreate = function() {
        return document.querySelector(".modal-create");
    };

    /**
     * Returns input value product name.
     *
     * @returns {string}.
     *
     * @public
     */
    this.getCreateProductName = function() {
        return document.querySelector("#input_product_1").value;
    };

    /**
     * Returns input value product price.
     *
     * @returns {number}.
     *
     * @public
     */
    this.getCreateProductPrice = function() {
        return +document.querySelector("#input_product_2").value;
    };

    /**
     * Returns input value product specs.
     *
     * @returns {string}.
     *
     * @public
     */
    this.getCreateProductSpecs = function() {
        return document.querySelector("#input_product_3").value;
    };

    /**
     * Returns input value product rating.
     *
     * @returns {number}.
     *
     * @public
     */
    this.getCreateProductRating = function() {
        return +document.querySelector("#input_product_4").value;
    };

    /**
     * Returns input value product supplier.
     *
     * @returns {string}.
     *
     * @public
     */
    this.getCreateProductSupplier = function() {
        return document.querySelector("#input_product_5").value;
    };

    /**
     * Returns input value product country.
     *
     * @returns {string}.
     *
     * @public
     */
    this.getCreateProductCountry = function() {
        return document.querySelector("#input_product_6").value;
    };

    /**
     * Returns input value product manufacturer.
     *
     * @returns {string}.
     *
     * @public
     */
    this.getCreateProductManufacturer = function() {
        return document.querySelector("#input_product_7").value;
    };

    /**
     * Returns input value product status.
     *
     * @returns {string}.
     *
     * @public
     */
    this.getCreateProductStatus = function() {
        return document.querySelector("#input_product_8").value;
    };

    /**
     * Returns button open modal window creation product.
     *
     * @returns {HTMLDivElement}.
     *
     * @public
     */
    this.getCreateProductBtn = function() {
        return document.querySelector(".create-product-btn");
    };

    /**
     * Returns button create product.
     *
     * @returns {HTMLDivElement}.
     *
     * @public
     */
    this.getCreateProductModalBtn = function() {
        return document.querySelector(".create-product-modal-btn");
    };

    /**
     * Returns button cancel product creation.
     *
     * @returns {HTMLDivElement}.
     *
     * @public
     */
    this.getCancelProductModalBtn = function() {
        return document.querySelector(".cancel-product-modal-btn");
    };

    /**
     * Returns event target.
     *
     * @param {event} e event target
     *
     * @returns {HTMLDivElement}.
     *
     * @public
     */
    this.getChoosenItem = function(e) {
        e.parentElement.parentElement.classList.add("chosen");
        return e.parentElement.parentElement.querySelector(".item-id")
            .textContent;
    };

    /**
     * Returns delete buttons array.
     *
     * @returns {Array} array of delete products btns.
     *
     * @public
     */
    this.getDelProductBtn = function() {
        return document.querySelectorAll(".del-prod");
    };

    /**
     * Returns button delete product.
     *
     * @returns {HTMLDivElement}.
     *
     * @public
     */
    this.getDeleteStoreBtn = function() {
        return document.querySelector(".del-btn");
    };

    /**
     * Returns button confirm product del.
     *
     * @returns {HTMLDivElement}.
     *
     * @public
     */
    this.getConfirmDeleteBtn = function() {
        return document.querySelector(".confirm-delete-btn");
    };

    /**
     * Returns id of editing element.
     *
     * @returns {id} id of editing element.
     *
     * @public
     */
    this.getEditingId = function() {
        return productList
            .querySelector(".editing")
            .querySelector(".item-id")
            .textContent.replace(/\s/g, "");
    };

    /**
     * Returns button edit product.
     *
     * @returns {HTMLDivElement}.
     *
     * @public
     */
    this.getEditProductModalBtn = function() {
        return editProductModalBtn;
    };

    /**
     * Returns button hide sidebar.
     *
     * @returns {HTMLDivElement}.
     *
     * @public
     */
    this.getHideBtn = function() {
        return hideBtn;
    };

    /**
     * Returns button sort by name column.
     *
     * @returns {HTMLBtnElement}.
     *
     * @public
     */
    this.getSortByNameBtn = function() {
        return document.querySelector(".sort-by-name-btn");
    };

    /**
     * Returns button sort by price column.
     *
     * @returns {HTMLBtnElement}.
     *
     * @public
     */
    this.getSortByPriceBtn = function() {
        return document.querySelector(".sort-by-price-btn");
    };

    /**
     * Returns button sort by specs column.
     *
     * @returns {HTMLBtnElement}.
     *
     * @public
     */
    this.getSortBySpecsBtn = function() {
        return document.querySelector(".sort-by-specs-btn");
    };

    /**
     * Returns button sort by supplier column.
     *
     * @returns {HTMLBtnElement}.
     *
     * @public
     */
    this.getSortBySupBtn = function() {
        return document.querySelector(".sort-by-sup-btn");
    };

    /**
     * Returns button sort by country column.
     *
     * @returns {HTMLBtnElement}.
     *
     * @public
     */
    this.getSortByCountryBtn = function() {
        return document.querySelector(".sort-by-country-btn");
    };

    /**
     * Returns button sort by company column.
     *
     * @returns {HTMLBtnElement}.
     *
     * @public
     */
    this.getSortByCompBtn = function() {
        return document.querySelector(".sort-by-comp-btn");
    };
}

export default View;
