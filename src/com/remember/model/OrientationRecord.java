package com.remember.model;

public class OrientationRecord {
    private Integer id;

    private String type;

    private Float hResult;

    private Float vResult;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Float gethResult() {
        return hResult;
    }

    public void sethResult(Float hResult) {
        this.hResult = hResult;
    }

    public Float getvResult() {
        return vResult;
    }

    public void setvResult(Float vResult) {
        this.vResult = vResult;
    }
}