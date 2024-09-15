const delButton = document.querySelector('.del-but')
const mainTable = document.querySelector('.main-table');
const rating = document.querySelectorAll('.rating');
const buyContainer = document.querySelector('.buy-container');
const buyTable = document.querySelector('.buy-table');
const buyName = document.querySelector('.buy-name');
const buyPrice = document.querySelector('.buy-price');
const message = document.querySelector('.buy-message')

let storeArr = document.querySelectorAll('.rows');

//making the buttons work
mainTable.addEventListener('click', function (e) {
    const selectedRow = e.target.parentElement.parentElement.parentElement;
    if (e.target.classList.contains('del-but')) {
        message.style.display = 'none';
        buyContainer.style.display = 'none';
        selectedRow.remove();
        //changing the ids of the rows in the table, then activating the best value and average price after deleting 
        storeArr = document.querySelectorAll('.rows');
        renameIds(storeArr)
        avgprice(storeArr);
        bestValue(storeArr);
    }
    else if (e.target.classList.contains('buy-but')) {
        message.style.display = 'none';
        buyContainer.style.display = 'inline';
        buyName.innerHTML = selectedRow.querySelector('.name').textContent;
        buyPrice.innerHTML = selectedRow.querySelector('.price').textContent;
    }
});









//now to add colors to ratings
rating.forEach(rating => {
    if (Number(rating.textContent.replace("/5", "")) >= 4) {
        rating.parentElement.classList.add("table-success");
        //its lighter than i want it to be but bootstrap is fighting back
    }
    if (Number(rating.textContent.replace("/5", "")) < 2) {
        rating.parentElement.classList.add("table-danger");
        //its lighter than i want it to be but bootstrap is fighting back
    }
})

buyContainer.addEventListener("click", function (e) {//a message united with the send button
    if (e.target.classList.contains('send-button')) {
        message.style.display = 'inline';
        message.textContent = `Congrats! You bought a tv from ${buyName.innerHTML} for ${buyPrice.innerHTML}`;
    }

})

function renameIds(storeArr) {//after deleting a row. this function will change the ids to match the remaining amount of items in the table
    storeArr.forEach(function (row, index) {
        row.querySelector('.id').textContent = index + 1
    });
}


function avgprice(storeArr) {//finding the avg price
    if (storeArr.length == 0) {
        return console.log("the table is empty");
    }
    let avg = 0;
    for (let i = 0; i < storeArr.length; i++) {
        avg += Number(storeArr[i].querySelector('.price').textContent);
    }
    avg = avg / storeArr.length;
    console.log(`the avarage price is ${avg}`);
    return avg;
}
avgprice(storeArr);


function bestValue(storeArr) {//finding a store that has a good rating and is the cheapest
    if (storeArr.length == 0) {
        return console.log("the table is empty");
    }
    let lowestPrice = storeArr[0].querySelector('.price').textContent;
    let lowestId = 1;
    storeArr.forEach(function (row) {
        if (row.querySelector('.price').textContent < lowestPrice) {
            lowestPrice = row.querySelector('.price').textContent;
            lowestId = row.querySelector('.id').textContent
        }
    });

    if (storeArr[lowestId - 1].classList.contains("table-success")) {
        console.log(`the id of the best shop to purchase in is ${lowestId}`);
        //a clearer message in the console log
        return lowestId;
    }
    console.log("there is no shop that follows the requirements");
    //a clearer message in the console log
    return -1
}
bestValue(storeArr);