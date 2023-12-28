import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ElipsisMenu from "../components/ElipsisMenu";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import AddEditTaskModal from "./AddEditTaskModal";
import DeleteModal from "./DeleteModal";
import axios from "axios";

function TaskModal({ taskIndex, setIsTaskModalOpen ,colIndex,task,refetch}) {
  const dispatch = useDispatch();
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const columns =["Todo","Done"];
  const col = columns.find((col, i) => i === colIndex);
 

  const [status, setStatus] = useState(task.isCompleted ==0 ? "Todo" :"Done");
  const [newColIndex, setNewColIndex] = useState();

  const onChange = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);

    const form=
      {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "duedate": task.duedate,
        "isCompleted": e.target.selectedIndex
      }
    

    axios.put(`http://localhost:5000/fields/${task.id}`, form)
     .then((res)=>{refetch(); onClose() })
     .catch((err)=>{console.log(err,"error")})
  

  };

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    setIsTaskModalOpen(false);
  };

  const onDeleteBtnClick = () => {
        axios.delete(`http://localhost:5000/fields/${task.id}`)
         .then((res)=>{refetch()})
         .catch((err)=>{console.log(err,"error")})
      
      setIsTaskModalOpen(false);
      setIsDeleteModalOpen(false);
  };

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      onClick={onClose}
      className=" fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown "
    >
      {/* MODAL SECTION */}

      <div className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl">
        <div className=" relative flex   justify-between w-full items-center">
          <h1 className=" text-lg">{task.title}</h1>

          <img
            onClick={() => {
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
            src={elipsis}
            alt="elipsis"
            className=" cursor-pointer h-6"
          />
          {isElipsisMenuOpen && (
            <ElipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            />
          )}
        </div>
        <p className="mb-5 text-gray-500 font-[600] tracking-wide text-xs pt-6">
          {task.description}
        </p>

        <span>Due Date : {task.duedate}</span>

    
        

        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
            value={status}
            onChange={onChange}
          >
            {columns.map((col, index) => (
              <option className="status-options" key={index}>
                {col}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          onDeleteBtnClick={onDeleteBtnClick}
          type="task"
          title={task.title}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}

      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="edit"
          taskIndex={taskIndex}
          prevColIndex={colIndex}
          data={task}
          refetch={refetch}
        />
      )}
    </div>
  );
}

export default TaskModal;
