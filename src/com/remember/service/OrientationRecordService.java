package com.remember.service;

import java.io.IOException;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.google.gson.Gson;
import com.remember.dao.OrientationRecordDao;
import com.remember.dao.SexRecordDao;
import com.remember.db.DBAccess;
import com.remember.model.OrientationRecord;
import com.remember.model.SexRecord;

public class OrientationRecordService {
	private DBAccess dbaccess = new DBAccess();
	private SqlSession sqlsession = null;

	//插入实验记录数据
	public void addOrientationRecord(OrientationRecord orientationRecord) {
		try {
			sqlsession = dbaccess.getSqlSession();
			OrientationRecordDao orientationRecordDao = sqlsession.getMapper(OrientationRecordDao.class);
			orientationRecordDao.insert(orientationRecord);
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
	public String getAllOrientationRecordList() {
		List<OrientationRecord> orientationRecords = null;
		try {
			sqlsession = dbaccess.getSqlSession();
			OrientationRecordDao orientationRecordDao = sqlsession.getMapper(OrientationRecordDao.class);
			orientationRecords = orientationRecordDao.selectAll();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(sqlsession!=null){
				sqlsession.close();
			}
		}
		Gson gson = new Gson();
		if(orientationRecords == null){
			return "";
		} else {
			return gson.toJson(orientationRecords);
		}
	}
}
