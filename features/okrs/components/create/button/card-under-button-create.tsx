import React from 'react'

const CardBottomBtnCreate = () => {
  return (
    <div className="ml-10 mt-3">
    <label id='auditer' className='bottom-0 left-0 mt-1'>OKR對齊: </label>
    <select className="select select-bordered  rounded-none select-sm  ml-2">
      <option disabled selected>請選擇</option>
      <option>1</option>
      <option>2</option>
    </select>
    <label id='visiable' className='bottom-0 left-0 mt-1 ml-3'>可見範圍: </label>
    
    <select className="select select-bordered  rounded-none select-sm  ml-2">
      <option disabled selected>全公司</option>
      <option>1</option>
      <option>2</option>
  </select>
  
</div>
  )
}

export default CardBottomBtnCreate