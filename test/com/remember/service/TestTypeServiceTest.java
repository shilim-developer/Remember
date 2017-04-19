package com.remember.service;

import org.junit.Test;

import com.google.gson.Gson;
import com.remember.model.TestType;

public class TestTypeServiceTest {
	private TestTypeService testTypeService = new TestTypeService();

	@Test
	public void testAddTestType() {
		TestType testType = new TestType();
		testType.setTtName("性别");
		testTypeService.addTestType(testType);
	}
	
	public static void main(String[] args) {
		TestTypeService testTypeService = new TestTypeService();
		TestRecordService testRecordService = new TestRecordService();
//		TestType testType = new TestType();
//		testType.setTtId(1);
//		testType.setTtName("性别");
//		testTypeService.addTestType(testType);
		Gson gson = new Gson();
		
//		System.out.println(gson.toJson(testRecordService.getTestRecordListById(1)));
	}

}
