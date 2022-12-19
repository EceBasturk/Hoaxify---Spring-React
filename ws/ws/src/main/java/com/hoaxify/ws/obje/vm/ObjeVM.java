package com.hoaxify.ws.obje.vm;

import com.hoaxify.ws.obje.Obje;
import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.vm.UserVM;
import lombok.Data;

@Data
public class ObjeVM {

    private long id;

    private String content;

    //ms cinsinden almak için long kullandık
    private long timestamp;

    private UserVM user;


    public ObjeVM(Obje obje) {
        this.setId(obje.getId());
        this.setContent(obje.getContent());
        this.setTimestamp(obje.getTimestamp().getTime());
        this.setUser(new UserVM(obje.getUser())); //**harika**
    }
}
