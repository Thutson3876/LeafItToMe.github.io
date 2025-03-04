

function generateSuggestion() {
    tea_dict={ 
        "black":["earl grey","english breakfast"], 
        "green":["jasmine","matcha"], 
        "herbal":["chamomile", "mint"]
    };

    let idx = Math.floor(Math.random() * Object.keys(tea_dict).length);
    let choice = Object.keys(tea_dict)[idx];
    let suggestions = tea_dict[choice];

    document.getElementById("suggestion").innerHTML = 
        suggestions[Math.floor(Math.random() * suggestions.length)].toUpperCase();
  }