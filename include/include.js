const SMHIFetchLink = "https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/98230/period/latest-hour/data.json";

let allow_progressbar_update = false;

window.onload = loadIncludes
window.onscroll = progressbar_update

// för att uppdatera vädret i headern (görs bara när sidan ladas in)
async function wether_update() {
    try {
        const response = await fetch(SMHIFetchLink);
        if (!response.ok) {
        throw new Error("Nätverksfel: " + response.status);
        }
        const data = await response.json();
        const temperature = data.value[0].value; // <-- här ligger temperaturen
        document.getElementById("header_wether").innerHTML = `${temperature} °C`;

    } catch (error) {
        console.error("Fel vid hämtning av temperatur:", error);
    }
};

async function loadIncludes() {
    document.getElementById("header").innerHTML = await (await fetch("../include/header.html")).text();
    document.getElementById("footer").innerHTML = await (await fetch("../include/footer.html")).text();
    allow_progressbar_update = true;
    progressbar_update();
    wether_update();
}

// uppdatera progress bar
function progressbar_update() {
    //meh, sidan är kort ändå
    //if (!allow_progressbar_update)
        return;

    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.body.scrollHeight - document.body.clientHeight;
    console.log(height);
    
    let scrolled = (winScroll / height) * 100;
    console.log(scrolled + "scrolled");

    document.getElementById("top_progress_bar").style.width = scrolled + "%";
};
