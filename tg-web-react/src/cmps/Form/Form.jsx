import React, { useCallback, useEffect, useState } from 'react';
import './Form.css'
import { useTelegram } from '../../hooks/useTelegram';

export default function Form() {
  const [country, setCountry] = useState('')
  const [street, setStreet] = useState('')
  const [subject, setSubject] = useState('physical')
  const { tg } = useTelegram()

  const onSendData = useCallback(() => {
    const data = {
      country,
      street,
      subject
    }
    console.log(data)
    tg.sendData(JSON.stringify(data))
  }, [country, street, subject])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Отправить данные'
    })
  }, [])

  useEffect(() => {
    if (!street || !country) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
    }
  }, [country, street])

  const onChengeCountry = (e) => {
    setCountry(e.target.value)
  }

  const onChengeStreet = (e) => {
    setStreet(e.target.value)
  }

  const onChengeSubject = (e) => {
    setSubject(e.target.value)
  }

  return (
    <div className='form'>
      <input
        className='input'
        type="text"
        placeholder='Страна'
        value={country}
        onChange={onChengeCountry}
      />
      <input
        className='input'
        type="text"
        placeholder='Улица'
        value={street}
        onChange={onChengeStreet}
      />

      <select className='select' value={subject} onChange={onChengeSubject}>
        <option value="physical">Физ. лицо</option>
        <option value="legal">Юр. лицо</option>
      </select>
    </div>
  )
}