import type { Epic } from "../types";

export const iliad: Epic = {
  id: "iliad",
  title: "The Iliad",
  origin: "Attributed to Homer · Ancient Greek",
  tagline: "A few weeks of rage in the tenth year of a war.",
  mapCaption:
    "A stylised plan of the plain of Troy. The story barely travels, so this map follows the fighting between the Greek ships and the city walls.",
  episodes: [
    {
      id: "wrath",
      title: "The Wrath of Achilles",
      place: "Greek camp",
      x: 320,
      y: 110,
      summary:
        "Agamemnon, forced to give up his war-prize, seizes Achilles' prize, Briseis, instead. Achilles withdraws from the fighting, and his mother Thetis persuades Zeus to let the Greeks suffer for it.",
      characters: ["Achilles", "Agamemnon", "Briseis", "Thetis"],
    },
    {
      id: "duel",
      title: "Paris and Menelaus Duel",
      place: "The plain",
      x: 480,
      y: 340,
      summary:
        "The armies agree to let the two men settle the war in single combat. Menelaus is winning when Aphrodite whisks Paris away to safety. The truce soon collapses and the fighting resumes.",
      characters: ["Paris", "Menelaus", "Aphrodite", "Helen"],
    },
    {
      id: "farewell",
      title: "Hector and Andromache",
      place: "Scaean Gate",
      x: 695,
      y: 405,
      summary:
        "Hector returns from battle and meets his wife and baby son at the gate. Andromache begs him to stay. He takes off his helmet when it frightens the child, prays for the boy, and goes back to fight.",
      characters: ["Hector", "Andromache", "Astyanax"],
    },
    {
      id: "ships",
      title: "Battle at the Ships",
      place: "The Greek wall",
      x: 500,
      y: 150,
      summary:
        "Zeus turns the battle. Hector smashes through the Greek wall with a boulder and the Trojans fight their way among the ships, finally setting one alight.",
      characters: ["Hector", "Ajax", "Zeus"],
    },
    {
      id: "patroclus",
      title: "Patroclus Falls",
      place: "Beneath the walls",
      x: 610,
      y: 300,
      summary:
        "Wearing Achilles' armour, Patroclus drives the Trojans back but pushes on too far, right up to the walls. Stunned by Apollo and wounded by Euphorbus, he is killed by Hector.",
      characters: ["Patroclus", "Hector", "Apollo", "Euphorbus"],
    },
    {
      id: "return",
      title: "Achilles Returns",
      place: "River Scamander",
      x: 335,
      y: 340,
      summary:
        "Grief ends the quarrel. Wearing new armour forged by Hephaestus, Achilles slaughters so many Trojans that the choked river Scamander rises up against him, until Hephaestus drives it back with fire.",
      characters: ["Achilles", "Hephaestus", "Scamander"],
    },
    {
      id: "hector",
      title: "The Death of Hector",
      place: "Before the walls",
      x: 625,
      y: 505,
      summary:
        "Hector stands alone outside the walls, then runs. Achilles chases him around the city three times. Tricked by Athena, Hector turns to fight and is killed, and Achilles drags his body behind a chariot.",
      characters: ["Achilles", "Hector", "Athena", "Priam"],
    },
    {
      id: "ransom",
      title: "Priam's Ransom",
      place: "Achilles' hut",
      x: 170,
      y: 120,
      summary:
        "Guided by Hermes, old King Priam crosses the enemy lines by night and kisses the hands that killed his son. The two weep together, Achilles returns the body, and the poem closes with Hector's funeral.",
      characters: ["Priam", "Achilles", "Hermes", "Hector"],
    },
  ],
};
