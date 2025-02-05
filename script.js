let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let walletBalance =
        parseFloat(localStorage.getItem("walletBalance")) || 0;
      let lastPurchaseAmount =
        parseFloat(localStorage.getItem("lastPurchaseAmount")) || 0;

   
      function setWalletBalance() {
        const walletInput = document.getElementById("walletMoneyInput");
        walletBalance = parseFloat(walletInput.value) || 0;
        localStorage.setItem("walletBalance", walletBalance.toFixed(2));
        updateWallet();
        walletInput.value = ""; 
      }

     
      function updateWallet() {
        document.getElementById("walletBalance").textContent =
          walletBalance.toFixed(2);
      }

      
      function getPrice(type) {
        const select = document.getElementById(type);
        const selectedOption = select.options[select.selectedIndex].text;
        return parseFloat(selectedOption.split(" - ₱")[1]);
      }

      
      function addToCart(item, flavor, price) {
        cart.push({ item: item, flavor: flavor, price: price });
        updateCartDisplay();
        localStorage.setItem("cart", JSON.stringify(cart));
      }

     
      function updateCartDisplay() {
        const cartList = document.getElementById("cartList");
        const totalPrice = document.getElementById("totalPrice");
        cartList.innerHTML = "";
        let total = 0;
        cart.forEach((cartItem) => {
          const li = document.createElement("li");
          li.textContent =
            cartItem.item +
            " - " +
            cartItem.flavor +
            " - ₱" +
            cartItem.price.toFixed(2);
          cartList.appendChild(li);
          total += cartItem.price;
        });
        totalPrice.textContent = total.toFixed(2);
      }

     
      function checkout() {
        const total = parseFloat(
          document.getElementById("totalPrice").textContent
        );
        const error = document.getElementById("error");
        const changeDiv = document.getElementById("change");

    
        if (cart.length === 0) {
          error.textContent = "Your cart is empty.";
          changeDiv.textContent = "";
          return;
        }

   
        if (walletBalance < total) {
          error.textContent =
            "Insufficient funds. You need ₱" +
            (total - walletBalance).toFixed(2) +
            " more.";
          changeDiv.textContent = "";
        } else {
          error.textContent = "";
          walletBalance -= total;
          

          lastPurchaseAmount = total;
          localStorage.setItem(
            "lastPurchaseAmount",
            lastPurchaseAmount.toFixed(2)
          );
          localStorage.setItem("walletBalance", walletBalance.toFixed(2));
          updateWallet();
          changeDiv.textContent =
            "Purchase successful. Remaining Balance: ₱" +
            walletBalance.toFixed(2);
       

          cart = [];
          localStorage.setItem("cart", JSON.stringify([]));
          updateCartDisplay();
        }
      }


      function refund() {
        const refundMessage = document.getElementById("refundMessage");
        const error = document.getElementById("error");
        const changeDiv = document.getElementById("change");

        if (lastPurchaseAmount > 0) {
          walletBalance += lastPurchaseAmount;
          localStorage.setItem("walletBalance", walletBalance.toFixed(2));
          updateWallet();
          refundMessage.textContent =
            "Refund successful! ₱" +
            lastPurchaseAmount.toFixed(2) +
            " has been returned to your wallet.";
      

          lastPurchaseAmount = 0;
          localStorage.setItem("lastPurchaseAmount", "0");
          error.textContent = "";
          changeDiv.textContent = "";
        } else {
          refundMessage.textContent =
            "No recent purchase to refund.";
        }
      }

    
      function resetAllData() {
        cart = [];
        walletBalance = 0;
        lastPurchaseAmount = 0;
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("walletBalance", walletBalance.toFixed(2));
        localStorage.setItem("lastPurchaseAmount", "0");
        updateCartDisplay();
        document.getElementById("walletMoneyInput").value = "";
        document.getElementById("error").textContent = "";
        document.getElementById("change").textContent = "";
        document.getElementById("refundMessage").textContent = "";
        updateWallet();
      }


      document.addEventListener("DOMContentLoaded", () => {
        updateWallet();
        updateCartDisplay();
      });