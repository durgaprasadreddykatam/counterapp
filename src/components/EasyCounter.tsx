import { IonButton, IonCard, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useStorage } from './useStorage';

export interface counterInterface{
    target:number,
    setCompToDisplay: (value: number) => void 
}
interface storageRow {
    date:string,
    easy:number,
    resume_tweaking:number,
    referrals:number,
    easy_time_in_mm:number,
    resume_tweaking_time_in_min:number,
    referrals_time_in_mm:number
  }

const EasyCounter: React.FC<counterInterface> = ({target,setCompToDisplay}) => {
    const currentDate = new Date();
    const dateString=currentDate.toLocaleDateString();
    const [currentCount,setCurrentCount] =useState(0);
    const {setStoredData,getStoredData} =useStorage();
    const storedrows = getStoredData();
    const todayRow = storedrows.find((row: storageRow) => row.date === dateString);
    const totalToday = (todayRow?.easy || 0) + (todayRow?.referrals || 0 )+ (todayRow?.resume_tweaking || 0);
    const timeTaken = todayRow?.easy_time_in_mm;
    const mountTime = Date.now();
    
    function increase(){
        setCurrentCount(currentCount+1);
        if (todayRow) {
            const updatedRow = {
                ...todayRow,
                easy: (todayRow.easy || 0) + 1,
                easy_time_in_mm: parseFloat(((timeTaken || 0) + ((Date.now() - mountTime) / 60000)).toFixed(2)),
            };
            setStoredData(updatedRow);
        }
}

function decrease(){
    if(todayRow && todayRow.easy !== 0){
        setCurrentCount(currentCount-1);
        if (todayRow) {
            const updatedRow = {
                ...todayRow,
                easy: (todayRow.easy || 0) - 1,
                easy_time_in_mm: parseFloat(((timeTaken || 0) + ((Date.now() - mountTime) / 60000)).toFixed(2)),
            };
            setStoredData(updatedRow);
        }
    }

}
useEffect(()=>{},[currentCount])

    return (
            <IonContent className="ion-padding">
                <div className='flex flex-col justify-center items-center'>
                    <span className='font-bold'>Total Today:{totalToday}</span>
                    <span className='font-bold'>Target:{target}</span>
                    <span className='font-bold'>Time:{todayRow?.easy_time_in_mm} Minutes</span>
                    <IonCard className='h-60 w-60 p-4 flex items-center justify-center'>
                        <div className='h-40 w-40 bg-slate-300 rounded-full relative flex items-center justify-center'>
                            <span className='font-extrabold text-6xl'>{todayRow?.easy}</span>
                        <div onClick={decrease} className='h-20 w-20 bg-red-300 rounded-full flex items-center justify-center text-4xl font-bold absolute -bottom-5 -left-4 cursor-pointer'>-</div>
                        <div onClick={increase} className='h-20 w-20 bg-green-300 rounded-full  flex items-center justify-center text-4xl font-bold  absolute -bottom-5 -right-4 cursor-pointer'>+</div>

                        </div>
                    </IonCard>
                    <IonButton onClick={()=>setCompToDisplay(0)}>Back</IonButton>
                </div>
                
                
            </IonContent>
        
    );
};

export default EasyCounter;