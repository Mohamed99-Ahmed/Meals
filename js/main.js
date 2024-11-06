// loading function
$(document).ready(function () {
  // looding untill the doocument is ready for 2s then callback function for all my syntax
  $(".loading").fadeOut(2000, () => {
    // excuete alll function here after loading finish
    // ... existing code ...
    $("nav").show(1000);
    $("main").removeClass("hidden")
    // start navbar 
    let hidden = false;
    // when click in toogle
    $(".toggle").on("click", () => {
      // if click in any anchor in nav bar hide the nav list div in nav and chang the icon from cancel to show
      $(".sidebar li").on("click", () => {
        $("nav .list").hide(1000);
        $("nav .fa-xmark").hide();
        $("nav .fa-bars-staggered").show();
      })
      // if the nav not hidden when clck in icon hide the nav list
      // if the nav  hidden when clck in icon show the nav list
      if (!hidden) {
        $("nav .fa-xmark").show()
        $("nav .fa-bars-staggered").hide();
        $("nav .list").show(1000);
        hidden = true;
      } else {
        $("nav .fa-xmark").hide();
        $("nav .fa-bars-staggered").show();
        $("nav .list").hide(1000);
        hidden = false;
      }
    });
    async function allDisplay() {
      // contactus section
      $(".link-contact").on("click", () => {
        $("section").addClass("hidden");
        $(".contact").removeClass("hidden");
        // start regex of inputs
        let regName = /^[a-zA-Z0-9_-]{3,15}$/gm;
        let nameType = false;
        let regEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm;
        let emailType = false;
        let regPass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm;
        let passType = false;
        let repassType = false;
        let regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm;
        let phoneType = false;
        let ageType = false;
      
        // function Email regex text
         (function regex(){
          //Name
          $(".name").on("input", (e) => {
            if (!regName.test(e.target.value)) {
              $(e.target.nextElementSibling).removeClass("hidden");
              nameType = false;
              console.log("true email")
            } else {
              $(e.target.nextElementSibling).addClass("hidden");
              nameType = true;
            }
          });
          // email
          $(".email").on("input", (e) => {
            if (!regEmail.test(e.target.value)) {
              $(e.target.nextElementSibling).removeClass("hidden");
              emailType = false;
              console.log("true email")
            } else {
              $(e.target.nextElementSibling).addClass("hidden");
              emailType = true;
            }
          });
          // pasword regex
          $(".password").on("input", (e) => {
            if (!regPass.test(e.target.value)) {
              $(e.target.nextElementSibling).removeClass("hidden");
              passType = false;
            } else {
              $(e.target.nextElementSibling).addClass("hidden");
              console.log("true pass")
              passType = true;
            }
          })
          // repassType  
          $(".repassword").on("input", (e) => {
            repassType = false;
            if (e.target.value !== $(".password").val()) {  // Changed .val to .val()
              $(e.target.nextElementSibling).removeClass("hidden");  // Also jQuery-ified this line
            }
            else {
              repassType = true;
              $(e.target.nextElementSibling).addClass("hidden");  // And this one
            }
          });
          // phone 
          $(".phone").on("input", (e) => {
            if (!regPhone.test(e.target.value)) {
              $(e.target.nextElementSibling).removeClass("hidden");
              phoneType = false;
            } else {
              $(e.target.nextElementSibling).addClass("hidden");
              phoneType = true;
              console.log("true phone")
            }
          })
          // age 
          $(".age").on("input", (e) => {
            if( e.target.value <= 0) {
              e.target.nextElementSibling.classList.remove("hidden");
              ageType = false;
            }
            else{
              e.target.nextElementSibling.classList.add("hidden");
              ageType = true;
              console.log("true age")
            }
          });
          // if all inputs is Right remove pointer event from submit button
          $(".email, .password, .phone, .age, .repassword, .name").on("input", function() {
            if(emailType && passType && phoneType && ageType && nameType && repassType){
              $(".submit").removeClass("pointer-events-none");
              console.log("valid")
            } else {
              $(".submit").addClass("pointer-events-none");
              console.log("No valid")
            }
          });
        })();
      })
      // start Home section
      await Meals("https://www.themealdb.com/api/json/v1/1/search.php?s=");
      itemDetais(function cb() {
        $(".home").removeClass("hidden");

      });

      //when click on any item

      // *start search section

      $(".link-search").on("click", () => {
        $("section").addClass("hidden");
        $(".search").removeClass("hidden");
        // * search by name
        $(".search-name").on("input", async (e) => {
          // make the items empty then call func that add 
          $(".search .items").html(``);
          let name = e.target.value;
          await searchName(name);
          // when data come you can details any data
          itemDetais(function cb() {
            $(".search").removeClass("hidden");
          });
        });

        // *search by first letter
        $(".search-letter").on("input", async (e) => {
          // make the items empty then call func that add 
          $(".search .items").html(``);
          let name = e.target.value;
          await searchName(name);
          // when data come you can details any data
          itemDetais(function cb() {
            $(".search").removeClass("hidden");
          });
        });
      });


      // * start category section
      //  when click in category section appear it  and add hidden class to any section
      $(".link-category").on("click", async () => {
        $("section").addClass("hidden");
        $(".categories").removeClass("hidden");
        // await untill data receve from allCategories then when click in item category make home section apper 
        await allCategory();
        $(".item").on("click", async (e) => {
          $("section").addClass("hidden");
          $(".home").removeClass("hidden");
          $(".home .items").html("")
          await Meals(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.parentElement.getAttribute("data-meal")}`)
          // item Details function work whaen mels git from server
          itemDetais(() => {
            $(".home").removeClass("hidden")   //this is call back function
          });
        });
      });


      // * start Area section
      $(".link-area").on("click", async () => {
        $("section").addClass("hidden");
        $(".area").removeClass("hidden");
        // await untill data receve from allArea then when click in item category make home section apper 
        await allAreas();
        $(".country").on("click", async (e) => {
          if ($(e.target).hasClass('country')) {
            $("section").addClass("hidden");
            $(".home").removeClass("hidden");
            $(".home .items").html("")
            console.log(e.target);
            await Meals(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${e.target.getAttribute("data-area")}`);
            // item Details function work whaen mels git from server
            itemDetais(() => {
              $(".home").removeClass("hidden")   //this is call back function
            });
          }


        });
      });

      // start Ingrediunts section 
      $(".link-ingredients").on("click", async () => {
        $("section").addClass("hidden");
        $(".ingredients").removeClass("hidden");
        // Fetch ingredients data
        await allIngredients();

        $(".item").on("click", async (e) => {
          if ($(e.target).hasClass("item")) {
            $("section").addClass("hidden");
            $(".home").removeClass("hidden");
            $(".home .items").html("")
            await Meals(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${e.target.getAttribute("data-meal")}`);
            // item Details function work whaen mels git from server
            itemDetais(() => {
              $(".home").removeClass("hidden")   //this is call back function
            });
          }

          // item Details function work whaen mels git from server
        });
      });

    }



    allDisplay();
  })
});


// start class of all api
class AllData {
  constructor() {
  }
  // Random Meals
  async Meals(url) {
    let req = await fetch(url);
    let res = await req.json();
    return res;
  }
  // Details Meal
  async detailsMeal(id) {
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let res = await req.json();
    return res;
  }
  // search By Name
  async searchName(name) {
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let res = await req.json();
    return res;
  }
  // search By First letter
  async searchFletter(letter) {
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`);
    let res = await req.json();
    return res;
  }
  // Category section
  async allCategory() {
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let res = await req.json();
    return res;
  }
  // Area section 
  async allAreas() {
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let res = await req.json();
    return res;
  }
  // Area section 
  async allIngredients() {
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let res = await req.json();
    return res;
  }
}
// !    start create elements

// Random Meals when 
async function Meals(url) {
  let obj = new AllData();
  let data = await obj.Meals(url);
  for (let i = 0; i < data.meals.length; i++) {
    let elem = `
      <figure data-id="${data.meals[i].idMeal}" class="item rounded-md overflow-hidden relative group/parent cursor-pointer">
                     <img class="" src="${data.meals[i].strMealThumb}" alt="${data.meals[i].strMeal} img">
                     <div
                         class="layer flex flex-col justify-center p-8 bg-white text-black bg-opacity-70 group-hover/parent:translate-y-0 transition-all duration-[2s] absolute left-0  right-0 bottom-0 top-0 translate-y-[110%] ">
                         <h1 class="capitalize text-3xl font-mono font-extrabold">${data.meals[i].strMeal}</h1>
                     </div>
                 </figure> `
    $(".home .items").append(elem)
  }

  return data;
}


// Detais of meal when chick in it 
async function getDetails(id) {
  let obj = new AllData();
  let data = await obj.detailsMeal(id);
  let item = data.meals[0];
  let ingradiunt = [];
  let Mesure = []
  // filter the object  strIngredient method  
  for (let key in item) {
    if (key.startsWith('strIngredient')) {
      if (item[key] != "" && item[key]) {
        ingradiunt.push(item[key]);
      }
    }
  }
  //filter the object strMeasure method
  for (let key in item) {
    if (key.startsWith('strMeasure')) {
      if (item[key] !== " " && item[key]) {
        Mesure.push(item[key]);
      }

    }
  }
  //create element details
  let element = `
            <figure class="md:col-span-3 ">
                    <figure class="item rounded-md overflow-hidden relative group/parent cursor-pointer">
                        <img class="mb-4" src="${item.strMealThumb}" alt="meal img" >
                        <h2 class="text-2xl font-bold capitalize"> ${item.strMeal}</h2>
                    </figure>
                </figure>
                <article class="md:col-span-5 lg:col-span-7 flex flex-col gap-5">
                    <h2 class="font-bold text-2xl capitalize">Instructions</h2>
                    <p class="detail-meal-disc text-center">${item.strInstructions}</p>
                    <h3 class="font-bold text-2xl capitalize">Area : <span>${item.strArea}</span></h3>
                    <h3 class="font-bold text-2xl capitalize">Category  : <span class="text-lg">${item.strCategory}</span></h3>
                    <h3 class="font-bold text-2xl capitalize">Recipes : </h3>
                    <ul class="recipes-list flex gap-4 flex-wrap ">
                        ${Mesure.map((measure, index) => `<li class="bg-slate-800 px-4 py-4 rounded-full">${ingradiunt[index]}: ${measure}</li>`).join('')}
                    </ul>
                    <h3 class="font-bold text-2xl capitalize">Links : </h3>
                    <div class="tags-links flex gap-8">
                        <a href="${item.strSource}" class="bg-green-700 rounded-lg px-4 py-4 capitalize">sourse</a>
                        <a href="${item.strYoutube}" class="bg-red-800 rounded-lg px-2 py-4 capitalize">youtube</a>
                    </div>
                </article>
   `;
  //  add element to detail meal div
  $(".detail-meal div").append(element);
}

// start search section function
//search by name                                            
async function searchName(name) {
  //meake object the looping depend of number of items that response from api
  let obj = new AllData();
  let data = await obj.searchName(name);
  for (let i = 0; i < data.meals.length; i++) {
    let elem = `
                   <figure data-id="${data.meals[i].idMeal}" class="item rounded-md overflow-hidden relative group/parent cursor-pointer">
                     <img class="" src="${data.meals[i].strMealThumb}" alt="${data.meals[i].strMeal} img">
                     <div
                         class="layer flex flex-col justify-center p-8 bg-white text-black bg-opacity-70 group-hover/parent:translate-y-0 transition-all duration-[2s] absolute left-0  right-0 bottom-0 top-0 translate-y-[110%] ">
                         <h1 class="capitalize text-3xl font-mono font-extrabold">${data.meals[i].strMeal}</h1>
                     </div>
                 </figure> `
    //add items in its container
    $(".search .items").append(elem)
  }

}
//search by first letter  create Elements
async function searchLetter(letter) {
  //meake object the looping depend of number of items that response from api
  let obj = new AllData();
  let data = await obj.searchFletter(letter);
  for (let i = 0; i < data.meals.length; i++) {
    let elem = `
                             <figure data-id="${data.meals[i].idMeal}" class="item rounded-md overflow-hidden relative group/parent cursor-pointer">
                               <img class="" src="${data.meals[i].strMealThumb}" alt="${data.meals[i].strMeal} img">
                               <div
                                   class="layer flex flex-col justify-center p-8 bg-white text-black bg-opacity-70 group-hover/parent:translate-y-0 transition-all duration-[2s] absolute left-0  right-0 bottom-0 top-0 translate-y-[110%] ">
                                   <h1 class="capitalize text-3xl font-mono font-extrabold">${data.meals[i].strMeal}</h1>
                               </div>
                           </figure> `
    //add items in its container
    $(".search .items").append(elem)
  }

}

//category section make items
async function allCategory() {
  //meake object the looping depend of number of items that response from api
  let obj = new AllData();
  let data = await obj.allCategory();
  for (let i = 0; i < data.categories.length; i++) {
    let elem = `
                              <figure data-meal="${data.categories[i].strCategory}" class="item rounded-md overflow-hidden relative group/parent cursor-pointer">
                                 <img class="" src="${data.categories[i].strCategoryThumb}" alt="${data.categories[i].strCategory} img">
                                 <div class="layer py-10 overflow-hidden flex text-ellipsis  flex-col items-center text-center gap-3 justify-start  bg-white text-black bg-opacity-70 group-hover/parent:translate-y-0 transition-all duration-[2s] absolute left-0  right-0 bottom-0 top-0 translate-y-[110%] ">
                                     <h1 class="capitalize text-3xl font-mono font-extrabold">${data.categories[i].strCategory}</h1>
                                   <div class="desc">${data.categories[i].strCategoryDescription}</div>
                                  </div>
                              </figure> `
    //add items in its container
    $(".categories .items").append(elem)
  }

}

//allAreas section 
async function allAreas() {
  //meake object the looping depend of number of items that response from api
  let obj = new AllData();
  let data = await obj.allAreas();
  for (let i = 0; i < data.meals.length; i++) {
    let elem = `
                             <div data-area="${data.meals[i].strArea}" class="country flex flex-col justify-center items-center gap-2">
                                     <i class="fa-solid fa-house-flag font-bold  text-5xl"></i>
                                    <h2 class="capitalize font-bold text-3xl">${data.meals[i].strArea}</h2>
                              </div>
 `
    //add items in its container
    $(".area .countries").append(elem)
  }

}
// ingeredients section
async function allIngredients() {
  //meake object the looping depend of number of items that response from api
  let obj = new AllData();
  let data = await obj.allIngredients();
  for (let i = 0; i < data.meals.length; i++) {
    let disc = data.meals[i].strDescription;
    if (disc == null) {
      disc = "This is delcious meal and you can cover it"
    }
    let elem = `
                    <div data-meal="${data.meals[i].strIngredient}" class=" item text-center h-[300px]  border-slate-500 rounded-2xl cursor-pointer overflow-hidden border p-4 flex flex-col justify-center items-center gap-2">
                        <i class="fa-solid fa-drumstick-bite font-bold  text-5xl"></i>
                        <h2 class="capitalize font-bold text-3xl">${data.meals[i].strIngredient}</h2>
                        <p class="disc-ingred indent-4  max-h-[100px] overflow-hidden  text-ellipsis">${disc}</p>
                    </div>
   `
    //add items in its container
    $(".ingredients .items").append(elem);
  }
}
allIngredients()

function itemDetais(cb) {
  $(".item").on("click", (e) => {
    let id = e.target.parentElement.getAttribute("data-id");
    getDetails(id);
    // delete any item from detail meal section
    // Should be:
    $(".detail-meal div").html('');
    $("section").addClass("hidden");
    $(".detail-meal").removeClass("hidden");
    $(".detail-meal .cancel").on("click", () => {
      $(".detail-meal").addClass("hidden");
      //this is call back function depend of any section you want to appear
      cb();
    })
  });

}