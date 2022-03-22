import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/home.css';
import bad from '../media/sale.jpg';
import good from '../media/propre.jpg';
import veryGood from '../media/trpropre.jpg';
import '../components/Table';
import Table from '../components/Table';  

const Home = () => {
  const [eaux, setEaux] = useState([]);
  const [database, setDatabase] = useState([]);

  useEffect(() => {
    fetchEaux();
    fetchDatabase();
  }, []);

  const fetchEaux = async () => {
    await axios
      .get('http://localhost:8080/eaux')
      .then((res) => {
        setEaux(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchDatabase = async () => {
    await axios
      .get('http://localhost:8080/database')
      .then((res) => {
        // console.log(res.data);
        setDatabase(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Axios multiples urls
  const [data, setData] = useState([]);

  useEffect(() => {
      (async () => {
          const data1 = await axios.get('http://localhost:8080/eaux');
          const data2 = await axios.get('http://localhost:8080/database');
          setData([data1, data2]);
        })()
      }, [setData])

  // Form
  const [input, setInput] = useState('');

  function Results() {
    if (input === '') {
      return <div className="water-quality">Veuillez saisir une valeur pour afficher la qualité de l'eau</div>;
    } else if (input < 50) {
        return <img src={bad} alt="" className="water-quality"  />;
      } else if (input < 90) {
        return <img src={good} alt="" className="water-quality" />;
      }
      return <img src={veryGood} alt="" className="water-quality"  />;
  }

  return <>
  <section className="section-top">
    <h3 className="text-center mt-5 mb-5">Qualité de l'eau de Lacanau aujourd'hui</h3>
    <div className="global">
      <div className="">
        <form action="" className="d-flex">
          <label htmlFor="value" className="form-label col-5">Saisir une valeur :</label>
          <input type="number" min="0" max="100" className="form-control" value={input} onChange={e => setInput(e.target.value)} />
        </form>
      </div>
      <div>
        <Results />
      </div>
    </div>
  
  </section>

  <section className="section2">
    <h3 className="text-center">Qualités des eaux de la ville d'Hourtin et de ses villes voisines</h3>
    <table className="table table-striped w-100 mb-5">
      <thead>
        <tr>
          <th>Plage</th>
          <th>Ville</th>
          <th>Qualité de l'eau</th>
        </tr>
      </thead>
      <tbody>
        {eaux.map(item => (<Table key={item.id} water={item.water} beach={item.beach} city={item.city} />))}
      </tbody>
    </table>
  </section>

  <section className="section3">
    <h3 className="text-center">Données récupérées de la base de données</h3>
    <table className="table table-striped w-100 mb-5">
      <thead>
        <tr>
          <th>Plage</th>
          <th>Ville</th>
          <th>Qualité de l'eau</th>
        </tr>
      </thead>
      <tbody>
        {database.map(item => (<Table key={item.id} water={item.water} beach={item.beach} city={item.city} />))}
      </tbody>
    </table>
  </section>

  <section className="section-bottom">
    <h3 className="text-center">Les 2 tableaux combinés</h3>
    <table className="table table-striped w-100 mb-5">
      <thead>
        <tr>
          <th>Plage</th>
          <th>Ville</th>
          <th>Qualité de l'eau</th>
        </tr>
      </thead>
      <tbody>
      {data.map(item => item.data.map(product => <Table key={product.id} water={product.water} beach={product.beach} city={product.city} />))}
      </tbody>
    </table>
  </section>
  </>
}
export default Home