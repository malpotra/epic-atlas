import type { Epic } from "../types";

export const mahabharata: Epic = {
  id: "mahabharata",
  title: "The Mahabharata",
  origin: "Attributed to Vyasa · Sanskrit",
  tagline: "One family, one throne, and eighteen days of war.",
  mapCaption:
    "The Kuru lands of northern India, stylised and not to scale. Stops follow traditional identifications, several of which are uncertain.",
  episodes: [
    {
      id: "hastinapura",
      title: "Cousins at Hastinapura",
      place: "Hastinapura",
      x: 538,
      y: 356,
      summary:
        "The five Pandava brothers and the hundred Kauravas grow up together in the Kuru capital, trained in arms by Drona. Arjuna's brilliance and the question of who will inherit the throne turn Duryodhana's jealousy into hatred.",
      characters: ["Yudhishthira", "Bhima", "Arjuna", "Duryodhana", "Drona"],
    },
    {
      id: "varanavata",
      title: "The House of Lac",
      place: "Varanavata",
      x: 446,
      y: 369,
      summary:
        "Duryodhana has a palace built of flammable materials for the Pandavas to die in. Warned by Vidura, they dig a tunnel, escape as it burns with their mother Kunti, and vanish into the forest, presumed dead.",
      characters: ["Kunti", "Vidura", "Duryodhana", "Bhima"],
    },
    {
      id: "panchala",
      title: "Draupadi's Swayamvara",
      place: "Panchala",
      x: 738,
      y: 560,
      summary:
        "Disguised as a Brahmin, Arjuna strings the great bow, hits the target and wins Princess Draupadi. She becomes the wife of all five brothers, and the alliance with Panchala brings them back into the open.",
      characters: ["Arjuna", "Draupadi", "Drupada", "Krishna"],
    },
    {
      id: "indraprastha",
      title: "The Rise of Indraprastha",
      place: "Indraprastha",
      x: 423,
      y: 445,
      summary:
        "To avoid war, the kingdom is split and the Pandavas receive barren Khandava. They build the splendid city of Indraprastha, and Yudhishthira is declared emperor. Humiliated in its palace of illusions, Duryodhana burns with envy.",
      characters: ["Yudhishthira", "Krishna", "Maya", "Duryodhana"],
    },
    {
      id: "dice",
      title: "The Game of Dice",
      place: "Hastinapura court",
      x: 600,
      y: 305,
      summary:
        "With Shakuni throwing the dice, Yudhishthira gambles away his wealth, his brothers, himself and Draupadi, who is dragged into court and humiliated before the elders. A second game sends the Pandavas into exile.",
      characters: ["Yudhishthira", "Shakuni", "Draupadi", "Duhshasana", "Dhritarashtra"],
    },
    {
      id: "forest",
      title: "Twelve Years in the Forest",
      place: "Kamyaka forest",
      x: 195,
      y: 250,
      summary:
        "The brothers live as forest exiles. Arjuna wins divine weapons, including one from Shiva, and Yudhishthira answers a yaksha's riddles at an enchanted lake to bring his brothers back to life.",
      characters: ["Arjuna", "Shiva", "Yudhishthira", "Draupadi"],
    },
    {
      id: "virata",
      title: "The Year in Disguise",
      place: "Virata",
      x: 262,
      y: 585,
      summary:
        "In the thirteenth year they must stay undiscovered, so they serve at King Virata's court. Arjuna lives as the dance teacher Brihannala, Bhima kills Draupadi's tormentor Kichaka, and they survive the year unrecognised.",
      characters: ["Virata", "Arjuna", "Bhima", "Draupadi", "Kichaka"],
    },
    {
      id: "kurukshetra",
      title: "The War at Kurukshetra",
      place: "Kurukshetra",
      x: 369,
      y: 235,
      summary:
        "Duryodhana refuses to give up even five villages. As Arjuna falters before fighting his own kin, his charioteer Krishna delivers the Bhagavad Gita. After eighteen days Bhishma, Drona, Karna and Duryodhana are all dead, and few survive.",
      characters: ["Krishna", "Arjuna", "Bhishma", "Karna", "Duryodhana"],
    },
    {
      id: "ascent",
      title: "The Great Departure",
      place: "The Himalaya",
      x: 769,
      y: 112,
      summary:
        "Years later the Pandavas renounce the throne and climb towards heaven. One by one Draupadi and the brothers fall. Only Yudhishthira reaches the summit, with a dog he refuses to abandon, which is revealed to be Dharma himself.",
      characters: ["Yudhishthira", "Draupadi", "Dharma"],
    },
  ],
};
