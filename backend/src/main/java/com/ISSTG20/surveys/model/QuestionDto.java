package com.ISSTG20.surveys.model;

public class QuestionDto {
    
    private String title;
    private String type;
    private long subjectId;


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


    public Question getQuestionFromDto(){
        Question question = new Question();
        question.setTitle(title);
        question.setType(type);
        
        return question;
    }
    
}