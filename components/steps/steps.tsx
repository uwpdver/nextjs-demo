import React from "react";
import classNames from "classnames";

interface Step {
  title: string;
}

interface StepRender {
  (step: Step, index?: number): React.ReactNode;
}

export interface Props {
  className?: string;
  curIndex?: number;
  steps: Step[];
}

export default function Steps({
  curIndex = 0,
  steps = [],
  className = "",
}: Props) {
  const stepRender: StepRender = ({ title }, index) => {
    return (
      <div
        className={classNames(
          "overflow-x-hidden step-item flex-1 pl-4 first:pl-0 last:flex-none group",
          className
        )}
        key={index}
      >
        <div>
          <div
            className={classNames(
              "step-item-title relative inline-block pr-4 group-last:pr-0 after:bg-gray-800 after:absolute after:left-full after:top-1/2 after:w-[9999px] after:h-[1px] after:content-[ ]",
              {
                "after:opacity-10": index >= curIndex,
              }
            )}
          >
            {title}
          </div>
        </div>
      </div>
    );
  };

  return <div className="flex steps-container">{steps.map(stepRender)}</div>;
}
