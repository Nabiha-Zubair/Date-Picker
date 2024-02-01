import React from "react";

import {
  alignToEndClass,
  lightTextClass,
  calculateButtonClass,
} from "./styles";
import { calculateRanges } from "../../helpers/utils";

export default function CalculateButton({
  endDate,
  startDate,
  setBusinessRange,
  setWeekendRange,
  businessRange,
  weekendRange,
}) {
  return (
    <div className={alignToEndClass}>
      {endDate && (
        <div className="my-2">
          <button
            className={calculateButtonClass}
            onClick={() =>
              calculateRanges({
                startDate,
                endDate,
                setBusinessRange,
                setWeekendRange,
              })
            }
          >
            Done
          </button>

          <div className="my-3">
            <p className={lightTextClass}>
              Business Days: [ {businessRange[0]} -
              {businessRange[businessRange.length - 1]} ]
            </p>
            <p className={lightTextClass}>
              Weekend Days: [ {weekendRange[0]} -
              {weekendRange[weekendRange.length - 1]} ]
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
