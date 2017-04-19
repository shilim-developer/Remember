package com.remember.service;

import java.io.IOException;

import org.apache.ibatis.session.SqlSession;

import com.remember.dao.TestTypeDao;
import com.remember.db.DBAccess;
import com.remember.model.TestType;


public class TestTypeService {
	private DBAccess dbaccess = new DBAccess();
	private SqlSession sqlsession = null;
	
	public void addTestType(TestType testType) {
		try {
			sqlsession = dbaccess.getSqlSession();
			TestTypeDao testTypeDao = sqlsession.getMapper(TestTypeDao.class);
			testTypeDao.insert(testType);
			sqlsession.commit();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(sqlsession!=null){
				sqlsession.close();
			}
		}
	}
}
