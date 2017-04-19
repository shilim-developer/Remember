package com.remember.service;

import java.io.IOException;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.google.gson.Gson;
import com.remember.dao.TestRecordDao;
import com.remember.db.DBAccess;
import com.remember.model.TestRecord;

public class TestRecordService {
	private DBAccess dbaccess = new DBAccess();
	private SqlSession sqlsession = null;
	
	//插入实验记录数据
	public void addTestRecord(TestRecord testRecord) {
		try {
			sqlsession = dbaccess.getSqlSession();
			TestRecordDao testRecordDao = sqlsession.getMapper(TestRecordDao.class);
			testRecordDao.insert(testRecord);
			sqlsession.commit();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(sqlsession!=null){
				sqlsession.close();
			}
		}
	}
	
	//通过类型Id获取记录数据
	public String getTestRecordListByTypeId(Integer id) {
		List<TestRecord> testRecords = null;
		try {
			sqlsession = dbaccess.getSqlSession();
			TestRecordDao testRecordDao = sqlsession.getMapper(TestRecordDao.class);
			testRecords = testRecordDao.selectByTypeId(id);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(sqlsession!=null){
				sqlsession.close();
			}
		}
		Gson gson = new Gson();
		if(testRecords == null){
			return "";
		} else {
			return gson.toJson(testRecords);
		}
	}
}
