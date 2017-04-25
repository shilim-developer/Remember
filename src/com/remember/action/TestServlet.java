package com.remember.action;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.remember.model.CultureRecord;
import com.remember.model.SexRecord;
import com.remember.model.StimulateRecord;
import com.remember.service.StimulateRecordService;
import com.remember.service.CultureRecordService;
import com.remember.service.SexRecordService;

/**
 * Servlet implementation class TestServlet
 */
@WebServlet("/TestServlet")
public class TestServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private SexRecordService sexRecordService = new SexRecordService();
	private CultureRecordService cultureRecordService = new CultureRecordService();
	private StimulateRecordService stimulateRecordService = new StimulateRecordService();
       
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
		String responseJson = "{\"result\":\"success\"}";
		switch (methodName) {
		//保存性别测试数据
		case "saveSexRecord":
			SexRecord sexRecord = new SexRecord();
			sexRecord.setSex(request.getParameter("sex"));
			sexRecord.setResult(Float.valueOf(request.getParameter("result")));
			sexRecordService.addSexRecord(sexRecord);
			break;
		//获取性别测试数据
		case "getAllSexRecord":
			responseJson = sexRecordService.getAllSexRecordList();
			break;
		case "saveCultureRecord":
			CultureRecord cultureRecord = new CultureRecord();
			cultureRecord.setCulture(request.getParameter("culture"));
			cultureRecord.setResult(Float.valueOf(request.getParameter("result")));
			cultureRecordService.addCultureRecord(cultureRecord);
			break;
		case "getAllCultureRecord":
			responseJson = cultureRecordService.getAllCultureRecordList();
			break;
		case "saveStimulateRecord":
			StimulateRecord stimulateRecord = new StimulateRecord();
			stimulateRecord.setNumberResult(Float.valueOf(request.getParameter("number_result")));
			stimulateRecord.setLetterResult(Float.valueOf(request.getParameter("letter_result")));
			stimulateRecordService.addStimulateRecord(stimulateRecord);
			break;
		case "getAllStimulateRecord":
			responseJson = stimulateRecordService.getAllStimulateRecordList();
			break;
		default:
			break;
		}
		response.getWriter().write(responseJson);
//		response.getWriter().append("success");
	}

}
