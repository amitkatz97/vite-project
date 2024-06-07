import React, { useEffect, useState } from "react";
import { emailService } from "../services/email.service";

export function ProgressBar ({progress}) {

    const [setBar , onSetBar] = useState()

    useEffect(()=> {
        Init()
    }, [])

    async function Init(){
        let totalEmails = await emailService.fullQuery()
        onSetBar(totalEmails.length)
    }

    return (
      <div className="progress-bar" style={{ width: '100%' , backgroundColor: '#f2f2f2'}}>
        <div style={{ backgroundColor: '#ffffff', height: '20px', borderRadius: '10px', margin : '4px'}}>
          <div
            style={{
              backgroundColor: '#c9def1',
              height: '100%',
              width: `${progress}%`,
              borderRadius: '10px',
              transition: 'width 0.3s ease-in-out'
            }}
          ></div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '10px' }}>Total Unread Emailes: {progress}</p>
      </div>
    );
  };