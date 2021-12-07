let countryObject = {
    "USA": [
        "Alabama", 
        "Alaszka",
        "Arizona",
        "Arkansas",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Dél-Dakota",
        "Dél-Karolina",
        "Észak-Dakota",
        "Észak-Karolina",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kalifornia",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New York",
        "Nyugat-Virginia",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "Tennessee",
        "Texas",
        "Új-Mexikó",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "Wisconsin",
        "Wyoming",
    ],
    "Magyarország": [
        "Bács-Kiskun",
        "Baranya",
        "Békés",
        "Borsod-Abaúj-Zemplén",
        "Csongrád-Csanád",
        "Fejér",
        "Győr-Moson-Sopron",
        "Hajdú-Bihar",
        "Heves",
        "Jász-Nagykun-Szolnok",
        "Komárom-Esztergom",
        "Nógrád",
        "Pest",
        "Somogy",
        "Szabolcs-Szatmár-Bereg",
        "Tolna",
        "Vas",
        "Veszprém",
        "Zala"
    ]
    }

window.onload = () => {
    let countrySelect = document.getElementById("country");
    let stateSelect = document.getElementById("state");

    for (let country in countryObject) {
      countrySelect.options[countrySelect.options.length] = new Option(country, country);
    }

    countrySelect.onchange = function() {
        stateSelect.length = 1;
        let z = countryObject[countrySelect.value];
        for (let i = 0; i < z.length; i++) {
        stateSelect.options[stateSelect.options.length] = new Option(z[i], z[i]);
        }
    }
}