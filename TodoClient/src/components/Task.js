import React, { useState } from "react";
import TaskModal from "../modals/TaskModal";
import checkIcon from '../assets/checked.svg';


function Task({ taskIndex, dragIcon, task, colIndex, checkedIcon, editIcon, refetch }) {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  return (
    <div>
      <div onClick={() => { setIsTaskModalOpen(true); }}
        className=" w-[280px] relative flex items-center first:my-5 rounded-lg  bg-white  dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer ">
        {checkedIcon && <img className="w-[15px] mr-1" src={checkIcon} />}
        <p className=" font-bold tracking-wide ">{task.title}</p>
        <p className="absolute bottom-0 right-1 text-xs font-semibold mb-1">Due Date : {task.duedate}</p>
        <span className="w-[20px] ml-1 absolute right-1" >&#9998;</span>
      </div>
      {isTaskModalOpen && (        
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          task={task}        
          refetch={refetch}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}

export default Task;
