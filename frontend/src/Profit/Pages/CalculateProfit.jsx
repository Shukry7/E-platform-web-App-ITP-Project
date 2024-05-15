import React from 'react'
import Card from '../../Shared/Components/UiElements/Card'
import Navbar from '../../Shared/Components/UiElements/Navbar'
import Header from '../../Shared/Components/UiElements/header'


const CalculateProfit = () => {
  return (
    <>
      <div className="flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Header />

        <Card className="flex" style={{ width: "100%" }}>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl my-8 pl-96">Calculate Profit</h1>
          </div>
          <div class="justify-center mx-auto py-8 flex flex-row ...">
            <div className='w-96 mr-16'>
              <form class="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md border border-gray-500">
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="startdate">Start Date :</label>
                  <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    type="date" id="startdate" name="startdate"/>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="enddate">End Date :</label>
                  <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    type="date" id="enddate" name="enddate"/>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="product">Product ID : </label>
                  <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    type="text" id="product" name="product">
                    <option value="" disabled selected>Select the product</option>
                  </select>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="type">Type : </label>
                  <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    type="text" id="type" name="type">
                    <option value="" selected>All</option>
                    <option value="">Online</option>
                    <option value="">Offline</option>
                  </select>
                </div>
                <button
                  class="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                  type="submit">Calculate</button>
              </form>
            </div>
            <div className='w-96'>
              <form class="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md border border-gray-500">
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="sales">Total sales :</label>
                  <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    type="number" id="sales" name="sales"/>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="profit">Total profit :</label>
                  <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    type="number" id="profit" name="profit"/>
                </div>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

export default CalculateProfit
