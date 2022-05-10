package com.ISSTG20.surveys.model;

import javax.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
public class Question {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    @Column
    private String title;

    @Column
    private String type;

    @ManyToOne
    @JoinColumn(name = "subjectId")
    @JsonIgnore
    private Subject subject;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<Answer> answers;

// --------
    @ElementCollection
    @CollectionTable(name = "users_already_answered", joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "user_id")
    @JsonIgnore
    private List<Long> usersAlreadyAnswered;
// --------

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

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

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    public List<Long> getUsersAlreadyAnswered() {
        return usersAlreadyAnswered;
    }

    public void setUsersAlreadyAnswered(List<Long> usersAlreadyAnswered) {
        this.usersAlreadyAnswered = usersAlreadyAnswered;
    }

}
