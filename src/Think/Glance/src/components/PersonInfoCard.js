import React from 'react';
import { Card } from 'antd';

const PersonInfoCard = ({ personInfo }) => {
  return (
    <Card className="program_desc__block" title={`${personInfo.name}`}>
        <p>{personInfo.description}</p>
    </Card>
  );
};

export default PersonInfoCard;
