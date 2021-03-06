import React,{Component,Fragment, useContext, useEffect, useState} from 'react';
import SideBarOff from '../../component/SideBarOff/SideBarOff';
import lock from '../../assets/lock.png';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../context/Auth/AuthContext'
import axios from 'axios'
import Popup from '../../component/Popup/Popup';
import bg_1 from '../../assets/decoration/bg_1.png'
import bg_2 from '../../assets/decoration/bg_2.png'
import bg_3 from '../../assets/decoration/bg_3.png'
import bg_4 from '../../assets/decoration/bg_4.png'

const ProfileInstansi = (props) => {
    const { token, userDetail,} = useContext(AuthContext);
    const [ foto, setFoto ] = useState();
    const [ instansiDetail , setInstansiDetail] = useState({})
    console.log(instansiDetail)

    const getInstansiDetail = async () => {
        const config = {
            headers: {
                'X-Auth-Token': `aweuaweu ${token}`,
            }
        }
        try {
            const res = await axios.get(`https://test.bariqmbani.me/api/v1/instansi/${props.match.params.id}`,config)
            setInstansiDetail(res.data.instansi)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(()=> {
        if(props.match.params.id) {
            getInstansiDetail()
        }
    },[props.match.params.id])

    // useEffect(() => {
    //     if (instansiDetail) {
    //         setNewInstansi({
    //             jenis: instansiDetail.jenis,
    //             nama: instansiDetail.nama,
    //             nama_pendek: instansiDetail.nama_pendek,
    //             kontak: instansiDetail.kontak,
    //             alamat: instansiDetail.alamat,
    //             fax: instansiDetail.fax,
    //             email: instansiDetail.email
    //         })
    //     }
    // },[instansiDetail])

    useEffect(() => {
        const wow = `https://test.bariqmbani.me${instansiDetail&&instansiDetail.logo}`
        setFoto(wow)
    },[instansiDetail])

    console.log(foto)

        return(
            <Fragment>
                <SideBarOff/>
                <Popup notif={props.notif}/>
                <div className="background-after-login">
                    <img src={bg_1} alt='bg1' style={{position: 'fixed' , top:'0' , left: '0'}}/>
                    <img src={bg_2} alt='bg2' style={{position: 'fixed' , top:'0' , right: '0'}}/>
                    <img src={bg_3} alt='bg3' style={{position: 'fixed' , bottom:'-200px' , left: '0'}}/>
                    <img src={bg_4} alt='bg4' style={{position: 'fixed' , bottom:'-50px' , right: '0'}}/>
                </div>
                <div className="profile-page" style={{marginBottom:'80px'}}>
                    <div className="tajuk-page">
                        PROFIL INSTANSI
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <form id="form-profile">
                            <div className="col"> 
                            
                                <div className="form-profile-page">
                                <div className="data" >
                                    <label>Nama Instansi</label><br/>
                                    <div className="show-profile" type="text" style={{height:'84px' , marginBottom:'16px'}}>{instansiDetail && instansiDetail.nama}</div>
                                </div>

                                <div className="data">
                                    <label style={{marginTop:'32px'}}>Nama Pendek</label><br/>
                                    <div className="show-profile" type="text" style={{fontWeight:'700'}}>{instansiDetail && instansiDetail.nama_pendek}</div>
                                </div>

                                <div className="data">
                                    <label style={{marginTop:'32px'}}>Jenis</label><br/>
                                    <div className="show-profile" type="text">{instansiDetail && instansiDetail.jenis}</div>
                                </div>

                                <div className="data">
                                    <label style={{marginTop:'32px'}}>Kontak</label><br/>
                                    <div className="show-profile" type="text">{instansiDetail && instansiDetail.kontak}</div>
                                </div>

                                <div className="data">
                                    <label style={{marginTop:'32px'}}>Alamat</label><br/>
                                    <div className="show-profile" type="text" style={{height:'84px'}}>{instansiDetail && instansiDetail.alamat}</div>
                                </div>

                                <div className="data">
                                    <label style={{marginTop:'64px'}}>Fax</label><br/>
                                    <div className="show-profile" type="text">{instansiDetail && instansiDetail.fax}</div>
                                </div>

                                <div className="data">
                                    <label style={{marginTop:'64px'}}>Website</label><br/>
                                    <div className="show-profile" type="email">{instansiDetail && instansiDetail.website}</div>
                                </div>
                                <div className="data">
                                    <label style={{marginTop:'64px'}}>Email</label><br/>
                                    <div className="show-profile" type="text">{instansiDetail && instansiDetail.email}</div>
                                </div>
                                </div>
                            </div>
                            </form>

                            <div className="col">
                                <div className="photo-profile-page">
                                    <label>Foto Profile Instansi</label><br/>
                                    <div className="photo-profile-container">
                                        <div className="photo-profile">
                                            <img src={foto}></img>
                                        </div>
                                    </div>
                                    <Link to={`/${userDetail&&userDetail.role === 'owner' ? 'super-admin' : 'admin'}/edit-profile-instansi/${instansiDetail && instansiDetail._id}`}>
                                    <input 
                                        form="form-profile"
                                        type="submit"
                                        className="button-submit-profile"
                                        value="EDIT PROFIL"
                                        style={{backgroundColor: '#E76975'}}
                                    > 
                                    </input>
                                    </Link>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

export default ProfileInstansi;