// get all elements that we will use
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let adds = document.querySelector("#adds");
let discount = document.querySelector("#discount");
let total_price = document.querySelector("#total");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let creat_btn = document.querySelector("#submit");
let search_input = document.querySelector("#search");
let search_title = document.querySelector("#search_title");
let search_category = document.querySelector("#search_category");
let table = document.querySelector(".table");
let delete_all_btn = document.querySelector(".delete_all");

//  ============================================    get total  =============
function get_total() {

    if (price.value !== "") {
        let result = (+price.value + +taxes.value + +adds.value) - +discount.value;
        total_price.innerHTML = result;
        total_price.style.backgroundColor = "green";
    } else {
        total_price.innerHTML = "";
        total_price.style.backgroundColor = "red";
    }
}

let mood = "create";
let tmp;

//creat product 

let data_product;


if (localStorage.product != null) {
    data_product = JSON.parse(localStorage.product);
} else {
    data_product = [];
}


// ========================================= save data in local storage ==========================

creat_btn.addEventListener("click", () => {
    //creat an object
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        adds: adds.value,
        discount: discount.value,
        category: category.value,
        total_price: total_price.innerHTML,
        count: count.value
    };
    // save data in local storage
    if (title.value != "" && price.value != "" && category.value != "" && newPro.count <= 100 ) {
        if (mood === "create") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    data_product.push(newPro);
                }
            }
            else {
                data_product.push(newPro);
            }
        } else {
            data_product[tmp] = newPro;
            mood = "create";
            creat_btn.innerHTML = "create";
            count.style.display = "flex";
        }
            // clear data in inputs
        clear_data();
    }

    localStorage.setItem("product", JSON.stringify(data_product));




    //show_data
    show_data();

});

// ===================================== clear data in inputs ===================================

let clear_data = () => {
    inputs = document.querySelectorAll("input");
    inputs.forEach(element => {
        if (element.id !== "search") {
            element.value = "";
        }
    });
    total_price.innerHTML = "";
};

//  =================================     read & show data ==============================
let show_data = () => {
    get_total();
    let table = "";
    // looping  on data in the array
    for (let i = 0; i < data_product.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${data_product[i].title}</td>
                <td>${data_product[i].price}</td>
                <td>${data_product[i].taxes}</td>
                <td>${data_product[i].adds}</td>
                <td>${data_product[i].discount}</td>
                <td>${data_product[i].total_price}</td>
                <td>${data_product[i].category}</td>
                <td><button onclick= "update_data(${i})" id="update">update</button></td>
                <td><button onclick="delete_items(${i})" id="delete">delete</button></td>
            </tr>`;
    }
    document.getElementById("table").innerHTML = table;
    delete_all_btn.innerHTML = `delete all (${data_product.length})`;

    if (data_product.length > 0) {
        delete_all_btn.style.display = "block";
    } else {
        delete_all_btn.style.display = "none";
    }
};
show_data();

//  ============================================ delete items  =======================================

let delete_items = (i) => {
    data_product.splice(i, 1);
    localStorage.product = JSON.stringify(data_product);
    show_data();
};

let delete_all = () => {
    localStorage.clear();
    data_product.splice(0);
    show_data();
};

/// ==================================== update data ============================================ 

let update_data = (i) => {
    title.value = data_product[i].title;
    price.value = data_product[i].price;
    discount.value = data_product[i].discount;
    adds.value = data_product[i].adds;
    taxes.value = data_product[i].taxes;
    get_total();
    count.style.display = "none";
    creat_btn.innerHTML = "update";

    mood = "update";
    tmp = i;

    scroll({
        top: 0,
        left: 0
    });

};

// ==================================== search in data ====================================

let search_mood = "title";

let get_search_mood = (id) => {
    let search = document.querySelector("#search");
    if (id == "search_title") {
        search_mood = "title";
    }
    else {
        search_mood = "category";
    }

    search.placeholder = `search by ${search_mood}`;
    search.focus();
    search.value = "";
    show_data();
};

"a7a";
let search_data = (value) => {
    let table = "";
    for (let i = 0; i < data_product.length; i++) {
        if (search_mood === "title") {

            if (data_product[i].title.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${data_product[i].title}</td>
                        <td>${data_product[i].price}</td>
                        <td>${data_product[i].taxes}</td>
                        <td>${data_product[i].adds}</td>
                        <td>${data_product[i].discount}</td>
                        <td>${data_product[i].total_price}</td>
                        <td>${data_product[i].category}</td>
                        <td><button onclick= "update_data(${i})" id="update">update</button></td>
                        <td><button onclick="delete_items(${i})" id="delete">delete</button></td>
                    </tr>`;
            }
        } else {

            if (data_product[i].category.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${data_product[i].title}</td>
                        <td>${data_product[i].price}</td>
                        <td>${data_product[i].taxes}</td>
                        <td>${data_product[i].adds}</td>
                        <td>${data_product[i].discount}</td>
                        <td>${data_product[i].total_price}</td>
                        <td>${data_product[i].category}</td>
                        <td><button onclick= "update_data(${i})" id="update">update</button></td>
                        <td><button onclick="delete_items(${i})" id="delete">delete</button></td>
                    </tr>`;
            }
        }
    }
    document.getElementById("table").innerHTML = table;
};

// clean data 