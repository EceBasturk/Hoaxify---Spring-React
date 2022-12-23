package com.hoaxify.ws.obje.vm;

import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class ObjeSubmitVM {

    @Size(min=1, max=1000)
    private String content;

    private long attachmentId;
}
