import React, { useCallback, useEffect, useState } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';
import './ProductList.css'
const products = [

  {
    id: '1',
    title: 'Курткаааа',
    price: 12000,
    description: 'Зеленого цвета, теплая'
  },
  {
    id: '2',
    title: 'Джинсы',
    price: 4500,
    description: 'Синие, прямого кроя'
  },
  {
    id: '3',
    title: 'Футболка',
    price: 2500,
    description: 'Белая, хлопок 100%'
  },
  {
    id: '4',
    title: 'Пальто',
    price: 15000,
    description: 'Бежевое, шерстяное'
  },
  {
    id: '5',
    title: 'Свитшот',
    price: 3800,
    description: 'Серый, с капюшоном'
  },
  {
    id: '6',
    title: 'Брюки',
    price: 5200,
    description: 'Черные, офисные'
  },
  {
    id: '7',
    title: 'Толстовка',
    price: 4200,
    description: 'Оверсайз, розовая'
  },
  {
    id: '8',
    title: 'Шорты',
    price: 3200,
    description: 'Джинсовые, синие'
  },
  {
    id: '9',
    title: 'Парка',
    price: 13500,
    description: 'Зимняя, с мехом'
  },
  {
    id: '10',
    title: 'Рубашка',
    price: 3700,
    description: 'Голубая, в клетку'
  },
  {
    id: '11',
    title: 'Юбка',
    price: 4100,
    description: 'Черная, миди-длина'
  },
  {
    id: '12',
    title: 'Пуховик',
    price: 16700,
    description: 'Синий, легкий'
  },
  {
    id: '13',
    title: 'Кардиган',
    price: 5800,
    description: 'Бежевый, вязаный'
  },
  {
    id: '14',
    title: 'Бомбер',
    price: 8900,
    description: 'Черный, нейлон'
  },
  {
    id: '15',
    title: 'Платье',
    price: 6400,
    description: 'Красное, летнее'
  },
  {
    id: '16',
    title: 'Жилет',
    price: 5300,
    description: 'Пуховый, серый'
  },
  {
    id: '17',
    title: 'Ветровка',
    price: 7200,
    description: 'Желтая, непромокаемая'
  },
  {
    id: '18',
    title: 'Комбинезон',
    price: 12300,
    description: 'Джинсовый, свободный'
  },
  {
    id: '19',
    title: 'Пиджак',
    price: 9500,
    description: 'Коричневый, твидовый'
  },
  {
    id: '20',
    title: 'Лонгслив',
    price: 3100,
    description: 'Черный, приталенный'
  }
]

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return acc += item.price
  }, 0)
}
let newItems = []


const ProductList = () => {
  const [addeedItems, setAddedItems] = useState([])
  const { tg, queryId} = useTelegram()

  const onSendData = useCallback(() => {
    const data = {
      products: addeedItems,
      totalPrice: getTotalPrice(addeedItems),
      queryId
    }
    console.log(data)
    fetch('http://35.157.117.28:8000/web-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }, [queryId])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  const onAdd = (product) => {
    const alreadyAdded = addeedItems.find(item => item.id === product.id)
    if (alreadyAdded) {
      newItems = addeedItems.filter(item => item.id !== product.id)
    } else {
      newItems = [...addeedItems, product]
    }

    setAddedItems(newItems)
    if (newItems.length === 0) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`
      })
    }
  }

  return (
    <div className='list'>
      {products.map(item => (
        <ProductItem
          product={item}
          onAdd={onAdd}
          className={'item'}
        />
      ))}
    </div>
  )
}

export default ProductList