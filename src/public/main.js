let baseUrl = "http://localhost:8080";
let productos = [];
let user = {};

const getProducts = () => {
    fetch(baseUrl + '/api/products').then(res => {
        res.json().then(json => {
            productos = json;
            printProducts();
            getUser();
        })
    })
}
const printProducts = () => {
    let container = document.getElementById('products');
    container.innerHTML = "";
    productos.forEach(producto => {
        container.innerHTML += mapProducts(producto);
    })
}

const mapProducts = (product) => {
    return `<div>
            
            <h5>${product.name}</h5>
            <p>$${product.price}</p>
            <img src="${product.url}" alt="${product.name}">
            <button type="button" class="btn btn-danger btn-sm" onclick="deleteProduct('${product._id}')">Eliminar</button>
            <button type="button" class="btn btn-warning btn-sm" onclick="populateData('${product._id}')">Actualizar</button>
            </div>
            `

}

const deleteProduct = (productCode) => {
    fetch(baseUrl + '/api/products/' + productCode, { method: "DELETE" }).then(res => {
        getProducts();
    })
}

const addProduct = () => {
    let data = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        code: document.getElementById("code").value,
        url: document.getElementById("url").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
    }
    fetch(baseUrl + '/api/products', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": 'application/json; charset=UTF-8'
        }
    }).then(res => {
        getProducts();
    })
}

const populateData = (productCode) => {
    let product = productos.filter(product => product.code == productCode);
    product = product[0];
    document.getElementById("name").value = product.name;
    document.getElementById("description").value = product.description;
    document.getElementById("code").value = product.code;
    document.getElementById("url").value = product.url;
    document.getElementById("price").value = product.price;
    document.getElementById("stock").value = product.stock;
    document.getElementById("productId").value = product._id;
}

const actualizeProduct = () => {
    let data = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        code: document.getElementById("code").value,
        url: document.getElementById("url").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
        id: document.getElementById("productId").value
    }
    fetch(baseUrl + '/api/products/' + data.id, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": 'application/json; charset=UTF-8'
        }
    }).then(res => {
        getProducts();
    })
}

//Funciones para vistas del carrito

const productsInCart = () => {
    fetch(baseUrl + '/api/cart-products').then(res => {
        res.json().then(json => {
            productos = json;
            printCartProducts();
            getUser();
            totalAPagar();
        })
    })
}

const printCartProducts = () => {
    let container = document.getElementById('cartProducts');
    container.innerHTML = "";
    productos.forEach(producto => {
        container.innerHTML += mapCartProducts(producto);
    })
    
    productsTo();
}

const mapCartProducts = (product) => {
    return `
    <div>
        <h6>${product.name}</h6>
        <p>$${product.price}</p>
        <section class="amount">
            <a onclick="editAmount('${product._id}','del')"><img style="height:2.5em" src="../public/images/nuevoMenos.png" alt="signo menos"></a>
            <p>${product.amount}</p>
            <a onclick="editAmount('${product._id}','add')"><img style="height:2.5em" src="../public/images/nuevoMas.png" alt="signo mas"></a>
        </section>
        <img class="productInCart" src="${product.url}" alt="${product.name}">
        <a onclick="deleteItem('${product._id}')"><img style="height:4em" src="../public/images/basura.png" alt="tacho de basura"></a>
    </div>`


}

const editAmount = (productId, query) => {
    fetch(baseUrl + '/api/cart-products/' + productId + '?query=' + query, {
        method: "PUT",
        headers: {
            "Content-Type": 'application/json; charset=UTF-8'
        }
    }).then(res => {
        productsInCart();
        totalAPagar();
    })
}
const deleteItem = (productId) => {
    fetch(baseUrl + '/api/cart-products/' + productId, {
        method: "DELETE",
        headers: {
            "Content-Type": 'application/json; charset=UTF-8'
        }
    }).then(res => {
        productsInCart();
    })
}

const totalAPagar=()=>{
    let container = document.getElementById('totalAPagar');
    const total=productos.reduce((acc,product)=>acc + (product.price*product.amount),0)
    container.innerHTML = `
    <p>Total a pagar $${total}</p>
    <button type="button" onclick="finalizarCompra()">Finalizar compra</button>
    `
}
finalizarCompra=()=>{
    if(user.error){
        const finalizar = document.querySelector('.finalizarCompra')
        finalizar.innerHTML=`Para continuar con la compra primero debe <a href="../views/signup.html">registrarse</a> o <a href="../views/login.html">iniciar sesion</a>`
    }
    else{
        fetch(baseUrl + '/api/sells/', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json; charset=UTF-8'
            },
            body:JSON.stringify(user),
        }).then(res => {
            location.href = "../views/compraFinalizada.html";
        })
    }
    
}

const productsTo = () => {
    fetch(baseUrl + '/api/products').then(res => {
        res.json().then(json => {
            productos = json;
            printProductsCart()
        })
    })
}
const printProductsCart = () => {
    let container = document.getElementById('items');
    container.innerHTML = "";
    productos.forEach(producto => {
        container.innerHTML += mapProductsCart(producto);
    })
}

const mapProductsCart = (product) => {
    return `<div>
            
            <h5>${product.name}</h5>
            <p>$${product.price}</p>
            <img src="${product.url}" alt="${product.name}">
            <button type="button" class="btn btn-danger btn-sm" onclick="addProductCart('${product._id}')">Agregar</button>
            </div>
            `
}

const addProductCart = (productId) => {
    fetch(baseUrl + '/api/cart-products/' + productId, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json; charset=UTF-8'
        }
    }).then(res => {
        productsInCart();
    })
}

// registro de usuarios

const addUser = async () => {
    user={}
    let data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        name: document.getElementById("name").value,
        addres: document.getElementById("addres").value,
        age: document.getElementById("age").value,
        telphone: document.getElementById("telphone").value,
        avatar: document.getElementById("avatar").value,
    }
    await fetch(baseUrl + '/api/signup', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json; charset=UTF-8'
        },
        credentials: "include",
        body: JSON.stringify(data),
    })
        .then(res => {
            if (res) {
                res.json().then(json => {
                    if (json.message) {
                        let error = document.getElementById("error");
                        error.innerHTML = `${json.message}`;
                    }
                    if (json.user) {
                        location.href = "../public/index.html"
                    }
                })
            }
        })
}

const loginUser = async () => {
    user={}
    let data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    }
    await fetch(baseUrl + '/api/login', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json; charset=UTF-8'
        },
        credentials: "include",
        body: JSON.stringify(data),
    })
        .then(res => {
            if (res) {
                res.json().then(json => {
                    console.log(json[0]);
                    if (json[0].error) {
                        let error = document.getElementById("error");
                        error.innerHTML = `${json[0].error}`;
                    }
                    else {
                        location.href = "../public/index.html"
                    }
                })
            }
        })
}

const getUser = () => {
    user={};
    fetch(baseUrl + '/api/user').then(res => {
        res.json().then(json => {
            user = json;
            console.log("front", json);
            printUser();
        })
    })
}
const printUser = () => {
    if (user.error) {
        container = document.getElementById('user').style.display = "none";
    }
    else {
        let container = document.getElementById('user');
        container.innerHTML =
            `<div>
        <p>¡Hola ${user.username}!</p>
        <button type="button" class="btn btn-danger btn-sm" onclick="destroySession()">LogOut</button>
        </div>`
    }
}

const destroySession = () => {
    fetch(baseUrl + '/api/logout', { method: "DELETE" }).then(res => {
        user = {};
        location.href = "../public/index.html"
    })
}