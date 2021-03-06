import React , { createContext, useContext, useState } from 'react';
import io from 'socket.io-client'
import { AuthContext } from '../Auth/AuthContext';

export const SocketContext = createContext();



const SocketState = (props) => {
    const socket = io('https://test.bariqmbani.me')
    const [notifs, setNotifs] = useState([])

    const getNotif = (id) => {
        let cleanup = false;
        if (!cleanup) {
          console.log("test");
    
          socket.on("connect", () => {
            socket.emit("notif_subscribe", { user: id });
          });
    
          socket.on("notif_receive", payload => {
            console.log(payload);
            setNotifs([...notifs, payload].reverse());
          });
        }

        return () => {
            cleanup = true;
          };
    }

    return(
        <SocketContext.Provider 
            value={{socket,notifs,getNotif}}
        >
            {props.children}
        </SocketContext.Provider>
    )
}

export default SocketState;