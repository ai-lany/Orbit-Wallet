import '../../App.css';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { UpGraph, Home, Help, Settings } from '../../assets/Icons';


export default function DashNav(props){

    const [active, setActive] = useState('');
    useEffect(() => {
        setActive(props.loc)
    }, [])


    return(
        <div  className="d-none d-lg-block dash-nav w-100 ">
            <ul>
              <li>
              <Button className={` ${active === "dashboard" ? 'dashnav-btn w-100 border-none btn-purp' : ' dashnav-btn btn bg-transparent border-none w-100'}`} href="/dashboard" ><Home></Home> Dashboard</Button>
              </li>
              <li>
                <Button className={` ${active === "explore" ? 'dashnav-btn w-100 border-none btn btn-purp' : 'dashnav-btn btn bg-transparent border-none w-100'}`} href="/explore" ><UpGraph></UpGraph> Explore</Button>
              </li>
              <li>
                <Button className={"dashnav-btn btn bg-transparent border-none  w-100 " } href="/help"> <Help></Help>  Help </Button>
              </li>
              <li>
                <Button className={"dashnav-btn btn bg-transparent border-none  w-100 "} href="/settings"><Settings></Settings>  Settings</Button>
                
              </li>
            </ul>
          </div>
    )



}