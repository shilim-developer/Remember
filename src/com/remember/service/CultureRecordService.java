package com.remember.service;

import java.io.IOException;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.google.gson.Gson;
import com.remember.dao.CultureRecordDao;
import com.remember.db.DBAccess;
import com.remember.model.CultureRecord;

public class CultureRecordService {
	private DBAccess dbaccess = new DBAccess();
	private SqlSession sqlsession = null;

	//插入实验记录数据
	public void addCultureRecord(CultureRecord cultureRecord) {
		try {
			sqlsession = dbaccess.getSqlSession();
			CultureRecordDao cultureRecordDao = sqlsession.getMapper(CultureRecordDao.class);
			cultureRecordDao.insertSelective(cultureRecord);
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
	public String getAllCultureRecordList() {
		List<CultureRecord> cultureRecords = null;
		try {
			sqlsession = dbaccess.getSqlSession();
			CultureRecordDao cultureRecordDao = sqlsession.getMapper(CultureRecordDao.class);
			cultureRecords = cultureRecordDao.selectAll();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(sqlsession!=null){
				sqlsession.close();
			}
		}
		Gson gson = new Gson();
		if(cultureRecords == null){
			return "";
		} else {
			return gson.toJson(cultureRecords);
		}
	}
}
