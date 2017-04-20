package com.remember.service;

import java.io.IOException;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.google.gson.Gson;
import com.remember.dao.StimulateRecordDao;
import com.remember.db.DBAccess;
import com.remember.model.StimulateRecord;

public class StimulateRecordService {
	private DBAccess dbaccess = new DBAccess();
	private SqlSession sqlsession = null;

	//插入实验记录数据
	public void addStimulateRecord(StimulateRecord stimulateRecord) {
		try {
			sqlsession = dbaccess.getSqlSession();
			StimulateRecordDao stimulateRecordDao = sqlsession.getMapper(StimulateRecordDao.class);
			stimulateRecordDao.insert(stimulateRecord);
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
	public String getAllStimulateRecordList() {
		List<StimulateRecord> stimulateRecords = null;
		try {
			sqlsession = dbaccess.getSqlSession();
			StimulateRecordDao stimulateRecordDao = sqlsession.getMapper(StimulateRecordDao.class);
			stimulateRecords = stimulateRecordDao.selectAll();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(sqlsession!=null){
				sqlsession.close();
			}
		}
		Gson gson = new Gson();
		if(stimulateRecords == null){
			return "";
		} else {
			return gson.toJson(stimulateRecords);
		}
	}
}
