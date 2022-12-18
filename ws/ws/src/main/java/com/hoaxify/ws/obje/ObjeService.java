package com.hoaxify.ws.obje;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ObjeService {

    ObjeRepository objeRepository;

    public ObjeService(ObjeRepository objeRepository) {
        super();
        this.objeRepository = objeRepository;
    }

    public Page<Obje> getObjes(Pageable page) {
        return objeRepository.findAll(page);
    }

    public void save(Obje obje) {
        obje.setTimestamp(new Date());
        objeRepository.save(obje);
    }
}
