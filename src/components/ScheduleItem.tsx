import React, { useCallback, useState } from "react";
import ReactQuill from "react-quill";
import Button from "./Button";

const ScheduleItem = ({
  title,
  lecture,
  prof,
  date,
  detail,
}: {
  title: string;
  lecture: string;
  prof: string;
  date: string;
  detail: string;
}) => {
  const [mode, setMode] = useState<"hidden" | "detail" | "submit" | "done">(
    "hidden"
  );

  const [quillValue, setQuillValue] = useState<string>("");

  const onClickDetail = useCallback(() => {
    if (mode === "detail") {
      setMode("hidden");
    } else {
      setMode("detail");
    }
  }, [mode]);

  const onClickSubmit = useCallback(() => {
    if (mode === "submit") {
      setMode("hidden");
    } else {
      setMode("submit");
    }
  }, [mode]);

  return (
    <div className="schedule_item_wrapper">
      <div className="schedule_item">
        <div className="title">[과제] {title}</div>
        <div className="item_right">
          <div className="item_button_wrapper">
            <Button text="상세" onClick={onClickDetail} />
            <Button text="작성" onClick={onClickSubmit} />
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
              <Button text="저장" />
            </div>
          </div>
        </div>
      )}
      {mode === "done" && <div className="item_finish"></div>}
    </div>
  );
};

export default ScheduleItem;
