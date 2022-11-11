// #####################################
// #####################################
// #####################################
// #####################################
// #####################################
//  declaration part
const products_container = document.querySelector(".products-box");
const navBarBtn = document.querySelector(".container  .nav-bar i ");
const navBar = document.querySelector(".nav-bar ul");
const cartPrductsContainer = document.querySelector(".cart-content .elements");
const cartBtns = [...document.querySelectorAll(".carte-btn")];
const cartBtn = document.querySelector(".carte-btnIcon");

const cartContainer = document.querySelector(".cart-container");
const cartContent = document.querySelector(".cart-content");

const exitCart = document.querySelector(".exit");
const header = document.querySelector("header");
const shopBtn = document.querySelector(".shop");
let totalPrice = document.querySelector(".total-price");
// products cart that contains the ids of products in the cart
let card = [];
// fonctionality part

// navbar part
navBarBtn.addEventListener("click", (e) => {
	e.preventDefault();
	navBar.classList.toggle("shown");
	header.classList.add("clicked");
});

//cart owner

const getCart = async function () {
	try {
		const { data: {products} } = await axios.get("/api/v1/cart")
		let productsHtml = ""
		for(let i=0; i<products.length; i++) {
			console.log(`/api/v1/products/${products[i].productID}`);
			const {data} = await axios.get(`/api/v1/products/${products[i].productID}`)
			console.log(data);
			productsHtml += `<div class="element" data-id=${products[i].productID}>
			<div class="infos">
				<img src=${data.img} alt="">
				<div class="content">
					<h3 class="name">${data.name}</h3>
					<span class="price">$ ${data.price}</span>
					<small class="remove">remove</small>
				</div>
			</div>
			<div class="counter">
			  <i class="fa-solid fa-angle-up fa-2x "></i>
			  <span class="number">${products[i].quantity}</span>
			  <i class="fa-solid fa-angle-down fa-2x "></i>
			</div>
		</div>`
		}
		cartPrductsContainer.innerHTML = productsHtml
		cartBtn.setAttribute("data-before", `${products.length}` || "0")
		updateTotal()
	} catch (error) {
		console.log(error);
	}
}

const getProducts = async () => {
	try {
		const {data} = await axios.get("/api/v1/products")
		const { data: {products} } = await axios.get("/api/v1/cart")
		let productsHtml = ""
		for(let i=0;i<data.length;i++) {
			/*for(let j=0;j<products.length;j++) {
				if(products[j].productID === data[i]._id)
			}*/
			let spanText = "Add to Cart";
			const product = products.filter((product) => product.productID === data[i]._id)
			if(product.length === 1) {
				spanText = "In Cart";
			}
			productsHtml += ` <div class="product">
			<div class="image">
				<img src=${data[i].img} alt="">

				<div class="side" id=${data[i]._id}>
					<span>${spanText}</span>
					<i class="fa-solid fa-cart-shopping"></i>
				</div>
			</div>
			<div class="infos">
				<h3 class="name">${data[i].name}</h3>
				<span class="price">
				${data[i].price} $
				</span>
			</div>
		</div>`
		}
		products_container.innerHTML = productsHtml
	} catch (error) {
		console.log(error)
	}
}

const updateProduct = async () => {
	const products = document.querySelectorAll(".element")
	const incBtn = document.querySelectorAll(".fa-angle-up")
	const decBtn = document.querySelectorAll(".fa-angle-down")
	const quantity = document.querySelectorAll(".counter .number")
	for(let i=0;i<products.length; i++) {
		const id = products[i].getAttribute("data-id")
		incBtn[i].addEventListener("click", async () => {
			quantity[i].innerText = `${Number(quantity[i].innerText) + 1}`
			await axios.patch(`/api/v1/cart/${id}`, {quantity: Number(quantity[i].innerText)})
			updateTotal()
		})
		decBtn[i].addEventListener("click", async () => {
			if(Number(quantity[i].innerText)>1) {
				quantity[i].innerText = `${Number(quantity[i].innerText) - 1}`
				await axios.patch(`/api/v1/cart/${id}`, {quantity: Number(quantity[i].innerText)})
				updateTotal()
			}
		})
	}
}

const deleteProduct = async () => {
	const products = document.querySelectorAll(".element")
	const removeBtn = document.querySelectorAll(".remove")
	for(let i=0;i<products.length; i++) {
		const id = products[i].getAttribute("data-id")
		removeBtn[i].addEventListener("click", async () => {
			await axios.delete(`/api/v1/cart/${id}`)
			await getCart()
			await getProducts()
			await addProduct()
		})
	}
}

const addProduct = async () => {
	const addBtn = document.querySelectorAll(".product .side")
	const btnText = document.querySelectorAll(".product .side span")
	for(let i=0; i<addBtn.length;i++) {
		const id = addBtn[i].getAttribute("id")
		addBtn[i].addEventListener("click", async () => {
			const { data: {products} } = await axios.get("/api/v1/cart")
			let inCart = false;
			for(let i=0; i<products.length;i++) {
				if(products[i].productID === id) {
					inCart = true
				}
			}
			if(!inCart) {
				await axios.post(`/api/v1/cart/${id}`)
				await getCart()
				await deleteProduct()
				await updateProduct()
				btnText[i].innerText = "In Cart"
			}
		})
	}
}

const clearCart = async () => {
	const clearBtn = document.querySelector(".clear-cart")
	clearBtn.addEventListener("click", async () => {
		await axios.delete("/api/v1/cart")
		await getCart()
		await getProducts()
		await addProduct()
	})
}


const start = async () => {
	await getCart()
	await getProducts()
	await updateProduct()
	await deleteProduct()
	await addProduct()
	await clearCart()
}

start()

//  // show it

cartBtns.forEach((ele) => {
	ele.addEventListener("click", (event) => {
		event.preventDefault();
		// hide the navbar when the cart is shown
		navBar.classList.remove("shown");
		cartContainer.classList.add("shown");
		header.classList.add("clicked");
	});
});

//  // hide it

exitCart.addEventListener("click", (event) => {
	event.preventDefault();
	// that setTimeout function is just for ux stuff(good ux experiance)
	setTimeout(function () {
		header.classList.remove("clicked");
	}, 500);
	cartContainer.classList.remove("shown");
});



// function to update the total value of the bill

function updateTotal() {
	let total = 0;
	let elementsInCart = [...cartContainer.querySelectorAll(".element")];
	if (elementsInCart) {
		total += elementsInCart.reduce((acc, current) => {
			let numberOfProducts = +current.querySelector(".number").innerText;
			let elementPrice = +current.querySelector(".price").innerText.slice(2);
			return acc + numberOfProducts * elementPrice;
		}, 0);
	}
	totalPrice.innerText = total.toFixed(2);
}
