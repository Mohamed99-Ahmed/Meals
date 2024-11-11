$(document).ready(function(){$(".loading").fadeOut(2e3,()=>{$("nav").show(1e3),$("main").removeClass("hidden");let e=!1;async function a(){$(".link-contact").on("click",()=>{$("section").addClass("hidden"),$(".contact").removeClass("hidden");let e=/^[a-zA-Z0-9_-]{3,15}$/gm,a=!1,t=/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,l=!1,s=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm,i=!1,n=!1,r=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm,o=!1,d=!1;$(".name").on("input",t=>{e.test(t.target.value)?($(t.target.nextElementSibling).addClass("hidden"),a=!0):($(t.target.nextElementSibling).removeClass("hidden"),a=!1,console.log("true email"))}),$(".email").on("input",e=>{t.test(e.target.value)?($(e.target.nextElementSibling).addClass("hidden"),l=!0):($(e.target.nextElementSibling).removeClass("hidden"),l=!1,console.log("true email"))}),$(".password").on("input",e=>{s.test(e.target.value)?($(e.target.nextElementSibling).addClass("hidden"),console.log("true pass"),i=!0):($(e.target.nextElementSibling).removeClass("hidden"),i=!1)}),$(".repassword").on("input",e=>{n=!1,e.target.value!==$(".password").val()?$(e.target.nextElementSibling).removeClass("hidden"):(n=!0,$(e.target.nextElementSibling).addClass("hidden"))}),$(".phone").on("input",e=>{r.test(e.target.value)?($(e.target.nextElementSibling).addClass("hidden"),o=!0,console.log("true phone")):($(e.target.nextElementSibling).removeClass("hidden"),o=!1)}),$(".age").on("input",e=>{e.target.value<=0?(e.target.nextElementSibling.classList.remove("hidden"),d=!1):(e.target.nextElementSibling.classList.add("hidden"),d=!0,console.log("true age"))}),$(".email, .password, .phone, .age, .repassword, .name").on("input",function(){l&&i&&o&&d&&a&&n?($(".submit").removeClass("pointer-events-none"),console.log("valid")):($(".submit").addClass("pointer-events-none"),console.log("No valid"))})}),await Meals("https://www.themealdb.com/api/json/v1/1/search.php?s="),$(".logo").on("click",()=>{$("section").addClass("hidden"),$(".home").removeClass("hidden")}),itemDetais(function e(){$(".home").removeClass("hidden")}),$(".link-search").on("click",()=>{$("section").addClass("hidden"),$(".search").removeClass("hidden"),$(".search-name").on("input",async e=>{$(".search .items").html("");await searchName(e.target.value),itemDetais(function e(){$(".search").removeClass("hidden")})}),$(".search-letter").on("input",async e=>{$(".search .items").html("");await searchName(e.target.value),itemDetais(function e(){$(".search").removeClass("hidden")})})}),$(".link-category").on("click",async()=>{$("section").addClass("hidden"),$(".categories").removeClass("hidden"),await allCategory(),$(".item").on("click",async e=>{$("section").addClass("hidden"),$(".home").removeClass("hidden"),$(".home .items").html(""),await Meals(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.parentElement.getAttribute("data-meal")}`),itemDetais(()=>{$(".home").removeClass("hidden")})})}),$(".link-area").on("click",async()=>{$("section").addClass("hidden"),$(".area").removeClass("hidden"),await allAreas(),$(".country").on("click",async e=>{$(e.target).hasClass("country")&&($("section").addClass("hidden"),$(".home").removeClass("hidden"),$(".home .items").html(""),console.log(e.target),await Meals(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${e.target.getAttribute("data-area")}`),itemDetais(()=>{$(".home").removeClass("hidden")}))})}),$(".link-ingredients").on("click",async()=>{$("section").addClass("hidden"),$(".ingredients").removeClass("hidden"),await allIngredients(),$(".item").on("click",async e=>{$(e.target).hasClass("item")&&($("section").addClass("hidden"),$(".home").removeClass("hidden"),$(".home .items").html(""),await Meals(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${e.target.getAttribute("data-meal")}`),itemDetais(()=>{$(".home").removeClass("hidden")}))})})}$(".toggle").on("click",()=>{$(".sidebar li").on("click",()=>{$("nav .list").hide(1e3),$("nav .fa-xmark").hide(),$("nav .fa-bars-staggered").show()}),e?($("nav .fa-xmark").hide(),$("nav .fa-bars-staggered").show(),$("nav .list").hide(1e3),e=!1):($("nav .fa-xmark").show(),$("nav .fa-bars-staggered").hide(),$("nav .list").show(1e3),e=!0)}),a()})});class AllData{constructor(){}async Meals(e){return await (await fetch(e)).json()}async detailsMeal(e){return await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e}`)).json()}async searchName(e){return await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e}`)).json()}async searchFletter(e){return await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e}`)).json()}async allCategory(){return await (await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")).json()}async allAreas(){return await (await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")).json()}async allIngredients(){return await (await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")).json()}}async function Meals(e){let a=await new AllData().Meals(e);for(let t=0;t<a.meals.length;t++){let l=`
      <figure data-id="${a.meals[t].idMeal}" class="item rounded-md overflow-hidden relative group/parent cursor-pointer">
                     <img loading="lazy" src="${a.meals[t].strMealThumb}" alt="${a.meals[t].strMeal} img">
                     <div
                         class="layer flex flex-col justify-center p-8 bg-white text-black bg-opacity-70 group-hover/parent:translate-y-0 transition-all duration-[2s] absolute left-0  right-0 bottom-0 top-0 translate-y-[110%] ">
                         <h1 class="capitalize text-3xl font-mono font-extrabold">${a.meals[t].strMeal}</h1>
                     </div>
                 </figure> `;$(".home .items").append(l)}return a}async function getDetails(e){let a=(await new AllData().detailsMeal(e)).meals[0],t=[],l=[];for(let s in a)s.startsWith("strIngredient")&&""!=a[s]&&a[s]&&t.push(a[s]);for(let i in a)i.startsWith("strMeasure")&&" "!==a[i]&&a[i]&&l.push(a[i]);let n=`
            <figure class="md:col-span-3 ">
                    <figure class="item rounded-md overflow-hidden relative group/parent cursor-pointer">
                        <img loading="lazy"  class="mb-4" src="${a.strMealThumb}" alt="meal img" >
                        <h2 class="text-2xl font-bold capitalize"> ${a.strMeal}</h2>
                    </figure>
                </figure>
                <article class="md:col-span-5 lg:col-span-7 flex flex-col gap-5">
                    <h2 class="font-bold text-2xl capitalize">Instructions</h2>
                    <p class="detail-meal-disc text-center">${a.strInstructions}</p>
                    <h3 class="font-bold text-2xl capitalize">Area : <span>${a.strArea}</span></h3>
                    <h3 class="font-bold text-2xl capitalize">Category  : <span class="text-lg">${a.strCategory}</span></h3>
                    <h3 class="font-bold text-2xl capitalize">Recipes : </h3>
                    <ul class="recipes-list flex gap-4 flex-wrap ">
                        ${l.map((e,a)=>`<li class="bg-slate-800 px-4 py-4 rounded-full">${t[a]}: ${e}</li>`).join("")}
                    </ul>
                    <h3 class="font-bold text-2xl capitalize">Links : </h3>
                    <div class="tags-links flex gap-8">
                        <a href="${a.strSource}" class="bg-green-700 rounded-lg px-4 py-4 capitalize">sourse</a>
                        <a href="${a.strYoutube}" class="bg-red-800 rounded-lg px-2 py-4 capitalize">youtube</a>
                    </div>
                </article>
   `;$(".detail-meal div").append(n)}async function searchName(e){let a=await new AllData().searchName(e);for(let t=0;t<a.meals.length;t++){let l=`
                   <figure data-id="${a.meals[t].idMeal}" class="item rounded-md overflow-hidden relative group/parent cursor-pointer">
                     <img loading="lazy"  src="${a.meals[t].strMealThumb}" alt="${a.meals[t].strMeal} img">
                     <div
                         class="layer flex flex-col justify-center p-8 bg-white text-black bg-opacity-70 group-hover/parent:translate-y-0 transition-all duration-[2s] absolute left-0  right-0 bottom-0 top-0 translate-y-[110%] ">
                         <h1 class="capitalize text-3xl font-mono font-extrabold">${a.meals[t].strMeal}</h1>
                     </div>
                 </figure> `;$(".search .items").append(l)}}async function searchLetter(e){let a=await new AllData().searchFletter(e);for(let t=0;t<a.meals.length;t++){let l=`
                             <figure data-id="${a.meals[t].idMeal}" class="item rounded-md overflow-hidden relative group/parent cursor-pointer">
                               <img loading="lazy"  src="${a.meals[t].strMealThumb}" alt="${a.meals[t].strMeal} img">
                               <div
                                   class="layer flex flex-col justify-center p-8 bg-white text-black bg-opacity-70 group-hover/parent:translate-y-0 transition-all duration-[2s] absolute left-0  right-0 bottom-0 top-0 translate-y-[110%] ">
                                   <h1 class="capitalize text-3xl font-mono font-extrabold">${a.meals[t].strMeal}</h1>
                               </div>
                           </figure> `;$(".search .items").append(l)}}async function allCategory(){let e=await new AllData().allCategory();for(let a=0;a<e.categories.length;a++){let t=`
                              <figure data-meal="${e.categories[a].strCategory}" class="item rounded-md overflow-hidden relative group/parent cursor-pointer">
                                 <img loading="lazy" src="${e.categories[a].strCategoryThumb}" alt="${e.categories[a].strCategory} img">
                                 <div class="layer py-10 overflow-hidden flex text-ellipsis  flex-col items-center text-center gap-3 justify-start  bg-white text-black bg-opacity-70 group-hover/parent:translate-y-0 transition-all duration-[2s] absolute left-0  right-0 bottom-0 top-0 translate-y-[110%] ">
                                     <h1 class="capitalize text-3xl font-mono font-extrabold">${e.categories[a].strCategory}</h1>
                                   <div class="desc">${e.categories[a].strCategoryDescription}</div>
                                  </div>
                              </figure> `;$(".categories .items").append(t)}}async function allAreas(){let e=await new AllData().allAreas();for(let a=0;a<e.meals.length;a++){let t=`
                             <div data-area="${e.meals[a].strArea}" class="country flex flex-col justify-center items-center gap-2">
                                     <i class="fa-solid fa-house-flag font-bold  text-5xl"></i>
                                    <h2 class="capitalize font-bold text-3xl">${e.meals[a].strArea}</h2>
                              </div>
 `;$(".area .countries").append(t)}}async function allIngredients(){let e=await new AllData().allIngredients();for(let a=0;a<e.meals.length;a++){let t=e.meals[a].strDescription;null==t&&(t="This is delcious meal and you can cover it");let l=`
                    <div data-meal="${e.meals[a].strIngredient}" class=" item text-center h-[300px]  border-slate-500 rounded-2xl cursor-pointer overflow-hidden border p-4 flex flex-col justify-center items-center gap-2">
                        <i class="fa-solid fa-drumstick-bite font-bold  text-5xl"></i>
                        <h2 class="capitalize font-bold text-3xl">${e.meals[a].strIngredient}</h2>
                        <p class="disc-ingred indent-4  max-h-[100px] overflow-hidden  text-ellipsis">${t}</p>
                    </div>
   `;$(".ingredients .items").append(l)}}function itemDetais(e){$(".item").on("click",a=>{getDetails(a.target.parentElement.getAttribute("data-id")),$(".detail-meal div").html(""),$("section").addClass("hidden"),$(".detail-meal").removeClass("hidden"),$(".detail-meal .cancel").on("click",()=>{$(".detail-meal").addClass("hidden"),e()})})}allIngredients();