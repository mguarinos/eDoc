package com.ISSTG20.surveys.model;

public class SubjectDto {
    
    private String title;


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Subject getSubjectFromDto(){
        Subject subject = new Subject();
        subject.setTitle(title);
        
        return subject;
    }
    
}