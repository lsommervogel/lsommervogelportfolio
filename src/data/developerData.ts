import { Play } from "lucide-react";
import { FaSteam, FaItchIo } from "react-icons/fa";
import type { Game } from "../components/GameCard.tsx";
import pentestThumb from "../assets/images/Pentest0.png";
import crumbleUrl from "../assets/images/crumble.png";
import taxiUrl from "../assets/images/renardo.png";
import fudgeUrl from "../assets/images/fudge.png";
import chessUrl from "../assets/images/darkGambit.png";
import pocketUrl from "../assets/images/aceInTheHall.png";

export const games: Game[] = [
  {
    id: 5,
    title: "Ace In The Hall",
    thumbnail: pocketUrl,
    genre: "Roguelike, Deckbuilder",
    year: "TBA",
    description:
      "A roguelike deckbuilder in which you must collect cards from a mysterious game in hopes of uncovering the secrets of the tavern tower.",
    actionButton: "",
    technologies: ["Godot", "C#", "WIP"],
    icon: FaSteam,
    actionType: "none",
    actionValue: "",
  },
  {
    id: 6,
    title: "Greed's Gambit",
    thumbnail: chessUrl,
    genre: "Horror, Chess",
    year: "TBA",
    description:
      "A horror game in which you must collect golds, and buy artifacts to try to defeat a mysterious chess grandmaster.",
    actionButton: "",
    technologies: ["Godot", "C#", "WIP"],
    icon: FaSteam,
    actionType: "none",
    actionValue: "",
  },
  {
    id: 1,
    title: "The Pentest",
    thumbnail: pentestThumb,
    genre: "Puzzle",
    year: "2022",
    description:
      "A portal-like game with gravity-based gameplay mechanics. Available for free on Steam",
    actionButton: "Get On Steam",
    technologies: ["Unity", "C#"],
    icon: FaSteam,
    actionType: "open-link",
    actionValue: "https://store.steampowered.com/app/1638670/The_Pentest/",
  },
  {
    id: 2,
    title: "Fudge The Dice",
    thumbnail: fudgeUrl,
    genre: "Strategy",
    year: "2022",
    description:
      "A strategic made for the GMTK Jam 2022 in 48 hours where you are in the skin of a role-player forced to cheat without enervating his DM to survive.",
    actionButton: "Play",
    technologies: ["Unity", "C#", "Game Jam"],
    icon: Play,
    actionType: "play-browser",
    actionValue: "games/fudgeTheDice",
  },
  {
    id: 3,
    title: "Taxi Forest",
    thumbnail: taxiUrl,
    genre: "Driving, Roguelike",
    year: "2023",
    description:
      "A little driving roguelike game, where you have to take customers to their destination and improve your car to score the most points. Made with Unreal 5 in 2 weeks for a game jam.",
    actionButton: "Get on Itch.io",
    technologies: ["Unreal", "C++", "Game Jam"],
    icon: FaItchIo,
    actionType: "open-link",
    actionValue: "https://wizardoux.itch.io/taxi-forest",
  },
  {
    id: 4,
    title: "Crumble Tumble",
    thumbnail: crumbleUrl,
    genre: "Puzzle",
    year: "2021",
    description:
      "A cute little puzzle game where you have to cross the islands to save your territory from the undead invasion. Made for a game jam in 48 hours.",
    actionButton: "Play On Itch.io",
    technologies: ["Unity", "C#", "Game Jam"],
    icon: FaItchIo,
    actionType: "open-link",
    actionValue: "https://crazypo.itch.io/crumbletumble",
  },
];
