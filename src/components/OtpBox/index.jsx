import React, { useState } from 'react'

function OtpBox({length, onChange}) {
    const [otp, setOtp] = useState(new Array(length).fill(""));

    const handleChange = (element, index) => {
        const value = element.value;
        if(isNaN(value)) return; // Chỉ cho phép điền số

        // Cập nhật OTP 
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        onChange(newOtp.join(""));

        // Focus on next input
        if(value && index < length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (event, index) => {
        if(event.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    }
  return (
    <div className='otp-box flex justify-center gap-2'>
        {otp.map((data, index) => (
            <input
                key={index}
                id={`otp-input-${index}`}
                type='text'
                maxLength='1'
                value={otp[index]}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className='w-[45px] h-[45px] text-center text-[17px] border'
            />
        ))}
    </div>
  )
}

export default OtpBox;