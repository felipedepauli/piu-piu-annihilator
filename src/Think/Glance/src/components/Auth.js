import axios from 'axios'; // Não esqueça de instalar isso via npm ou yarn
import { Button } from 'antd';
import React from 'react';
import iconMap from './IconMap.js';

const AuthButton = ({ setPersonInfo }) => {
  const authenticate = () => {
    setPersonInfo({
      name: 'Procurando o inimigo!',
      description: 'Quem é ele?'
    });

    axios.post('http://localhost:8081/command/shoot')
      .then((response) => {
        console.log(response.data); // Isto deve imprimir o objeto da pessoa no console do navegador
        setPersonInfo({
          name: "Achei!!",
          description: response.data.detectedClass
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
      <Button size="large"  onClick={authenticate}>
         {iconMap["GiTargetDummy"]}
      </Button>
  )
};

export default AuthButton;
