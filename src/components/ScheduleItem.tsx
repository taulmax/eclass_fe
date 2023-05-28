import React, { useCallback, useState } from "react";
import ReactQuill from "react-quill";
import Button from "./Button";
import { useMyAxios } from "../util/api";
import { toast } from "react-toastify";

const { POST } = useMyAxios;

const ScheduleItem = ({
  id,
  title,
  lecture,
  prof,
  date,
  detail,
  isDone,
  userWritings,
  reload,
}: {
  id: number;
  title: string;
  lecture: string;
  prof: string;
  date: string;
  detail: string;
  isDone: boolean;
  userWritings: string;
  reload: () => void;
}) => {
  const [mode, setMode] = useState<"hidden" | "detail" | "submit" | "done">(
    "hidden"
  );

  const [quillValue, setQuillValue] = useState<string>("");

  const onClickDetail = useCallback(() => {
    if (isDone) {
      if (mode === "done") {
        setMode("hidden");
      } else {
        setMode("done");
      }
    } else {
      if (mode === "detail") {
        setMode("hidden");
      } else {
        setMode("detail");
      }
    }
  }, [isDone, mode]);

  const onClickSubmit = useCallback(() => {
    if (mode === "submit") {
      setMode("hidden");
    } else {
      setMode("submit");
    }

    if (isDone) {
      setQuillValue(userWritings);
    }
  }, [isDone, mode, userWritings]);

  // 저장 버튼
  const onClickSave = useCallback(() => {
    try {
      POST("/save", {
        data: { id: id, userWritings: quillValue },
      })
        .then(() => reload())
        .then(() => {
          toast.success(`${title} 정보 변경에 성공했습니다.`);
        });
    } catch (e) {
      toast.error("실패했습니다.");
    }
  }, [id, quillValue, reload, title]);

  return (
    <div className="schedule_item_wrapper">
      <div className="schedule_item">
        <div className="title">[과제] {title}</div>
        <div className="item_right">
          <div className="item_button_wrapper">
            <Button text="상세" onClick={onClickDetail} />
            {isDone ? (
              <Button text="수정" onClick={onClickSubmit} />
            ) : (
              <Button text="작성" onClick={onClickSubmit} />
            )}
          </div>
          <div className="item_info">
            <span>
              {lecture}, {prof} 교수, {date}
            </span>
          </div>
        </div>
      </div>
      {mode === "detail" && (
        <div className="item_detail">
          <pre className="description">{detail}</pre>
        </div>
      )}
      {mode === "submit" && (
        <div className="item_submit">
          <div className="item_detail">
            <pre className="description">{detail}</pre>
          </div>
          <div className="custom_quill_wrapper">
            <ReactQuill
              theme="snow"
              value={quillValue}
              onChange={setQuillValue}
            />
            <div className="custom_quill_wrapper_button_wrapper">
              <Button text="취소" onClick={() => setQuillValue("")} />
              <Button text="저장" onClick={onClickSave} />
            </div>
          </div>
        </div>
      )}
      {mode === "done" && (
        <div className="item_finish">
          <div className="item_detail">
            <pre className="description">{detail}</pre>
            <pre
              className="user_writings"
              dangerouslySetInnerHTML={{ __html: userWritings }}
            ></pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleItem;
