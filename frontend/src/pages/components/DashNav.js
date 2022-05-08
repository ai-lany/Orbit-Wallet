import '../../App.css';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function DashNav(props){

    const [active, setActive] = useState('');
    useEffect(() => {
        setActive(props.loc)
    }, [])


    return(
        <div  className="d-none d-lg-block dash-nav">
            <ul>
              <li>
              <Button className={` ${active === "dashboard" ? 'dashnav-btn w-100 border-none btn-purp' : ' dashnav-btn btn bg-transparent border-none w-100'}`} href="/dashboard" >Dashboard</Button>
              </li>
              <li>
                <Button className={` ${active === "explore" ? 'dashnav-btn w-100 border-none btn btn-purp' : 'dashnav-btn btn bg-transparent border-none w-100'}`} href="/explore" >Explore</Button>
              </li>
              <li>
                <Button className={"dashnav-btn btn bg-transparent border-none  w-100 " } href="/help"><a>Help</a></Button>
              </li>
              <li>
                <Button className={"dashnav-btn btn bg-transparent border-none  w-100 "} href="/settings">Settings</Button>
                
              </li>
            </ul>
          </div>
    )



}