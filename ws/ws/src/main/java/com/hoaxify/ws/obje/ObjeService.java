package com.hoaxify.ws.obje;

import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ObjeService {

    ObjeRepository objeRepository;

    public ObjeService(ObjeRepository objeRepository) {
        super();
        this.objeRepository = objeRepository;
    }

    public void save(Obje obje) {
        obje.setTimestamp(new Date());
        objeRepository.save(obje);
    }
}
