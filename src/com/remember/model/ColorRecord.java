package com.remember.model;

public class ColorRecord {
    private Integer id;

    private String type;

    private Float rgResult;

    private Float rbResult;

    private Float gbResult;

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

    public Float getRgResult() {
        return rgResult;
    }

    public void setRgResult(Float rgResult) {
        this.rgResult = rgResult;
    }

    public Float getRbResult() {
        return rbResult;
    }

    public void setRbResult(Float rbResult) {
        this.rbResult = rbResult;
    }

    public Float getGbResult() {
        return gbResult;
    }

    public void setGbResult(Float gbResult) {
        this.gbResult = gbResult;
    }
}