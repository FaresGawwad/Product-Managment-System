var productNameInput = document.getElementById('productNameInput');
var productPriceInput = document.getElementById('productPriceInput');
var productCategoryInput = document.getElementById('productCategoryInput');
var productDescriptionInput = document.getElementById('productDescriptionInput');
var addButton = document.getElementById('addButton');
var updateButton = document.getElementById('updateButton');
var currentUpdateIndex = -1;

var productsContainer;
if (localStorage.getItem('myProducts') != null) {
    productsContainer = JSON.parse(localStorage.getItem('myProducts'));
    displayProducts(productsContainer);
} else {
    productsContainer = [];
}



function addProduct() {
    if (productNameInput.value.trim() === "" ||
        productPriceInput.value.trim() === "" ||
        productCategoryInput.value.trim() === "" ||
        productDescriptionInput.value.trim() === "") {

        alert("Please fill in all fields before adding a product!");
        return; 
    }
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value
    }
    productsContainer.push(product);
    console.log(productsContainer);
    localStorage.setItem('myProducts', JSON.stringify(productsContainer));
    clearForm();
    displayProducts(productsContainer);
    window.alert('Your Product has been added.');
}

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";
}

function displayProducts(productList) {
    var content = ``;
    for (var i = 0; i < productList.length; i++) {
        content += `<tr class="table-custom mx-2">
                <td>${i+1}</td>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].category}</td>
                <td>${productList[i].description}</td>
                <td><button onclick="setFormForUpdate(${i})" class="custom-bt btn-sm my-2 mx-auto">update</button></td>
                <td><button onclick="deleteProduct(${i})" class="custom-bt btn-sm my-2 mx-auto">delete</button></td>
            </tr>`
    }
    document.getElementById('tableBody').innerHTML = content;
}

function searchProduct(searchTerm) {
    var serachResult = [];
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true) {
            serachResult.push(productsContainer[i]);
        }
    }
    displayProducts(serachResult);
}

function deleteProduct(deletedIndex) {
    productsContainer.splice(deletedIndex, 1);
    localStorage.setItem('myProducts', JSON.stringify(productsContainer));
    displayProducts(productsContainer);
    window.alert('You deleted your product.');
}

function setFormForUpdate(updatedIndex) {
    productNameInput.value = productsContainer[updatedIndex].name;
    productPriceInput.value = productsContainer[updatedIndex].price;
    productCategoryInput.value = productsContainer[updatedIndex].category;
    productDescriptionInput.value = productsContainer[updatedIndex].description;

    updateButton.classList.replace('d-none', 'd-inline-block');
    addButton.classList.add('d-none');
    currentUpdateIndex = updatedIndex;
}

function updateProduct() {

    if (currentUpdateIndex !== -1) {
        if (productNameInput.value.trim() === "" ||
            productPriceInput.value.trim() === "" ||
            productCategoryInput.value.trim() === "" ||
            productDescriptionInput.value.trim() === "") {

            alert("Please fill in all fields before updating the product!");
            return; 
        }
        var updatedProduct = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            description: productDescriptionInput.value
        };

        productsContainer[currentUpdateIndex] = updatedProduct;
        localStorage.setItem('myProducts', JSON.stringify(productsContainer));
        displayProducts(productsContainer);
        clearForm();

        updateButton.classList.replace('d-inline-block', 'd-none');
        addButton.classList.remove('d-none');
        currentUpdateIndex = -1;
        window.alert('You updated your product.');
    }
}

