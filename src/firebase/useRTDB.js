import { onValue, ref, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { db } from './fb'

const useRTDB = () => {

    const [data, setData] = useState({
        Air_Quality: 0,
        Humidity: 0,
        Temperature: 0
    })

    const write = (path, data) => {
        set(
            ref(db,path), data
        )
    }

    useEffect(
        () => {

            const dbRef = ref(db, '/')
        
            onValue(
                dbRef, (snapshot) => {
                    setData(snapshot.val())
                }
            )
        }, []
    )


  return [data, write]
}

export default useRTDB