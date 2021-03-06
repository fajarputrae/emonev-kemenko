import React, { Component, Fragment, useContext, useEffect, useState } from 'react';
import SearchBar from '../../component/SearchBar/SearchBar';
import Card from "../../component/Card/Card";
import SideBarOff from "../../component/SideBarOff/SideBarOff";
import Gallery from '../../component/Gallery/Gallery';
import SearchBarAdmin from '../../component/SearchBarAdmin/SeacrhBarAdmin';
import './InfoGrafik.css';
import lonceng from '../../assets/lonceng.png';
import statistik from '../../assets/statistik.png';
import { AuthContext } from '../../context/Auth/AuthContext'
import Notification from '../../component/Notification/Notification';
import {Bar} from 'react-chartjs-2';
import Popup from '../../component/Popup/Popup';
import axios from 'axios'
import { NotifContext } from '../../context/Notifikasi/NotifContext';
import bg_1 from '../../assets/decoration/bg_1.png'
import bg_2 from '../../assets/decoration/bg_2.png'
import bg_3 from '../../assets/decoration/bg_3.png'
import bg_4 from '../../assets/decoration/bg_4.png'



const data = {
  labels: ['KEMENPAN', `KEMENKO POLHUKAM`, 'KEMENKO MARITIM', 'KEMENKO PEREKONOMIAN', 'KEMENDAGRI', 'KEMENKO PMK'],
  datasets: [
    {
      label: 'Jumlah Kegiatan Kementerian',
      color: 'black',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 70]
    }
  ]
};



const Dashboard = (props) => {
    const { isAuthenticated, login, userDetail , role, email, password, user } = useContext(AuthContext);
    const { notifNew , setNotifNew } = useContext(NotifContext)

    console.log(userDetail)

    useEffect(() => {
      setNotifNew(props.notif)
    },[props.notif])

    const [filterCard,setFilterCard] = useState({
        page:'1',
    })

    const [documentCard,setDocumentCard] = useState([])
    console.log(documentCard)
    const [documentCardLength,setDocumentCardLength] = useState([])
    
    const {
        page,
    } = filterCard

    console.log(page)
    console.log(documentCard)

    const getDocumentCardLength = async () => {
        try {
            const res = await axios.get(`https://test.bariqmbani.me/api/v1/kabar?instansi=${userDetail.instansi.nama_pendek}`)
            setDocumentCardLength(res.data.kabar)
        }
        catch (err) {
            console.log(err)  
        }  
    }

    const getDocumentCard = async () => {
      try {
            if(userDetail.role === 'admin'){
                const res = await axios.get(`https://test.bariqmbani.me/api/v1/kabar?limit=3&page=${page}&instansi=${userDetail.instansi.nama_pendek}`)
                setDocumentCard(res.data.kabar)
            } else {
                const res = await axios.get(`https://test.bariqmbani.me/api/v1/kabar?limit=3&page=${page}`)
                setDocumentCard(res.data.kabar)
            }
      }
      catch(err) {
          console.log(err)
      }  
    }

    useEffect(() =>{
      getDocumentCard()
      getDocumentCardLength()
    },[])

    useEffect(() =>{
        getDocumentCard()
        getDocumentCardLength()
    },[filterCard])

      const onNextFilter = (e) => {
        if(page < (documentCardLength && documentCardLength.length / 2)) {
            e.preventDefault()
            const a = parseInt(page)
            return setFilterCard({
                ...filterCard,
                page: JSON.stringify(a + 1)
            })
        } else { 
            e.preventDefault()
            return filterCard;
        }
    }

    const onPrevFilter = (e) => {
        if(page > 1 ) {
            e.preventDefault()
                const a = parseInt(page)
                return setFilterCard({
                    ...filterCard,
                    page: JSON.stringify(a - 1)
                })
        } else {
            e.preventDefault()
            return filterCard;
        }
    }
  return (
      <Fragment>
            <SideBarOff/>
            <Popup notif={props.notif}/>
            {
              user && user.role === 'owner' ?
                ''
              :
                <Notification/>
            }
            <div className="background-after-login">
                <img src={bg_1} alt='bg1' style={{position: 'fixed' , top:'0' , left: '0'}}/>
                <img src={bg_2} alt='bg2' style={{position: 'fixed' , top:'0' , right: '0'}}/>
                <img src={bg_3} alt='bg3' style={{position: 'fixed' , bottom:'-200px' , left: '0'}}/>
                <img src={bg_4} alt='bg4' style={{position: 'fixed' , bottom:'-50px' , right: '0'}}/>
            </div>
                <div className="dashboard-page">
                  <div className="dashboard-section">
                      <div className="tajuk-page1">
                          <p>STATISTIK TERKINI</p>
                      </div>
                    
                    <div className="infografik-statistik">
                      <Bar
                        data={data}
                        width={10}
                        height={445}
                        options={{
                        maintainAspectRatio: false
                        }}
                      />
                    </div>

                    {/* <div className="drop-down-menu">
                      <div className={user && user.role !== 'owner' ? "d-none" : "drop-down-kementrian"}>
                        <form> 
                            <select>
                              <option value="kemenko-pmk">KEMENKO PMK</option>
                              <option value="kemenpan">KEMENPAN</option>
                              <option value="kemenko-polhukam">KEMENKO POLHUKAM</option>
                              <option value="kemenko-maritim">KEMENKO MARITIM</option>
                              <option value="kemenko-perekonomian">KEMENKO PEREKONOMIAN</option>
                              <option value="kemendagri">KEMENDAGRI</option>
                            </select>
                            <br/>
                            <label>
                              KEMENTRIAN
                            </label>
                        </form>
                      </div>

                      <div className="spacer"></div>

                      <div className="drop-down-waktu">
                        <form> 
                            <select >
                              <option value="triwulan">TRIWULAN</option>
                              <option value="enambulan">NAMBULAN</option>
                              <option value="bulanan">BULANAN</option>
                              <option value="tahunan">TAHUNAN</option>
                            </select>
                            <br/>
                            <label>
                              WAKTU
                            </label>
                        </form>
                      </div>

                      <div className="drop-down-jangka">
                        <form> 
                            <select >
                              <option value="kemenkopmk">TRIWULAN PERTAMA</option>
                              <option value="kemenkopmk">TRIWULAN KEDUA</option>
                              <option value="kemenkopmk">TRIWULAN KETIGA</option>
                              <option value="kemenkopmk">TRIWULAN KEEMPAT</option>
                            </select>
                            <br/>
                            <label>
                              TRIWULAN
                            </label>
                        </form>
                      </div>

                    </div> */}
                  </div>

                  <div className="dashboard-section">
                    <div className="tajuk-page2">
                        <p>KABAR GNRM TERKINI</p>
                    </div>
                    <div style={{display:'flex' , flexDirection:'row' , width:'fit-content' , heigth: 'fit-content' , margin: 'auto' , position: 'relative'}}>
                        {
                            documentCard.map((doc, index) => {
                                return (
                                    <Card 
                                    key={index}
                                    doc={doc}/>
                                    );
                                })
                        }
                          <div className="button-home-prev" style={{top:'200px'}} onClick={onPrevFilter}>
                              <i className="material-icons" style={{fontSize:'16px' , lineHeight:'24px'}}>arrow_back</i>
                          </div>
                          <div className="button-home-next" style={{top:'200px'}} onClick={onNextFilter}>
                              <i className="material-icons" style={{fontSize:'16px' , lineHeight:'24px'}}>arrow_forward</i>
                          </div>
                    </div>
                  </div>
                
                  <div className="tajuk-page3">
                      <p>GALLERY</p>
                  </div>
                  <Gallery/>
                  <div className="gallery-pagination" style={{marginBottom:'61px'}}>
                        <i className="material-icons">chevron_left</i>
                        <ul> 
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
                        </ul>
                        <i className="material-icons">chevron_right</i>
                    </div>
              </div>
      </Fragment>
    );
}

export default Dashboard;
