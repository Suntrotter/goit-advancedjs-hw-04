import{a as d,S as b,i as m}from"./assets/vendor-u8rapaCG.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(e){if(e.ep)return;e.ep=!0;const a=i(e);fetch(e.href,a)}})();d.defaults.baseURL="https://pixabay.com/api/";const P="46490288-24919c30ba7303f136305d546";async function f({page:t,perPage:r,searchTerm:i}){const{data:o}=await d.get("",{params:{key:P,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:r}});return o}function g(t){return t.map(({webformatURL:r,largeImageURL:i,tags:o,likes:e,views:a,comments:l,downloads:L})=>`<li class='photo-item'>
        <a class="photo-link" href="${i}" >
		<img
			class="photo-image"
			src="${r}"
			alt="${o}"
            width='358'
            height='200'
			/>
	</a>
    <ul class='img-info'>
    <li><p>Likes</p><p>${e}</p></li>
    <li><p>Views</p><p>${a}</p></li>
    <li><p>Comments</p><p>${l}</p></li>
    <li><p>Downloads</p><p>${L}</p></li>
    </ul>
</li>`).join("")}let h=new b(".photo-link",{captionDelay:250,captionsData:"alt"});const p=document.querySelector(".photo-gallery"),c=document.querySelector(".loading-indicator"),n=document.querySelector(".load-more-btn"),w=document.querySelector(".search-form"),s={page:1,perPage:15,maxPages:1,searchTerm:""};w.addEventListener("submit",S);async function S(t){t.preventDefault(),p.innerHTML="",u(n,!1),s.page=1;const r=t.currentTarget;c.style.display="block";const i=r.elements.search.value.trim();s.searchTerm=i;try{const o=await f(s);o.total===0&&m.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),s.maxPages=Math.ceil(o.totalHits/s.perPage),p.innerHTML=g(o.hits),h.refresh(),s.maxPages>s.page&&(u(n,!0),n.addEventListener("click",y))}catch(o){console.error(o)}finally{c.style.display="none",r.reset()}}async function y(){n.textContent="Loading...",s.page+=1,c.style.display="block";try{const t=await f(s),r=g(t.hits);p.insertAdjacentHTML("beforeend",r),h.refresh();const o=document.querySelector(".photo-item").getBoundingClientRect();window.scrollBy({top:2*o.height,behavior:"smooth"}),s.maxPages===s.page&&(u(n,!1),n.removeEventListener("click",y),m.success({message:"We're sorry, but you've reached the end of search results.",position:"topRight",color:"blue",icon:!1}))}catch(t){console.error(t)}finally{n.textContent="Load more",c.style.display="none"}}function u(t,r){r?t.classList.remove("hidden"):t.classList.add("hidden")}
//# sourceMappingURL=index.js.map
