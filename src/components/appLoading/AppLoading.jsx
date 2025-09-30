import './css/appLoading.css'
import logo from '../../assets/logo.svg'


export default function AppLoading({ tempLoading }){

    if(tempLoading){
        return(
            <div className="apploading-container">
                <img 
                    className='apploading-logo'
                    src={logo}
                    style={{ width: '70px', height: '70px' }} 
                />

                <div 
                    className='loader'
                />
            </div>
        )
    }
}