package com.remember.action;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.remember.model.ColorRecord;
import com.remember.model.OrientationRecord;
import com.remember.model.SexRecord;
import com.remember.model.TestRecord;
import com.remember.service.ColorRecordService;
import com.remember.service.OrientationRecordService;
import com.remember.service.SexRecordService;
import com.remember.service.TestRecordService;

/**
 * Servlet implementation class TestServlet
 */
@WebServlet("/TestServlet")
public class TestServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private String methodName;
	private TestRecordService testRecordService = new TestRecordService();
	private SexRecordService sexRecordService = new SexRecordService();
	private OrientationRecordService orientationRecordService = new OrientationRecordService();
	private ColorRecordService colorRecordService = new ColorRecordService();
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TestServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().append("Method Error");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json; charset=utf-8");
		String methodName = request.getParameter("method");
		String responseJson = "";
		switch (methodName) {
		case "saveRecord":
			TestRecord testRecord = new TestRecord();
			testRecord.setTrDifference(request.getParameter("difference"));
			testRecord.setTrCorrectCount(request.getParameter("correctCount"));
			testRecord.setTrTypeId(Integer.valueOf(request.getParameter("typeId")));
			saveRecord(testRecord);
			break;
		case "saveSexRecord":
			SexRecord sexRecord = new SexRecord();
			sexRecord.setSex(request.getParameter("sex"));
			sexRecord.setResult(Float.valueOf(request.getParameter("result")));
			sexRecordService.addSexRecord(sexRecord);
			break;
		case "getAllSexRecord":
			responseJson = sexRecordService.getAllSexRecordList();
			break;
		case "saveOrientationRecord":
			OrientationRecord orientationRecord = new OrientationRecord();
			orientationRecord.sethResult(Float.valueOf(request.getParameter("h_result")));
			orientationRecord.setvResult(Float.valueOf(request.getParameter("v_result")));
			orientationRecordService.addOrientationRecord(orientationRecord);
			break;
		case "getAllOrientationRecord":
			responseJson = orientationRecordService.getAllOrientationRecordList();
			break;
		case "saveColorRecord":
			ColorRecord colorRecord = new ColorRecord();
			colorRecord.setRbResult(Float.valueOf(request.getParameter("rb_result")));
			colorRecord.setRgResult(Float.valueOf(request.getParameter("rg_result")));
			colorRecord.setGbResult(Float.valueOf(request.getParameter("gb_result")));
			colorRecordService.addColorRecord(colorRecord);
			break;
		case "getAllColorRecord":
			responseJson = colorRecordService.getAllColorRecordList();
			break;
		case "getRecordByTypeId":
			Integer typeId = Integer.valueOf(request.getParameter("typeId"));
			responseJson = getRecordList(typeId);
			break;
		default:
			break;
		}
		response.getWriter().write(responseJson);
//		response.getWriter().append("success");
	}

	private void saveRecord(TestRecord testRecord) {
		System.out.println(testRecord);
		testRecordService.addTestRecord(testRecord);
	}
	
	private String getRecordList(Integer typeid) {
		return testRecordService.getTestRecordListByTypeId(typeid);
	}
	
	

}
