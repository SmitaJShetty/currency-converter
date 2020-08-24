import React,{useState} from 'react';

export default function Converter(){
    return (
        <div>
           <div><FromConverter /></div>
           <div><ToConverter /></div>
        </div>
    )
}


const onClickHandler = () =>{
    return console.log("onclickhandler");
  }
  const FromConverter = () =>{
  return <div>
            <div>sign</div>
            <div>symbol</div>
            <div>value</div>
      </div>
  }
  
  const ToConverter = () =>{
   return( <div>
            <div>sign</div>
            <div>symbol</div>
            <div>value</div>
      </div>);
  }

  const ConvertButton = () =>{
    return( <div>
             <div><button>Convert</button></div>
       </div>);
   }