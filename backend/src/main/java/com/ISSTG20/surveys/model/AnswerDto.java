package com.ISSTG20.surveys.model;

public class AnswerDto {
    
    private String answer;
    private long questionId;


    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Answer getAnswerFromDto(){
        Answer ans = new Answer();
        ans.setAnswer(answer);
        return ans;
    }
    
}