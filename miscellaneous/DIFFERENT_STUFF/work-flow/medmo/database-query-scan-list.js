SELECT 	st.ScanTypeName AS ScanType,
		tr.ID AS ScanID,
--         CONCAT(p.FirstName,' ',p.LastName) AS PatientName,
        CONCAT(pr.FirstName,' ',pr.LastName) AS OrderingPhysician,
        s.Stage, s.StageMFP,
        CASE
			WHEN f.ID IS NULL THEN 'N/A'
            ELSE f.PathToFile
		END AS ScanResult,
        CASE
			WHEN tb.ID IS NULL AND DATE(w.WindowOpen) > NOW() THEN DATE(w.WindowOpen)
            ELSE ''
		END AS DateCompleted,
        DATE(e.LastEvent) AS DateUpdated
FROM mfp_po_test_requests mtr
INNER JOIN mfp_po_prescribers pr ON pr.ID = mtr.PerscriberID
INNER JOIN test_requests tr ON tr.ID = mtr.TestRequestID
INNER JOIN scan_services ss ON ss.ID = tr.ScanServiceID
INNER JOIN scan_types st ON st.ID = ss.ScanTypeID
-- INNER JOIN datica.patients p ON p.UserID = tr.PatientID
LEFT JOIN test_bookings tb ON tb.TestRequestID = tr.ID
LEFT JOIN test_requests_windows w ON tb.TestWindowID = w.ID
LEFT JOIN mfp_po_test_requests_files f ON f.MfpTestRequestID = tr.ID AND f.FileTypeID = 3
LEFT JOIN scan_stage s ON s.TestRequestID = tr.ID
LEFT JOIN (	SELECT TestRequestID, SUM(1) AS Cnt, MAX(Created) AS LastEvent
			FROM test_requests_events
			WHERE EventTypeID IN (24,5, 14,1,8,7)
			GROUP BY TestRequestID
		) e ON e.TestRequestID = tr.ID
WHERE mtr.POID = 1;

***********************************************

SELECT 	st.ScanTypeName AS ScanType,
		tr.ID AS ScanID,
        CONCAT(p.FirstName,' ',p.LastName) AS PatientName,
        CONCAT(pr.FirstName,' ',pr.LastName) AS OrderingPhysician,
        s.Stage, s.StageMFP,
        CASE
			WHEN f.ID IS NULL THEN 'N/A'
            ELSE f.PathToFile
		END AS ScanResult,
        CASE
			WHEN tb.ID IS NULL AND DATE(w.WindowOpen) > NOW() THEN DATE(w.WindowOpen)
            ELSE ''
		END AS DateCompleted,
        DATE(e.LastEvent) AS DateUpdated

FROM `medmo`.mfp_po_test_requests mtr
INNER JOIN `medmo`.mfp_po_prescribers pr ON pr.ID = mtr.PerscriberID
INNER JOIN `medmo`.test_requests tr ON tr.ID = mtr.TestRequestID
INNER JOIN `medmo`.scan_services ss ON ss.ID = tr.ScanServiceID
INNER JOIN `medmo`.scan_types st ON st.ID = ss.ScanTypeID
INNER JOIN `datica_v1`.patients p ON p.UserID = tr.PatientID
LEFT JOIN `medmo`.test_bookings tb ON tb.TestRequestID = tr.ID
LEFT JOIN `medmo`.test_requests_windows w ON tb.TestWindowID = w.ID
-- LEFT JOIN `medmo`.mfp_po_test_requests_files f TestRequestID = tr.ID AND f.FileTypeID = 3
LEFT JOIN `medmo`.scan_stage s ON s.TestRequestID = tr.ID
LEFT JOIN (	SELECT TestRequestID, SUM(1) AS Cnt, MAX(Created) AS LastEvent
			FROM `medmo`.test_requests_events
			WHERE EventTypeID IN (24,5, 14,1,8,7)
			GROUP BY TestRequestID
		) e ON e.TestRequestID = tr.ID
WHERE mtr.POID = [current PO ID];

***********************************************

------------------------------------------------------------------------

-- SELECT TestRequestID, SUM(1) AS Cnt, MAX(Created) AS LastEvent
-- 			FROM test_requests_events
-- 			WHERE EventTypeID IN (24,5, 14,1,8,7)
-- 			GROUP BY TestRequestID;
-- SELECT now();
-- select DATE("2021-09-01 08:00::00") > NOW();

SELECT tb.*, CASE
			WHEN tb.ID IS NULL AND DATE(w.WindowOpen) > NOW() THEN DATE(w.WindowOpen)
            ELSE ''
		END AS DateCompleted,
        DATE(e.LastEvent) AS DateUpdated
FROM mfp_po_test_requests mtr
	INNER JOIN test_requests tr ON tr.ID = mtr.TestRequestID
	LEFT JOIN test_bookings tb ON tb.TestRequestID = tr.ID
	LEFT JOIN test_requests_windows w ON tb.TestWindowID = w.ID
	LEFT JOIN (	SELECT TestRequestID, SUM(1) AS Cnt, MAX(Created) AS LastEvent
			FROM test_requests_events
			WHERE EventTypeID IN (24,5, 14,1,8,7)
			GROUP BY TestRequestID
		) e ON e.TestRequestID = tr.ID;
