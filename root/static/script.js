function updateTotalCost() {
    let totalCost = 0;
    document.querySelectorAll('.card').forEach((card, index) => {
        const price = parseFloat(card.querySelector('[data-price]').getAttribute('data-price'));
        const quantity = parseInt(document.getElementById('quantity-' + index).value);
        totalCost += price * quantity;
    });
    document.getElementById('total-cost').innerText = totalCost.toFixed(2);
}

function increaseQuantity(index) {
    let quantityInput = document.getElementById('quantity-' + index);
    let currentQuantity = parseInt(quantityInput.value);
    quantityInput.value = currentQuantity + 1;
    updateTotalCost();
    toggleAddToCartButton(index);
}

function decreaseQuantity(index) {
    let quantityInput = document.getElementById('quantity-' + index);
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 0) {
        quantityInput.value = currentQuantity - 1;
    }
    updateTotalCost();
    toggleAddToCartButton(index);
}

function toggleAddToCartButton(index) {
    let quantityInput = document.getElementById('quantity-' + index);
    let addToCartButton = document.getElementById('add-to-cart-' + index);
    if (parseInt(quantityInput.value) === 0) {
        addToCartButton.innerText = "Add to cart";
        document.getElementById('quantity-control-' + index).style.visibility = 'hidden';
    } else {
        addToCartButton.innerText = "In cart (" + quantityInput.value + ")";
        document.getElementById('quantity-control-' + index).style.visibility = 'visible';
    }
}

function toggleCart(index) {
    let quantityInput = document.getElementById('quantity-' + index);
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity === 0) {
        quantityInput.value = 1;
        document.getElementById('quantity-control-' + index).style.visibility = 'visible';
    } else {
        quantityInput.value = 0;
        document.getElementById('quantity-control-' + index).style.visibility = 'hidden';
    }
    updateTotalCost();
    toggleAddToCartButton(index);
}

function showSelectedProducts() {
    const selectedProductsList = document.getElementById('selected-products-list');
    selectedProductsList.innerHTML = '';
    let hasProducts = false;
    document.querySelectorAll('.card').forEach((card, index) => {
        const productName = card.querySelector('h6').innerText;
        const price = parseFloat(card.querySelector('[data-price]').getAttribute('data-price'));
        const quantity = parseInt(document.getElementById('quantity-' + index).value);
        if (quantity > 0) {
            hasProducts = true;
            const listItem = document.createElement('li');
            listItem.classList.add('mb-3');
            listItem.innerHTML = `
                        <div class="row">
                            <div class="col">${productName}</div>
                            <div class="col text-center">Quantity: ${quantity}</div>
                            <div class="col text-right">Total: $${(price * quantity).toFixed(2)}</div>
                        </div>`;
            selectedProductsList.appendChild(listItem);
        }
    });
    if (hasProducts) {
        const selectedProductsSection = document.getElementById('selected-products-section');
        selectedProductsSection.style.display = 'block';
        selectedProductsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        showCustomAlert('.custom-danger-alert', 'Sizda hech qanday tanlangan maxsulot yo\'q');
    }
}

function hideSelectedProducts() {
    const selectedProductsSection = document.getElementById('selected-products-section');
    selectedProductsSection.style.display = 'none';
}

function buySelectedProducts() {
    const selectedProducts = [];
    let totalCost = 0;
    document.querySelectorAll('.card').forEach((card, index) => {
        const productName = card.querySelector('h6').innerText.trim();
        const price = parseFloat(card.querySelector('[data-price]').getAttribute('data-price'));
        const quantity = parseInt(document.getElementById('quantity-' + index).value);
        if (quantity > 0) {
            const total = (price * quantity).toFixed(2);
            totalCost += parseFloat(total);
            selectedProducts.push({
                name: productName,
                price: price,
                quantity: quantity,
                total: total
            });
        }
    });

    if (selectedProducts.length > 0) {
        const message = selectedProducts.map(product => `${product.name}: ${product.quantity} x $${product.price} = $${product.total}`).join('\n') + `\n\nTotal Cost: $${totalCost.toFixed(2)}`;
        sendToTelegramBot(message);
        showCustomAlert('.custom-success-alert', 'Buyurtmangiz muvaffaqiyatli yuborildi!');
    } else {
        showCustomAlert('.custom-danger-alert', 'Sizda hech qanday tanlangan maxsulot yo\'q');
    }

    // Clear selected products and update UI
    selectedProducts.forEach((product, index) => {
        const quantityInput = document.getElementById('quantity-' + index);
        quantityInput.value = 0;
        toggleAddToCartButton(index);
    });

    updateTotalCost();
    hideSelectedProducts();
}

function sendToTelegramBot(message) {
    const token = '7211063287:AAEbW_vhUeBfd5qV1ZRSnn9Q_T83PExV8Cg';
    const chatId = '6543698942';
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    }).then(response => {
        if (response.ok) {
            showCustomAlert('.custom-success-alert', 'Buyurtmangiz muvaffaqiyatli yuborildi!');
        } else {
            showCustomAlert('.custom-danger-alert', 'Buyurtmani Telegramga yuborishda xatolik yuz berdi.');
        }
    }).catch(error => {
        console.error('Error:', error);
        showCustomAlert('.custom-danger-alert', 'Buyurtmani Telegramga yuborishda xatolik yuz berdi.');
    });
}

function showCustomAlert(selector, message) {
    const alertBox = document.querySelector(selector);
    alertBox.innerText = message;
    alertBox.style.display = 'block';
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', updateTotalCost);