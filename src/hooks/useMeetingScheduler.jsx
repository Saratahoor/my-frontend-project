import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiInitializeMeetingScheduler } from "../utils/apiService";

export function useMeetingScheduler(cases) {
  const intervalsRef = useRef({});

  const { mutate: initializeMeeting } = useMutation({
    mutationFn: apiInitializeMeetingScheduler,
  });

  useEffect(() => {
    if (!cases) return;

    const checkTime = (caseItem) => {
      const now = new Date();
      const meetingTime = new Date(caseItem.schedule_date);
      const timeDiff = meetingTime.getTime() - now.getTime();
      const fiveMinutes = 5 * 60 * 1000;

      if (timeDiff <= fiveMinutes && timeDiff > 0) {
        initializeMeeting();
      }
    };

    // Clear all existing intervals
    Object.values(intervalsRef.current).forEach((interval) =>
      clearInterval(interval)
    );
    intervalsRef.current = {};

    // Handle both single case object and array of cases
    const casesToCheck = Array.isArray(cases) ? cases : [cases];

    casesToCheck.forEach((caseItem) => {
      if (
        caseItem &&
        caseItem.status === "In Progress" &&
        caseItem.mediation_mode === "Online" &&
        caseItem.schedule_date
      ) {
        // Initial check
        checkTime(caseItem);

        // Set interval for periodic checks
        intervalsRef.current[caseItem._id] = setInterval(
          () => checkTime(caseItem),
          60 * 1000
        );
      }
    });

    // Cleanup function
    return () => {
      Object.values(intervalsRef.current).forEach((interval) =>
        clearInterval(interval)
      );
    };
  }, [cases, initializeMeeting]);
}
