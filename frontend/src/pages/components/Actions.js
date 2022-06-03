import '../../App.css';
import { Col} from "react-bootstrap";
import { useEffect, useState } from 'react';
import Widget from './Widget';
import useIsMounted from '../../useIsMounted';

export default function Actions(props){

    const [widgets, setWidgets] = useState([]);

    useEffect(()=>{
        populateWidget();
    }, [])

    async function populateWidget() {
        const req = await fetch("http://localhost:3001/api/widget", {
          method: "GET",
          headers: {
            "x-access-token": localStorage.getItem("token"),
            'Accept': 'application/json'
          },
        });
    
        const data = await req.json();
        if (data.status === "ok") {
            
                setWidgets(data.widgets);
                console.log(data.widgets)
            
        } else {
          alert(data.error);
        }
      }

    return(
        <Col lg={3}>
        <div className="glass-black vertical-space ">
          <div className="glass-black">
            <h3 style={{ padding: ".25em .5em" }}>Trade</h3>
          </div>
          
        </div>
        <div className="glass-black vertical-space ">
          <div className="glass-black">
            <h3 style={{ padding: ".25em .5em" }}>Transactions</h3>
          </div>
          
        </div>

        <div className='widgets'>
        {
            widgets.map(data => {
                return (
                    <div className = "vertical-space">
                        <Widget list = {widgets} input = {data}  />
                    </div>
                );
            }
        )
        }

        </div>


      </Col>

    )



}