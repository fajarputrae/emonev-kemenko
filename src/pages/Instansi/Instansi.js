import React, {Fragment,useState,useContext,useEffect} from 'react'
import SideBarOff from '../../component/SideBarOff/SideBarOff'
import Popup from '../../component/Popup/Popup'
import { Link } from 'react-router-dom'
import plus from '../../assets/plus.png'
import axios from 'axios'
import Filter from '../../component/Filter/Filter'
import Pagination from '../../component/Pagination/Pagination'
import FilterInstansi from '../../component/FilterInstansi/FilterInstansi'
import { AuthContext } from '../../context/Auth/AuthContext'
import TabelInstansi from '../../component/TabelInstansi/TabelInstansi'



const Instansi = (props) => {
    const { token } = useContext(AuthContext)
    const [instansi,setInstansi] = useState([])
    const [instansiRev,setInstansiRev] = useState([])
    console.log(instansiRev)
    const [filter,setFilter] = useState({
        limit:'10',
        page:'1',
        nama: '',
        jenis: '',
        totalDoc: ''
    })

    const {
        limit,
        page,
        nama,
        totalDoc,
        jenis,
    } = filter

    const getInstansiLength = async () => {
        const config= {
            headers: {
                'X-Auth-Token': `aweuaweu ${token}`
            }
        }
        try {
            const res = await axios.get(`https://test.bariqmbani.me/api/v1/instansi`, config)
            setFilter({...filter, totalDoc: res.data.instansi.length})
        }
        catch (err) {
            console.log(err)  
        }  
    }
    const getAllInstansi = async () => {
        const config= {
            headers: {
                'X-Auth-Token': `aweuaweu ${token}`
            }
        }
        try {
            const res = await axios.get(`https://test.bariqmbani.me/api/v1/instansi?nama=${nama}&jenis=${jenis}&limit=${limit}&page=${page}`, config)
            setInstansi(res.data.instansi)
        }
        catch (err) {
            console.log(err)  
        }  
    }

    const deleteInstansi = async (id) => {
        const config = {
            headers: {
                'X-Auth-Token': `aweuaweu ${token}`
            }
        }
        try {
            await axios.delete(`https://test.bariqmbani.me/api/v1/instansi/${id}`,config)
            getAllInstansi()
            getInstansiLength()
        }
        catch (err) {
            console.log(err)
        }
    }

    // const handleReset = () => {
    //     editDocumentFalse()
    //     resetDocument()
    // }

    useEffect(() => {
        getInstansiLength()
    },[])

    useEffect(() => {
        getAllInstansi()
    }, [limit,page])




    return(
        <Fragment>
                <SideBarOff/>
                    <Popup notif={props.notif}/>
                        <div className="input-dan-tajuk">
                            <Link to='/formulir-instansi'>
                                <button className="tambah-laporan">
                                    <img src={plus}></img>
                                    <div className="spacer"></div>
                                    <p className="text-input-laporan">
                                        Input Instansi
                                    </p>
                                </button>
                            </Link>
                            <div className="spacer"></div>
                            <div className="tajuk-page-2">
                                <p>KELOLA INSTANSI</p>
                            </div>
                        </div>
                        
                        <FilterInstansi
                            getInstansi={getAllInstansi}
                            setFilter={setFilter}
                            filter={filter}
                            nama={nama}
                            jenis={jenis}
                            
                        />

                        <div className="table-container">
                            <table className="table-monev" style={{marginRight:'20px'}}>
                                <thead className="table-head-monev">
                                    <tr>
                                        <th width='572px'>Nama Instansi</th>
                                        <th width='258px'>Nama Pendek</th>
                                        <th width='258px'>Jenis</th>
                                        <th width='42px'></th>
                                        <th width='42px'></th>
                                    </tr>
                                </thead>
                                <tbody className="table-body-monev">
                                    {
                                        instansi.map((instansi,index) => {
                                            return(
                                                <TabelInstansi
                                                    key={index}
                                                    id={instansi._id}
                                                    nama={instansi.nama}
                                                    nama_pendek={instansi.nama_pendek}
                                                    jenis={instansi.jenis}
                                                    delete={deleteInstansi}
                                                />
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                <Pagination
                    setFilter={setFilter}
                    filter={filter}
                    total={totalDoc}
                    limit={limit}
                    page={page}
                />
            </Fragment>

    )
}

export default Instansi