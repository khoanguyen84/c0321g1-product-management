let products = [];
const type_success = 'sucess';
const type_error = 'error';

function init(){
    if(getToStorage('c0321g1') == null){
        products = ["Sony Xperia", "Samsung Galaxy", "Nokia 6","Xiaomi Redmi Note 4", "Apple iPhone 6S", "Xiaomi Mi 5s Plus","Apple iPhone 8 Plus","Fujitsu F-04E","Oppo A71"];
        setToStorage(products);
    }
    else{
        products = getToStorage('c0321g1');
    }
}

function showProduct(){
    let tbProducts = document.getElementById('tbProducts');
    tbProducts.innerHTML = '';
    products.forEach(function(value,index){
        tbProducts.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${value}</td>
            <td>
                <a href="javascript:;" class="btn btn-warning">Edit</a>
                <a href="javascript:;"class="btn btn-danger">Remove</a>
            </td>
        </tr>
        `;
    });
}

function addProduct(){
    let productName = document.getElementById('product-name').value;
    if(isNullOrEmpty(productName)){
        showMessage(type_error,'Product name is required.');
    }
    else if(isExistProduct(productName)){
        showMessage(type_error,'Product name is existed.');
    }
    else{
        products.push(productName.trim());
        setToStorage(products);
        reset();
        showProduct();
        showMessage(type_success,'Product has been created successful.')
    }    
}

function setToStorage(data){
    window.localStorage.setItem('c0321g1', JSON.stringify(data));
}

function getToStorage(key){
    return JSON.parse(window.localStorage.getItem(key));
}
function reset(){
    document.getElementById('product-name').value = '';
}

function isNullOrEmpty(content){
    return content == null || content.trim() == '';
}

function closeMessage(){
    let msg = document.getElementById('msg');
    msg.classList.add('d-none');
}

function showMessage(type, message){
    let msg = document.getElementById('msg');
    msg.classList.remove('d-none');
    if(type== type_success){
        msg.classList.remove('alert-error');
        msg.classList.add('alert-success');
    }
    else{
        msg.classList.remove('alert-success');
        msg.classList.add('alert-error');
    }
    let content = msg.children[0];
    content.innerHTML = message;
}

function isExistProduct(pn){
    return products.some(function(value, index){
        return value.toLowerCase().trim() == pn.toLowerCase().trim();
    })
}

function ready(){
    init();
    showProduct();
}

ready();
