import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { useStorage } from '../components/useStorage';
import EasyCounter from '../components/EasyCounter';
import { useEffect, useState } from 'react';
import Referral from '../components/Referral';
import ResumeTweak from '../components/ResumeTweak';
interface storageRow {
  date:string,
  easy:number,
  resume_tweaking:number,
  referrals:number
}
const Home: React.FC = () => {
  const {getStoredData} =useStorage();
  const [comptodisplay,setCompToDisplay] =useState(0);
  const currentDate = new Date();
  const dateString=currentDate.toLocaleDateString();
  const storedrows = getStoredData();
  const todayRow = storedrows.find((row: storageRow) => row.date === dateString);
  const totalToday = (todayRow?.easy || 0) + (todayRow?.referrals || 0 )+ (todayRow?.resume_tweaking || 0);
  const totalAllDays = storedrows.reduce((total, row) => {
    return total + (row.easy || 0) + (row.referrals || 0) + (row.resume_tweaking || 0);
}, 0);
  return (
    <IonPage>
      <IonHeader >
        <IonToolbar  color='primary'>
          <IonTitle>Application Counter</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {comptodisplay == 0 && <IonGrid fixed={true}>
          <IonRow className='flex items-center justify-center'>
            <IonCol  size='12' sizeMd='8' sizeLg='6' sizeXl='6'>
              <div className='flex items-center justify-center'>
                <span className='font-bold'>Welcome Durga Prasad</span>
              </div>
              <div className='flex flex-col '>
                <span className='font-bold mt-4'>Total Applications:{totalAllDays}</span>
                <span className='font-bold mt-4'>Total Applications today:{totalToday}</span>
              </div>
              
              <div className='flex flex-col items-center justify-center mt-6'>
                <IonButton onClick={()=>setCompToDisplay(1)}>Start Easy Apply</IonButton>
                <IonButton onClick={()=>setCompToDisplay(2)}>Start Resume Tweaking Apps</IonButton>
                <IonButton onClick={()=>setCompToDisplay(3)}>Start Referral Based</IonButton>
              </div>
              
              
            </IonCol>
            
          </IonRow>
        </IonGrid>}
        {comptodisplay==1 && <EasyCounter target={25}  setCompToDisplay={setCompToDisplay}/>}
        {comptodisplay==2 && <ResumeTweak target={15}  setCompToDisplay={setCompToDisplay}/>}
        {comptodisplay==3 && <Referral  target={10} setCompToDisplay={setCompToDisplay}/>}
        
      </IonContent>
      
    </IonPage>
  );
};

export default Home;
