package com.remember.action;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.remember.model.TestRecord;
import com.remember.service.TestRecordService;

/**
 * Servlet implementation class TestServlet
 */
@WebServlet("/TestServlet")
public class TestServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private String methodName;
	private TestRecordService testRecordService = new TestRecordService();
       
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
		switch (methodName) {
		case "saveRecord":
			TestRecord testRecord = new TestRecord();
			testRecord.setTrDifference(request.getParameter("difference"));
			testRecord.setTrCorrectCount(request.getParameter("correctCount"));
			testRecord.setTrTypeId(Integer.valueOf(request.getParameter("typeId")));
			saveRecord(testRecord);
			break;
		case "getRecordByTypeId":
			Integer typeId = Integer.valueOf(request.getParameter("typeId"));
			response.getWriter().write(getRecordList(typeId));
			break;
		default:
			break;
		}
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
