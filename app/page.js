"use client"
import React, { useState } from 'react'
import { AiFillDelete } from "react-icons/ai";

const page = () => {
  const [itemsArray, setitemsArray] = useState([]);

  const handleClick = (title, price, quantity) => {
    const itemExists = itemsArray.some((item) => item.title === title);

    if (itemExists) {
      alert("This item is already in the list!");
    } else {
      const basePrice = Number(price);
      setitemsArray([...itemsArray, { title, price: basePrice * quantity, quantity, basePrice }]);
    }
  }

  const handleDelete = (index) => {
    const newItemsArray = [...itemsArray];
    newItemsArray.splice(index, 1);
    setitemsArray(newItemsArray);
  }

  const handleIncrement = (index) => {
    const newItemsArray = [...itemsArray];
    newItemsArray[index].quantity++;
    newItemsArray[index].price = newItemsArray[index].basePrice * newItemsArray[index].quantity;
    setitemsArray(newItemsArray);
  }

  const handleDecrement = (index) => {
    const newItemsArray = [...itemsArray];
    if (newItemsArray[index].quantity > 1) {
      newItemsArray[index].quantity--;
      newItemsArray[index].price = newItemsArray[index].basePrice * newItemsArray[index].quantity;
      setitemsArray(newItemsArray);
    }
  }

  return (
    <>
    <div className='bg-blue-200 h-[100vh] w-full flex justify-center items-center'>
      <div className='w-[35%] h-[80vh] border border-black bg-white'>
        <h2 className='text-center text-2xl font-bold'>Order Your Food</h2>
        <table className='w-full border-collapse'>
          <thead>
            <tr>
              <th className='border border-black text-center'>Item</th>
              <th className='border border-black text-center'>Qty</th>
              <th className='border border-black text-center'>Price</th>
              <th className='border border-black text-center'></th>
            </tr>
          </thead>
          <tbody>
            {itemsArray.map(({ title, price, quantity }, index) => (
              <tr key={index}>
                <td className='border border-black text-center'>{title}</td>
                <td className='border border-black text-center'>
                  <button type='button' className='bg-black text-white px-1 rounded-md' onClick={() => handleIncrement(index)}>+</button> 
                  {quantity} 
                  <button type='button' className='bg-black text-white px-1 rounded-md' onClick={() => handleDecrement(index)}>-</button>
                </td>
                <td className='border border-black text-center'>{price}</td>
                <td className='border border-black text-center'>
                  <button type='button' onClick={() => handleDelete(index)}><AiFillDelete /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='w-[50%]'>
        <div>
          <label>Customer Name</label>
          <input type='text' placeholder='Name' />
        </div>
        <div>
          <label>Customer Number</label>
          <input type='email' placeholder='number' />
        </div>
        <div className='flex flex-wrap justify-center items-center gap-3'>
          <button type='button' className='bg-black text-white px-5 py-3 rounded-md' onClick={() => handleClick('Half Kg Biryani', '200', 1)}>Half Kg Biryani <br />Rs. 200</button>
          <button type='button' className='bg-black text-white px-5 py-3 rounded-md' onClick={() => handleClick('1 Kg Biryani', '400',1)}>1 Kg Biryani <br />Rs. 400</button>
          <button type='button' className='bg-black text-white px-5 py-3 rounded-md' onClick={() => handleClick('Half Kg Chick Biryani', '250',1)}>Half Kg Chick Biryani <br /> Rs. 250</button>
          <button type='button' className='bg-black text-white px-5 py-3 rounded-md' onClick={() => handleClick('1 Kg Chick Biryani', '500',1)}>1 Kg chick Biryani <br />Rs. 500</button>
          <button type='button' className='bg-black text-white px-5 py-3 rounded-md' onClick={() => handleClick('Half Kg Beef Biryani', '350',1)}>Half Kg Beef Biryani <br />Rs. 350</button>
          <button type='button' className='bg-black text-white px-5 py-3 rounded-md' onClick={() => handleClick('1 Kg Beef Biryani', '700',1)}>1 Kg Beef Biryani <br />Rs. 700</button>
          <button type='button' className='bg-black text-white px-5 py-3 rounded-md' onClick={() => handleClick('Half Kg Chick Pulao', '250',1)}>Half Kg Chick Pulao <br />Rs. 250</button>
          <button type='button' className='bg-black text-white px-5 py-3 rounded-md' onClick={() => handleClick('1 Kg Chick Pulao', '500',1)}>1 Kg Chick Biryani <br />Rs. 500</button>
          <button type='button' className='bg-black text-white px-5 py-3 rounded-md' onClick={() => handleClick('Half Kg Beef Pulao', '350',1)}>Half Kg Beef Pulao <br />Rs. 350</button>
          <button type='button' className='bg-black text-white px-5 py-3 rounded-md' onClick={() => handleClick('1 Kg Beef Pulao', '700',1)}>1 Kg Beef Pulao <br />Rs. 700</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default page;