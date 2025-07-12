
import { Helmet } from 'react-helmet'
import Notfoundimg from '../../assets/img/error.svg'
export default function Notfound() {

  return <>
  <Helmet>
    <title>404 Not Found</title>
  </Helmet>
  <div className='flex justify-center items-center'>
    <img src={Notfoundimg} alt="404 Not Found" />
  </div>
  
  </>
}
