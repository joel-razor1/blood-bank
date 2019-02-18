import React, { Component } from 'react';
import './donDetail.css';
import Drawer from './drawer'
import Cardstuff from './cardetails'

  
class DonDetail extends Component {
    
    
    render(){
        return(
            <div>
                < Drawer />
                < Cardstuff />
            </div>
            
        );
    }
}
export default DonDetail;