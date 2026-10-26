import { LIVE, creatorShortLive } from '../lib/legalRelease'
import HomeHero from '../components/home/HomeHero'
import CreatorShort from '../components/home/CreatorShort'
import HowItPlays from '../components/home/HowItPlays'
import OneRound from '../components/home/OneRound'
import WhoYouPlayWith from '../components/home/WhoYouPlayWith'
import Languages from '../components/home/Languages'
import SafetyNote from '../components/home/SafetyNote'
import ShopTeaser from '../components/home/ShopTeaser'
import FinalCall from '../components/home/FinalCall'

/**
 * The home page: what the game is, a creator's Short, how a round goes, private rooms (the room-code box) and Play
 * Online, the ten languages, safety, the shop. What the app doesn't do yet stays off with its LIVE switch (src/lib/legalRelease.ts).
 */
const Home = () => (
  <>
    <HomeHero />
    {creatorShortLive(LIVE) && <CreatorShort />}
    <HowItPlays />
    <OneRound />
    <WhoYouPlayWith />
    <Languages />
    <SafetyNote />
    {LIVE.merchShop && <ShopTeaser />}
    <FinalCall />
  </>
)

export default Home
