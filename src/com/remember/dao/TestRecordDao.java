package com.remember.dao;

import java.util.List;

import com.remember.model.TestRecord;

public interface TestRecordDao {
    int deleteByPrimaryKey(Integer trId);

    int insert(TestRecord record);

    int insertSelective(TestRecord record);

    TestRecord selectByPrimaryKey(Integer trId);
    
    List<TestRecord> selectByTypeId(Integer trTypeId);

    int updateByPrimaryKeySelective(TestRecord record);

    int updateByPrimaryKey(TestRecord record);
}