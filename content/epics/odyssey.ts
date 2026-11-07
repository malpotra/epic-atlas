import type { Epic } from "../types";

export const odyssey: Epic = {
  id: "odyssey",
  title: "The Odyssey",
  origin: "Attributed to Homer · Ancient Greek",
  tagline: "Ten years at war. Ten more trying to get home.",
  mapCaption:
    "The Mediterranean, with stops placed by later tradition. Homer's geography is largely imaginary, and these identifications are debated.",
  episodes: [
    {
      id: "troy",
      title: "Leaving Troy",
      place: "Troy",
      x: 785,
      y: 267,
      summary:
        "The war is won and Troy lies in ruins. Odysseus, king of Ithaca, sets sail for home with twelve ships, expecting a short voyage.",
      characters: ["Odysseus"],
    },
    {
      id: "cicones",
      title: "The Raid on the Cicones",
      place: "Ismarus, Thrace",
      x: 745,
      y: 205,
      summary:
        "The fleet sacks Ismarus. Odysseus urges his men to leave, but they stay to feast, and the Cicones counterattack. Six men from every ship are lost.",
      characters: ["Odysseus", "Maron"],
    },
    {
      id: "lotus",
      title: "The Lotus-Eaters",
      place: "North African coast",
      x: 219,
      y: 534,
      summary:
        "Storms drive the ships far south. Scouts who taste the lotus forget home and want only to stay, so Odysseus drags them back to the ships in tears.",
      characters: ["Odysseus"],
    },
    {
      id: "cyclops",
      title: "The Cyclops' Cave",
      place: "Land of the Cyclopes",
      x: 355,
      y: 372,
      summary:
        "Trapped by Polyphemus, Odysseus gives his name as 'Nobody', blinds the giant and escapes beneath his sheep. Then he shouts his real name from the ship, and Polyphemus calls on his father Poseidon for revenge.",
      characters: ["Odysseus", "Polyphemus", "Poseidon"],
    },
    {
      id: "aeolus",
      title: "The Bag of Winds",
      place: "Aeolia, the floating island",
      x: 300,
      y: 290,
      summary:
        "Aeolus seals the storm winds in a bag as a parting gift. Ithaca is already in sight when the crew, suspecting treasure, opens it and is blown all the way back.",
      characters: ["Odysseus", "Aeolus"],
    },
    {
      id: "laestrygonians",
      title: "The Laestrygonians",
      place: "Telepylus",
      x: 180,
      y: 205,
      summary:
        "Giants hurl boulders into a closed harbour and spear the crews like fish. Eleven ships are destroyed. Only Odysseus' vessel, moored outside, gets away.",
      characters: ["Odysseus", "Antiphates"],
    },
    {
      id: "circe",
      title: "Circe's Island",
      place: "Aeaea",
      x: 285,
      y: 195,
      summary:
        "The enchantress Circe turns his scouts into swine. Protected by a herb from Hermes, Odysseus resists her magic, frees his men and stays a full year before she tells him the way onward.",
      characters: ["Odysseus", "Circe", "Hermes"],
    },
    {
      id: "underworld",
      title: "Speaking with the Dead",
      place: "Edge of the world",
      x: 55,
      y: 250,
      summary:
        "At the edge of the world, Odysseus calls up the dead. The prophet Teiresias foretells his trials, his mother Anticleia tells him of home, and Achilles says he would rather be a living labourer than king of the dead.",
      characters: ["Odysseus", "Teiresias", "Anticleia", "Achilles"],
    },
    {
      id: "sirens",
      title: "The Sirens",
      place: "The Sirens' shore",
      x: 350,
      y: 252,
      summary:
        "The crew sail past with wax in their ears, while Odysseus, lashed to the mast, hears the song that lures sailors to their deaths and begs in vain to be untied.",
      characters: ["Odysseus", "The Sirens"],
    },
    {
      id: "scylla",
      title: "Scylla and Charybdis",
      place: "The narrow strait",
      x: 425,
      y: 322,
      summary:
        "On one side is a whirlpool that could swallow the ship, on the other a six-headed monster. Odysseus steers towards Scylla and loses six men, knowing he would otherwise lose them all.",
      characters: ["Odysseus", "Scylla", "Charybdis"],
    },
    {
      id: "thrinacia",
      title: "The Cattle of the Sun",
      place: "Thrinacia",
      x: 295,
      y: 405,
      summary:
        "Stranded and starving, the crew slaughter the sacred cattle of Helios despite their oath. Once they put to sea, Zeus destroys the ship with a thunderbolt. Only Odysseus survives.",
      characters: ["Odysseus", "Eurylochus", "Helios", "Zeus"],
    },
    {
      id: "calypso",
      title: "Seven Years with Calypso",
      place: "Ogygia",
      x: 345,
      y: 470,
      summary:
        "Washed ashore alone, Odysseus is kept by the nymph Calypso, who offers him immortality. He still longs for home, and at last the gods send Hermes to order his release.",
      characters: ["Odysseus", "Calypso", "Hermes"],
    },
    {
      id: "phaeacians",
      title: "The Phaeacians",
      place: "Scheria",
      x: 548,
      y: 262,
      summary:
        "Shipwrecked again by Poseidon, Odysseus is found by the princess Nausicaa. At King Alcinous' court he finally tells his whole story, and the Phaeacians carry him home with gifts.",
      characters: ["Odysseus", "Nausicaa", "Alcinous", "Arete"],
    },
    {
      id: "ithaca",
      title: "The Return to Ithaca",
      place: "Ithaca",
      x: 590,
      y: 340,
      summary:
        "Disguised as a beggar, Odysseus finds suitors devouring his house. Penelope sets a contest with his great bow. Only he can string it, and with his son Telemachus he kills the suitors and reclaims his home.",
      characters: ["Odysseus", "Penelope", "Telemachus", "Athena"],
    },
  ],
};
