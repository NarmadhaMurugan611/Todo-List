import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import Sidebar from "./Sidebar";
import dragIcon from '../assets/drag-icon.svg';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { GetTask } from "../redux/TaskSlice";




function Home() {

  const navigate = useNavigate()
  const { task } = useSelector((state) => state.Tasks);
  const todo = task && task.filter((col, i) => col.isCompleted === 0);
  const done = task && task.filter((col, i) => col.isCompleted === 1);
  const token = localStorage.getItem("token")


  const isAuth = Boolean(token)
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [])
  const getTaskdetail = () => {
    axios.get('http://localhost:5000/fields',{headers:{Authorization:`Bearer ${token}`}})
      .then((res) => { dispatch(GetTask(res.data)); })
      .catch((err) => { console.log(err, "error") })
  }
  useEffect(() => {
    getTaskdetail()
  }, [])

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    isAuth && (<div
      className={
        windowSize[0] >= 768 && isSideBarOpen
          ? " bg-[#f4f7fd]  scrollbar-hide h-screen flex dark:bg-[#20212c]  overflow-x-scroll gap-6  ml-[261px]"
          : "bg-[#f4f7fd]  scrollbar-hide h-screen flex    dark:bg-[#20212c] overflow-x-scroll gap-6 "
      }
    >
      {windowSize[0] >= 768 && (
        <Sidebar
          setIsBoardModalOpen={setIsBoardModalOpen}
          isBoardModalOpen={isBoardModalOpen}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}

      {/* Columns Section */}

      {task.length > 0 ? (
        <>
          <Column dragIcon={dragIcon} status={todo} title={"Todo"} colIndex={0} refetch={getTaskdetail} />
          <Column dragIcon={dragIcon} status={done} title={"Done"} colIndex={1} checkedIcon={true} refetch={getTaskdetail} />

        </>
      ) : (
        <>
          <EmptyBoard type="edit" />
        </>
      )}
      {isBoardModalOpen && (
        <AddEditBoardModal
          type="edit"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>)
  );
}

export default Home;
