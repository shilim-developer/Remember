package com.remember.model;

public class TestRecord {
    private Integer trId;

    private String trDifference;

    private String trCorrectCount;

    private Integer trTypeId;
    
    private TestType testType;

    public Integer getTrId() {
        return trId;
    }

    public void setTrId(Integer trId) {
        this.trId = trId;
    }

    public String getTrDifference() {
        return trDifference;
    }

    public void setTrDifference(String trDifference) {
        this.trDifference = trDifference;
    }

    public String getTrCorrectCount() {
        return trCorrectCount;
    }

    public void setTrCorrectCount(String trCorrectCount) {
        this.trCorrectCount = trCorrectCount;
    }

    public Integer getTrTypeId() {
        return trTypeId;
    }

    public void setTrTypeId(Integer trTypeId) {
        this.trTypeId = trTypeId;
    }

	public TestType getTestType() {
		return testType;
	}

	public void setTestType(TestType testType) {
		this.testType = testType;
	}

	@Override
	public String toString() {
		return "TestRecord [trId=" + trId + ", trDifference=" + trDifference + ", trCorrectCount=" + trCorrectCount
				+ ", trTypeId=" + trTypeId + ", testType=" + testType + "]";
	}

}