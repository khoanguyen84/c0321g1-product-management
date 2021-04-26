let products = [];
const type_success = 'sucess';
const type_error = 'error';
const default_page_numer = 1;
const default_page_size = 10;
const five_second = 5*1000;

function init() {
    if (getToStorage('c0321g1') == null) {
        products = ["Sony Xperia", "Samsung Galaxy", "Nokia 6", "Xiaomi Redmi Note 4", "Apple iPhone 6S", "Xiaomi Mi 5s Plus", "Apple iPhone 8 Plus", "Fujitsu F-04E", "Oppo A71"];
        setToStorage(products);
    }
    else {
        products = getToStorage('c0321g1');
    }
}

function showProduct(page_number, page_size) {
    let tbProducts = document.getElementById('tbProducts');
    tbProducts.innerHTML = '';
    let paging = products.slice((page_number - 1)* page_size, page_number*page_size)
    paging.forEach(function (value, index) {
        tbProducts.innerHTML += `
        <tr id='tr_${(page_number-1)*page_size + index}'>
            <td>${(page_number-1)*page_size + index + 1}</td>
            <td>${value}</td>
            <td>
                <a href="javascript:;" class="btn btn-warning" onclick="editProduct(${(page_number-1)*page_size + index})">Edit</a>
                <a href="javascript:;" class="btn btn-success d-none" onclick="saveProduct(${(page_number-1)*page_size + index})">Save</a>
                <a href="javascript:;"class="btn btn-danger" onclick='removeProduct(${(page_number-1)*page_size + index})'>Remove</a>
            </td>
        </tr>
        `;
    });

    document.getElementById('product_number').innerHTML = `Add New Product (${products.length})`
}

function addProduct() {
    let productName = document.getElementById('product-name').value;
    if (isNullOrEmpty(productName)) {
        showMessage(type_error, 'Product name is required.');
    }
    else if (isExistProduct(productName)) {
        showMessage(type_error, 'Product name is existed.');
    }
    else {
        products.push(productName.trim());
        setToStorage(products);
        reset();
        showProduct(default_page_numer, default_page_size);
        showMessage(type_success, 'Product has been created successful.');
    }
}

function setToStorage(data) {
    window.localStorage.setItem('c0321g1', JSON.stringify(data));
}

function getToStorage(key) {
    return JSON.parse(window.localStorage.getItem(key));
}
function reset() {
    document.getElementById('product-name').value = '';
}

function isNullOrEmpty(content) {
    return content == null || content.trim() == '';
}

function closeMessage() {
    let msg = document.getElementById('msg');
    msg.classList.add('d-none');
}

function showMessage(type, message) {
    let msg = document.getElementById('msg');
    msg.classList.remove('d-none');
    if (type == type_success) {
        msg.classList.remove('alert-error');
        msg.classList.add('alert-success');
    }
    else {
        msg.classList.remove('alert-success');
        msg.classList.add('alert-error');
    }
    let content = msg.children[0];
    content.innerHTML = message;

    autoCloseMessage();
}

function isExistProduct(pn) {
    return products.some(function (value, index) {
        return value.toLowerCase().trim() == pn.toLowerCase().trim();
    });
}

function autoCloseMessage(){
    setInterval(closeMessage, five_second);
}

function pagination(page_number, page_size, data){
    let total_page = Math.ceil(data.length/page_size);

    let pagination = document.getElementById('pagination').children[0];
    pagination.innerHTML = '';
    for(let i=1;i<=total_page;i++){
        pagination.innerHTML += `<li><button class = 'pagination ${(page_number == i ? 'active': '')}' onclick='paging(${i})' >${i}</button></li>`;
    }
}

function paging(page_number){
    pagination(page_number, default_page_size,products);
    showProduct(page_number, default_page_size);
}

function removeProduct(index){
    let agreeToRemove = window.confirm('Are you sure to remove this product?');
    if(agreeToRemove){
        let product_name = products[index];
        products.splice(index,1);
        setToStorage(products);
        showProduct(default_page_numer, default_page_size);
        pagination(default_page_numer, default_page_size,products);
        showMessage(type_success, `Product ${product_name} has been removed successful.`);
    }
}

function editProduct(index){
    let tr = document.getElementById(`tr_${index}`);
    tr.children[1].innerHTML = `<input id='pn_${index}' class='form-input-control' value='${products[index]}'> 
                                <a href='javascript:;' class='btn btn-danger' onclick='cancel(${index})'>Cancel</a>`;
    let td_3th = tr.children[2];
    td_3th.children[0].classList.add('d-none');
    td_3th.children[1].classList.remove('d-none');
}

function cancel(index){
    let tr = document.getElementById(`tr_${index}`);
    tr.children[1].innerHTML = products[index];
    let td_3th = tr.children[2];
    td_3th.children[0].classList.remove('d-none');
    td_3th.children[1].classList.add('d-none');
}

function saveProduct(index){
    let product_name = document.getElementById(`pn_${index}`).value;
    products[index] = product_name.trim();
    setToStorage(products);
    showProduct(default_page_numer, default_page_size);
    showMessage(type_success, 'Product has been updated successful.');

    cancel(index);
}

function ready() {
    init();
    pagination(default_page_numer, default_page_size,products);
    showProduct(default_page_numer, default_page_size);
}

ready();
