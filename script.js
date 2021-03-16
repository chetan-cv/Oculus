
//variables
const cartOverlay = document.querySelector('.cart-overlay');
const cartDom = document.querySelector('.cart');
const cartCloseBtn = document.querySelector('.cart-close-btn');
const cartClearBtn = document.querySelector('.clear-cart');
const cartContent = document.querySelector('.cart-content');
const cartTotal = document.querySelector('.cart-total');
const qtnMinus = document.querySelector('.minusQuantityButton');
const qtnAdd = document.querySelector('.addQuantityButton');
const cartBtn = document.querySelector('.cart-btn');
const cartQtn = document.querySelector('.cart-qtn');
const productsDom = document.querySelector('.product-items');
const newArrivalParams = document.querySelector('.new-arrivals-params');


let cart = [];
let totalAmount = 0;

class Products {

    async getProducts() {
        try {
            // or when fetching from api 
            // let res= await fetch('http://ip_address:port/endpoint/);
            let res = await fetch('products.json');
            return res.json();
        }
        catch (error) {
            console.log(error);
        }
    }
}

class UI {

    displayProducts(products) {
        let result = '';
        products.forEach(element => {
            result += `
            <article class="product-content">
                <div class="product-title">
                    <p>${element.name}</p>
                    <p class="product-subtitle">${element.height}CM</p>
                </div>
                <div class="img-container">
                    <img class="product-img"
                        src=${element.image}></img>
                    <div class="product-details">
                        <p>$${element.price}</p>
                        <button class="add-btn" data-id=${element.id}>ADD</button>
                    </div>

                </div>
            </article>
            `;
        });
        productsDom.innerHTML = result;
    }

    addProductsButton() {
        const addButton = [...document.querySelectorAll('.add-btn')];
        addButton.forEach(i => {
            const id = i.dataset.id;
            let inCart = cart.find(item => item.id == id);
            if (inCart) {
                
                i.innerHTML = 'ADDED';
                i.disabled = true;
            }
            else {
                i.addEventListener('click', e => {
                    i.innerHTML = 'ADDED';
                    i.disabled = true;
                    //adding that item into cart
                    let cartItem = { ...Storage.getProducts(id), amount: 1 };
                    cart = [...cart, cartItem];
                    Storage.saveCart(cart);
                    this.setCartValues(cart);
                    this.addCartItem(cartItem);
                    this.showCart();

                });
            }
        });
    }
    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item));
    }
    setCartValues(cart) {
        totalAmount = 0;
        let numberOfProducts = 0;
        cart.forEach(item => {
            totalAmount += parseInt(item.price) * item.amount;
            numberOfProducts += item.amount;
        });

        cartTotal.innerHTML = totalAmount;
        cartQtn.innerHTML = '[' + numberOfProducts + ']';
        cartQtn.style.color = 'black';

    }
    addCartItem(cartItem) {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
                <img
                src=${cartItem.image}></img>
            <div>
                <h5>${cartItem.name}</h5>
                <h6>$${cartItem.price}</h6>
                <span class="remove" data-id=${cartItem.id}>REMOVE</span>
            </div>
            <div class="qtn-btn">
                <button class="minusQuantityButton" data-id=${cartItem.id}>-</button>
                <p class="quantity">${cartItem.amount}</p>
                <button class="addQuantityButton" data-id=${cartItem.id}>+</button>
            </div>
                `;
        cartContent.appendChild(div);
    }


    handlingCart() {
        cartClearBtn.addEventListener('click', () => {
            cart = [];
            this.setCartValues(cart);
            Storage.saveCart(cart);
            const addButton = [...document.querySelectorAll('.add-btn')];
            addButton.forEach(i => {
                i.disabled = false;
                i.innerHTML = 'ADD';
                i.style.background = '#4CAF50';
            });
            while (cartContent.children.length > 0) {
                cartContent.removeChild(cartContent.children[0]);
            }
            this.closeCart();
        });

        cartContent.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove')) {
                let removeItem = cart.find(item => item.id == e.target.dataset.id);
                let id = e.target.dataset.id;
                cart = cart.filter(item => item.id != id);
                this.setCartValues(cart);
                Storage.saveCart(cart);
                cartContent.removeChild(e.target.parentElement.parentElement);
                const addButton = [...document.querySelectorAll('.add-btn')];
                addButton.forEach(i => {
                    if (i.dataset.id == id) {
                        i.disabled = false;
                        i.innerHTML = 'ADD';
                        i.style.background = '#4CAF50';
                    }
                });

            }
            if (e.target.classList.contains('addQuantityButton')) {
                let item = cart.find(item => item.id == e.target.dataset.id);
                item.amount += 1;
                totalAmount += parseInt(item.price);
                this.setCartValues(cart);
                e.target.previousElementSibling.innerHTML = item.amount;
                Storage.saveCart(cart);
            }
            if (e.target.classList.contains('minusQuantityButton')) {
                let item = cart.find(item => item.id == e.target.dataset.id);
                item.amount -= 1;
                totalAmount -= parseInt(item.price);
                this.setCartValues(cart);
                e.target.nextElementSibling.innerHTML = item.amount;
                if (item.amount == 0) {
                let removeItem = cart.find(item => item.id == e.target.dataset.id);
                let id = e.target.dataset.id;
                cart = cart.filter(item => item.id != id);
                this.setCartValues(cart);
                Storage.saveCart(cart);
                cartContent.removeChild(e.target.parentElement.parentElement);
                const addButton = [...document.querySelectorAll('.add-btn')];
                addButton.forEach(i => {
                    if (i.dataset.id == id) {
                        i.disabled = false;
                        i.innerHTML = 'ADD';
                        i.style.background = '#4CAF50';
                    }
                });

                }
                Storage.saveCart(item);
            }
        });
    }

    setupAPP() {
        cart = Storage.getCart();
        if (cart.length > 0) {
            this.setCartValues(cart);
            this.populateCart(cart);
        }
        //opening and closing cart
        cartBtn.addEventListener("click", this.showCart);
        cartCloseBtn.addEventListener("click", this.closeCart);
    }
    showCart() {
        cartOverlay.classList.add("transparentBcg");
        cartDom.classList.add("showCart");
    }
    closeCart() {
        cartOverlay.classList.remove("transparentBcg");
        cartDom.classList.remove("showCart");
    }


}

class Storage {

    static saveProducts(products) {
        localStorage.setItem('products', JSON.stringify(products));
    }
    static getProducts(id) {
        let items = JSON.parse(localStorage.getItem('products'));
        return items.find(product => product.id == id);
    }
    static getProductsByCategory(category){
        let items = JSON.parse(localStorage.getItem('products'));
        let result = [];
        if(category === 'ALL'){
            return items;
        }
        else{
        for(let i=0;i<items.length;i++){
            if(items[i].category.toLowerCase() == category.toLowerCase()){
                result.push(items[i]);
            }
        }
        return result;
    }
    }
    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    static getCart() {
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const products = new Products();
    const ui = new UI();

    ui.setupAPP();

    //getting products
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(() => {
        ui.addProductsButton();
        ui.handlingCart();
    });

    newArrivalParams.addEventListener('click',(e)=>{
        let products = Storage.getProductsByCategory(e.target.innerHTML);
        console.log(products);
        ui.displayProducts(products);
    });


});

