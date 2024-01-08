import { EventEntry } from "../types/types";
import { mockArtists1 } from "./mockArtists";

// create several mocks for testing display
export const mockEvents1: EventEntry[] = [
  {
    artist: "Taylor Swift",
    venue: "GovBall",
    image:
      "https://assets.teenvogue.com/photos/64f0a106a683b28e919ea05c/16:9/w_4649,h_2615,c_limit/GettyImages-1604947670.jpg",
    date: "10/1/2023",
    spotifyId: "7n2Ycct7Beij7Dj7meI4X0?si=MITfKnp0SLGMGDg740rK2w",
    location: { lat: 41.826524376501766, lon: -71.40254733571722 },
  },
  {
    artist: "Jay Park",
    venue: "Coachella",
    image:
      "https://www.billboard.com/wp-content/uploads/media/jay-park-performance-2016-billboard-650.jpg?w=650",
    date: "11/2/2024",
    spotifyId: "",
    location: { lat: 41.826524376501766, lon: -71.40254733571722 },
  },
  {
    artist: "Post Malone",
    venue: "HITC",
    image:
      "https://i.guim.co.uk/img/media/77d56571e0e02c5da16ee6c15dc9926103df8717/0_0_6720_4032/master/6720.jpg?width=465&dpr=1&s=none",
    date: "1/2/2024",
    spotifyId: "",
    location: { lat: 41.826524376501766, lon: -71.40254733571722 },
  },
  {
    artist: "Post Malone",
    venue: "HITC",
    image:
      "https://i.guim.co.uk/img/media/77d56571e0e02c5da16ee6c15dc9926103df8717/0_0_6720_4032/master/6720.jpg?width=465&dpr=1&s=none",
    date: "1/2/2024",
    spotifyId: "",
    location: { lat: 41.826524376501766, lon: -71.40254733571722 },
  },
  {
    artist: "Post Malone",
    venue: "HITC",
    image:
      "https://i.guim.co.uk/img/media/77d56571e0e02c5da16ee6c15dc9926103df8717/0_0_6720_4032/master/6720.jpg?width=465&dpr=1&s=none",
    date: "1/2/2024",
    spotifyId: "",
    location: { lat: 41.826524376501766, lon: -71.40254733571722 },
  },
  {
    artist: "Taylor Swift",
    venue: "GovBall",
    image:
      "https://assets.teenvogue.com/photos/64f0a106a683b28e919ea05c/16:9/w_4649,h_2615,c_limit/GettyImages-1604947670.jpg",
    date: "10/1/2023",
    spotifyId: "",
    location: { lat: 41.826524376501766, lon: -71.40254733571722 },
  },
  {
    artist: "Brown University Orchestra",
    venue: "Lindemann Performing Arts Center",
    image: "https://music.brown.edu/sites/default/files/Sedong-2023.jpg",
    date: "12/09/2023",
    spotifyId: "",
    location: { lat: 41.826524376501766, lon: -71.40254733571722 },
  },
  {
    artist: "Wind Symphony & Percussion Ensemble",
    venue: "Grant Recital Hall",
    image:
      "https://music.brown.edu/sites/default/files/styles/classic_xsml/public/images/wind%20symphony%203.jpg?h=ef2aa277&itok=I1NgOVkC",
    date: "04/21/2024",
    spotifyId: "",
    location: { lat: 41.826524376501766, lon: -71.40254733571722 },
  },
  {
    artist: "American Modern Opera Company",
    venue: "Martinos Auditorium",
    image:
      "https://runningamoc.org/wp-content/uploads/2023/05/Broken_Theater_Baranova-2616_.jpg",
    date: "04/18/2023",
    spotifyId: "",
    location: { lat: 41.826524376501766, lon: -71.40254733571722 },
  },
  {
    artist: "Ensemble Dal Niente",
    venue: "Martinos Auditorium",
    image:
      "https://images.squarespace-cdn.com/content/v1/55aede63e4b0d3eba6378c8a/1696007841768-GJQHIF5D2R92PJ45TO9H/image-asset.jpeg?format=2500w",
    date: "03/07/2023",
    spotifyId: "",
    location: { lat: 41.826524376501766, lon: -71.40254733571722 },
  },
  {
    artist: "Gendo Taiko",
    venue: "Waterfire",
    image:
      "https://gendotaiko.com/static/media/home_4.812ee5a621380cc17312.png",
    date: "10/14/2023",
    spotifyId: "",
    location: { lat: 41.826524376501766, lon: -71.40254733571722 },
  },
  {
    artist: "The Higher Keys",
    venue: "Salomon DECI",
    image:
      "https://thehigherkeys.com/wp-content/uploads/2021/01/enahm-in-1024x683.jpeg",
    date: "12/09/2023",
    spotifyId: "",
    location: { lat: 41.826524376501766, lon: -71.40254733571722 },
  },
  {
    artist: "The Jabberwocks",
    venue: "Wayland Arch",
    image:
      "https://static.wixstatic.com/media/60db49_116e69de4ba14d2d94e2680aece4393e~mv2.jpg/v1/crop/x_0,y_772,w_4032,h_1887/fill/w_1880,h_880,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/derbs%204.jpg",
    date: "11/03/2023",
    spotifyId: "",
    location: { lat: 41.826524376501766, lon: -71.40254733571722 },
  },
  {
    artist: "Brown Jazz Jams",
    venue: "The Underground",
    image:
      "https://music.brown.edu/sites/default/files/styles/wide_xlrg/public/images/jazz%203.jpg?itok=z7eoKFbR",
    date: "11/29/2023",
    spotifyId: "",
    location: { lat: 41.826524376501766, lon: -71.40254733571722 },
  },
  {
    artist: "Mariachi de Brown",
    venue: "Salomon DECI",
    image:
      "https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/244031905_268259225304136_7532447179675090111_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=783fdb&_nc_ohc=cHXmPZwa3t4AX_vMUmi&_nc_ht=scontent-lga3-1.xx&oh=00_AfBtGvg2Xg6-SKAEcd9MpS_t1lpn4_Mq5gIVhPjRnQmOVA&oe=658812C5",
    date: "12/01/2023",
    spotifyId: "",
    location: { lat: 41.826524376501766, lon: -71.40254733571722 },
  },
  {
    artist: "Anime Video Game Ensemble",
    venue: "Lindemann Performing Arts Center Riley Hall",
    image:
      "https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/333885554_1037361997221706_6642685735769618259_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=783fdb&_nc_ohc=8b1aRlzxM8oAX9vQWCh&_nc_ht=scontent-lga3-2.xx&oh=00_AfBrzC3rXRht1EVHGp-cZ8OLxJeYVdQXW4OWfObm3d3LVQ&oe=6587E596",
    date: "12/02/2023",
    spotifyId: "",
    location: { lat: 41.826524376501766, lon: -71.40254733571722 },
  },
  {
    artist: "Daebak",
    venue: "Salomon DECI",
    image:
      "https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/278713577_5026353307456949_6945107533354357930_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=783fdb&_nc_ohc=NaOJhgXm-RUAX8Sgje1&_nc_ht=scontent-lga3-2.xx&oh=00_AfBHTyJK5HO6W0OV5fKxgjSqx1-UvWYJdaXbtj4_wq4nnA&oe=658889EA",
    date: "04/07/2023",
    spotifyId: "",
    location: { lat: 41.826524376501766, lon: -71.40254733571722 },
  },
];
