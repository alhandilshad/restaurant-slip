"use client"
import React, { useState } from 'react'
import { AiFillDelete } from "react-icons/ai";
import jsPDF from "jspdf";
import "jspdf-autotable";

const page = () => {
  const [itemsArray, setitemsArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isDone, setisDone] = useState();
  const [name, setname] = useState();
  const [number, setnumber] = useState();
  const [cashRec, setcashRec] = useState();

  const handleClick = (title, price, quantity) => {
    const itemExists = itemsArray.some((item) => item.title === title);

    if (itemExists) {
      alert("This item is already in the list!");
    } else {
      const basePrice = Number(price);
      setitemsArray([...itemsArray, { title, price: basePrice * quantity, quantity, basePrice }]);
      setTotalPrice(totalPrice + (basePrice * quantity));
      setisDone(title);
    }
  }

  const handleDelete = (index) => {
    const newItemsArray = [...itemsArray];
    newItemsArray.splice(index, 1);
    setitemsArray(newItemsArray);
    setTotalPrice(totalPrice - (itemsArray[index].basePrice * itemsArray[index].quantity));
  }

  const handleIncrement = (index) => {
    const newItemsArray = [...itemsArray];
    newItemsArray[index].quantity++;
    newItemsArray[index].price = newItemsArray[index].basePrice * newItemsArray[index].quantity;
    setTotalPrice(totalPrice + newItemsArray[index].basePrice);
    setitemsArray(newItemsArray);
  }

  const handleDecrement = (index) => {
    const newItemsArray = [...itemsArray];
    if (newItemsArray[index].quantity > 1) {
      newItemsArray[index].quantity--;
      newItemsArray[index].price = newItemsArray[index].basePrice * newItemsArray[index].quantity;
      setTotalPrice(totalPrice - newItemsArray[index].basePrice);
      setitemsArray(newItemsArray);
    }
  }

  const generateSlip = () => {
    if (!isDone) {
      alert("Please select an item first!");
      return;
    }
  
    if (!name || !number || !cashRec) {
      alert("Please fill in all the required fields!");
      return;
    }
  
    const doc = new jsPDF();
  
    doc.setFontSize(20);
    doc.text("Pre-Payment Bill", 90, 10);
  
    doc.setFontSize(12);
    doc.text(`Customer Name: ${name}`, 14, 20);
    doc.text(`Customer Number: ${number}`, 14, 25);
  
    doc.autoTable({
      startY: 30,
      head: [['Item', 'Qty', 'Price']],
      body: itemsArray.map(({ title, quantity, price }) => [title, quantity, price]),
    });

    doc.setFontSize(12);
    doc.text(`Total: Rs. ${totalPrice}`, 14, doc.lastAutoTable.finalY + 10);
    doc.text(`Cash Received: Rs. ${cashRec}`, 14, doc.lastAutoTable.finalY + 15);
    doc.text(`Change: Rs. ${cashRec - totalPrice}`, 14, doc.lastAutoTable.finalY + 20);
  
    doc.save("receipt.pdf");
  
    setname('');
    setnumber('');
    setcashRec('');
    setitemsArray([]);
    setTotalPrice(0);
    setisDone(null);
  };

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
              <>
              <tr key={index}>
                <td className='border border-black text-center'>{title}</td>
                <td className='border border-black text-center flex gap-1 justify-center items-center'>
                  <button type='button' className='bg-black text-white px-1 rounded-md' onClick={() => handleIncrement(index)}>+</button> 
                  {quantity} 
                  <button type='button' className='bg-black text-white px-1 rounded-md' onClick={() => handleDecrement(index)}>-</button>
                </td>
                <td className='border border-black text-center'>{price}</td>
                <td className='border border-black text-center'>
                  <button type='button' onClick={() => handleDelete(index)}><AiFillDelete /></button>
                </td>
              </tr>
              </>
            ))}
          </tbody>
        </table>
        <h1 className='text-end pr-16'>Total : {totalPrice}</h1>
        <div className='text-center mt-2'>
          <label>Cash Received : </label>
          <input className='border border-black px-2 py-1' type='email' placeholder='Enter Number' onChange={(e) => setcashRec(e.target.value)} />
        </div>
        <button type='button' className='px-4 py-2 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-800 duration-300 mt-4 ml-44 sticky' onClick={generateSlip}>Generate Slip</button>
      </div>
      <div className='w-[50%]'>
        <div className='flex flex-wrap justify-center items-center gap-3'>
          <button type='button' className={`text-white px-5 py-3 rounded-md hover:bg-gray-700 duration-300 ${isDone === 'Half Kg Biryani' ? 'bg-gray-700' : 'bg-gray-900'}`} onClick={() => handleClick('Half Kg Biryani', '200', 1)}>Half Kg Biryani <br />Rs. 200</button>
          <button type='button' className={`text-white px-5 py-3 rounded-md hover:bg-gray-700 duration-300 ${isDone === '1 Kg Biryani' ? 'bg-gray-700' : 'bg-gray-900'}`} onClick={() => handleClick('1 Kg Biryani', '400',1)}>1 Kg Biryani <br />Rs. 400</button>
          <button type='button' className={`text-white px-5 py-3 rounded-md hover:bg-gray-700 duration-300 ${isDone === 'Half Kg Chick Biryani' ? 'bg-gray-700' : 'bg-gray-900'}`} onClick={() => handleClick('Half Kg Chick Biryani', '250',1)}>Half Kg Chick Biryani <br /> Rs. 250</button>
          <button type='button' className={`text-white px-5 py-3 rounded-md hover:bg-gray-700 duration-300 ${isDone === '1 Kg Chick Biryani' ? 'bg-gray-700' : 'bg-gray-900'}`} onClick={() => handleClick('1 Kg Chick Biryani', '500',1)}>1 Kg chick Biryani <br />Rs. 500</button>
          <button type='button' className={`text-white px-5 py-3 rounded-md hover:bg-gray-700 duration-300 ${isDone === 'Half Kg Beef Biryani' ? 'bg-gray-700' : 'bg-gray-900'}`} onClick={() => handleClick('Half Kg Beef Biryani', '350',1)}>Half Kg Beef Biryani <br />Rs. 350</button>
          <button type='button' className={`text-white px-5 py-3 rounded-md hover:bg-gray-700 duration-300 ${isDone === '1 Kg Beef Biryani' ? 'bg-gray-700' : 'bg-gray-900'}`} onClick={() => handleClick('1 Kg Beef Biryani', '700',1)}>1 Kg Beef Biryani <br />Rs. 700</button>
          <button type='button' className={`text-white px-5 py-3 rounded-md hover:bg-gray-700 duration-300 ${isDone === 'Half Kg Chick Pulao' ? 'bg-gray-700' : 'bg-gray-900'}`} onClick={() => handleClick('Half Kg Chick Pulao', '250',1)}>Half Kg Chick Pulao <br />Rs. 250</button>
          <button type='button' className={`text-white px-5 py-3 rounded-md hover:bg-gray-700 duration-300 ${isDone === '1 Kg Chick Pulao' ? 'bg-gray-700' : 'bg-gray-900'}`} onClick={() => handleClick('1 Kg Chick Pulao', '500',1)}>1 Kg Chick Biryani <br />Rs. 500</button>
          <button type='button' className={`text-white px-5 py-3 rounded-md hover:bg-gray-700 duration-300 ${isDone === 'Half Kg Beef Pulao' ? 'bg-gray-700' : 'bg-gray-900'}`} onClick={() => handleClick('Half Kg Beef Pulao', '350',1)}>Half Kg Beef Pulao <br />Rs. 350</button>
          <button type='button' className={`text-white px-5 py-3 rounded-md hover:bg-gray-700 duration-300 ${isDone === '1 Kg Beef Pulao' ? 'bg-gray-700' : 'bg-gray-900'}`} onClick={() => handleClick('1 Kg Beef Pulao', '700',1)}>1 Kg Beef Pulao <br />Rs. 700</button>
        </div>
        <div className='flex flex-col justify-center items-center gap-5 mt-16'>
        <div>
          <label className='text-xl font-semibold'>Customer Name : </label>
          <input className='border border-black px-4 py-2' type='text' placeholder='Enter Name' onChange={(e) => setname(e.target.value)} />
        </div>
        <div>
          <label className='text-xl font-semibold'>Customer Number : </label>
          <input className='border border-black px-4 py-2' type='email' placeholder='Enter Number' onChange={(e) => setnumber(e.target.value)} />
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default page;