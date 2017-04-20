package com.remember.dao;

import java.util.List;

import com.remember.model.CultureRecord;

public interface CultureRecordDao {
    int deleteByPrimaryKey(Integer id);

    int insert(CultureRecord record);

    int insertSelective(CultureRecord record);
    
    List<CultureRecord> selectAll();

    CultureRecord selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(CultureRecord record);

    int updateByPrimaryKey(CultureRecord record);
}