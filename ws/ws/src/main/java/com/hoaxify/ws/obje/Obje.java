package com.hoaxify.ws.obje;

import com.hoaxify.ws.file.FileAttachment;
import com.hoaxify.ws.user.User;
import lombok.Data;
import lombok.Generated;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
@Entity
public class Obje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 1000)
    //Column değeri db de varchar 255 default değerini 1000 ile değiştirdi.
    private String content;

    @Temporal(TemporalType.TIMESTAMP) //döneceği Date tipi seçimi
    private Date timestamp;

    @ManyToOne
    private User user;

    @OneToOne(mappedBy = "obje", cascade = CascadeType.REMOVE)
    private FileAttachment fileAttachment;

    private String tag;
}
