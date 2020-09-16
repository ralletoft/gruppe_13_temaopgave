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

//sitet er nu loadet og json data er hentet fra vores google docs dokument

function visCovers() {
    const templatePointer = document.querySelector("template");
    const listPointer = document.querySelector(".item-c");
    listPointer.innerHTML = "";
    console.log(covers);

    covers.feed.entry.forEach(cov => {
        if (filter == "alle" || filter == cov.gsx$kategori.$t) {
            const minKlon = templatePointer.cloneNode(true).content;
            minKlon.querySelector(".billede").src = `imgs/${cov.gsx$billede.$t}` + ".jpg";
            minKlon.querySelector(".kunstner").textContent = cov.gsx$kunstner.$t;
            minKlon.querySelector(".albumnavn").textContent = cov.gsx$albumnavn.$t;
            //minKlon.querySelector(".udgivelse").textContent = cov.gsx$udgivelse.$t;
            //minKlon.querySelector(".pladeselskab").textContent = cov.gsx$pladeselskab.$t;
            //minKlon.querySelector(".").textContent = cov.gsx$lang.$t;
            //minKlon.querySelector(".kategori").textContent = cov.gsx$kategori.$t;
            //minKlon.querySelector(".beskrivelse").textContent = cov.gsx$beskrivelse.$t;

            minKlon.querySelector("article").addEventListener("click", () => visDetaljer(cov));

            listPointer.appendChild(minKlon);
        }

    })
}

//efter denne function er billede, kunstner navn og albumnavn hentet og vist i vores item-c. Resten har vi udkommenteret for at give en stilren forside.

function visDetaljer(cov) {
    console.log(cov);

    popup.style.display = "block";

    popup.querySelector(".pop_kunstner").textContent = cov.gsx$kunstner.$t
    popup.querySelector(".pop_udgivelse").textContent = cov.gsx$udgivelse.$t;
    //popup.querySelector(".pop_").textContent = cov.gsx$kort.$t;
    popup.querySelector(".pop_pladeselskab").textContent = cov.gsx$pladeselskab.$t;
    popup.querySelector(".pop_kategori").textContent = cov.gsx$kategori.$t;
    popup.querySelector(".pop_beskrivelse").textContent = cov.gsx$beskrivelse.$t;
    popup.querySelector(".pop_albumnavn").textContent = cov.gsx$albumnavn.$t;
    popup.querySelector(".pop_billede").src = `imgs/${cov.gsx$billede.$t}` + ".jpg";

    document.querySelector("body").style.overflow = "hidden";
}

document.querySelector("#luk").addEventListener("click", () => {
    popup.style.display = "none";
    document.querySelector("body").style.overflow = "visible";
});

//ovenfor har vi hentet data ind til vores pop-up side, som er blokeret indtil de bliver trykket på senere i vores JavaScript
//Luk knapen er også gjort klikbar

function addEventListenersToButtons() {
    document.querySelector(".menuknap").addEventListener("click", toggleMenu);
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    })
}

function toggleMenu() {
    console.log("toggleMenu");

    document.querySelector(".menu").classList.toggle("hidden");

    let erSkjult = document.querySelector(".menu").classList.contains("hidden");

    if (erSkjult == true) {
        document.querySelector(".menuknap").innerHTML = "<img src='burgermenu.png' alt='menu logo'>";

    } else {
        document.querySelector(".menuknap").innerHTML = "<img src='kryds.png' alt='menu x'>";
    }
}

//vores burger menu er nu gjort aktiv og klikbar og vha. mediaquery ses den kun i vores mobilversion af site


function filterBTNs() {
    filter = this.dataset.kategori;
    document.querySelector("h1").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");
    })
    this.classList.add("valgt");
    visCovers();

}

//I vores sidste function her vises den valgte kategori i vores H1 på siden
