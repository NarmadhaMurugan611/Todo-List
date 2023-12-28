import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Task from "./Task";

function Column({dragIcon,status,title,colIndex ,checkedIcon, editIcon, refetch}) {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-sky-500",
  ];


  const dispatch = useDispatch();
  const [color, setColor] = useState(null)
 
  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [dispatch]);


  return (
    <div
      className="scrollbar-hide   mx-5 pt-[90px] min-w-[280px] "
    >
      <p className=" font-semibold flex  items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
        <div className={`rounded-full w-4 h-4 ${color} `} />
        {title} ({status.length})
      </p>
      {status&&status.map((task, index) => (
        <Task key={index} taskIndex={index} dragIcon={dragIcon} task={task} colIndex={colIndex} checkedIcon={checkedIcon} editIcon={editIcon} refetch={refetch} />
      ))}
    </div>
  );
}

export default Column;
