(function () {

  let manuBar = document.getElementById("manu-bar");
  let toggleManu = document.getElementById("toggle-manu")
  manuBar.addEventListener("click", function (event) {
    toggleManu.classList.toggle("active");
  });

  let addCardItem = document.querySelectorAll(".fa-cart-plus");
  addCardItem.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      const iterm = {};
      if (event.target.classList.contains("fa-cart-plus")) {
        let itermName = event.target.parentElement.parentElement.parentElement.children[0].textContent;
        iterm.name = itermName;
        let itermPrice = event.target.parentElement.parentElement.parentElement.children[1].textContent
        iterm.price = itermPrice;

        let imgPath = event.target.parentElement.parentElement.parentElement.parentElement.children[1].children[0].src;
        let pos = imgPath.indexOf("img") + 3;
        let itermImg = imgPath.slice(pos);
        iterm.image = itermImg;

        let cardIterm = document.createElement("div");
        cardIterm.classList.add("added-cart-iterm");
        let overLayco = document.querySelector(".overlay-content");
        cardIterm.innerHTML = `
                        <div class="added-cart-iterm">
                        <div class="added-card-img-wrapper">
                            <img class="added-card-image" src="../public/img-cart${iterm.image}">
                        </div>
                        <div class="added-price-name-wrapper">
                            <h3 class="productname">${iterm.name}</h3>
                            <h3 class="productprice">${iterm.price}</h3>
                        </div>
                        <div class="remove-added-iterm">
                            <i class="fas fa-trash-alt" id="delete"></i>
                        </div>
                    </div> `;

        overLayco.appendChild(cardIterm);
        alert("item has been added to card");
        culculateTotals(iterm.price.slice(1));
        cardIterm.addEventListener("click", deleteIterm);

        let deleteAllIterm = document.querySelector(".clera-card-iterm");
        deleteAllIterm.addEventListener("click", deleteAllItermF);
      }

    });
  });

  // delete iterm o card list
  function deleteIterm(event) {
    if (event.target.parentElement.classList.contains("remove-added-iterm")) {
      let deleteIterm = event.target.parentElement.parentElement.parentElement;
      let overLayContet = document.querySelector(".overlay-content");
      let currentTotal = parseFloat(document.querySelector(".inner-total-price").textContent.slice(1));
      let decreamentPrice = parseFloat(event.target.parentElement.parentElement.children[1].children[1].textContent.slice(1));
      if (confirm("Are sure you want to remove item ? ")) {
        overLayContet.removeChild(deleteIterm);
        decrementTotal(currentTotal, decreamentPrice);
      }
    };
  }


  function decrementTotal(currentTotal, decrementTotal) {
    let newCurrentTotal = currentTotal - decrementTotal;
    document.querySelector(".inner-total-price").innerHTML = "R " + newCurrentTotal.toFixed(2);
    let numIterm = parseFloat(document.querySelector(".numeber-of-iterms").textContent);
    numIterm -= 1;
    document.querySelector(".numeber-of-iterms").textContent = numIterm;
  }

  //calculate and updata total
  function culculateTotals(itermPriceStr) {
    let itermPrice = parseFloat(itermPriceStr);
    let total = parseFloat(document.querySelector(".inner-total-price").textContent.slice(1));
    let numIterm = parseFloat(document.querySelector(".numeber-of-iterms").textContent);
    numIterm += 1;
    document.querySelector(".numeber-of-iterms").textContent = numIterm;
    total += itermPrice;
    document.querySelector(".inner-total-price").innerHTML = "R " + total.toFixed(2);
  }



  function deleteAllItermF(event) {
    var cardholder = document.querySelector(".overlay-content");
    deleteEle = document.querySelectorAll(".added-cart-iterm");
    // console.log(deleteEle);
    //   console.log(cardholder.children[0]);
    // for(let i = 0; i < deleteEle.length(); ++i ){
    cardholder.removeChild(deleteIterm.children[0].children[0]);
    // }
    //deleteEle.forEach(cardholder.removeChild(deleteEle));
  }

})();