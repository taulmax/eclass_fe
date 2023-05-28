import React, { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import ScheduleItem from "./ScheduleItem";
import { useMyAxios } from "../util/api";

const { GET } = useMyAxios;

const Schedule = () => {
  const [assingmentList, setAssignmentList] = useState<any[]>([]);
  const [mode, setMode] = useState<"unresolved" | "resolved">("unresolved");

  useEffect(() => {
    GET("http://localhost:8080/unresolved").then((res) => {
      setAssignmentList(res);
      setMode("unresolved");
    });
  }, []);

  const onClickResolvedAssignment = useCallback(() => {
    GET("http://localhost:8080/resolved").then((res) => {
      setAssignmentList(res);
      setMode("resolved");
    });
  }, []);

  const onClickUnresolvedAssignment = useCallback(() => {
    GET("http://localhost:8080/unresolved").then((res) => {
      setAssignmentList(res);
      setMode("unresolved");
    });
  }, []);

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
          {mode === "unresolved" ? (
            <Button text="완료 과제 조회" onClick={onClickResolvedAssignment} />
          ) : (
            <Button
              text="미해결 과제 조회"
              onClick={onClickUnresolvedAssignment}
            />
          )}
        </span>
      </div>
      <div className="schedule_body">
        {assingmentList.map((assignment) => (
          <ScheduleItem
            key={assignment.id}
            title={assignment.title}
            lecture={assignment.lecture}
            prof={assignment.prof}
            date={assignment.date}
            detail={assignment.detail}
          />
        ))}
      </div>
    </div>
  );
};

export default Schedule;
