import n95Art from "../assets/N95.jpg";
import n95Mp3 from "../assets/Kendrick Lamar N95.mp3";

import fpsArt from "../assets/fir-per-sho.jpg";
import fpsMp3 from "../assets/Drake First Person Shooter.mp3";

import namastuteArt from "../assets/namastute.webp";
import namastuteMp3 from "../assets/Namastute 2021.mp3";

export const mockTracks = [
  {
    "id": "track_001",
    "title": "N95",
    "artist": "Kendrick Lamar",
    "album": "Mr. Morale & the Big Steppers",
    "genre": "Hip Hop",
    "subgenre": "Conscious Rap / West Coast Hip Hop",
    "duration": 195,
    "release_year": 2022,
    "albumArt": n95Art,
    "src": n95Mp3,
    "metrics": {
      "plays": 450231900,
      "likes": 8920100,
      "monthlyListeners": 65430200
    }
  },
  {
    "id": "track_002",
    "title": "First Person Shooter",
    "artist": "Drake (feat. J. Cole)",
    "album": "For All the Dogs",
    "genre": "Hip Hop",
    "subgenre": "Trap / Pop Rap",
    "duration": 247,
    "release_year": 2023,
    "albumArt": fpsArt,
    "src": fpsMp3,
    "metrics": {
      "plays": 312045000,
      "likes": 6432000,
      "monthlyListeners": 84120300
    }
  },
  {
    "id": "track_003",
    "title": "Namastute",
    "artist": "Seedhe Maut",
    "album": "Nayaab",
    "genre": "Hip Hop",
    "subgenre": "Desi Hip Hop / Hardcore Rap",
    "duration": 222,
    "release_year": 2022,
    "albumArt": namastuteArt,
    "src": namastuteMp3,
    "metrics": {
      "plays": 25400100,
      "likes": 984000,
      "monthlyListeners": 1820400
    }
  }
]