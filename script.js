let covers;
let filter = "alle";
document.addEventListener("DOMContentLoaded", loadJSON)

async function loadJSON() {
    const JSONData = await
    fetch("https://spreadsheets.google.com/feeds/list/1BXKsX9OxBOimdqqDsNUK8n1PkGAVyjyVuwMtXVyh0nU/od6/public/values?alt=json");

    covers = await JSONData.json();
    addEventListenersToButtons();
    visCovers();
}

function visCovers() {
    const templatePointer = document.querySelector("template");
    const listPointer = document.querySelector("#list");
    listPointer.innerHTML = "";
    console.log(covers);

    covers.feed.entry.forEach(cov => {
        if (filter == "alle" || filter == cov.gsx$kategori.$t) {
            const minKlon = templatePointer.cloneNode(true).content;
            minKlon.querySelector(".kunstner").textContent = cov.gsx$kunstner.$t;
            minKlon.querySelector(".albumnavn").textContent = cov.gsx$albumnavn.$t;
            minKlon.querySelector(".år").textContent = cov.gsx$år.$t;
            minKlon.querySelector(".pladeselskab").textContent = cov.gsx$pladeselskab.$t;
            //minKlon.querySelector(".").textContent = cov.gsx$lang.$t;
            minKlon.querySelector(".kategori").textContent = cov.gsx$kategori.$t;
            minKlon.querySelector(".beskrivelse").textContent = cov.gsx$beskrivelse.$t;
            minKlon.querySelector(".billede").src = `imgs/small/${cov.gsx$billede.$t}` + "-sm.jpg";

            minKlon.querySelector("article").addEventListener("click", () => visDetaljer(cov));

            listPointer.appendChild(minKlon);
        }

    })
}

function visDetaljer(cov) {
    console.log(cov);

    popup.style.display = "block";

    popup.querySelector(".pop_kunstner").textContent = cov.gsx$kunstner.$t
    popup.querySelector(".pop_år").textContent = cov.gsx$år.$t;
    //popup.querySelector(".pop_").textContent = cov.gsx$kort.$t;
    popup.querySelector(".pop_pladeselskab").textContent = cov.gsx$pladeselskab.$t;
    popup.querySelector(".pop_kategori").textContent = cov.gsx$kategori.$t;
    popup.querySelector(".pop_beskrivelse").textContent = cov.gsx$beskrivelse.$t;
    popup.querySelector(".pop_albumnavn").textContent = cov.gsx$albumnavn.$t;
    popup.querySelector(".pop_billede").src = `imgs/small/${cov.gsx$billede.$t}` + "-sm.jpg";
}

document.querySelector("#luk").addEventListener("click", () => popup.style.display = "none");

function addEventListenersToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    })
}

function filterBTNs() {
    filter = this.dataset.kategori;
    document.querySelector("h1").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");
    })
    this.classList.add("valgt");
    visCovers();

}
