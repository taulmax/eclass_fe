import React from "react";
import Button from "./Button";
import ScheduleItem from "./ScheduleItem";

const Schedule = () => {
  return (
    <div className="contents">
      <div className="search_box">
        <select defaultValue="lecture">
          <option value="lecture">과목명</option>
          <option value="title">과제명</option>
        </select>
        <input type="text" />
        <Button text="조회"></Button>
      </div>
      <div className="schedule_header">
        <span>일정</span>
        <span>2023.05</span>
        <span>
          <Button text="완료 과제 조회" />
        </span>
      </div>
      <div className="schedule_body">
        <ScheduleItem
          title="미니프로젝트"
          lecture="웹프로그래밍"
          prof="정진우"
          date="2023-05-20"
        />
        <ScheduleItem
          title="미니프로젝트"
          lecture="웹프로그래밍"
          prof="정진우"
          date="2023-05-20"
        />
        <ScheduleItem
          title="미니프로젝트"
          lecture="웹프로그래밍"
          prof="정진우"
          date="2023-05-20"
        />
        <ScheduleItem
          title="미니프로젝트"
          lecture="웹프로그래밍"
          prof="정진우"
          date="2023-05-20"
        />
      </div>
    </div>
  );
};

export default Schedule;
