class TeaSuggestion {
    constructor(name, imgSrc, description) {
      this.name = name;
      this.imgSrc = imgSrc;
      this.description = description;
    }
  }

class Suggestor {
    constructor(tea_dict) {
        this.tea_dict = tea_dict;
      }

    get suggestion() {
        let idx = Math.floor(Math.random() * Object.keys(this.tea_dict).length);
        let choice = Object.keys(this.tea_dict)[idx];
        let suggestions = this.tea_dict[choice];

        return suggestions[Math.floor(Math.random() * suggestions.length)];
    }
}

function generateSuggestion(tea_dict) {
    let idx = Math.floor(Math.random() * Object.keys(tea_dict).length);
    let choice = Object.keys(tea_dict)[idx];
    let suggestions = tea_dict[choice];

    document.getElementById("suggestion").innerHTML = 
        suggestions[Math.floor(Math.random() * suggestions.length)].toUpperCase();
    document.getElementById("suggestion-img").style.display = "block";
  }

function loadSuggestion(suggestion) {
    document.getElementById("suggestion").innerHTML = 
        suggestion.name.toUpperCase();

    document.getElementById("suggestion-desc").innerHTML = 
        suggestion.description.toUpperCase();

    document.getElementById("suggestion-img").src = suggestion.imgSrc;
    document.getElementById("suggestion-img").style.display = "block";
}

  tea_dict = { 
    "black":[new TeaSuggestion("earl grey", "tealeaf.png", "A delicious black tea."), new TeaSuggestion("english breakfast", "tealeaf.png", "A delicious black tea.")], 
    "green":[new TeaSuggestion("jasmine", "tealeaf.png", "A delicious green tea."), new TeaSuggestion("matcha", "tealeaf.png", "A delicious green tea.")], 
    "herbal":[new TeaSuggestion("chamomile", "tealeaf.png", "A delicious herbal tea."), new TeaSuggestion("mint", "tealeaf.png", "A delicious herbal tea.")]
    };

  let suggestor = new Suggestor(tea_dict);
  let btn = document.getElementById("suggestion-btn");
  //btn.addEventListener("click", () => generateSuggestion(tea_dict));
  btn.addEventListener("click", () => loadSuggestion(suggestor.suggestion));