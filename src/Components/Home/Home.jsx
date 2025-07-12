
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import RecentProducts from '../RecentProducts/RecentProducts'
import { Helmet } from 'react-helmet'

export default function Home() {

  return <>
  <Helmet>
    <title>Home</title>
  </Helmet>
  <MainSlider/>
  <CategorySlider/>
  <RecentProducts/>
  
  
  </>
}
