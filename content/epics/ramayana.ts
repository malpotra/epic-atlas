import type { Epic } from "../types";

export const ramayana: Epic = {
  id: "ramayana",
  title: "The Ramayana",
  origin: "Attributed to Valmiki · Sanskrit",
  tagline: "An exiled prince crosses a subcontinent and an ocean.",
  mapCaption:
    "South Asia, with stops at places traditionally linked to the story. Many of these identifications are matters of tradition and devotion, not established geography.",
  episodes: [
    {
      id: "ayodhya",
      title: "Exile from Ayodhya",
      place: "Ayodhya",
      x: 559,
      y: 135,
      summary:
        "On the eve of Rama's coronation, Queen Kaikeyi claims two boons from King Dasharatha: her son Bharata will rule and Rama will be exiled for fourteen years. Rama accepts, and Sita and Lakshmana go with him.",
      characters: ["Rama", "Sita", "Lakshmana", "Kaikeyi", "Dasharatha"],
    },
    {
      id: "chitrakuta",
      title: "Bharata's Plea",
      place: "Chitrakuta",
      x: 524,
      y: 205,
      summary:
        "Dasharatha dies of grief. Bharata rejects the throne, finds Rama in the forest and begs him to return. When Rama refuses to break his father's word, Bharata carries his sandals home to place on the throne.",
      characters: ["Bharata", "Rama"],
    },
    {
      id: "panchavati",
      title: "The Abduction of Sita",
      place: "Panchavati",
      x: 335,
      y: 311,
      summary:
        "A golden deer, really the demon Maricha in disguise, lures Rama and then Lakshmana away. Ravana, king of Lanka, carries Sita off in his aerial chariot. The old vulture Jatayu is mortally wounded trying to stop him.",
      characters: ["Sita", "Ravana", "Maricha", "Jatayu", "Shurpanakha"],
    },
    {
      id: "kishkindha",
      title: "Alliance at Kishkindha",
      place: "Kishkindha",
      x: 407,
      y: 433,
      summary:
        "Searching for Sita, Rama meets Hanuman and allies with the exiled vanara prince Sugriva, helping him defeat his brother Vali. The vanaras scatter to search, and Hanuman leaps the ocean and finds Sita captive in Lanka.",
      characters: ["Rama", "Hanuman", "Sugriva", "Vali"],
    },
    {
      id: "setu",
      title: "Building the Bridge",
      place: "Rameshwaram",
      x: 470,
      y: 572,
      summary:
        "The vanara army reaches the sea. When the ocean god is forced to yield, Nala leads the army in building a bridge of rocks and trees across the water to Lanka.",
      characters: ["Rama", "Nala", "Hanuman", "Sagara"],
    },
    {
      id: "lanka",
      title: "The War for Lanka",
      place: "Lanka",
      x: 545,
      y: 640,
      summary:
        "Ravana's brother Vibhishana defects to Rama. Kumbhakarna and Indrajit fall, Hanuman brings a mountain of healing herbs to save Lakshmana, and Rama kills Ravana. Sita is freed and Vibhishana takes the throne.",
      characters: ["Rama", "Ravana", "Hanuman", "Lakshmana", "Vibhishana", "Indrajit"],
    },
    {
      id: "return",
      title: "The Return Home",
      place: "Ayodhya",
      x: 612,
      y: 118,
      summary:
        "The fourteen years end. Rama, Sita and Lakshmana fly home in the Pushpaka chariot, Bharata gives back the kingdom, and Rama is crowned. Many Hindus link the festival of Diwali to this homecoming.",
      characters: ["Rama", "Sita", "Lakshmana", "Bharata"],
    },
  ],
};
