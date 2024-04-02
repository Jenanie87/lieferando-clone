let foodImages = [
    {
        "image": "img/pizza.jpg",
        "foodName": "Pizza",
        "description": "Alle Gerichte werden mit Tomatensauce, Käse und Oregano zubereitet."
    },
    {
        "image": "img/noodle.jpg",
        "foodName": "Nudeln",
        "description": ""
    },
    {
        "image": "img/soup.jpg",
        "foodName": "Suppe",
        "description": ""
    },
];


let foodMenu = [
    {
        "typeFood0": [
            {
                "name": "Pizza Margherita",
                "ingredients": "mit Tomaten",
                "sizesText": "Standard Ø 28cm",
                "price": roundNumberWithDecimals(4.00),
            },
            {
                "name": "Pizza Spinaci",
                "ingredients": "mit Spinat und Knoblauch",
                "sizesText": "Standard Ø 28cm",
                "price": roundNumberWithDecimals(5.50),
            },
            {
                "name": "Pizza Quattro Formaggi",
                "ingredients": "mit 4 verschiedenen Käsesorten",
                "sizesText": "Standard Ø 28cm",
                "price": roundNumberWithDecimals(6.00),
            },
            {
                "name": "Pizza Italia",
                "ingredients": "mit Rucola und Parmesan",
                "sizesText": "Standard Ø 28cm",
                "price": roundNumberWithDecimals(6.50),
            },
            {
                "name": "Pizza Hollandaise",
                "ingredients": "mit Spinat, Broccoli und Sauce Hollandaise",
                "sizesText": "Standard Ø 28cm",
                "price": roundNumberWithDecimals(6.00),
            },
        ]
    },
    {
        "typeFood1": [
            {
                "name": "Spaghetti Aglio e Olio",
                "ingredients": "mit Kirschtomaten, Knoblauch, Olio Extra Vergine und Petersiliepiccante",
                "sizesText": "",
                "price": roundNumberWithDecimals(10.95),
            },
            {
                "name": "Spaghetti Carbonara",
                "ingredients": "mit Speck, Sahne, Eigelb und ital. Hartkäse",
                "sizesText": "",
                "price": roundNumberWithDecimals(13.75),
            },
            {
                "name": "Mezzalune Spinaci",
                "ingredients": "mit Spinat, Sahnesauce, Zwiebeln, Knoblauch und ital. Hartkäse",
                "sizesText": "",
                "price": roundNumberWithDecimals(13.75),
            },
            {
                "name": "Penne Arrabiata",
                "ingredients": "mit Tomatensauce, Chillies und Knoblauch",
                "sizesText": "",
                "price": roundNumberWithDecimals(10.50),
            },
            {
                "name": "Conchiglie Di Fiume",
                "ingredients": "mit Flusskrebsen, Karotten-Zucchini-Julienne, Zwiebeln und Hummersauce",
                "sizesText": "",
                "price": roundNumberWithDecimals(15.95),
            },
        ]
    },
    {
        "typeFood2": [
            {
                "name": "Reisbandnudelsuppe",
                "ingredients": "mit Hühnerbrühe, Zwiebeln, Lauchzwiebeln, Koriander und Tofu",
                "sizesText": "",
                "price": roundNumberWithDecimals(9.00),
            },
            {
                "name": "Kitsune Udon",
                "ingredients": "mit Nudeln, Gemüse und Shiitake",
                "sizesText": "",
                "price": roundNumberWithDecimals(4.90),
            },
            {
                "name": "Ramen Nudelsuppe",
                "ingredients": "mit Gemüse und Schweinefleisch",
                "sizesText": "",
                "price": roundNumberWithDecimals(7.90),
            },
            {
                "name": "Miso Suppe",
                "ingredients": "mit Tofu, Gemüse und Sesam",
                "sizesText": "",
                "price": roundNumberWithDecimals(3.50),
            },
            {
                "name": "Wantan Suppe",
                "ingredients": "mit würzigen Garnelen, Hühnerfleisch, Blumenkohl, Kürbis, Lauchzwiebeln, Pilzen und Karotten",
                "sizesText": "",
                "price": roundNumberWithDecimals(10.00),
            },
        ]
    },
]


let shoppingCart = [
    {
        "menus": [],
        "prices": [],
        "sumPrices": [],
        "amount": [],
        "annotation": [],
    },
]


function render() {
    let menuSelection = document.querySelector('#menu_selection');

    for (let i = 0; i < foodImages.length; i++) {
        const food = foodImages[i];
        menuSelection.innerHTML += generateTopSelecion(food, i);

        for (let j = 0; j < foodMenu[i][`typeFood${i}`].length; j++) {
            const menu = foodMenu[i][`typeFood${i}`][j];
            menuSelection.innerHTML += generateTypeFoodInnerHTML(menu, i, j);
        }
    }
    renderShoppingCart();
    renderFooterBasekt();
}


function generateTopSelecion(food, i) {
    return /*HTML*/ `
        <div id ="top_selection${i}" class="top_selection">
            <img class="selection_img" src="${food.image}" alt="selection food">
            <h3>${food.foodName}</h3>
            <p class="text_description_selection">${food.description}</p>
        </div>`;
}


function generateTypeFoodInnerHTML(menu, i, j) {
    return /*HTML*/`
        <div onclick="addMenuToShoppingCart(${i}, ${j})" id="single_menu${j}" class="single_menu">
            <div class="menu_name">
                <div class="menu_name_left">
                    <h3 class="name">${menu.name}</h3>
                    <img class="width_icon" src="assets/info_icon.svg" alt="information icon"> 
                </div>
                <div class="menu_name_left">
                    <div class="round_bg"><img class="icon_add" src="assets/add_icon.svg" alt="add icon"></div>
                </div>                       
            </div>
            <p class="ingredients">${menu.ingredients}</p>
            <p class="sizes">${menu.sizesText}</p>
            <p class="price">${menu.price} €</p>
        </div>`;
}


function renderShoppingCart() {
    let basket = document.querySelector('.basket');
    let pickUpButton = document.querySelector('.pickUp_button');
    let active = pickUpButton.classList.contains('active_button');
    basket.innerHTML = '';
    if (shoppingCart[0]["menus"].length < 1) {
        basket.innerHTML += generatePlaceholder();
    } else {
        basket.innerHTML = '';
        for (let i = 0; i < shoppingCart[0]['menus'].length; i++) {
            let shoppingMenus = shoppingCart[0]['menus'][i];
            let shoppingPrices = shoppingCart[0]['sumPrices'][i];
            let shoppingAmount = shoppingCart[0]['amount'][i];
            let shoppingAnnotation = shoppingCart[0]['annotation'][i];
            basket.innerHTML += generateShoppingCartInnerHTML(shoppingMenus, shoppingPrices, shoppingAmount, shoppingAnnotation, i);
        }
        if (active == false) {
            basket.innerHTML += generateMinmumValueOrderInnerHTML();
        } else {
            basket.innerHTML += generateMinmumValueOrderPickInnerHTML();
        }

    }
}


function generateShoppingCartInnerHTML(shoppingMenus, shoppingPrices, shoppingAmount, shoppingAnnotation, i) {
    return /*HTML*/ `
            <div id="content_article${i}" class="content_article">
                <div class="article">
                    <div class="d_flex_sb_c">
                        <div class="article_top_left">
                            <div class="number_amount_top">${shoppingAmount}</div>
                            <h3 class="article_name">${shoppingMenus}</h3>
                        </div>
                        <div class="article_price">${shoppingPrices} €</div>
                    </div>
                    <p class="annotation">${shoppingAnnotation}</p>
                    <div class="right_selection change_amount">
                        <div onclick="decreaseMenu(${i})" class="round_bg"><img class="width_icon" src="assets/subtract_icon.svg" alt="subtract icon"></div>
                        <div class="number_amount">${shoppingAmount}</div>
                        <div onclick="increaseMenu(${i})" class="round_bg"><img class="width_icon" src="assets/add_icon.svg" alt="add icon"></div>
                    </div>
                </div>
            </div>`;
}


function generatePlaceholder() {
    return /*HTML*/ `
            <div class="placeholder d_flex_d_co_c">
                <img class="shopping_icon" src="assets/shop_icon.svg" alt="shopping icon">
                <h3 class="headline_shopping_cart">Fülle deinen Warenkorb</h3>
                <p class="text_shopping_cart">Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen</p>
            </div>`;
}


function generateMinmumValueOrderInnerHTML() {
    let delieveryCost = roundNumberWithDecimals(3);
    let subTotal = calcBasket();
    let minimumOrderValue = calcMinimumValueOrder();
    let total = roundNumberWithDecimals(+subTotal + +delieveryCost);

    if (subTotal < 15) {
        return /*HTML*/ `
        <div class="delivery_costs">
            <div class="minimum_order_value d_flex_sb_c">
                <p>Benötigter Betrag, um den <br> Mindestbestellwert zu erreichen</p>
                <div class="remaining_sum">${minimumOrderValue} €</div>
            </div>
            <p>Leider kannst du noch nicht bestellen. Pizza Connection liefert erst ab einem Mindestbestellwert von ${minimumOrderValue} € (exkl. Lieferkosten)</p>
        </div>
        <div class="order_costs">
            <div class="subtotal d_flex_sb_c">
            <p class="margin_zero">Zwischensumme</p>
            <div class="subtotal_number">${subTotal} €</div>
        </div>
        <div class="delivery d_flex_sb_c">
            <p class="margin_zero">Lieferkosten</p>
            <div class="delivery_number">${delieveryCost} €</div>
        </div>
        <div class="total d_flex_sb_c">
            <p class="margin_zero"><b>Gesamt</b></p>
            <div class="total_number"><b>${total} €</b></div>
        </div>`;
    } else {
        document.querySelector('#shopping_cart').classList.remove('d_flex_d_co_c');
        document.querySelector('#shopping_cart').classList.add('d_flex_d_co');

        return /*HTML*/ `
        <div class="order_costs">
            <div class="subtotal d_flex_sb_c">
            <p class="margin_zero">Zwischensumme</p>
            <div class="subtotal_number">${subTotal} €</div>
        </div>
        <div class="delivery d_flex_sb_c">
            <p class="margin_zero">Lieferkosten</p>
            <div class="delivery_number">${delieveryCost} €</div>
        </div>
        <div class="total d_flex_sb_c">
            <p class="margin_zero"><b>Gesamt</b></p>
            <div class="total_number"><b>${total} €</b></div>
        </div>
        <button onclick="orderMenu()" class="order_button">
            <p class="order_text">Bezahlen (${total} €)</p>
        </button>`;
    }
}


function generateMinmumValueOrderPickInnerHTML() {
    let subTotal = calcBasket();
    let total = roundNumberWithDecimals(+subTotal);

    document.querySelector('#shopping_cart').classList.remove('d_flex_d_co_c');
    document.querySelector('#shopping_cart').classList.add('d_flex_d_co');

    return /*HTML*/ `
        <div class="order_costs">
            <div class="subtotal d_flex_sb_c">
            <p class="margin_zero">Zwischensumme</p>
            <div class="subtotal_number">${subTotal} €</div>
        </div>
        <div class="total d_flex_sb_c">
            <p class="margin_zero"><b>Gesamt</b></p>
            <div class="total_number"><b>${total} €</b></div>
        </div>
        <button onclick="orderMenu()" class="order_button">
            <p class="order_text">Bezahlen (${total} €)</p>
        </button>`;
}


function renderFooterBasekt() {
    let footerBasket = document.querySelector('.footer_basket');
    footerBasket.innerHTML = generateFooterBasketInnerHTML();
}


function generateFooterBasketInnerHTML() {
    let pickUpButton = document.querySelector('.pickUp_button');
    let active = pickUpButton.classList.contains('active_button');
    if (active == true) {
        let subTotal = calcBasket();
        return /* HTML */`
                <button onclick="openBasketMobile()" class="button_style"><img class="width_icon" src="assets/basket_white_icon.png" alt="basket icon">Warenkorb (${subTotal} €)</button>`;
    } else {
        let delieveryCost = roundNumberWithDecimals(3);
        let subTotal = calcBasket();
        let total = roundNumberWithDecimals(+subTotal + +delieveryCost);
        return /* HTML */`
                <button onclick="openBasketMobile()" class="button_style"><img class="width_icon" src="assets/basket_white_icon.png" alt="basket icon">Warenkorb (${total} €)</button>`;
    }
}


// round with two decimals

function roundNumberWithDecimals(number) {
    return number.toFixed(2);
}


// add Menu tp shopping Cart

function addMenuToShoppingCart(i, j) {
    let menu = foodMenu[i][`typeFood${i}`][j];
    let numberAmount = 1;

    let indexMenu = getMenuIndex(menu.name);

    if (indexMenu == -1) {
        shoppingCart[0].menus.push(menu.name);
        shoppingCart[0].amount.push(numberAmount);
        shoppingCart[0].prices.push(menu.price);
        shoppingCart[0].sumPrices.push(menu.price);
        shoppingCart[0].annotation.push(menu.ingredients);
        renderShoppingCart();
        renderFooterBasekt();
    } else {
        increaseMenu(indexMenu);
    }
}


function getMenuIndex(menu) {
    let indexMenu = shoppingCart[0]['menus'].indexOf(menu);
    return indexMenu;
}


function increaseMenu(i) {
    let menu = shoppingCart[0]['menus'][i];
    let indexMenu = getMenuIndex(menu);
    let newAmount = shoppingCart[0]['amount'][indexMenu];
    newAmount++;
    shoppingCart[0]['amount'].splice(indexMenu, 1, newAmount);
    let newPrice = calcShoppingPrice(indexMenu, newAmount);
    shoppingCart[0]['sumPrices'].splice(indexMenu, 1, newPrice);
    renderShoppingCart();
    renderFooterBasekt();
}


function decreaseMenu(i) {
    let menu = shoppingCart[0]['menus'][i];
    let indexMenu = getMenuIndex(menu);
    let newAmount = shoppingCart[0]['amount'][indexMenu];
    newAmount--;
    if (newAmount < 1) {
        deleteMenu(i);
    } else {
        shoppingCart[0]['amount'].splice(indexMenu, 1, newAmount);
        let newPrice = calcShoppingPrice(indexMenu, newAmount);
        shoppingCart[0]['sumPrices'].splice(indexMenu, 1, newPrice);
        renderShoppingCart();
    }
}


function deleteMenu(i) {
    shoppingCart[0]['menus'].splice(i, 1);
    shoppingCart[0]['prices'].splice(i, 1);
    shoppingCart[0]['sumPrices'].splice(i, 1);
    shoppingCart[0]['amount'].splice(i, 1);
    shoppingCart[0]['annotation'].splice(i, 1);
    renderShoppingCart();
    renderFooterBasekt();
}


function calcShoppingPrice(i, amount) {
    let menu = shoppingCart[0]['prices'][i];
    let price = menu;
    let newPrice = amount * price;
    return roundNumberWithDecimals(newPrice);
}


function calcBasket() {
    let sumPrices = shoppingCart[0]['sumPrices'];
    let sum = 0;

    for (let number = 0; number < sumPrices.length; number++) {
        sum += +sumPrices[number];
    }
    return roundNumberWithDecimals(sum);
}


function calcMinimumValueOrder() {
    let subTotal = calcBasket();
    let minimumOrderValue = +15;
    let remainingSum = minimumOrderValue - subTotal;
    return roundNumberWithDecimals(remainingSum);
}


function orderMenu() {
    let dialogOrder = document.querySelector('.container_bg');
    dialogOrder.classList.toggle('d_none');

    if (shoppingCart[0]['menus'].length > 0) {
        shoppingCart[0]['menus'].length = 0;
        shoppingCart[0]['prices'].length = 0;
        shoppingCart[0]['sumPrices'].length = 0;
        shoppingCart[0]['amount'].length = 0;
        shoppingCart[0]['annotation'].length = 0;
        renderShoppingCart();
        openBasketMobile();
        renderFooterBasekt();
    }
}


function doNotClose(event) {
    event.stopPropagation();
}


function openBasketMobile() {
    let shoppingCartMobile = document.querySelector('.shopping_cart');
    let body = document.querySelector('body');
    let footerBasket = document.querySelector('.footer_basket');
    let closingTag = document.querySelector('.close_basket');

    closingTag.classList.toggle('d_none');
    footerBasket.classList.toggle('d_none');
    shoppingCartMobile.classList.toggle('show_shopping_cart_mobile');
    body.classList.toggle('hide_scrollbar');
}


// change conditions and button style 


function changeButton() {
    let choiceButton = document.querySelectorAll('.choice_button');
    choiceButton.forEach((button) => {
        button.classList.toggle('active_button');
        button.classList.toggle('passive_button');
        renderShoppingCart();
        renderFooterBasekt();
    });
}


function changeText() {
    let secondRow = document.querySelector('.second_row')
    secondRow.innerHTML = generateSecondRowText();
}


function generateSecondRowText() {
    return /*HTML*/`
        <img class="width_icon" src="assets/location.svg" alt="bycicle icon">
        <p>Germaniastraße 21</p>`;
}


function changeTextBack() {
    let secondRow = document.querySelector('.second_row')
    secondRow.innerHTML = generateSecondRowTextBack();
}


function generateSecondRowTextBack() {
    return /*HTML*/`
        <img class="width_icon" src="assets/shop_icon.svg" alt="basket icon">
        <p>Min. 15,00 €</p>
        <img class="dot_icon" src="assets/dot_icon.svg" alt="dot">
        <img class="width_icon" src="assets/bycicle.png" alt="bycicle icon">
        <p>3,00 €</p>
        <img class="dot_icon" src="assets/dot_icon.svg" alt="dot">
        <p class="text_responsive">Es fallen zusätzliche Gebühren an</p>
        <img class="width_icon" src="assets/info_icon.svg" alt="information icon">`;
}