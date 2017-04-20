package com.remember.dao;

import java.util.List;

import com.remember.model.SexRecord;

public interface SexRecordDao {
    int deleteByPrimaryKey(Integer id);

    int insert(SexRecord record);

    int insertSelective(SexRecord record);

    List<SexRecord> selectAll();
    
    SexRecord selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SexRecord record);

    int updateByPrimaryKey(SexRecord record);
}