import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "./Button";
import ScheduleItem from "./ScheduleItem";
import { useMyAxios } from "../util/api";

const { GET } = useMyAxios;

const Schedule = () => {
  const [assingmentList, setAssignmentList] = useState<any[]>([]);
  const [mode, setMode] = useState<"unresolved" | "resolved" | "search">(
    "unresolved"
  );

  const searchText = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  // 처음에 미해결 과제 뽑아주기
  useEffect(() => {
    GET("/unresolved").then((res) => {
      setAssignmentList(res);
      setMode("unresolved");
    });
  }, []);

  // 완료된 과제 보기
  const onClickResolvedAssignment = useCallback(() => {
    GET("/resolved").then((res) => {
      setAssignmentList(res);
      setMode("resolved");
    });
  }, []);

  // 미해결 과제 보기
  const onClickUnresolvedAssignment = useCallback(() => {
    GET("/unresolved").then((res) => {
      setAssignmentList(res);
      setMode("unresolved");
    });
  }, []);

  // 검색 (해결, 미해결 둘다 뜸)
  const onClickSearch = useCallback(() => {
    if (!searchText.current?.value) {
      onClickUnresolvedAssignment();
    } else {
      GET(
        `/search/${selectRef.current?.value}/${searchText.current?.value}`
      ).then((res) => {
        setAssignmentList(res);
        setMode("search");
      });
    }
  }, [onClickUnresolvedAssignment]);

  // 엔터
  const onKeyUpEnter = useCallback(
    (e: any) => {
      if (e.key === "Enter") {
        onClickSearch();
      }
    },
    [onClickSearch]
  );

  // 처음으로 돌아가기
  const onClickReset = useCallback(() => {
    onClickUnresolvedAssignment();
    if (searchText.current) {
      searchText.current.value = "";
    }
  }, [onClickUnresolvedAssignment]);

  const HeaderButton = () => {
    if (mode === "unresolved") {
      return (
        <Button text="완료 과제 조회" onClick={onClickResolvedAssignment} />
      );
    } else if (mode === "resolved") {
      return (
        <Button text="미해결 과제 조회" onClick={onClickUnresolvedAssignment} />
      );
    } else {
      return <Button text="처음으로 돌아가기" onClick={onClickReset} />;
    }
  };

  return (
    <div className="contents">
      <div className="search_box">
        <select ref={selectRef} defaultValue="lecture">
          <option value="lecture">과목명</option>
          <option value="title">과제명</option>
        </select>
        <input type="text" ref={searchText} onKeyUp={onKeyUpEnter} />
        <Button text="조회" onClick={onClickSearch}></Button>
      </div>
      <div className="schedule_header">
        <span>일정</span>
        <span>2023.05</span>
        <span>
          <HeaderButton />
        </span>
      </div>
      <div className="schedule_body">
        {assingmentList.map((assignment) => (
          <ScheduleItem
            key={assignment.id}
            id={assignment.id}
            title={assignment.title}
            lecture={assignment.lecture}
            prof={assignment.prof}
            date={assignment.date}
            detail={assignment.detail}
            isDone={assignment.isDone}
            userWritings={assignment.userWritings}
            reload={onClickUnresolvedAssignment}
          />
        ))}
      </div>
    </div>
  );
};

export default Schedule;
