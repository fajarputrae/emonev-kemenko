import React,{Component,Fragment, useContext, useState, useEffect} from 'react';
import '../Profile/ProfileEdit.css';
import axios from 'axios';
import SideBarOff from '../../component/SideBarOff/SideBarOff';
import lock from '../../assets/lock.png';
import {Link, useHistory} from 'react-router-dom';
import { AuthContext } from '../../context/Auth/AuthContext'
import Popup from '../../component/Popup/Popup';
import bg_1 from '../../assets/decoration/bg_1.png'
import bg_2 from '../../assets/decoration/bg_2.png'
import bg_3 from '../../assets/decoration/bg_3.png'
import bg_4 from '../../assets/decoration/bg_4.png'

const EditAdmin = (props) => {
    const { user, token, getUserDetail, userDetail } = useContext(AuthContext);
    const history = useHistory();
    const [foto, setFoto] = useState([])
    const [allInstansi, setAllInstansi] = useState([])

    const [userData, setUserData] = useState ({
        nama_pendek: '',
        nama: '',
        email: '',
        kontak: '',
        role: '',
        username: ''
    })

    const { role, username, nama, email, kontak , instansi, nama_pendek} = userData;
    console.log(nama_pendek)
    console.log(userData)
    console.log(nama)
    console.log(username)

    const [ fotos, setFotos] = useState();
    const onChangeFiles = (event) => {
        setFoto([...event.target.files])
        if(event.target.files && event.target.files[0]){
            setFotos(URL.createObjectURL(event.target.files[0]))
        }
    }

    useEffect(() => {
        axios.get('https://test.bariqmbani.me/api/v1/instansi')
        .then(res => {
            setAllInstansi(res.data.instansi)
            console.log('wow')
        })
        .catch(err => {
            console.log('wow', +err)
        })
    }, [])


    useEffect (() => {
        const getUserToUpdate = async () => {
            const config = {
                headers: {
                    'X-Auth-Token': `aweuaweu ${token}`
                }
            }
            try {
                const res = await axios.get(`https://test.bariqmbani.me/api/v1/user/${props.match.params.id}`,config)
                console.log(res.data)
                setUserData({
                    nama_pendek : res.data.user.instansi.nama_pendek,
                    nama: res.data.user.nama,
                    email: res.data.user.email,
                    kontak: res.data.user.kontak,
                    role: res.data.user.role,
                    username: res.data.user.username
                })
            }
            catch (err) {
                console.log(err)
            }
        }
        getUserToUpdate()
    }, [])


    const onChange = (e) => {
        return setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
        
    }

    const updateUserData = async (formData) => {
        console.log(formData)
        const config = {
            headers: {
                'X-Auth-Token': `aweuaweu ${token}`,
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put(`https://test.bariqmbani.me/api/v1/user/${props.match.params.id}`,formData,config)
            alert(res.data.message)
            history.push(`/${userDetail && userDetail.role === 'owner' ? 'super-admin' : 'admin'}/kelola-admin`)
        }
        catch (err) {
            console.log(err)
        }
    }

    const updateUserPhoto = async () => {
		const formData = new FormData()

		for (let i = 0; i < foto.length; i++) {
			formData.append(`foto`, foto[i])
		}

		for (let pair of formData.entries()) {
			console.log(pair[0] + ', ' + pair[1])
        }
        
        const config = {
            headers: {
                'X-Auth-Token': `aweuaweu ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }
        try {
            const res = await axios.put(`https://test.bariqmbani.me/api/v1/user/${props.match.params.id}/foto`,formData,config)
            console.log(res.data.message)
        }
        catch (err) {
            console.log(err.data)
        }
    }

    const onSubmitEdit = (e) => {
        e.preventDefault();
        updateUserData({nama,email,kontak,role,username,nama_pendek})
    }

        return(
            <Fragment>
                <SideBarOff/>
                <div className="background-after-login">
                    <img src={bg_1} alt='bg1' style={{position: 'fixed' , top:'0' , left: '0'}}/>
                    <img src={bg_2} alt='bg2' style={{position: 'fixed' , top:'0' , right: '0'}}/>
                    <img src={bg_3} alt='bg3' style={{position: 'fixed' , bottom:'-200px' , left: '0'}}/>
                    <img src={bg_4} alt='bg4' style={{position: 'fixed' , bottom:'-50px' , right: '0'}}/>
                </div>
                <Popup notif={props.notif}/>
                <div className="profile-page">
                    <div className="tajuk-page">
                        EDIT ADMIN
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <form id="form-profile" onSubmit={onSubmitEdit}>
                            <div className="col"> 
                            
                                <div className="form-profile-page">
                                    <div className="data">
                                        <label>Nama</label><br/>
                                        <input className="show-profile" type="text" name='nama' value={nama} onChange={onChange}></input>
                                    </div>

                                    <div className="data">
                                        <label>Instansi</label><br/>
                                        <div className="persist">{nama_pendek}</div>
                                        <div className="button-lock" >
                                            <img src={lock} alt="lock" style={{border:'none',  padding:'0' , top:'-40px' , left:'600px' , height:'30px', width:'30px' , backgroundColor: 'none', borderRadius:'3px' , position:'relative'}}/>
                                        </div>
                                    </div>

                                    <div className="data">
                                        <label>Level</label><br/>
                                        <div className="persist">{role === 'admin' ? 'Admin' : 'Super Admin'}</div>
                                        <div className="button-lock" >
                                            <img src={lock} alt="lock" style={{border:'none',  padding:'0' , top:'-40px' , left:'600px' , height:'30px', width:'30px' , backgroundColor: 'none', borderRadius:'3px' , position:'relative'}}/>
                                        </div>
                                    </div>

                                    <div className="data">
                                        <label>Username</label><br/>
                                        <div className="persist">{username}</div>
                                        <div className="button-lock" >
                                            <img src={lock} alt="lock" style={{border:'none',  padding:'0' , top:'-40px' , left:'600px' , height:'30px', width:'30px' , backgroundColor: 'none', borderRadius:'3px' , position:'relative'}}/>
                                        </div>
                                    </div>

                                    <div className="data">
                                        <label>Email</label><br/>
                                        <input className="show-profile" type="email" name='email' value={email} onChange={onChange}></input>
                                    </div>
                                    <div className="data">
                                        <label>Nomor Telepon</label><br/>
                                        <input className="show-profile" type="text" name='kontak' value={kontak} onChange={onChange}></input>
                                    </div>
                                </div>
                            </div>
                            </form>

                            <div className="col">
                                <div className="photo-profile-page">
                                    <label>Photo Profile</label><br/>
                                        <div className="photo-profile-container">
                                            <div className="photo-profile">
                                                <img src={fotos}></img>
                                            </div>
                                            {/* <u><h1><label htmlFor='testing' className='upload_foto'>Ganti Foto</label></h1></u>
                                            <input 
                                                id="testing"
                                                className="gnrm-penjelasan" 
                                                style={{height: "42px", 
                                                        marginLeft: "28px", 
                                                        width: "955px"}} 
                                                onChange={onChangeFiles}
                                                type="file"
                                                accept="image/*"
                                                name="media"
                                            /> */}
                                        </div>
                                    <button 
                                        disabled
                                        style={{pointer:'none'}}
                                        className="button-submit-profile"
                                    > EDIT PROFIL
                                    </button>

                                    <input 
                                            form="form-profile"
                                            type="submit"
                                            className="button-submit-profile-edit"
                                            value="SAVE"
                                        > 
                                    </input>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </Fragment>
        );
}

export default EditAdmin;