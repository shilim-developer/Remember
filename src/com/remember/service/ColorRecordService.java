package com.remember.service;

import java.io.IOException;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.google.gson.Gson;
import com.remember.dao.ColorRecordDao;
import com.remember.db.DBAccess;
import com.remember.model.ColorRecord;

public class ColorRecordService {
	private DBAccess dbaccess = new DBAccess();
	private SqlSession sqlsession = null;

	//插入实验记录数据
	public void addColorRecord(ColorRecord colorRecord) {
		try {
			sqlsession = dbaccess.getSqlSession();
			ColorRecordDao colorRecordDao = sqlsession.getMapper(ColorRecordDao.class);
			colorRecordDao.insert(colorRecord);
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
	public String getAllColorRecordList() {
		List<ColorRecord> colorRecords = null;
		try {
			sqlsession = dbaccess.getSqlSession();
			ColorRecordDao colorRecordDao = sqlsession.getMapper(ColorRecordDao.class);
			colorRecords = colorRecordDao.selectAll();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(sqlsession!=null){
				sqlsession.close();
			}
		}
		Gson gson = new Gson();
		if(colorRecords == null){
			return "";
		} else {
			return gson.toJson(colorRecords);
		}
	}
}
