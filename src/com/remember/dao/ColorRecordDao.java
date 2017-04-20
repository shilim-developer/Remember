package com.remember.dao;

import java.util.List;

import com.remember.model.ColorRecord;

public interface ColorRecordDao {
    int deleteByPrimaryKey(Integer id);

    int insert(ColorRecord record);

    int insertSelective(ColorRecord record);
    
    List<ColorRecord> selectAll();

    ColorRecord selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ColorRecord record);

    int updateByPrimaryKey(ColorRecord record);
}