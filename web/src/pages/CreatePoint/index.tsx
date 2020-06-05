import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';

import './styles.css';
import logo from '../../assets/logo.svg';
import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';
import axios from 'axios';
import {LeafletMouseEvent} from 'leaflet';

import Dropzone from '../../components/dropzone';

interface Item{
    id: number,
    title: string,
    image_url: string
}

interface IBGEUFResponse{
    sigla: string
}

interface IBGFECityResponse{
    nome: string
}

const CreatePoint = () => {
    //SEMPRE QUE SE CRIA UM ESTADO PARA UM ARRAY OU OBJETO, PRECISA,
    //MANUALMENTE INFORMAR O TIPO DA VARIÁVEL ARMAZENADA
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities]  = useState<string[]>([]);

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);

    const [selectedUF, setSelectedUF] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedPoint, setSelectedPoint] = useState<[number, number]>([0,0]);
    const [selectedFile, setSelectedFile] = useState<File>();

    //  teste
    const [arraySelected, setArraySelected] = useState<number[]>([])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    })

    const history = useHistory();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setInitialPosition([position.coords.latitude,  position.coords.longitude]);
        });
    }, []);

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        })
    }, []);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                const ufInitials = response.data.map(uf => uf.sigla);
                setUfs(ufInitials);
            })
    }, []);

    useEffect(() => {
        if (selectedUF === '0'){
            return;
        }
        
        axios.get<IBGFECityResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+selectedUF+'/municipios')
            .then(response => {
                //console.log(response.data);
                setCities(response.data.map(city => city.nome));
            })
    }, [selectedUF]);

    function handleSelectedUF(event: ChangeEvent<HTMLSelectElement>){
        //console.log(event.target.value);
        setSelectedUF(event.target.value);
    }

    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>){
        setSelectedCity(event.target.value);
    }

    function handleMapClick(event: LeafletMouseEvent){
        const latlng = event.latlng;
        setSelectedPoint([latlng.lat, latlng.lng])
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    function handleSelectItem(id: number){
        //console.log('teste', id);
        if (arraySelected.includes(id)){
            setArraySelected(arraySelected.filter(i => i !== id))
        }else{
            setArraySelected([...arraySelected, id]);
        }
    }

    async function handleSubmit(event: FormEvent){
        console.log(selectedFile);
        event.preventDefault();
        const { name, email, whatsapp} = formData;
        const uf = selectedUF;
        const city = selectedCity;
        const [latitude, longitude] = selectedPoint;
        const items = arraySelected;
        const data = new FormData();
        
        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', uf);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('items', items.join(', '));
        if (selectedFile){
            data.append('image', selectedFile);
        }
        
        await api.post('/points', data);
        //axios.post('http://localhost:3333', {})
        alert('Ponto de coleta criado');
        history.push('/');
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br /> ponto de coleta</h1>
                <Dropzone onFileUploaded={setSelectedFile}/>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input type="text" name="name" id="name" onChange={handleInputChange}/>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" onChange={handleInputChange}/>
                        </div>
                        <div className="field">
                            <label htmlFor="name">Whatsapp</label>
                            <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange}/>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço do mapa</span>
                    </legend>
                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer 
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    
                    <Marker position={selectedPoint}/>
                    </Map>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf" value={selectedUF} onChange={handleSelectedUF}>
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" onChange={handleSelectedCity}>
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>

                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Items de coleta</h2>
                        <span>Selecione um  ou mais itens abaixo</span>
                    </legend>
                    <ul className="items-grid">
                        {items.map(item => (
                            <li key={item.id} onClick={() => handleSelectItem(item.id)} 
                                className={arraySelected.includes(item.id) ? 'selected' : ''}>
                                <img src={item.image_url} alt={item.title}/>
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>
                <button type="submit">Cadastrar ponto de coleta</button>
            </form>
        </div>
    );
}

export default CreatePoint;