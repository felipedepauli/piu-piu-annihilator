import React from 'react';
import {
  BsFillArrowUpCircleFill,
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
  BsFillArrowDownCircleFill,
  BsPersonBoundingBox,
  BsStopCircleFill
} from 'react-icons/bs';

import { GiTargetDummy } from "react-icons/gi";
import { AiOutlineFire, AiFillFire } from "react-icons/ai";



const iconMap = {
    BsFillArrowUpCircleFill:    <BsFillArrowUpCircleFill    size={27}/>,
    BsFillArrowLeftCircleFill:  <BsFillArrowLeftCircleFill  size={27}/>,
    BsFillArrowRightCircleFill: <BsFillArrowRightCircleFill size={27}/>,
    BsFillArrowDownCircleFill:  <BsFillArrowDownCircleFill  size={27}/>,
    BsPersonBoundingBox:        <BsPersonBoundingBox        size={27}/>,
    BsStopCircleFill:           <BsStopCircleFill           size={27}/>,
    GiTargetDummy:              <GiTargetDummy              size={27}/>,
    AiOutlineFire:              <AiOutlineFire              size={32}/>,
    AiFillFire:                 <AiFillFire                 size={32}/>
};

export default iconMap