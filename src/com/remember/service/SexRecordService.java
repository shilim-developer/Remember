package com.remember.service;

import java.io.IOException;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.google.gson.Gson;
import com.remember.dao.SexRecordDao;
import com.remember.db.DBAccess;
import com.remember.model.SexRecord;

public class SexRecordService {
	private DBAccess dbaccess = new DBAccess();
	private SqlSession sqlsession = null;

	//插入实验记录数据
	public void addSexRecord(SexRecord SexRecord) {
		try {
			sqlsession = dbaccess.getSqlSession();
			SexRecordDao sexRecordDao = sqlsession.getMapper(SexRecordDao.class);
			sexRecordDao.insertSelective(SexRecord);
			sqlsession.commit();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(sqlsession!=null){
				sqlsession.close();
			}
		}
	}

	//查询实验记录数据
	public String getAllSexRecordList() {
		List<SexRecord> sexRecords = null;
		try {
			sqlsession = dbaccess.getSqlSession();
			SexRecordDao sexRecordDao = sqlsession.getMapper(SexRecordDao.class);
			sexRecords = sexRecordDao.selectAll();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(sqlsession!=null){
				sqlsession.close();
			}
		}
		Gson gson = new Gson();
		if(sexRecords == null){
			return "";
		} else {
			return gson.toJson(sexRecords);
		}
	}
}
