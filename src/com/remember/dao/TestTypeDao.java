package com.remember.dao;

import com.remember.model.TestType;

public interface TestTypeDao {
    int deleteByPrimaryKey(Integer ttId);

    int insert(TestType record);
    
    int add(TestType record);

    int insertSelective(TestType record);

    TestType selectByPrimaryKey(Integer ttId);

    int updateByPrimaryKeySelective(TestType record);

    int updateByPrimaryKey(TestType record);
}