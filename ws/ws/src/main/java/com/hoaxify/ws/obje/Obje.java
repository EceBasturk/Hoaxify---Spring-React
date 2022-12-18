package com.hoaxify.ws.obje;

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
    @GeneratedValue
    private long id;

    @Size(min=1, max=1000)
    @Column(length = 1000)
    @NotNull
    //Column değeri db de varchar 255 default değerini 1000 ile değiştirdi.
    private String content;

    @Temporal(TemporalType.TIMESTAMP) //döneceği Date tipi seçimi
    private Date timestamp;

    private String tag;
}
