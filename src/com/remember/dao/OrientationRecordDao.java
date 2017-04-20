package com.remember.dao;

import java.util.List;

import com.remember.model.OrientationRecord;

public interface OrientationRecordDao {
    int deleteByPrimaryKey(Integer id);

    int insert(OrientationRecord record);

    int insertSelective(OrientationRecord record);
    
    List<OrientationRecord> selectAll();

    OrientationRecord selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(OrientationRecord record);

    int updateByPrimaryKey(OrientationRecord record);
}