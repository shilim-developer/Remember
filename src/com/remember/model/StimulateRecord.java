package com.remember.model;

public class StimulateRecord {
    private Integer id;

    private String type;

    private Float numberResult;

    private Float letterResult;

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

    public Float getNumberResult() {
        return numberResult;
    }

    public void setNumberResult(Float numberResult) {
        this.numberResult = numberResult;
    }

    public Float getLetterResult() {
        return letterResult;
    }

    public void setLetterResult(Float letterResult) {
        this.letterResult = letterResult;
    }
}