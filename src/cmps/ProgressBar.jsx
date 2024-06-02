import React, { useEffect, useState } from "react";
import { emailService } from "../services/email.service";

export function ProgressBar ({progress}) {

    const [setBar , onSetBar] = useState()

    useEffect(()=> {
        Init()
    }, [])

    async function Init(){
        let totalEmails = await emailService.fullQuery()
        console.log(totalEmails.length)
        onSetBar(totalEmails.length)
    }

    return (
      <div className="progress-bar" style={{ width: '100%' }}>
        <div style={{ backgroundColor: '#f0f0f0', height: '20px', borderRadius: '10px'}}>
          <div
            style={{
              backgroundColor: '#3498db',
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