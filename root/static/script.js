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
    toggleAdd
    toggleAddToCartButton(index);
}

function showSelectedProducts() {
    const selectedProductsList = document.getElementById('selected-products-list');
    selectedProductsList.innerHTML = '';
    document.querySelectorAll('.card').forEach((card, index) => {
        const productName = card.querySelector('h6').innerText;
        const price = parseFloat(card.querySelector('[data-price]').getAttribute('data-price'));
        const quantity = parseInt(document.getElementById('quantity-' + index).value);
        if (quantity > 0) {
            const listItem = document.createElement('li');
            listItem.classList.add('mb-3'); // Bootstrap margin
            listItem.innerHTML = `
                <div class="row">
                    <div class="col">${productName}</div>
                    <div class="col text-center">Quantity: ${quantity}</div>
                    <div class="col text-right">Total: $${(price * quantity).toFixed(2)}</div>
                </div>`;
            selectedProductsList.appendChild(listItem);
        }
    });
    const selectedProductsSection = document.getElementById('selected-products-section');
    selectedProductsSection.style.display = 'block'; // Show selected products section
    selectedProductsSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to selected products section
}

function hideSelectedProducts() {
    const selectedProductsSection = document.getElementById('selected-products-section');
    selectedProductsSection.style.display = 'none'; // Hide selected products section
}

// Initialize total cost on page load
document.addEventListener('DOMContentLoaded', updateTotalCost);