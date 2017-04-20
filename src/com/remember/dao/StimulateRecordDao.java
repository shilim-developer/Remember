package com.remember.dao;

import java.util.List;

import com.remember.model.StimulateRecord;

public interface StimulateRecordDao {
    int deleteByPrimaryKey(Integer id);

    int insert(StimulateRecord record);

    int insertSelective(StimulateRecord record);
    
    List<StimulateRecord> selectAll();

    StimulateRecord selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(StimulateRecord record);

    int updateByPrimaryKey(StimulateRecord record);
}