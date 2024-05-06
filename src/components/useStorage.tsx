import { useEffect, useState } from "react";
import { Storage } from "@ionic/storage";
import React from "react";

export interface storageRow {
    date:string,
    easy:number,
    easy_time_in_mm:number,
    resume_tweaking:number,
    resume_tweaking_time_in_min:number,
    referrals:number,
    referrals_time_in_mm:number
}


const COUNTER_KEY="counter_key";

export function useStorage (){
    const currentDate = new Date();
    const dateString=currentDate.toLocaleDateString();
    const [store,setStore] =React.useState<Storage>();
    const [storedRow,setStoredRow] =useState<storageRow[]>([]);
    const [todayRow,setTodayRow]= useState<storageRow>({ date:dateString,
                                                        easy:0,
                                                         resume_tweaking:0,
                                                         referrals:0 ,
                                                         easy_time_in_mm:0,
                                                         resume_tweaking_time_in_min:0,
                                                         referrals_time_in_mm:0
                                                        })

    useEffect(()=>{
        const initStorage = async () =>{
            const storage = new Storage({
                name: 'counterdb',
                
              });
              
            await storage.create();
            setStore(storage);
            const storedrows =await storage.get(COUNTER_KEY) || [];
            setStoredRow(storedrows);
            const todayRow1 = storedrows.find((row: storageRow) => row.date === dateString);
            if (todayRow1) {
                setTodayRow(todayRow1);
            }
            else {
                storedrows.push(todayRow);
                await storage.set(COUNTER_KEY, storedrows);
            }

        }
        initStorage ();

        
    },[])
    async function setStoredData(currentData: storageRow) {
        if (currentData.date === dateString) {
            const updatedStoredRows = storedRow.map(row => {
                if (row.date === currentData.date) {
                    return currentData;
                }
                return row;
            });
            setTodayRow(currentData); 
            setStoredRow(updatedStoredRows);
            await store?.set(COUNTER_KEY, updatedStoredRows); 
        }
    }

    function getStoredData(){
        return storedRow;
    }
    
    return { getStoredData ,setStoredData };
}